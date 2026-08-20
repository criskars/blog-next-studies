import Container from '@/app/components/shared/Container/Container'
import { AdminRefresh } from '@/app/components/admin/AdminRefresh/AdminRefresh'

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
        </Container>
    )
}
