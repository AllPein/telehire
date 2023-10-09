-- CreateTable
CREATE TABLE "Invites" (
    "id" SERIAL NOT NULL,
    "resumeId" INTEGER NOT NULL,
    "vacancyId" INTEGER NOT NULL,
    "status" "ApplyStatus" NOT NULL DEFAULT 'Pending',

    CONSTRAINT "Invites_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Invites" ADD CONSTRAINT "Invites_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invites" ADD CONSTRAINT "Invites_vacancyId_fkey" FOREIGN KEY ("vacancyId") REFERENCES "Vacancy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
