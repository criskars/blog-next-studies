import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const postsTable = sqliteTable('posts_table', {
    id: text().primaryKey(),
    title: text('title').notNull(),
    slug: text().notNull().unique(),
    excerpt: text().notNull(),
    content: text().notNull(),
    coverImageSlug: text().notNull(),
    published: integer({ mode: 'boolean' }).notNull(),
    createdAt: text().notNull(),
    updatedAt: text().notNull(),
    author: text().notNull(),
})
