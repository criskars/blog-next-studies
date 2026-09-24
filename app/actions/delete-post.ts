'use server'

import { revalidatePath } from 'next/cache'
import { PostsDatabaseAPI } from '@/repositories/post/drizzle-post-repository'
import { checkAuthentication } from '../lib/login/manage-login'

export async function deletePost(id: string) {
    const isAuthenticated = await checkAuthentication()

    if (!isAuthenticated) {
        return {
            success: false,
            message: 'User not authenticated.',
            fieldErrors: {},
        }
    }
    if (!id || typeof id !== 'string') {
        throw new Error('Post ID is required')
    }
    await PostsDatabaseAPI.deletePost(id)

    revalidatePath('/admin/posts')

    return { error: null }
}
