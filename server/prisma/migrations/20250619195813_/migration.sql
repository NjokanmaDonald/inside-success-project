/*
  Warnings:

  - You are about to drop the `UnregisteredUsers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RoomMembership" DROP CONSTRAINT "RoomMembership_userId_fkey";

-- DropForeignKey
ALTER TABLE "VoteTracker" DROP CONSTRAINT "VoteTracker_unregisteredUserId_fkey";

-- AlterTable
ALTER TABLE "RoomMembership" ALTER COLUMN "userId" DROP NOT NULL;

-- DropTable
DROP TABLE "UnregisteredUsers";

-- AddForeignKey
ALTER TABLE "RoomMembership" ADD CONSTRAINT "RoomMembership_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
