import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import User from '../models/User.js';
import { asyncHandler, createHttpError } from '../middleware/errorMiddleware.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'careerflow-secret', {
    expiresIn: '7d'
  });
};

const serializeUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  avatar: user.avatar,
  authProvider: user.authProvider
});

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw createHttpError(400, 'Email already registered', 'Auth Error');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashedPassword });

  res.status(201).json({
    user: serializeUser(user),
    token: generateToken(user._id)
  });
}, 'Auth Error');

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !user.password || !(await bcrypt.compare(password, user.password))) {
    throw createHttpError(401, 'Invalid credentials', 'Auth Error');
  }

  res.json({
    user: serializeUser(user),
    token: generateToken(user._id)
  });
}, 'Auth Error');

export const googleLogin = asyncHandler(async (req, res) => {
  const credential = req.body?.credential;
  const clientId = process.env.GOOGLE_CLIENT_ID;

  if (!clientId) {
    throw createHttpError(500, 'Google authentication is not configured', 'Auth Error');
  }

  if (!credential) {
    throw createHttpError(400, 'Google credential is required', 'Auth Error');
  }

  const googleClient = new OAuth2Client(clientId);
  const ticket = await googleClient.verifyIdToken({
    idToken: credential,
    audience: clientId
  });

  const payload = ticket.getPayload();

  if (!payload?.email) {
    throw createHttpError(401, 'Unable to verify Google account', 'Auth Error');
  }

  let user = await User.findOne({ email: payload.email });

  if (!user) {
    user = await User.create({
      name: payload.name || payload.email.split('@')[0],
      email: payload.email,
      avatar: payload.picture || '',
      googleId: payload.sub,
      authProvider: 'google'
    });
  } else {
    user.name = user.name || payload.name || payload.email.split('@')[0];
    user.avatar = payload.picture || user.avatar;
    user.googleId = payload.sub || user.googleId;
    user.authProvider = user.authProvider || 'google';
    await user.save();
  }

  res.json({
    user: serializeUser(user),
    token: generateToken(user._id)
  });
}, 'Auth Error');
