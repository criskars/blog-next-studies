import { Metadata } from 'next'
import PostsListAdmin from '@/app/components/admin/PostsListAdmin/PostsListAdmin'
import { Container } from '@/app/components/shared/Container/Container'
import { SpinLoader } from '@/app/components/shared/SpinLoader/SpinLoader'
import { Suspense } from 'react'
import { Toast } from 'radix-ui'
import { AdminToast } from '@/app/components/admin/AdminToast/AdminToast'

export const metadata: Metadata = {
    title: 'Admin Posts',
    description: 'Admin posts list',
}

export default async function AdminPostList() {
    return (
        <AdminToast>
            <Container>
                <Suspense fallback={<SpinLoader />}>
                    <PostsListAdmin />
                </Suspense>
            </Container>
        </AdminToast>
    )
}
