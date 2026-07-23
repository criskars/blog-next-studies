import { Container } from '@/app/components/Container/Container'
import { getPostsBySlug } from '@/app/lib/posts/queries'
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
    const postData = await getPostsBySlug(slug)

    return {
        title: postData.title,
        description: postData.excerpt,
    }
}

export default async function PostPage({ params }: Props) {
    const { slug } = await params

    const postData = await getPostsBySlug(slug)

    return (
        <Container>
            <article className="group m-4 flex flex-col gap-4">
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
                <section className="prose max-w-none dark:prose-invert">
                    <SafeMarkdown
                        rawMdxString={postData.content}
                    ></SafeMarkdown>
                </section>
            </article>
        </Container>
    )
}
