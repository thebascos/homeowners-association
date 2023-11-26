-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'AVAILABLE',
    "paid" BOOLEAN NOT NULL DEFAULT false,
    "price" INTEGER NOT NULL,
    "hoId" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_hoId_fkey" FOREIGN KEY ("hoId") REFERENCES "HO"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
