-- CreateEnum
CREATE TYPE "TimeOffType" AS ENUM ('IZIN_MENIKAH', 'IZIN_MENIKAHKAN', 'IZIN_SAKIT', 'IZIN_CUTI_TAHUNAN');

-- CreateTable
CREATE TABLE "time_off" (
    "id" SERIAL NOT NULL,
    "timeOffType" "TimeOffType" NOT NULL,
    "reason" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "time_off_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "time_off_evidences" (
    "id" SERIAL NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "timeOffId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "time_off_evidences_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "time_off_evidences" ADD CONSTRAINT "time_off_evidences_timeOffId_fkey" FOREIGN KEY ("timeOffId") REFERENCES "time_off"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
