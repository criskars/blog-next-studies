import { PostModel } from '@/models/post/post-model'
import { PostRepository } from './post-repository'
import data from '@/db/seed/posts.json'

export class JsonPostRepository implements PostRepository {
    private async readFromJsonFile(): Promise<PostModel[]> {
        return data.posts as PostModel[]
    }
    private async simulateAPIResponseTime() {
        return new Promise((resolve) => setTimeout(resolve, 5000))
    }
    async findAll(): Promise<PostModel[]> {
        await this.simulateAPIResponseTime()
        return this.readFromJsonFile()
    }
    async findById(id: string): Promise<PostModel> {
        return this.readFromJsonFile().then((posts) => {
            const post = posts.find((post) => post.id === id)
            if (!post) {
                throw new Error(`Post with ID ${id} not found`)
            }
            return post
        })
    }
}

export const PostsAPI: PostRepository = new JsonPostRepository()
