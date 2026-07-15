import Image from "next/image"
import Link from "next/link"

type PostImageProps = {
  slug: string
  coverImageUrl: string
  alt: string
  width: number
  height: number
  priority?: boolean
}

export function PostImage({ coverImageUrl, alt, width, height, priority, slug }: PostImageProps) {
    return (
        <Link className="h-full w-full overflow-hidden rounded-xl" href={slug}>
            <Image
                className="h-full w-full object-cover object-center transition group-hover:scale-105"
                src={coverImageUrl}
                width={width}
                height={height}
                alt={alt}
                priority={priority}
            />
        </Link>
    )
}

export default PostImage