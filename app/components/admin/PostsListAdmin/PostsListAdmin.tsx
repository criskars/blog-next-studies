import { getAllPosts } from '@/app/lib/queries/database/admin'
import Link from 'next/link'

type PostListItems = {
    id: string
    title: string
    excerpt: string
    src: string
    createdAt: string
    slug: string
    author: string
}

async function PostsListAdmin() {
    // Fetch all posts, sort them by creation date, and exclude the most recent one - also map the posts to the PostListItems type, to avoid passing unnecessary data to the PostSummary and PostImage components. DO NOT PASS THE ENTIRE POST OBJECT TO THE COMPONENTS, ONLY PASS THE NECESSARY DATA.
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
        }))

    return (
        <section>
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
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post) => (
                        <tr className="hover:bg-gray-100 hover:text-black" key={post.id}>
                            <td className="border border-gray-300 px-4 py-2">
                                {post.id}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                <Link href={`/admin/posts/${post.id}`}>{post.title}</Link>
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {post.author}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
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
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    )
}

export default PostsListAdmin
