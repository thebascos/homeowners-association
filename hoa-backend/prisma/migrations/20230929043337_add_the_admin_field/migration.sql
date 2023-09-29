/*
  Warnings:

  - Added the required column `admin` to the `HO` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HO" ADD COLUMN     "admin" BOOLEAN NOT NULL;
