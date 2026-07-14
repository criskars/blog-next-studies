import { PostsAPI } from '@/repositories/post/json-post-repository'
import { PostImage } from '../PostImage/PostImage'
import { PostContent } from '../PostContent/PostContent'

async function PostsList() {

    const posts = (await PostsAPI.findAll()).sort(
        (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    ).slice(1)

    return (
        <section className="grid grid-cols-2 gap-4 sm:grid-cols-2">
            {posts.map((post) => (
                <div key={post.id} className="group m-4 flex flex-col gap-4">
                    <PostImage
                        alt={post.title}
                        src={post.coverImageUrl}
                        width={1200}
                        height={720}
                        priority={false}
                    />
                    <PostContent post={post} as="h2" />
                </div>
            ))}
        </section>
    )
}

export default PostsList
