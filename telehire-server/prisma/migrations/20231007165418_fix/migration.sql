-- DropForeignKey
ALTER TABLE "Applies" DROP CONSTRAINT "Applies_resumeId_fkey";

-- DropForeignKey
ALTER TABLE "Applies" DROP CONSTRAINT "Applies_vacancyId_fkey";

-- DropForeignKey
ALTER TABLE "CompanyLink" DROP CONSTRAINT "CompanyLink_companyId_fkey";

-- DropForeignKey
ALTER TABLE "Invites" DROP CONSTRAINT "Invites_resumeId_fkey";

-- DropForeignKey
ALTER TABLE "Invites" DROP CONSTRAINT "Invites_vacancyId_fkey";

-- DropForeignKey
ALTER TABLE "Resume" DROP CONSTRAINT "Resume_userId_fkey";

-- DropForeignKey
ALTER TABLE "Vacancy" DROP CONSTRAINT "Vacancy_companyId_fkey";

-- AlterTable
ALTER TABLE "Applies" ALTER COLUMN "status" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "Vacancy" ADD CONSTRAINT "Vacancy_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resume" ADD CONSTRAINT "Resume_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Profile"("telegramId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Applies" ADD CONSTRAINT "Applies_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Applies" ADD CONSTRAINT "Applies_vacancyId_fkey" FOREIGN KEY ("vacancyId") REFERENCES "Vacancy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invites" ADD CONSTRAINT "Invites_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invites" ADD CONSTRAINT "Invites_vacancyId_fkey" FOREIGN KEY ("vacancyId") REFERENCES "Vacancy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyLink" ADD CONSTRAINT "CompanyLink_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
