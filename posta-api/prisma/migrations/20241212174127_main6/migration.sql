/*
  Warnings:

  - You are about to drop the column `authorId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `likedId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `likedId` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `commentLikesId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `postLikesId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_authorId_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_likedId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_likedId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_commentLikesId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_postLikesId_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "authorId",
DROP COLUMN "likedId";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "likedId";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "commentLikesId",
DROP COLUMN "postLikesId";

-- CreateTable
CREATE TABLE "_likedPosts" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_likedPosts_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_LikedComments" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_LikedComments_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_Comments" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_Comments_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_likedPosts_B_index" ON "_likedPosts"("B");

-- CreateIndex
CREATE INDEX "_LikedComments_B_index" ON "_LikedComments"("B");

-- CreateIndex
CREATE INDEX "_Comments_B_index" ON "_Comments"("B");

-- AddForeignKey
ALTER TABLE "_likedPosts" ADD CONSTRAINT "_likedPosts_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_likedPosts" ADD CONSTRAINT "_likedPosts_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LikedComments" ADD CONSTRAINT "_LikedComments_A_fkey" FOREIGN KEY ("A") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LikedComments" ADD CONSTRAINT "_LikedComments_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Comments" ADD CONSTRAINT "_Comments_A_fkey" FOREIGN KEY ("A") REFERENCES "Comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Comments" ADD CONSTRAINT "_Comments_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
