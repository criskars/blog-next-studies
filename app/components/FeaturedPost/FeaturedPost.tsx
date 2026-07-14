import { PostContent } from '../PostContent/PostContent'
import { PostImage } from '../PostImage/PostImage'
import { PostsAPI } from '@/repositories/post/json-post-repository'

export async function FeaturedPost() {
    const posts = await PostsAPI.findAll()

    const recentPost = posts.sort(
        (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )[0]

    return (
        <section className="group m-4 grid grid-cols-1 gap-8 sm:grid-cols-2">
            <PostImage
                alt={recentPost.title}
                src={recentPost.coverImageUrl}
                width={1200}
                height={720}
                priority={true}
            />
            <PostContent post={recentPost} as="h1" />
        </section>
    )
}

export default FeaturedPost
