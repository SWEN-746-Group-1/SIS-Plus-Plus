/*
  Warnings:

  - Added the required column `name` to the `Major` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Major" ADD COLUMN     "name" TEXT NOT NULL;
