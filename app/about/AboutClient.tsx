'use client'

import { useState } from 'react'
import { PostsAPI } from '@/repositories/post/json-post-repository'
import { PostModel } from '@/models/post/post-model'

export default function AboutClient({
    children,
}: {
    children: React.ReactNode
}) {
    const [selectedPost, setSelectedPost] = useState<PostModel | null>(null)
    const [searchTerm, setSearchTerm] = useState('')

    async function handleSearch(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (!searchTerm.trim()) {
            setSelectedPost(null)
            return
        }

        const post = await PostsAPI.findById(searchTerm)
        setSelectedPost(post)
    }

    return (
        <>
            <form
                className="p-4 flex flex-col items-center justify-center"
                onSubmit={handleSearch}
            >
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mb-4 rounded border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
                <button
                    type="submit"
                    className="focus:ring-opacity-50 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                >
                    Search
                </button>
            </form>
            {selectedPost && (
                <h1 className="p-4 text-2xl font-bold">
                    {selectedPost.title}
                </h1>
            )}{' '}
            {selectedPost && <p className="p-4">{selectedPost.content}</p>}
            {children}
        </>
    )
}
