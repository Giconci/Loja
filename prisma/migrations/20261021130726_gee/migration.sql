-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "category" DROP NOT NULL;

-- CreateTable
CREATE TABLE "HeroBanner" (
    "id" SERIAL NOT NULL,
    "desktop" TEXT NOT NULL,
    "mobile" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HeroBanner_pkey" PRIMARY KEY ("id")
);
