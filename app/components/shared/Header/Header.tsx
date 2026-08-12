import Link from 'next/dist/client/link'

export function Header() {
    return (
        <header className="fixed top-0 right-0 left-0 z-1 bg-zinc-50 font-sans dark:bg-black">
            <div className="flex items-center justify-between">
                <Link href="/">
                    <h1 className="p-4 text-5xl font-extrabold text-zinc-950 dark:text-zinc-50">
                        THE BLOG
                    </h1>
                </Link>

                <nav className="p-4 text-lg font-medium text-zinc-950 dark:text-zinc-50">
                    <ul className="flex items-center justify-end flex-wrap gap-4">
                        <li>
                            <Link href="/">Home</Link>
                        </li>
                        <li>
                            <Link href="/about">About</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}
