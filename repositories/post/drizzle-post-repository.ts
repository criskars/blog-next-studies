import { PostRepository } from '../post-repository'
import { PostModel } from '@/models/post/post-model'
import { drizzle } from 'drizzle-orm/libsql'
import { postsTable } from '@/db/schema'
import { eq, and, or } from 'drizzle-orm'

export class DrizzlePostRepository implements PostRepository {
    private async readFromDB(): Promise<PostModel[]> {
        const db = drizzle(process.env.DB_FILE_NAME!)

        const posts = await db.select().from(postsTable)

        return posts as PostModel[]
    }
    async findAll(): Promise<PostModel[]> {
        return await this.readFromDB()
    }
    async findAllPublic(): Promise<PostModel[]> {
        const db = drizzle(process.env.DB_FILE_NAME!)

        const posts = await db
            .select()
            .from(postsTable)
            .where(eq(postsTable.published, true))

        return posts as PostModel[]
    }
    async findBySlugPublic(slug: string): Promise<PostModel> {
        const db = drizzle(process.env.DB_FILE_NAME!)

        const post = await db
            .select()
            .from(postsTable)
            .where(
                and(eq(postsTable.published, true), eq(postsTable.slug, slug))
            )

        return post[0] as PostModel
    }

    async deletePost(id: string): Promise<void> {
        const db = drizzle(process.env.DB_FILE_NAME!)
        await db.delete(postsTable).where(eq(postsTable.id, id))
    }

    async createPost(data: {
        title: string
        content: string
        excerpt: string
        coverImageSlug: string
        slug: string
        author: string
        published: boolean
    }): Promise<PostModel> {
        const postData = {
            id: crypto.randomUUID(),
            title: data.title,
            excerpt: data.excerpt,
            coverImageSlug: data.coverImageSlug,
            createdAt: new Date().toISOString(),
            slug: data.slug,
            author: data.author,
            published: data.published,
            updatedAt: new Date().toISOString(),
            content: data.content,
        }

        const db = drizzle(process.env.DB_FILE_NAME!)
        const existingPost = await db
            .select()
            .from(postsTable)
            .where(
                or(
                    eq(postsTable.slug, postData.slug),
                    eq(postsTable.id, postData.id)
                )
            )
        if (existingPost.length > 0) {
            throw new Error('Post with this slug or ID already exists')
        }
        const [newPost] = await db
            .insert(postsTable)
            .values(postData)
            .returning()
        return newPost as PostModel
    }
}

export const PostsDatabaseAPI: PostRepository = new DrizzlePostRepository()
