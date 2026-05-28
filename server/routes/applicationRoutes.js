import express from 'express';
import { getUserApplications, applyForJob, updateApplication } from '../controllers/applicationController.js';
import protect from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.route('/').get(getUserApplications).post(applyForJob);
router.route('/:id').put(updateApplication);

export default router;
