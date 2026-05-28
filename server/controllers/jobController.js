import Job from '../models/Job.js';
import * as jobService from '../services/jobService.js';
import { asyncHandler, createHttpError } from '../middleware/errorMiddleware.js';

export const getJobs = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 10;
  const search = req.query.search || '';
  const filters = {
    category: req.query.category,
    location: req.query.location,
    employmentType: req.query.employmentType,
    experienceLevel: req.query.experienceLevel
  };

  const result = await jobService.getJobsPaginated({ page, limit, search, filters });
  res.json(result);
}, 'Job Fetch Error');

export const getJobById = asyncHandler(async (req, res) => {
  const job = await Job.findById(req.params.id);

  if (!job) {
    throw createHttpError(404, 'Job not found', 'Job Fetch Error');
  }

  res.json(job);
}, 'Job Fetch Error');

export const createJob = asyncHandler(async (req, res) => {
  const job = await Job.create({ ...req.body, createdBy: req.user?.id });
  res.status(201).json(job);
}, 'Job Create Error');

export const updateJob = asyncHandler(async (req, res) => {
  const job = await Job.findOneAndUpdate(
    { _id: req.params.id, createdBy: req.user.id },
    req.body,
    { new: true }
  );

  if (!job) {
    throw createHttpError(404, 'Job not found', 'Job Update Error');
  }

  res.json(job);
}, 'Job Update Error');

export const deleteJob = asyncHandler(async (req, res) => {
  const job = await Job.findOneAndDelete({ _id: req.params.id, createdBy: req.user.id });

  if (!job) {
    throw createHttpError(404, 'Job not found', 'Job Delete Error');
  }

  res.json({ message: 'Job removed' });
}, 'Job Delete Error');
