'use server'

import { revalidatePath } from 'next/cache'
import { PostsDatabaseAPI } from '@/repositories/post/drizzle-post-repository'

export async function createPost(
    title: string,
    content: string,
    excerpt: string,
    coverImageUrl: string,
    slug: string,
    author: string,
    published: boolean
) {
    revalidatePath('/admin/posts')
    return await PostsDatabaseAPI.createPost(
        title,
        content,
        excerpt,
        coverImageUrl,
        slug,
        author,
        published
    )
}
