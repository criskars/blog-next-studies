import { PostRepository } from './post-repository'
import { PostModel } from '@/models/post/post-model'
import { drizzle } from 'drizzle-orm/libsql'
import { postsTable } from '@/db/schema'
import { eq } from 'drizzle-orm'

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

        const posts = await db.select().from(postsTable).where(eq(postsTable.published, true))

        return posts as PostModel[]
    }
    async findBySlugPublic(slug: string): Promise<PostModel> {
        return await this.readFromDB().then((posts) => {
            const post = posts.find(
                (post) => post.slug === slug && post.published === true
            )
            if (!post) {
                throw new Error(`Post with slug ${slug} not found`)
            }
            return post
        })
    }
}

export const PostsAPI: PostRepository = new DrizzlePostRepository()
