import { Metadata } from 'next'
import PostsListAdmin from '@/app/components/admin/PostsListAdmin/PostsListAdmin'
import { Container } from '@/app/components/shared/Container/Container'
import { SpinLoader } from '@/app/components/shared/SpinLoader/SpinLoader'
import { Suspense } from 'react'

export const metadata: Metadata = {
    title: 'Admin Posts',
    description: 'Admin posts list',
}

export default async function AdminPostList() {
    return (
        <Container>
            <Suspense fallback={<SpinLoader />}>
                <PostsListAdmin />
            </Suspense>
        </Container>
    )
}
