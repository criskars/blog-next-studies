import Container from '@/app/components/shared/Container/Container'
import { AdminRefresh } from '@/app/components/admin/AdminRefresh/AdminRefresh'
import Link from 'next/link'
import AdminForm from '@/app/components/admin/AdminForm/AdminForm'
import { AdminToast } from '@/app/components/admin/AdminToast/AdminToast'

type Props = {
    params: Promise<{ id: string }>
}

export default async function AdminPostDetails({ params }: Props) {
    const { id } = await params

    return (
        <Container>
            <AdminRefresh />
            <p className="px-4 text-lg font-semibold">
                Admin Post Details for ID: {id}
            </p>
            <AdminToast>
                            <div className="flex w-full max-w-357.5 flex-col items-end justify-end p-4">
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
