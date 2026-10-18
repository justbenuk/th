/*
  Warnings:

  - You are about to drop the column `constNumber` on the `Business` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Business" DROP COLUMN "constNumber",
ADD COLUMN     "contactNumber" TEXT;
