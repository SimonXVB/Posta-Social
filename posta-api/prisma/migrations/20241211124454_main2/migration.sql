/*
  Warnings:

  - Added the required column `commentLikesId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postLikesId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "commentLikesId" INTEGER NOT NULL,
ADD COLUMN     "postLikesId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_postLikesId_fkey" FOREIGN KEY ("postLikesId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_commentLikesId_fkey" FOREIGN KEY ("commentLikesId") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
