-- CreateTable
CREATE TABLE "Property" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "tinryou" INTEGER NOT NULL,
    "madori" TEXT NOT NULL,
    "tikunen" INTEGER,
    "ekikara" INTEGER
);
