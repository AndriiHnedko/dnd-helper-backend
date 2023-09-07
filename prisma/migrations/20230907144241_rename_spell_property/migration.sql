/*
  Warnings:

  - You are about to drop the column `higherLevels` on the `Spell` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Spell" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "school" TEXT NOT NULL,
    "castingTime" TEXT NOT NULL,
    "range" TEXT NOT NULL,
    "components" TEXT NOT NULL,
    "materialComponents" TEXT,
    "duration" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "higherLevelsDescription" TEXT
);
INSERT INTO "new_Spell" ("castingTime", "components", "description", "duration", "id", "level", "materialComponents", "name", "range", "school") SELECT "castingTime", "components", "description", "duration", "id", "level", "materialComponents", "name", "range", "school" FROM "Spell";
DROP TABLE "Spell";
ALTER TABLE "new_Spell" RENAME TO "Spell";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
