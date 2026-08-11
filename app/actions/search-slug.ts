'use server'

import { PostsDatabaseAPI } from '@/repositories/post/drizzle-post-repository'

export async function searchSlug(slug: string) {
    const post = await PostsDatabaseAPI.findBySlugPublic(slug)
    return post
}
