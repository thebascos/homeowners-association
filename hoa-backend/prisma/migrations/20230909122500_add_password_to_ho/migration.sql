/*
  Warnings:

  - Added the required column `password` to the `HO` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HO" ADD COLUMN     "password" TEXT NOT NULL;
