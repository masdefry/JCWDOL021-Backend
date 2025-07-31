import { prisma } from '../db/connection';
import { TimeOff } from '../generated/prisma';
import { cloudinaryUpload } from '../lib/cloudinary.upload';

interface ICreateTimeOffServiceProps
  extends Pick<TimeOff, 'timeOffType' | 'reason' | 'requestById'> {
  timeOffEvidence: Express.Multer.File[];
}

export const createTimeOffService = async ({
  timeOffType,
  reason,
  timeOffEvidence,
  requestById
}: ICreateTimeOffServiceProps) => {
  return await prisma.$transaction(async (tx) => {
    const createdTimeOff = await tx.timeOff.create({
      data: {
        timeOffType,
        reason,
        requestById
      },
    });

    const uploadedEvidence = timeOffEvidence.map(async (evidence) => {
      const res: any = await cloudinaryUpload(evidence?.buffer);
      return { imageUrl: res?.secureUrl, timeOffId: createdTimeOff?.id };
    });

    const timeOffEvidenceToCreate = await Promise.all(uploadedEvidence);

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
