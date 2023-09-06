/*
  Warnings:

  - Added the required column `language` to the `Translate` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Translate" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "language" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "translate" TEXT NOT NULL
);
INSERT INTO "new_Translate" ("id", "key", "translate") SELECT "id", "key", "translate" FROM "Translate";
DROP TABLE "Translate";
ALTER TABLE "new_Translate" RENAME TO "Translate";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
