-- Add creator-attribution columns to User. Tracks which creator's referral
-- URL brought a user in, for the 30%/12mo rev-share (see docs/creator-partnership.md).

ALTER TABLE "User" ADD COLUMN "referredBy" TEXT;
ALTER TABLE "User" ADD COLUMN "referredAt" TIMESTAMP(3);

-- Index for fast "earnings per creator" group-by queries.
CREATE INDEX "User_referredBy_idx" ON "User"("referredBy");

-- Add per-step completion storage to GuideProgress so the guide detail page
-- can restore which specific steps a user checked off when they return.
ALTER TABLE "GuideProgress" ADD COLUMN "completedStepsCsv" TEXT DEFAULT '';

-- Index for fast "continue where you left off" lookups per user.
CREATE INDEX "GuideProgress_userId_updatedAt_idx" ON "GuideProgress"("userId", "updatedAt");
