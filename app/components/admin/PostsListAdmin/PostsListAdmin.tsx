import { getAllPosts } from '@/app/lib/queries/database/admin'
import AdminDropdownMenu from '../AdminDropdownMenu/AdminDropdownMenu'

type PostListItems = {
    id: string
    title: string
    excerpt: string
    src: string
    createdAt: string
    slug: string
    author: string
    published: boolean
}

async function PostsListAdmin() {
    const posts: PostListItems[] = (await getAllPosts())
        .sort(
            (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
        )
        .slice(1)
        .map((post) => ({
            id: post.id,
            title: post.title,
            excerpt: post.excerpt,
            src: post.coverImageUrl,
            createdAt: post.createdAt,
            slug: post.slug,
            author: post.author,
            published: post.published,
        }))

    return (
        <section className="max-w-8xl flex w-full items-center justify-center overflow-x-auto px-4 max-md:justify-around">
            <table>
                <thead>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2 text-left">
                            ID
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left">
                            Title
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left">
                            Author
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left">
                            Created At
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left">
                            Published
                        </th>
                        <th className="border border-gray-300 px-4 py-2 text-left">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post) => (
                        <tr key={post.id}>
                            <td className="border-y p-4">{post.id}</td>
                            <td className="border-y p-4">{post.title}</td>
                            <td className="border-y p-4">{post.author}</td>
                            <td className="border-y p-4">
                                {new Date(post.createdAt).toLocaleDateString(
                                    'pt-BR',
                                    {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    }
                                )}
                            </td>
                            <td className="border-y p-4">
                                {post.published ? 'Published' : 'Draft'}
                            </td>
                            <td className="border-y p-4 text-center">
                                <AdminDropdownMenu id={post.id} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )
}

export default PostsListAdmin
