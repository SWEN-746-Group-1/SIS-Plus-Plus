/*
  Warnings:

  - A unique constraint covering the columns `[courseSectionId]` on the table `TimeSlot` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `daysOfTheWeek` to the `TimeSlot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TimeSlot" ADD COLUMN     "daysOfTheWeek" TEXT NOT NULL,
ALTER COLUMN "startTime" SET DATA TYPE TEXT,
ALTER COLUMN "endTime" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "TimeSlot_courseSectionId_key" ON "TimeSlot"("courseSectionId");
