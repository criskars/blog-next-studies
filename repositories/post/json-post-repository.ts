import { PostModel } from '@/models/post/post-model'
import { JSONPostRepository } from '../post-repository'
import data from '@/db/seed/posts.json'

export class JsonPostRepository implements JSONPostRepository {
    private async readFromJsonFile(): Promise<PostModel[]> {
        return data.posts as PostModel[]
    }
    async findAll(): Promise<PostModel[]> {
        return await this.readFromJsonFile()
    }
    async findAllPublic(): Promise<PostModel[]> {
        return (await this.readFromJsonFile()).filter((post) => post.published)
    }
    async findBySlugPublic(slug: string): Promise<PostModel> {
        return await this.readFromJsonFile().then((posts) => {
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

export const PostsJSONAPI: JSONPostRepository = new JsonPostRepository()
