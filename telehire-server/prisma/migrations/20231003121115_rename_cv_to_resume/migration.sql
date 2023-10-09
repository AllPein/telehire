/*
  Warnings:

  - You are about to drop the column `cvId` on the `Applies` table. All the data in the column will be lost.
  - You are about to drop the column `activeCvId` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the `Cv` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CvToSkill` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `resumeId` to the `Applies` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Applies" DROP CONSTRAINT "Applies_cvId_fkey";

-- DropForeignKey
ALTER TABLE "Cv" DROP CONSTRAINT "Cv_userId_fkey";

-- DropForeignKey
ALTER TABLE "_CvToSkill" DROP CONSTRAINT "_CvToSkill_A_fkey";

-- DropForeignKey
ALTER TABLE "_CvToSkill" DROP CONSTRAINT "_CvToSkill_B_fkey";

-- DropIndex
DROP INDEX "Applies_cvId_vacancyId_idx";

-- AlterTable
ALTER TABLE "Applies" DROP COLUMN "cvId",
ADD COLUMN     "resumeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Profile" DROP COLUMN "activeCvId",
ADD COLUMN     "activeResumeId" INTEGER;

-- DropTable
DROP TABLE "Cv";

-- DropTable
DROP TABLE "_CvToSkill";

-- CreateTable
CREATE TABLE "Resume" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "position" TEXT NOT NULL,
    "salary" DOUBLE PRECISION,
    "currency" TEXT NOT NULL DEFAULT 'usd',
    "description" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Resume_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ResumeToSkill" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ResumeToSkill_AB_unique" ON "_ResumeToSkill"("A", "B");

-- CreateIndex
CREATE INDEX "_ResumeToSkill_B_index" ON "_ResumeToSkill"("B");

-- CreateIndex
CREATE INDEX "Applies_resumeId_vacancyId_idx" ON "Applies"("resumeId", "vacancyId");

-- AddForeignKey
ALTER TABLE "Resume" ADD CONSTRAINT "Resume_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Profile"("telegramId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Applies" ADD CONSTRAINT "Applies_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ResumeToSkill" ADD CONSTRAINT "_ResumeToSkill_A_fkey" FOREIGN KEY ("A") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ResumeToSkill" ADD CONSTRAINT "_ResumeToSkill_B_fkey" FOREIGN KEY ("B") REFERENCES "Skill"("id") ON DELETE CASCADE ON UPDATE CASCADE;
