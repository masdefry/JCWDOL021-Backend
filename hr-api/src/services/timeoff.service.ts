import { prisma } from '../db/connection';
import { TimeOff } from '../generated/prisma';

interface ICreateTimeOffServiceProps
  extends Pick<TimeOff, 'timeOffType' | 'reason'> {
  timeOffEvidence: Express.Multer.File[];
}

export const createTimeOffService = async ({
  timeOffType,
  reason,
  timeOffEvidence,
}: ICreateTimeOffServiceProps) => {
  return await prisma.$transaction(async (tx) => {
    const createdTimeOff = await tx.timeOff.create({
      data: {
        timeOffType,
        reason,
      },
    });

    const timeOffEvidenceToCreate = timeOffEvidence.map((evidence) => {
      return { imageUrl: evidence?.filename, timeOffId: createdTimeOff?.id };
    });
    /*
    [
        { imageUrl, timeOffId },
         { imageUrl, timeOffId },
          { imageUrl, timeOffId }
    ]
  */
    await tx.timeOffEvidence.createMany({
      data: timeOffEvidenceToCreate,
    });
  });
};
