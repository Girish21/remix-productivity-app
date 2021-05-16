/*
  Warnings:

  - A unique constraint covering the columns `[name,user_id]` on the table `Track` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `Todo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Todo" ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Track.name_user_id_unique" ON "Track"("name", "user_id");

-- AddForeignKey
ALTER TABLE "Todo" ADD FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
