import { PostModel } from "@/models/post/post-model"

export interface PostRepository {
    findAll(): Promise<PostModel[]>
    findBySlug(slug: string): Promise<PostModel>
}