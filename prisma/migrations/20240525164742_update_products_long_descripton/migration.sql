/*
  Warnings:

  - Made the column `longDescription` on table `product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `product` MODIFY `longDescription` LONGTEXT NOT NULL;
