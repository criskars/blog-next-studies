import { Suspense } from 'react'
import { Container } from './components/Container/Container'
import { FeaturedPost } from './components/FeaturedPost/FeaturedPost'
import PostsList from './components/PostsList/PostsList'
import { SpinLoader } from './components/SpinLoader/SpinLoader'

export default function Home() {
    return (
        <Container>
            <Suspense fallback={<SpinLoader />}>
                <FeaturedPost></FeaturedPost>
                <PostsList></PostsList>
            </Suspense>
        </Container>
    )
}
