import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
import savedRoutes from './routes/savedRoutes.js';
import errorHandler from './middleware/errorHandler.js';
import seedJobs from './data/seedJobs.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

connectDB().then(async () => {
  await seedJobs();
});

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true
  })
);
app.use(express.json());

app.use('/api/home', (req, res) => {
  res.status(200).json({ message: 'Welcome Route' });
});
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/saved', savedRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
