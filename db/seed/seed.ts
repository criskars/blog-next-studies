import 'dotenv/config'
import { drizzle } from 'drizzle-orm/libsql'
import { postsTable } from '../schema'
import { getAllJSONPosts } from '@/app/lib/queries/JSON/seed'

;(async () => {
    const db = drizzle(process.env.DB_FILE_NAME!)

    await db.delete(postsTable)

    const posts: (typeof postsTable.$inferInsert)[] = (await getAllJSONPosts())
        .sort(
            (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
        )
        .map((post) => ({
            id: post.id,
            title: post.title,
            excerpt: post.excerpt,
            coverImageSlug: post.coverImageSlug,
            createdAt: post.createdAt,
            slug: post.slug,
            author: post.author,
            published: post.published,
            updatedAt: post.updatedAt,
            content: post.content,
        }))

    await db.insert(postsTable).values(posts)

    console.log('...', posts)
})()
