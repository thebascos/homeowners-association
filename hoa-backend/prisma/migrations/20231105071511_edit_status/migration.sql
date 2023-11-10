/*
  Warnings:

  - You are about to drop the column `status` on the `Invoice` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "status",
ADD COLUMN     "paid" BOOLEAN NOT NULL DEFAULT false;
