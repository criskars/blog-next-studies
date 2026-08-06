import { cache } from 'react'
import { PostsJSONAPI } from '@/repositories/post/json-post-repository'
import { notFound } from 'next/navigation'

export const getAllJSONPosts = cache(async () => {
    return (await PostsJSONAPI.findAll())
})

export const getAllJSONPostsPublic = cache(async () => {
    return (await PostsJSONAPI.findAllPublic())
})

export const getPostsBySlugJSONPublic = cache(async (slug: string) => {
    return (await PostsJSONAPI.findBySlugPublic(slug).catch(() => notFound()))
})