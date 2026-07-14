import Image from "next/image"
import Link from "next/link"

type PostImageProps = {
  src: string
  alt: string
  width: number
  height: number
  priority?: boolean
}

export function PostImage({ src, alt, width, height, priority }: PostImageProps) {
    return (
        <Link className="h-full w-full overflow-hidden rounded-xl" href="#">
            <Image
                className="h-full w-full object-cover object-center transition group-hover:scale-105"
                src={src}
                width={width}
                height={height}
                alt={alt}
                priority={priority}
            />
        </Link>
    )
}

export default PostImage