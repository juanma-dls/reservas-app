-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('ADMIN', 'CUSTOMER');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "type" "UserType" NOT NULL DEFAULT 'CUSTOMER';
