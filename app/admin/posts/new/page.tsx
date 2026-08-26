import { AdminRefresh } from '@/app/components/admin/AdminRefresh/AdminRefresh'
import Container from '@/app/components/shared/Container/Container'
import Link from 'next/link'
import AdminForm from '@/app/components/admin/AdminForm/AdminForm'

export default async function AdminNewPost() {
    return (
        <Container>
            <div className='flex flex-col justify-end items-end w-full'>
            <AdminRefresh />
            <Link
                className="m-4 border border-white px-4 hover:bg-white hover:text-black"
                href="/admin/posts"
            >
                Back to posts
            </Link>
            <AdminForm />
            </div>
        </Container>
    )
}
