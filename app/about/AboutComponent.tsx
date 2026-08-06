'use client'

import { useState } from 'react'
import { PostModel } from '@/models/post/post-model'
import { searchSlug } from '../actions/search-slug'

export default function AboutComponent() {
    const [selectedPost, setSelectedPost] = useState<PostModel | null>(null)
    const [searchTerm, setSearchTerm] = useState('')

    async function handleSearch(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault()

        if (!searchTerm.trim()) {
            setSelectedPost(null)
            return
        }
        const post = await searchSlug(searchTerm)

        setSelectedPost(post)
    }

    return (
        <>
            <form
                className="flex flex-col items-center justify-center p-4"
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
                <div className="p-4">
                    <h2 className="text-2xl font-bold">{selectedPost.title}</h2>
                    <p className="mt-2">{selectedPost.excerpt}</p>
                    <p className="mt-2 text-sm text-gray-500">
                        {new Date(selectedPost.createdAt).toLocaleDateString(
                            'pt-BR',
                            {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric',
                            }
                        )}
                    </p>
                </div>
            )}
        </>
    )
}
