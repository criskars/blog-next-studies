import { PostModel } from '@/models/post/post-model'

export interface PostRepository {
    findAll(): Promise<PostModel[]>
    findAllPublic(): Promise<PostModel[]>
    findBySlugPublic(slug: string): Promise<PostModel>
    deletePost(id: string): Promise<void>
    createPost(data: {
        title: string
        content: string
        excerpt: string
        coverImageSlug: string
        slug: string
    }): Promise<PostModel>
}
