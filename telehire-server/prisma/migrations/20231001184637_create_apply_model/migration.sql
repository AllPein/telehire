-- CreateEnum
CREATE TYPE "ApplyStatus" AS ENUM ('Pending', 'Denied', 'Accepted');

-- CreateTable
CREATE TABLE "Applies" (
    "id" SERIAL NOT NULL,
    "cvId" INTEGER NOT NULL,
    "vacancyId" INTEGER NOT NULL,
    "status" "ApplyStatus" NOT NULL DEFAULT 'Pending',

    CONSTRAINT "Applies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Applies_cvId_vacancyId_idx" ON "Applies"("cvId", "vacancyId");
