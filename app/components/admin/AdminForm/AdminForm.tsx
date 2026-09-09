'use client'

import { Form } from 'radix-ui'
import { Switch } from 'radix-ui'
import { useState } from 'react'
import { SafeMarkdownEditor } from '../MarkdownEditor/MarkdownEditor'
import { useAdminToast } from '@/app/components/admin/AdminToast/AdminToast'
import { uploadImage } from '@/app/actions/upload-image'
import { createPost } from '@/app/actions/create-post'
import { slugify } from '@/app/utils/slugify'

function AdminForm() {
    const { showToast } = useAdminToast()

    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

    function isInvalidSlug(value: string): boolean {
        return value === '' || !slugRegex.test(value)
    }

    const inputStyles =
        'selection:bg-blackA6 box-border inline-flex h-8 w-full appearance-none items-center justify-center bg-black p-2 text-[15px] leading-none text-white shadow-[0_0_0_1px] outline-none selection:bg-white selection:text-black focus:shadow-[0_0_0_2px]'

    const labelStyles =
        'text-[15px] leading-8 font-medium text-white group-focus-within:font-semibold'

    const [title, setTitle] = useState('')
    const [slug, setSlug] = useState('')
    const [slugManuallyEdited, setSlugManuallyEdited] = useState(false)

    function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const nextTitle = event.target.value
        setTitle(nextTitle)

        if (!slugManuallyEdited) {
            setSlug(slugify(nextTitle))
        }
    }

    function handleSlugChange(event: React.ChangeEvent<HTMLInputElement>) {
        setSlugManuallyEdited(true)
        setSlug(slugify(event.target.value))
    }

    const MAX_FILE_SIZE = 1 * 1024 * 1024

    const handleFileSize = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.currentTarget.files?.[0]

        if (!selectedFile) {
            return
        }

        if (selectedFile.size >= MAX_FILE_SIZE) {
            showToast('File is too large. Maximum allowed size is 1MB.')
            event.target.value = ''
            return
        }
    }

    const [content, setContent] = useState('')
    const [published, setPublished] = useState(false)

    const submitForm = async (event: React.SubmitEvent<HTMLFormElement>) => {
        const formData = new FormData(event.currentTarget)
        const data = Object.fromEntries(formData)
        console.log(data)

        event.preventDefault()
        try {
            const uploadResult = await uploadImage(formData)
            const pathname = new URL(uploadResult.url).pathname

            console.log('uploadResult', uploadResult)
            console.log(content)
            console.log(published)
            console.log('imageSlug', pathname)

            if (uploadResult.error || !uploadResult.url) {
                showToast(uploadResult.error || 'Error uploading image')
                return
            }

            const newPost = await createPost(
                data.postTitle as string,
                content,
                data.postExcerpt as string,
                pathname,
                data.postSlug as string,
                data.postAuthor as string,
                published
            )

            if (!newPost.success) {
                const errors = Object.values(newPost.fieldErrors ?? {})
                    .flat()
                    .filter(Boolean)
                    .join(', ')

                showToast(newPost.message + (errors ? `: ${errors}` : ''))
                console.log(newPost.fieldErrors)
                return
            }
            showToast(newPost.message)
        } catch (error) {
            showToast(
                'Error when trying to create post: ' + (error as Error).message
            )
        }
    }

    return (
        <Form.Root
            className="flex w-full flex-col gap-4 bg-black px-4 max-[610px]:w-full"
            onSubmit={submitForm}
        >
            <Form.Field className="group grid" name="postTitle">
                <div className="flex items-baseline justify-between">
                    <Form.Label className={labelStyles}>Post Title</Form.Label>
                    <Form.Message
                        className="text-[13px] text-white opacity-80"
                        match="valueMissing"
                    >
                        Please enter a post title
                    </Form.Message>
                </div>
                <Form.Control asChild>
                    <input
                        className={inputStyles}
                        type="text"
                        required
                        value={title}
                        onChange={handleTitleChange}
                    />
                </Form.Control>
            </Form.Field>
            <Form.Field className="group grid" name="postSlug">
                <div className="flex items-baseline justify-between">
                    <Form.Label className={labelStyles}>Slug</Form.Label>
                    <Form.Message
                        className="text-[13px] text-white opacity-80"
                        match={isInvalidSlug}
                    >
                        Please enter a valid slug, not containing spaces,
                        capital letters or special characters
                    </Form.Message>
                    <Form.Message
                        className="text-[13px] text-white opacity-80"
                        match="valueMissing"
                    >
                        Please enter a slug
                    </Form.Message>
                </div>
                <Form.Control asChild>
                    <input
                        className={inputStyles}
                        type="text"
                        required
                        value={slug}
                        onChange={handleSlugChange}
                    />
                </Form.Control>
            </Form.Field>
            <Form.Field className="group grid" name="postExcerpt">
                <div className="flex items-baseline justify-between">
                    <Form.Label className={labelStyles}>Excerpt</Form.Label>
                    <Form.Message
                        className="text-[13px] text-white opacity-80"
                        match="valueMissing"
                    >
                        Please enter a post excerpt
                    </Form.Message>
                </div>
                <Form.Control asChild>
                    <input className={inputStyles} type="text" required />
                </Form.Control>
            </Form.Field>
            <Form.Field className="group grid" name="postCoverImage">
                <div className="flex items-baseline justify-between">
                    <Form.Label className={labelStyles}>Cover image</Form.Label>
                    <Form.Message
                        className="text-[13px] text-white opacity-80"
                        match="valueMissing"
                    >
                        Please enter a cover image
                    </Form.Message>
                </div>
                <Form.Control asChild>
                    <input
                        className="inline-flex items-center justify-center bg-black py-2 text-[15px] leading-none text-white outline-none file:mr-4 file:h-8 file:border file:px-2 focus:shadow-[0_0_0_2px]"
                        type="file"
                        required
                        accept=".jpg, .png"
                        onChange={handleFileSize}
                    ></input>
                </Form.Control>
            </Form.Field>
            <Form.Field className="group grid" name="postAuthor">
                <div className="flex items-baseline justify-between">
                    <Form.Label className={labelStyles}>Author</Form.Label>
                    <Form.Message
                        className="text-[13px] text-white opacity-80"
                        match="valueMissing"
                    >
                        Please enter an author
                    </Form.Message>
                </div>
                <Form.Control asChild>
                    <input className={inputStyles} type="text" required />
                </Form.Control>
            </Form.Field>
            <Form.Field className="group grid" name="content">
                <div className="flex items-baseline justify-between">
                    <Form.Label className={labelStyles}>Content</Form.Label>
                    <Form.Message
                        className="text-[13px] text-white opacity-80"
                        match="valueMissing"
                    >
                        Add your content
                    </Form.Message>
                </div>
                <Form.Control asChild>
                    <SafeMarkdownEditor
                        rawMdxString={content}
                        onValueChange={setContent}
                    />
                </Form.Control>
            </Form.Field>
            <Form.Field className="group grid pb-2" name="published">
                <div className="flex items-baseline justify-between">
                    <Form.Label className={labelStyles}>Published</Form.Label>
                </div>
                <Form.Control asChild>
                    <Switch.Root
                        className="relative h-6.25 w-11 cursor-default rounded-full border border-white bg-black outline-none data-[state=checked]:bg-green-500"
                        id="published"
                        style={{
                            WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
                        }}
                        checked={published}
                        onCheckedChange={setPublished}
                    >
                        <Switch.Thumb
                            id="published"
                            aria-labelledby="published-label"
                            className="translate-x-0.2 block size-5.75 rounded-full bg-white transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-4.75"
                        />
                    </Switch.Root>
                </Form.Control>
            </Form.Field>
            <Form.Submit asChild>
                <button className="box-border inline-flex h-8 w-full items-center justify-center bg-white leading-none font-medium text-black hover:border hover:border-white hover:bg-black hover:text-white focus:bg-black focus:text-white focus:shadow-[0_0_0_2px]">
                    Create post
                </button>
            </Form.Submit>
        </Form.Root>
    )
}

export default AdminForm
