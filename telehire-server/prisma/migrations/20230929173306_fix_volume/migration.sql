/*
  Warnings:

  - The values [Hug] on the enum `Volume` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Volume_new" AS ENUM ('SelfEmployed', 'Low', 'Medium', 'High', 'Huge');
ALTER TABLE "Company" ALTER COLUMN "volume" DROP DEFAULT;
ALTER TABLE "Company" ALTER COLUMN "volume" TYPE "Volume_new" USING ("volume"::text::"Volume_new");
ALTER TYPE "Volume" RENAME TO "Volume_old";
ALTER TYPE "Volume_new" RENAME TO "Volume";
DROP TYPE "Volume_old";
ALTER TABLE "Company" ALTER COLUMN "volume" SET DEFAULT 'Low';
COMMIT;

-- CreateIndex
CREATE INDEX "Skill_name_idx" ON "Skill"("name");
