import { PostsAPI } from '@/repositories/post/json-post-repository'

async function PostsList() {
    const posts = await PostsAPI.findAll()
    return (
        <ul>
            {posts.map((post) => (
                <li key={post.id}>
                    {post.id} - {post.title}
                </li>
            ))}
        </ul>
    )
}

export default PostsList
