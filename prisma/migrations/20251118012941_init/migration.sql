/*
  Warnings:

  - You are about to drop the column `disabledWeekDays` on the `BusinessConfig` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BusinessConfig" DROP COLUMN "disabledWeekDays",
ADD COLUMN     "disabledDays" INTEGER[];
