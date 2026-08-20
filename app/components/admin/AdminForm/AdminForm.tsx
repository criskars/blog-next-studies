'use client'

import { Form } from 'radix-ui'
import { useState } from 'react'
import { SafeMarkdownEditor } from '../../public/MarkdownEditor/MarkdownEditor'

function slugify(value: string) {
    return value
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '-')
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '-')
        .replace(/\s/g, '-')
        .replace(/-/g, '-')
}

function AdminForm() {
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

    return (
        <Form.Root className="flex w-150 flex-col gap-4 bg-black p-4">
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
                    <input className={inputStyles} type="file" required />
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
            <Form.Field className="group grid" name="question">
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
                    <SafeMarkdownEditor rawMdxString="" />
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
