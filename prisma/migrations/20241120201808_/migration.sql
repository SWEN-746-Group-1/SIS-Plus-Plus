/*
  Warnings:

  - You are about to drop the column `semesterId` on the `Cart` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_semesterId_fkey";

-- DropIndex
DROP INDEX "Cart_semesterId_key";

-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "semesterId";
