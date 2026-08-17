import { Metadata } from 'next'
import PostsListAdmin from '@/app/components/admin/PostsListAdmin/PostsListAdmin'
import { Container } from '@/app/components/shared/Container/Container'
import { SpinLoader } from '@/app/components/shared/SpinLoader/SpinLoader'
import { Suspense } from 'react'
import { AdminToast } from '@/app/components/admin/AdminToast/AdminToast'
import { AdminRefresh } from '@/app/components/admin/AdminRefresh/AdminRefresh'

export const revalidate = 0
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
    title: 'Admin Posts',
    description: 'Admin posts list',
}

export default async function AdminPostList() {
    return (
        <AdminToast>
            <Container>
                <AdminRefresh />
                <Suspense fallback={<SpinLoader />}>
                    <PostsListAdmin />
                </Suspense>
            </Container>
        </AdminToast>
    )
}
