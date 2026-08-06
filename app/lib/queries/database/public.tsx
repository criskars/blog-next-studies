import { cache } from 'react'
import { notFound } from 'next/navigation'
import { PostsDatabaseAPI } from '@/repositories/post/drizzle-post-repository'

export const getAllPostsPublic = cache(async () => {
    return (await PostsDatabaseAPI.findAllPublic())
})

export const getPostsBySlugPublic = cache(async (slug: string) => {
    return (await PostsDatabaseAPI.findBySlugPublic(slug).catch(() => notFound()))
})