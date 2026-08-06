import { PostSummary } from '../PostSummary/PostSummary'
import { PostImage } from '../PostImage/PostImage'
import { getAllPostsPublic } from '@/app/lib/queries/database/public'

type PostListItem = {
    title: string
    createdAt: string
    slug: string
    excerpt: string
    coverImageUrl: string
    author: string
}

export async function FeaturedPost() {
    const post = (await getAllPostsPublic()).sort(
        (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )[0]

    if (!post) {
        return null
    }

    const recentPost: PostListItem = {
        title: post.title,
        createdAt: post.createdAt,
        slug: post.slug,
        excerpt: post.excerpt,
        coverImageUrl: post.coverImageUrl,
        author: post.author,
    }

    return (
        <section className="group m-4 grid grid-cols-1 gap-8 sm:grid-cols-2">
            <PostImage
                alt={recentPost.title}
                slug={recentPost.slug}
                coverImageUrl={recentPost.coverImageUrl}
                width={1200}
                height={720}
                priority={true}
            />
            <PostSummary post={recentPost} as="h1" />
        </section>
    )
}

export default FeaturedPost
