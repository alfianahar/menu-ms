/*
  Warnings:

  - You are about to drop the `Menu` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Menu";

-- CreateTable
CREATE TABLE "menu" (
    "id" TEXT NOT NULL,
    "depth" INTEGER NOT NULL,
    "parentData" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "menu_pkey" PRIMARY KEY ("id")
);
