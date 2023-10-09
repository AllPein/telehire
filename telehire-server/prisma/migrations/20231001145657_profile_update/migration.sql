-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "firstName" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "isBot" BOOLEAN,
ADD COLUMN     "isPremium" BOOLEAN,
ADD COLUMN     "languageCode" TEXT,
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "photoUrl" TEXT,
ADD COLUMN     "username" TEXT;
