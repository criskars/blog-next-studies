'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { PostsDatabaseAPI } from '@/repositories/post/drizzle-post-repository'
import { z } from 'zod'
import { slugify } from '@/app/utils/slugify'

const slugSchema = z
    .string()
    .trim()
    .transform((value) => slugify(value))
    .pipe(
        z
            .string()
            .min(1, 'Field is required')
            .max(120, 'Slug too long')
            .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Invalid slug format')
    )

const CreatePostSchema = z.object({
    title: z.string().trim().min(3, 'Short title.').max(120, 'Title too long'),
    content: z
        .string()
        .trim()
        .min(10, 'Content too short')
        .max(100000, 'Content too long'),
    excerpt: z
        .string()
        .trim()
        .min(10, 'Excerpt too short')
        .max(300, 'Excerpt too long'),
    coverImageSlug: slugSchema,
    slug: slugSchema,
    author: z
        .string()
        .trim()
        .min(2, 'Author too short')
        .max(80, 'Author too long'),
    published: z.boolean(),
})

export async function createPost(
    title: string,
    content: string,
    excerpt: string,
    coverImageSlug: string,
    slug: string,
    author: string,
    published: boolean
) {
    const parsedData = CreatePostSchema.safeParse({
        title,
        content,
        excerpt,
        coverImageSlug,
        slug,
        author,
        published,
    })
    if (!parsedData.success) {
        return z.flattenError(parsedData.error).fieldErrors
    }

    try {
        await PostsDatabaseAPI.createPost(parsedData.data)
        revalidatePath('/admin/posts')
    } catch (error) {
        throw new Error('Failed to create post', { cause: error })
    }

    redirect('/admin/posts')
}
