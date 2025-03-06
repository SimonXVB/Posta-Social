-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_commentLikesId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_postLikesId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "commentLikesId" DROP NOT NULL,
ALTER COLUMN "postLikesId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_postLikesId_fkey" FOREIGN KEY ("postLikesId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_commentLikesId_fkey" FOREIGN KEY ("commentLikesId") REFERENCES "Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
