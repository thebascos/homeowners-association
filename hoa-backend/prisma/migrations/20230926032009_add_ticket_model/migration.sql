-- CreateEnum
CREATE TYPE "TicketCategory" AS ENUM ('Maintenance', 'Complaint');

-- CreateTable
CREATE TABLE "Ticket" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "category" "TicketCategory" NOT NULL,
    "hoId" TEXT NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Ticket" ADD CONSTRAINT "Ticket_hoId_fkey" FOREIGN KEY ("hoId") REFERENCES "HO"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
