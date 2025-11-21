/*
  Warnings:

  - Added the required column `lastname` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "UserType" ADD VALUE 'USER';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "lastname" TEXT NOT NULL;
