import { prisma } from '../db/connection';
import { Attendance } from '../generated/prisma';

export const attendanceClockInService = async ({
  userId,
}: Pick<Attendance, 'userId'>) => {
  await prisma.attendance.create({
    data: {
      clockIn: new Date(),
      userId,
      attendanceDate: new Date(),
    },
  });
};
