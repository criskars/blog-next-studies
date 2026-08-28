import { AdminRefresh } from '@/app/components/admin/AdminRefresh/AdminRefresh'
import Container from '@/app/components/shared/Container/Container'
import Link from 'next/link'
import AdminForm from '@/app/components/admin/AdminForm/AdminForm'
import { AdminToast } from '@/app/components/admin/AdminToast/AdminToast'

export default async function AdminNewPost() {
    return (
        <Container>
            <AdminToast>
                <div className="flex w-full max-w-357.5 flex-col items-end justify-end p-4 hover:bg-white hover:text-black">
                    <AdminRefresh />
                    <Link
                        className="m-4 border border-white px-4 hover:bg-white hover:text-black"
                        href="/admin/posts"
                    >
                        Back to posts
                    </Link>
                    <AdminForm />
                </div>
            </AdminToast>
        </Container>
    )
}
