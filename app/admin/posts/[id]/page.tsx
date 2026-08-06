type Props = {
    params: Promise<{ id: string }>
}

export default async function AdminPostDetails({ params }: Props) {
    const { id } = await params;

    return (<div>Admin Post Details for ID: {id}</div>)
}
