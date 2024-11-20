/*
  Warnings:

  - You are about to drop the column `daysOfTheWeek` on the `TimeSlot` table. All the data in the column will be lost.
  - Added the required column `courseSectionId` to the `TimeSlot` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `startTime` on the `TimeSlot` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `endTime` on the `TimeSlot` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "CourseSection" DROP CONSTRAINT "CourseSection_timeSlotId_fkey";

-- AlterTable
ALTER TABLE "TimeSlot" DROP COLUMN "daysOfTheWeek",
ADD COLUMN     "courseSectionId" TEXT NOT NULL,
DROP COLUMN "startTime",
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL,
DROP COLUMN "endTime",
ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "TimeSlot" ADD CONSTRAINT "TimeSlot_courseSectionId_fkey" FOREIGN KEY ("courseSectionId") REFERENCES "CourseSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
