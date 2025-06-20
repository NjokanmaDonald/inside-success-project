/*
  Warnings:

  - You are about to drop the column `uniqueToken` on the `VoteTracker` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,decisionRoomId]` on the table `VoteTracker` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[unregisteredUserId,decisionRoomId]` on the table `VoteTracker` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "VoteTracker_uniqueToken_decisionRoomId_key";

-- AlterTable
ALTER TABLE "VoteTracker" DROP COLUMN "uniqueToken",
ADD COLUMN     "unregisteredUserId" TEXT,
ADD COLUMN     "userId" TEXT;

-- CreateTable
CREATE TABLE "UnregisteredUsers" (
    "id" TEXT NOT NULL,
    "anonymousId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UnregisteredUsers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UnregisteredUsers_anonymousId_key" ON "UnregisteredUsers"("anonymousId");

-- CreateIndex
CREATE UNIQUE INDEX "VoteTracker_userId_decisionRoomId_key" ON "VoteTracker"("userId", "decisionRoomId");

-- CreateIndex
CREATE UNIQUE INDEX "VoteTracker_unregisteredUserId_decisionRoomId_key" ON "VoteTracker"("unregisteredUserId", "decisionRoomId");

-- AddForeignKey
ALTER TABLE "VoteTracker" ADD CONSTRAINT "VoteTracker_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VoteTracker" ADD CONSTRAINT "VoteTracker_unregisteredUserId_fkey" FOREIGN KEY ("unregisteredUserId") REFERENCES "UnregisteredUsers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
