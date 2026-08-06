'use server'

import { PostsAPI } from '@/repositories/post/drizzle-post-repository'

export async function searchSlug(slug: string) {
    const post = await PostsAPI.findBySlugPublic(slug)
    return post
}