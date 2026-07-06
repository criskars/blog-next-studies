import { PostModel } from '@/models/post/post-model'
import { PostRepository } from './post-repository'
import data from '@/db/seed/posts.json'

export class JsonPostRepository implements PostRepository {
    private async readFromJsonFile(): Promise<PostModel[]> {
        return data.posts as PostModel[]
    }
    findAll(): Promise<PostModel[]> {
        return this.readFromJsonFile()
    }
}

export const jsonPostRepository = new JsonPostRepository()
