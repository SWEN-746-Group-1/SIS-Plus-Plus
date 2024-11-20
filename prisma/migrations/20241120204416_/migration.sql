/*
  Warnings:

  - A unique constraint covering the columns `[sectionId,order]` on the table `Enrolled` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Enrolled" ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "Enrolled_sectionId_order_key" ON "Enrolled"("sectionId", "order");
