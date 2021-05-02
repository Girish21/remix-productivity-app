/*
  Warnings:

  - You are about to drop the column `tracksId` on the `Todo` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Track` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tracksName` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Todo" DROP CONSTRAINT "Todo_tracksId_fkey";

-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "tracksId",
ADD COLUMN     "tracksName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Track.name_unique" ON "Track"("name");

-- AddForeignKey
ALTER TABLE "Todo" ADD FOREIGN KEY ("tracksName") REFERENCES "Track"("name") ON DELETE CASCADE ON UPDATE CASCADE;
