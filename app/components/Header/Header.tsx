import Link from 'next/dist/client/link'

export function Header() {
    return (
        <header className="flex flex-wrap items-center justify-between bg-zinc-50 font-sans dark:bg-black">
            <h1 className="p-4 text-5xl font-extrabold text-zinc-950 dark:text-zinc-50">
                THE BLOG
            </h1>
            <nav className="p-4 text-lg font-medium text-zinc-950 dark:text-zinc-50">
                <ul className="flex flex-wrap gap-4">
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <Link href="/about">About</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
