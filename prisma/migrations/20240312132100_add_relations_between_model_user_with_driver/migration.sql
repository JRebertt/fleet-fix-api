/*
  Warnings:

  - You are about to drop the column `email` on the `drivers` table. All the data in the column will be lost.
  - You are about to drop the column `full_name` on the `drivers` table. All the data in the column will be lost.
  - You are about to drop the column `password_hash` on the `drivers` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `drivers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `drivers` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "drivers_email_key";

-- AlterTable
ALTER TABLE "drivers" DROP COLUMN "email",
DROP COLUMN "full_name",
DROP COLUMN "password_hash",
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "drivers_userId_key" ON "drivers"("userId");

-- AddForeignKey
ALTER TABLE "drivers" ADD CONSTRAINT "drivers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
