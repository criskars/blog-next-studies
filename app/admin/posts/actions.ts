'use server'

import { postsTable } from '@/db/schema'
import { revalidatePath } from 'next/cache'
import { drizzle } from 'drizzle-orm/libsql'
import { eq } from 'drizzle-orm'

export async function deletePost(id: string) {

    const db = drizzle(process.env.DB_FILE_NAME!)

    await db
        .delete(postsTable)
        .where(eq(postsTable.id, id))

    revalidatePath('/admin/posts')
}
