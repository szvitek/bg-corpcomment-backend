-- CreateTable
CREATE TABLE "Feedback" (
    "id" SERIAL NOT NULL,
    "company" TEXT NOT NULL,
    "badgeLetter" TEXT NOT NULL,
    "upvoteCount" INTEGER NOT NULL,
    "daysAgo" INTEGER NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);
