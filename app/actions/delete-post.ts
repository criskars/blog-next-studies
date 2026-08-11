'use server'

import { revalidatePath } from 'next/cache'
import { PostsDatabaseAPI } from '@/repositories/post/drizzle-post-repository'

export async function deletePost(id: string) {
    await PostsDatabaseAPI.deletePost(id)

    revalidatePath('/admin/posts')
}
