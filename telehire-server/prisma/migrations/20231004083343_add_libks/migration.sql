-- CreateTable
CREATE TABLE "CompanyLink" (
    "id" SERIAL NOT NULL,
    "hash" TEXT NOT NULL,
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "CompanyLink_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CompanyLink_hash_key" ON "CompanyLink"("hash");

-- CreateIndex
CREATE UNIQUE INDEX "CompanyLink_companyId_key" ON "CompanyLink"("companyId");

-- AddForeignKey
ALTER TABLE "CompanyLink" ADD CONSTRAINT "CompanyLink_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
