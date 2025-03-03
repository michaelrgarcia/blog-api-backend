-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "lastModified" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "uploaded" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "lastModified" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "published" SET DEFAULT false,
ALTER COLUMN "uploaded" SET DEFAULT CURRENT_TIMESTAMP;
