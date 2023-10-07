/*
  Warnings:

  - Made the column `houseCode` on table `HO` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "HO" ADD COLUMN     "admin" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "houseCode" SET NOT NULL;
