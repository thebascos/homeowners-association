-- CreateEnum
CREATE TYPE "TicketStatus" AS ENUM ('Pending', 'Resolved');

-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "status" "TicketStatus" NOT NULL DEFAULT 'Pending';
