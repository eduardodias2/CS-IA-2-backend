-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_notes" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "url" TEXT,
    "description" TEXT NOT NULL
);
INSERT INTO "new_notes" ("description", "id", "title", "url") SELECT "description", "id", "title", "url" FROM "notes";
DROP TABLE "notes";
ALTER TABLE "new_notes" RENAME TO "notes";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
