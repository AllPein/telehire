-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_ownerId_fkey";

-- CreateTable
CREATE TABLE "_CompanyToProfile" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CompanyToProfile_AB_unique" ON "_CompanyToProfile"("A", "B");

-- CreateIndex
CREATE INDEX "_CompanyToProfile_B_index" ON "_CompanyToProfile"("B");

-- AddForeignKey
ALTER TABLE "_CompanyToProfile" ADD CONSTRAINT "_CompanyToProfile_A_fkey" FOREIGN KEY ("A") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CompanyToProfile" ADD CONSTRAINT "_CompanyToProfile_B_fkey" FOREIGN KEY ("B") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
