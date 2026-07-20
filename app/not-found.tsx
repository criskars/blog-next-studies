import { Container } from './components/Container/Container'

export const metadata = {
    title: '404 - Page Not Found',
    description: 'The page you are looking for does not exist.',
}

export default function NotFoundPage() {
    return (
        <Container>
            <h1 className="text-4xl font-bold text-zinc-950 dark:text-zinc-50">
                404 - Page Not Found
            </h1>
        </Container>
    )
}
