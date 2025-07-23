import { Request, Response } from 'express';

export const attendanceClockInController = async (
  req: Request,
  res: Response
) => {
  const { userId } = req.body.payload;
  console.log(req.body.payload);
};
