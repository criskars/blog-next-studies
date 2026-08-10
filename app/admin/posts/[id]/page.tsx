import Container from "@/app/components/shared/Container/Container";

type Props = {
    params: Promise<{ id: string }>
}

export default async function AdminPostDetails({ params }: Props) {
    const { id } = await params;

    return (<Container><p className="text-lg font-semibold px-4">Admin Post Details for ID: {id}</p></Container>)
}
