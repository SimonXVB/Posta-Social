/*
  Warnings:

  - You are about to drop the `_Comments` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Comment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_Comments" DROP CONSTRAINT "_Comments_A_fkey";

-- DropForeignKey
ALTER TABLE "_Comments" DROP CONSTRAINT "_Comments_B_fkey";

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "userId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_Comments";

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
