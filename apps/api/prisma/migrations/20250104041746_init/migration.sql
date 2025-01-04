-- CreateTable
CREATE TABLE "Menu" (
    "id" TEXT NOT NULL,
    "depth" INTEGER NOT NULL,
    "parentData" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Menu_pkey" PRIMARY KEY ("id")
);
