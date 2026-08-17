'use server'

import { revalidatePath } from 'next/cache'
import { PostsDatabaseAPI } from '@/repositories/post/drizzle-post-repository'

export async function deletePost(id: string) {
    if (!id || typeof id !== 'string') {
        throw new Error('Post ID is required')
    }
    await PostsDatabaseAPI.deletePost(id)

    revalidatePath('/admin/posts')

    return { error: null }
}
