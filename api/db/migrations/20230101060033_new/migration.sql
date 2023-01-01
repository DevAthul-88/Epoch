/*
  Warnings:

  - You are about to drop the column `cmmtId` on the `Cmmt` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Cmmt" DROP CONSTRAINT "Cmmt_parentId_fkey";

-- AlterTable
ALTER TABLE "Cmmt" DROP COLUMN "cmmtId";
