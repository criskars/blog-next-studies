import { Container } from '@/app/components/Container/Container'
import { getPostsBySlug } from '@/app/lib/posts/queries'
import { Metadata } from 'next'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(
    { params }: Props
): Promise<Metadata> {
    // read route params
    const { slug } = await params

    // fetch data
    const postData = await getPostsBySlug(slug)

    return {
        title: postData.title,
        description: postData.excerpt
    }
}

export default async function PostPage({
    params,
}: Props) {
    const { slug } = await params

    const postData = await getPostsBySlug(slug)

    return (
        <Container>
            <h1 className="text-4xl font-bold text-zinc-950 dark:text-zinc-50">
                Post Page - {postData.title}
            </h1>
        </Container>
    )
}
