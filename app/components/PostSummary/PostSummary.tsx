import { clsx } from 'clsx'
import Link from 'next/link'

type PostSummaryProps = {
    post: {
        title: string
        excerpt: string
        createdAt: string
        slug: string
    }
    as: 'h1' | 'h2'
}

export function PostSummary({
    post,
    as: Heading = 'h2',
}: PostSummaryProps) {
const headingTagClasses = Heading === 'h1' ? 'text-3xl/tight font-extrabold sm:text-5xl' : 'text-1xl/tight font-extrabold sm:text-3xl'

    return (
        <div className="flex flex-col gap-4 sm:justify-center">
            <time
                className="block text-sm/tight text-slate-400"
                dateTime={post.createdAt}
            >
                {new Date(post.createdAt).toLocaleDateString('pt-BR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                })}
            </time>

            <Heading className={clsx(headingTagClasses, "hover:text-slate-300 transition")}>
                <Link href={post.slug}>{post.title}</Link>
            </Heading>

            <p>{post.excerpt}</p>
        </div>
    )
}
