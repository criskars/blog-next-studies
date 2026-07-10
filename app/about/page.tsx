import { Suspense } from 'react'
import { SpinLoader } from '@/app/components/SpinLoader/SpinLoader'
import PostsList from '@/app/components/PostsList/PostsList'
import AboutClient from './AboutClient'
import { Container } from '../components/Container/Container'

export default function About() {
    return (
        <Container>
            <AboutClient>
                <Suspense fallback={<SpinLoader />}>
                    <PostsList />
                </Suspense>
            </AboutClient>
        </Container>
    )
}
