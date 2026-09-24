'use server'

import { revalidatePath } from 'next/cache'
import { checkAuthentication } from '@/app/lib/login/manage-login'
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
    coverImageSlug: z
        .string()
        .trim()
        .min(10, 'Image slug too short')
        .max(300, 'slug too long'),
    slug: slugSchema,
    author: z
        .string()
        .trim()
        .min(2, 'Author too short')
        .max(80, 'Author too long'),
    published: z.boolean(),
})

type CreatePostActionState = {
    success: boolean
    message: string
    fieldErrors?: Record<string, string[] | undefined>
}

export async function createPost(
    title: string,
    content: string,
    excerpt: string,
    coverImageSlug: string,
    slug: string,
    author: string,
    published: boolean
): Promise<CreatePostActionState> {
    const isAuthenticated = await checkAuthentication()

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
        return {
            success: false,
            message: 'Error while creating post.',
            fieldErrors: z.flattenError(parsedData.error).fieldErrors,
        }
    }
    if (!isAuthenticated) {
        return {
            success: false,
            message: 'User not authenticated.',
            fieldErrors: {},
        }
    }
    try {
        await PostsDatabaseAPI.createPost(parsedData.data)
        revalidatePath('/admin/posts')
        return {
            success: true,
            message: 'Post created successfully.',
        }
    } catch {
        return {
            success: false,
            message: 'Error while creating post.',
            fieldErrors: {},
        }
    }
}
