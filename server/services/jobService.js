import Job from '../models/Job.js';

export const getAllJobs = async () => {
  return Job.find({}).sort({ postedDate: -1 });
};

export const getJobsPaginated = async ({ page = 1, limit = 10, search = '', filters = {} }) => {
  const skip = (page - 1) * limit;
  const query = {};

  if (search) {
    const rx = new RegExp(search, 'i');
    query.$or = [{ title: rx }, { company: rx }, { description: rx }, { skills: rx }];
  }

  // apply simple filters (category, location, employmentType, experienceLevel)
  if (filters.category) query.category = filters.category;
  if (filters.location) query.location = filters.location;
  if (filters.employmentType) query.employmentType = filters.employmentType;
  if (filters.experienceLevel) query.experienceLevel = filters.experienceLevel;

  const [totalJobs, jobs] = await Promise.all([
    Job.countDocuments(query),
    Job.find(query).sort({ postedDate: -1 }).skip(skip).limit(Number(limit))
  ]);

  const totalPages = Math.max(1, Math.ceil(totalJobs / limit));

  return { jobs, totalJobs, totalPages, currentPage: Number(page) };
};

export const getJobById = async (id) => {
  return Job.findById(id);
};

export const createJob = async (payload) => {
  return Job.create(payload);
};

export const updateJob = async (jobId, payload, userId) => {
  return Job.findOneAndUpdate({ _id: jobId, createdBy: userId }, payload, { new: true });
};

export const deleteJob = async (jobId, userId) => {
  return Job.findOneAndDelete({ _id: jobId, createdBy: userId });
};
