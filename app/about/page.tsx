import { jsonPostRepository } from "@/repositories/post/json-post-repository";

export default function About() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      {jsonPostRepository.findAll().then((posts) => {
        return (
          <ul>
            {posts.map((post) => (
              <li key={post.id}>{post.title}</li>
            ))}
          </ul>
        )
      })}
    </div>
  );
}
