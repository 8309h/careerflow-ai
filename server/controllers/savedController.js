import SavedJob from '../models/SavedJob.js';

export const getSavedJobs = async (req, res, next) => {
  try {
    const savedJobs = await SavedJob.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(savedJobs);
  } catch (error) {
    next(error);
  }
};

export const addSavedJob = async (req, res, next) => {
  try {
    const { jobId, title, company, status, location, notes } = req.body;
    const existing = await SavedJob.findOne({ jobId, user: req.user.id });

    if (existing) {
      return res.status(400).json({ message: 'Job already saved' });
    }

    const savedJob = await SavedJob.create({
      jobId,
      title,
      company,
      status,
      location,
      notes,
      user: req.user.id
    });

    res.status(201).json(savedJob);
  } catch (error) {
    next(error);
  }
};

export const removeSavedJob = async (req, res, next) => {
  try {
    const removed = await SavedJob.findOneAndDelete({ _id: req.params.id, user: req.user.id });

    if (!removed) {
      return res.status(404).json({ message: 'Saved job not found' });
    }

    res.json({ message: 'Saved job removed' });
  } catch (error) {
    next(error);
  }
};
