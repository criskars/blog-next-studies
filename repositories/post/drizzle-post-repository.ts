import { PostRepository } from '../post-repository'
import { PostModel } from '@/models/post/post-model'
import { drizzle } from 'drizzle-orm/libsql'
import { postsTable } from '@/db/schema'
import { eq, and } from 'drizzle-orm'

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
}

export const PostsDatabaseAPI: PostRepository = new DrizzlePostRepository()
