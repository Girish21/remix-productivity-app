/*
  Warnings:

  - Added the required column `tracksId` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "tracksId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Track" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "userId" INTEGER,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Track" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Todo" ADD FOREIGN KEY ("tracksId") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;
