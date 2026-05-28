import * as geminiService from '../services/geminiService.js';
import { asyncHandler, createHttpError } from '../middleware/errorMiddleware.js';
import { parseResumePdf } from '../utils/pdfParser.js';

const MIN_JD_LENGTH = 40;
const MAX_JD_LENGTH = 12000;
const MIN_RESUME_LENGTH = 80;
const MIN_PDF_RESUME_LENGTH = 180;
const MAX_RESUME_LENGTH = 20000;

export const generateCoverLetter = asyncHandler(async (req, res) => {
  const jobDescription = String(req.body?.jobDescription || '').trim();
  let resumeText = '';
  const resumeSource = 'pdf';

  if (!jobDescription) {
    throw createHttpError(400, 'Please paste a job description before generating.', 'AI Cover Letter Error');
  }

  if (jobDescription.length < MIN_JD_LENGTH) {
    throw createHttpError(400, 'Please add more job details for a useful cover letter.', 'AI Cover Letter Error');
  }

  if (jobDescription.length > MAX_JD_LENGTH) {
    throw createHttpError(400, `Job description must be ${MAX_JD_LENGTH} characters or less.`, 'AI Cover Letter Error');
  }

  if (!req.file) {
    if (!req.is('multipart/form-data')) {
      throw createHttpError(
        400,
        'Resume upload was not sent as multipart form data. Please refresh the page and try uploading again.',
        'AI Cover Letter Error'
      );
    }

    throw createHttpError(400, 'Please upload your resume PDF.', 'AI Cover Letter Error');
  }

  resumeText = await parseResumePdf(req.file.buffer);

  if (resumeText.length < MIN_PDF_RESUME_LENGTH) {
    throw createHttpError(
      400,
      'The uploaded PDF did not contain enough readable resume text. Please upload a text-based resume PDF.',
      'AI Cover Letter Error'
    );
  }

  if (resumeText.length < MIN_RESUME_LENGTH) {
    throw createHttpError(400, 'Please provide more resume details so the AI can personalize the letter.', 'AI Cover Letter Error');
  }

  if (resumeText.length > MAX_RESUME_LENGTH) {
    resumeText = resumeText.slice(0, MAX_RESUME_LENGTH);
  }

  const result = await geminiService.generateCoverLetter({
    resumeText,
    jobDescription
  });

  res.status(200).json({
    success: true,
    data: {
      coverLetter: result.coverLetter,
      model: result.model,
      resumeSource,
      generatedAt: new Date().toISOString()
    }
  });
}, 'AI Cover Letter Error');
