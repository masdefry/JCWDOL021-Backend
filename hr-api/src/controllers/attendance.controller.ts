import { Request, Response } from 'express';
import { attendanceClockInService } from '../services/attendance.service';

export const attendanceClockInController = async (
  req: Request,
  res: Response
) => {
  const { userId } = res.locals.payload;

  await attendanceClockInService({ userId });

  res.status(201).json({
    success: true,
    message: 'Clock-in successfull',
  });
};
