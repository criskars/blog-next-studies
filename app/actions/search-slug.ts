'use server'

import { PostsDatabaseAPI } from '@/repositories/post/drizzle-post-repository'

export async function searchSlug(slug: string): Promise<{
    id: string
    title: string
    slug: string
    excerpt: string
    imageSlug: string
    author: string
    content: string
    published: boolean
}> {
    const post = await PostsDatabaseAPI.findBySlugPublic(slug)
    console.log('Post found:', post)
    return {
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        imageSlug: post.coverImageSlug,
        author: post.author,
        content: post.content,
        published: post.published
    }
}
