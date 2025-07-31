import { Request, Response } from 'express';
import { createTimeOffService } from '../services/timeoff.service';

export const createTimeOffController = async (req: Request, res: Response) => {
  const { timeOffType, reason } = req.body;
  const { userId } = res?.locals?.payload;

  const timeOffEvidence = Array.isArray(req?.files)
    ? req.files
    : req.files
    ? (req.files as Record<string, Express.Multer.File[]>).evidence || []
    : [];

  await createTimeOffService({
    timeOffEvidence,
    timeOffType,
    reason,
    requestById: userId,
  });

  res.status(201).json({
    success: true,
    message: 'Request time-off successfull',
    data: {
      timeOffType,
      reason,
    },
  });
};
