import { cache } from 'react'
import { PostsAPI } from '@/repositories/post/json-post-repository'
import { notFound } from 'next/navigation'

export const getAllPosts = cache(async () => {
    return (await PostsAPI.findAll()).filter((post) => post.published)
})

export const getPostsBySlug = cache(async (slug: string) => {
    return (await PostsAPI.findBySlug(slug).catch(() => notFound()))
})