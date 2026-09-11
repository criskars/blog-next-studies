'use server'

import { PostsDatabaseAPI } from '@/repositories/post/drizzle-post-repository'

export async function searchSlug(slug: string): Promise<{
    id: string
    title: string
    slug: string
    excerpt: string
    author: string
    content: string
    published: boolean
}> {
    const post = await PostsDatabaseAPI.findBySlugPublic(slug)
    return {
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        author: post.author,
        content: post.content,
        published: post.published
    }
}
