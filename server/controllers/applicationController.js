import * as applicationService from '../services/applicationService.js';

export const getUserApplications = async (req, res, next) => {
  try {
    const applications = await applicationService.getApplicationsByUser(req.user.id);
    res.json(applications);
  } catch (error) {
    next(error);
  }
};

export const applyForJob = async (req, res, next) => {
  try {
    const application = await applicationService.createApplication({
      userId: req.user.id,
      jobId: req.body.jobId
    });
    res.status(201).json(application);
  } catch (error) {
    next(error);
  }
};

export const updateApplication = async (req, res, next) => {
  try {
    const payload = {
      applicationStatus: req.body.applicationStatus,
      notes: req.body.notes,
      interviewFeedback: req.body.interviewFeedback,
      recruiterFeedback: req.body.recruiterFeedback,
      nextSteps: req.body.nextSteps
    };

    const updated = await applicationService.updateApplication(
      req.params.id,
      req.user.id,
      payload
    );

    if (!updated) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.json(updated);
  } catch (error) {
    next(error);
  }
};
