-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_likedId_fkey";

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "likedId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_likedId_fkey" FOREIGN KEY ("likedId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
