// backend/src/database/schema.ts
import {
  pgTable,
  text,
  timestamp,
  uuid,
  boolean,
  integer,
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: text('id').primaryKey(), // Twitter user ID
  name: text('name').notNull(),
  image: text('image'),
  twitterAccessToken: text('twitter_access_token'),
  twitterRefreshToken: text('twitter_refresh_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  needsReauth: boolean('needs_reauth').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const posts = pgTable('posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  content: text('content').notNull(),
  platform: text('platform').default('twitter'),
  scheduledAt: timestamp('scheduled_at'),
  status: text('status').default('queued'), // queued | posted | failed
  createdAt: timestamp('created_at').defaultNow(),
});

export const jobs = pgTable('jobs', {
  id: uuid('id').primaryKey().defaultRandom(),
  postId: uuid('post_id')
    .notNull()
    .references(() => posts.id, { onDelete: 'cascade' }),
  bullJobId: text('bull_job_id'),
  attempts: integer('attempts').default(0),
  lastError: text('last_error'),
  createdAt: timestamp('created_at').defaultNow(),
});
