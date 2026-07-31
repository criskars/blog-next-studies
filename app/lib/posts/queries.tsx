import { cache } from 'react'
import { PostsJSONAPI } from '@/repositories/post/json-post-repository'
import { notFound } from 'next/navigation'
import { PostsAPI } from '@/repositories/post/drizzle-post.-repository'

export const getAllJSONPosts = cache(async () => {
    return (await PostsJSONAPI.findAll())
})

export const getAllJSONPostsPublic = cache(async () => {
    return (await PostsJSONAPI.findAllPublic())
})

export const getPostsBySlugJSONPublic = cache(async (slug: string) => {
    return (await PostsJSONAPI.findBySlugPublic(slug).catch(() => notFound()))
})

export const getAllPosts = cache(async () => {
    return (await PostsAPI.findAll())
})

export const getAllPostsPublic = cache(async () => {
    return (await PostsAPI.findAllPublic())
})

export const getPostsBySlugPublic = cache(async (slug: string) => {
    return (await PostsAPI.findBySlugPublic(slug).catch(() => notFound()))
})