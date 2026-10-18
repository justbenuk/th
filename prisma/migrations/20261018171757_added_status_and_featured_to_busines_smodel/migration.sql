-- CreateEnum
CREATE TYPE "StatusType" AS ENUM ('DRAFT', 'PUBLISHED', 'REFUSED');

-- AlterTable
ALTER TABLE "Business" ADD COLUMN     "featured" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "status" "StatusType" NOT NULL DEFAULT 'DRAFT';
