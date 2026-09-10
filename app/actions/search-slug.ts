'use server'

import { PostsDatabaseAPI } from '@/repositories/post/drizzle-post-repository'

export async function searchSlug(slug: string): Promise<{
    id: string
    title: string
    slug: string
    excerpt: string
    content: string
}> {
    const post = await PostsDatabaseAPI.findBySlugPublic(slug)
    return {
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content
    }
}
