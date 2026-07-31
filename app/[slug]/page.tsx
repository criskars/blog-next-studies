import { Container } from '@/app/components/Container/Container'
import { getPostsBySlugPublic } from '@/app/lib/posts/queries'
import { Metadata } from 'next'
import PostImage from '../components/PostImage/PostImage'
import { PostSummary } from '../components/PostSummary/PostSummary'
import SafeMarkdown from '../components/SafeMarkdown/SafeMarkdown'

type Props = {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    // read route params
    const { slug } = await params

    // fetch data
    const postData = await getPostsBySlugPublic(slug)

    return {
        title: postData.title,
        description: postData.excerpt,
    }
}

export default async function PostPage({ params }: Props) {
    const { slug } = await params

    const postData = await getPostsBySlugPublic(slug)

    return (
        <Container>
            <article className="group p-4 flex min-w-0 flex-col gap-4 w-full">
                <PostImage
                    alt={postData.title}
                    coverImageUrl={postData.coverImageUrl}
                    width={1200}
                    height={720}
                    priority={false}
                    slug={postData.slug}
                />
                <PostSummary post={postData} as="h2" />
                <hr></hr>
                <section className="prose dark:prose-invert prose-a:transition prose-img:mx-auto prose-img:max-w-full prose-pre:max-w-full prose-pre:overflow-x-auto prose-table:block prose-table:overflow-x-auto prose-table:w-full max-w-none min-w-0 overflow-x-hidden break-words">
                    <SafeMarkdown
                        rawMdxString={postData.content}
                    ></SafeMarkdown>
                </section>
            </article>
        </Container>
    )
}
