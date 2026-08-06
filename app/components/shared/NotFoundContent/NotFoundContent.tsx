'use client'

import { usePathname } from 'next/navigation'

export function NotFoundContent() {
    const pathName = usePathname()
    const slug = pathName?.split('/')

    return (
        <h1 className="p-4 text-4xl font-bold text-zinc-950 dark:text-zinc-50">
            404 - the page <q>{slug}</q> was not found.
        </h1>
    )
}

export default NotFoundContent