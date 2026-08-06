import { PostImage } from '../PostImage/PostImage'
import { PostSummary } from '../PostSummary/PostSummary'
import { getAllPostsPublic } from '@/app/lib/queries/database/public'

type PostListItems = {
    id: string
    title: string
    excerpt: string
    src: string
    createdAt: string
    slug: string
    author: string
}

async function PostsList() {
    // Fetch all posts, sort them by creation date, and exclude the most recent one - also map the posts to the PostListItems type, to avoid passing unnecessary data to the PostSummary and PostImage components. DO NOT PASS THE ENTIRE POST OBJECT TO THE COMPONENTS, ONLY PASS THE NECESSARY DATA.
    const posts: PostListItems[] = (await getAllPostsPublic())
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
        <section className="grid grid-cols-2 gap-4 sm:grid-cols-2">
            {posts.map((post) => (
                <div key={post.id} className="group m-4 flex flex-col gap-4">
                    <PostImage
                        alt={post.title}
                        coverImageUrl={post.src}
                        width={1200}
                        height={720}
                        priority={false}
                        slug={post.slug}
                    />
                    <PostSummary post={post} as="h2" />
                </div>
            ))}
        </section>
    )
}

export default PostsList
