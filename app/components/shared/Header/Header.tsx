'use client'

import Link from 'next/dist/client/link'
import { DropdownMenu } from 'radix-ui'
import { HamburgerMenuIcon, ExitIcon } from '@radix-ui/react-icons'
import { logoutAction } from '@/app/actions/logout'

// TODO
// Implement viewport to render dropdown only on small screen sizes
// Fix the error message to only show if the user tries to execute an action but is logged out - to not show error when logging in for the first time

export function Header() {
    return (
        <header className="fixed top-0 right-0 left-0 z-1 bg-zinc-50 font-sans dark:bg-black">
            <div className="flex items-center justify-between">
                <Link href="/">
                    <h1 className="p-4 text-5xl font-extrabold text-zinc-950 dark:text-zinc-50">
                        THE BLOG
                    </h1>
                </Link>

                {/* <nav className="p-4 text-lg font-medium text-zinc-950 dark:text-zinc-50">
                    <ul className="flex items-center justify-end gap-4 max-[382px]:gap-2">
                        <li>
                            <Link href="/about">About</Link>
                        </li>
                        <li>
                            <Link href="/admin/posts">Admin</Link>
                        </li>
                        <li>
                            <Link href="/admin/posts">Logout</Link>
                        </li>
                    </ul>
                </nav> */}
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild>
                        <button
                            className="mr-4 inline-flex size-8.75 items-center justify-center rounded-full bg-black text-white shadow-white"
                            aria-label="Customise options"
                        >
                            <HamburgerMenuIcon />
                        </button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Portal>
                        <DropdownMenu.Content
                            className="data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade z-100 mt-4 mr-4 min-w-32 overflow-auto overflow-y-auto border bg-black p-2 will-change-[opacity,transform]"
                            sideOffset={6}
                        >
                            <DropdownMenu.Item className="group relative flex min-h-6.25 items-center pr-2 pl-2 text-[16px] leading-none text-white outline-none hover:bg-white hover:text-black">
                                <Link href="/about">About</Link>
                            </DropdownMenu.Item>
                            <DropdownMenu.Item className="group relative flex min-h-6.25 items-center pr-2 pl-2 text-[16px] leading-none text-white outline-none hover:bg-white hover:text-black">
                                <Link href="/admin/posts">Admin</Link>
                            </DropdownMenu.Item>
                            <DropdownMenu.Item className="group relative flex min-h-6.25 items-center gap-2 pr-2 pl-2 text-[16px] leading-none text-white outline-none hover:bg-white hover:text-black">
                                <ExitIcon />
                                <button onClick={() => logoutAction()}>
                                    Logout
                                </button>
                            </DropdownMenu.Item>
                        </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                </DropdownMenu.Root>
            </div>
        </header>
    )
}
