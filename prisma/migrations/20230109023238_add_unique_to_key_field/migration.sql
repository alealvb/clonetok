/*
  Warnings:

  - A unique constraint covering the columns `[key]` on the table `Post` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Post_key_key" ON "Post"("key");
