import { cache } from 'react'
import { PostsDatabaseAPI } from '@/repositories/post/drizzle-post-repository'

export const getAllPosts = cache(async () => {
    return (await PostsDatabaseAPI.findAll())
})

export const deletePost = cache(async (id: string) => {
    await PostsDatabaseAPI.deletePost(id)
})