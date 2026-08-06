import { Container } from './components/shared/Container/Container'
import { NotFoundContent } from './components/shared/NotFoundContent/NotFoundContent'

export const metadata = {
    title: '404 - page not found',
    description: 'The page you are looking for does not exist.',
}

export default function NotFoundPage() {
    return (
        <Container>
            <NotFoundContent />
        </Container>
    )
}
