/*
  Warnings:

  - You are about to drop the column `salaryFrom` on the `Cv` table. All the data in the column will be lost.
  - You are about to drop the column `salaryTo` on the `Cv` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Cv" DROP COLUMN "salaryFrom",
DROP COLUMN "salaryTo",
ADD COLUMN     "salary" DOUBLE PRECISION;
