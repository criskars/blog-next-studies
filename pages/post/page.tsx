import { Container } from '@/app/components/Container/Container'

export async function PostPage(params: { slug: string }) {
    const { slug } = params

    return (
        <Container>
            <h1 className="text-4xl font-bold text-zinc-950 dark:text-zinc-50">
                Post Page - {slug}
            </h1>
        </Container>
    )
}
