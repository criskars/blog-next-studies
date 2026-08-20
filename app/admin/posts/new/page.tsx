import { AdminRefresh } from '@/app/components/admin/AdminRefresh/AdminRefresh'
import Container from '@/app/components/shared/Container/Container'
import Link from 'next/link'
import AdminForm from '@/app/components/admin/AdminForm/AdminForm'

export default async function AdminNewPost() {
    return (
        <Container>
            <AdminRefresh />
            <Link className="mb-4" href="/admin/posts">
                Back to posts
            </Link>
            <AdminForm />
        </Container>
    )
}
