-- CreateTable
CREATE TABLE "Article" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "publish_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "attachments" JSONB DEFAULT '[]',
    "comments" JSONB DEFAULT '[]',
    "status" TEXT NOT NULL DEFAULT 'fetched',
    "fetch_attempts" INTEGER NOT NULL DEFAULT 0,
    "last_fetch" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "error" TEXT,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Draft" (
    "id" TEXT NOT NULL,
    "original_articleid" TEXT NOT NULL,
    "article" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "category" JSONB,
    "tags" JSONB,
    "headlines" JSONB,
    "status" TEXT NOT NULL DEFAULT 'draft',

    CONSTRAINT "Draft_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Events" (
    "id" TEXT NOT NULL,
    "event_title" TEXT NOT NULL,
    "event_venue" TEXT NOT NULL,
    "event_adress" TEXT NOT NULL,
    "event_date" TIMESTAMP(3) NOT NULL,
    "event_guests" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "event_description" TEXT NOT NULL,
    "event_hosts" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "event_agenda" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Interviews" (
    "id" TEXT NOT NULL,
    "questions" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "answers" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "interviewee_name" TEXT NOT NULL,
    "interviewer_name" TEXT NOT NULL,
    "interview_title" TEXT NOT NULL,
    "interviewee_image" TEXT NOT NULL,
    "publish_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "category" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "Interviews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KnowlegeHub" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "publish_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "category" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "KnowlegeHub_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Magzine" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "cover_img" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "issue_name" TEXT NOT NULL,
    "publish_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "file" TEXT NOT NULL,

    CONSTRAINT "Magzine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PublishedNews" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "article" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "approx_time_to_read" INTEGER NOT NULL,
    "category" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "view_count" INTEGER NOT NULL DEFAULT 0,
    "headlines" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "display_section" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "status" TEXT NOT NULL DEFAULT 'published',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PublishedNews_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Regulation" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "authority" TEXT NOT NULL,
    "publish_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "file" TEXT NOT NULL,

    CONSTRAINT "Regulation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Research" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "publish_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "file" TEXT NOT NULL,

    CONSTRAINT "Research_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Article_source_key" ON "Article"("source");
