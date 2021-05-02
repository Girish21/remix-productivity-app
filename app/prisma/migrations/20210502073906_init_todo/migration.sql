-- CreateTable
CREATE TABLE "Todo" (
    "id" SERIAL NOT NULL,
    "todo" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("id")
);
