import { PostModel } from '@/models/post/post-model'

export interface PostRepository {
    findAll(): Promise<PostModel[]>
    findAllPublic(): Promise<PostModel[]>
    findBySlugPublic(slug: string): Promise<PostModel>
    deletePost(id: string): Promise<void>
    createPost(
        title: string,
        content: string,
        excerpt: string,
        coverImageUrl: string,
        slug: string,
        author: string,
        published: boolean
    ): Promise<PostModel>
}
