import express from 'express';
import { generateCoverLetter } from '../controllers/aiController.js';
import { uploadResume } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.post('/cover-letter', uploadResume, generateCoverLetter);

export default router;
