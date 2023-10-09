/*
  Warnings:

  - A unique constraint covering the columns `[country]` on the table `Location` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Location_country_key" ON "Location"("country");
