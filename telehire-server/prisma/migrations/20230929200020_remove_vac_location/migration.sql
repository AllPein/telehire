/*
  Warnings:

  - You are about to drop the column `locationId` on the `Company` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_locationId_fkey";

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "locationId";
