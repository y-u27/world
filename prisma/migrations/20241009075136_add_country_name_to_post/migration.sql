/*
  Warnings:

  - You are about to drop the column `conuntryName` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "conuntryName",
ADD COLUMN     "countryName" TEXT;
