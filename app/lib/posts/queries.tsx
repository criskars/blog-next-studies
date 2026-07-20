import { cache } from 'react'
import { PostsAPI } from '@/repositories/post/json-post-repository'

export const getAllPosts = cache(async () => {
    return (await PostsAPI.findAll()).filter((post) => post.published)
})
