/*
  Warnings:

  - Added the required column `requestById` to the `time_off` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "time_off" ADD COLUMN     "approvedById" TEXT,
ADD COLUMN     "requestById" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "time_off" ADD CONSTRAINT "time_off_requestById_fkey" FOREIGN KEY ("requestById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "time_off" ADD CONSTRAINT "time_off_approvedById_fkey" FOREIGN KEY ("approvedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
