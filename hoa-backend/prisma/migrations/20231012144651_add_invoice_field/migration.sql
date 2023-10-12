/*
  Warnings:

  - Added the required column `amount` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `invoiceName` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "invoiceName" TEXT NOT NULL;
