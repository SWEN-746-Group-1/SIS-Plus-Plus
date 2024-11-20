/*
  Warnings:

  - The `daysOfTheWeek` column on the `TimeSlot` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "TimeSlot" DROP COLUMN "daysOfTheWeek",
ADD COLUMN     "daysOfTheWeek" TEXT[];
