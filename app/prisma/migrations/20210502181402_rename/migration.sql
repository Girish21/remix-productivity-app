/*
  Warnings:

  - You are about to drop the column `tracksName` on the `Todo` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Track` table. All the data in the column will be lost.
  - Added the required column `track_name` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Todo" DROP CONSTRAINT "Todo_tracksName_fkey";

-- DropForeignKey
ALTER TABLE "Track" DROP CONSTRAINT "Track_userId_fkey";

-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "tracksName",
ADD COLUMN     "track_name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Track" DROP COLUMN "userId",
ADD COLUMN     "user_id" INTEGER;

-- AddForeignKey
ALTER TABLE "Todo" ADD FOREIGN KEY ("track_name") REFERENCES "Track"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
