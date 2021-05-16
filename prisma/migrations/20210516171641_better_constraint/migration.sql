/*
  Warnings:

  - You are about to drop the column `track_name` on the `Todo` table. All the data in the column will be lost.
  - Added the required column `track_id` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Todo" DROP CONSTRAINT "Todo_track_name_fkey";

-- DropIndex
DROP INDEX "Track.name_unique";

-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "track_name",
ADD COLUMN     "track_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Todo" ADD FOREIGN KEY ("track_id") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;
