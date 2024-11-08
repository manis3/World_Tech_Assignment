/*
  Warnings:

  - You are about to drop the column `otpExpiry` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "otpExpiry",
ADD COLUMN     "otpExpire" TIMESTAMP(3);
