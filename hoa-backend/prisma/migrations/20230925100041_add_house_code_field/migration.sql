/*
  Warnings:

  - Added the required column `houseCode` to the `HO` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HO" ADD COLUMN     "houseCode" TEXT NOT NULL;
