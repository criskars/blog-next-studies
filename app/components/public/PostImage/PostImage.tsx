import Image from 'next/image'
import Link from 'next/link'

type PostImageProps = {
    slug: string
    coverImageSlug: string
    alt: string
    width: number
    height: number
    priority?: boolean
}

export function PostImage({
    coverImageSlug,
    alt,
    width,
    height,
    priority,
    slug,
}: PostImageProps) {
    return (
        <Link className="h-full w-full overflow-hidden rounded-xl" href={slug}>
            <Image
                className="h-full w-full object-cover object-center transition hover:scale-105"
                src={coverImageSlug}
                width={width}
                height={height}
                alt={alt}
                priority={priority}
                loading="eager"
            />
        </Link>
    )
}

export default PostImage
