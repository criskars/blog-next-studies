'use client'

import Link from 'next/dist/client/link'
import { DropdownMenu } from 'radix-ui'
import { HamburgerMenuIcon, ExitIcon, EnterIcon } from '@radix-ui/react-icons'
import { logoutAction } from '@/app/actions/logout'

type HeaderProps = {
    isUserLogged: boolean
}

export function Header({ isUserLogged }: HeaderProps) {
    return (
        <header className="fixed top-0 right-0 left-0 z-1 bg-zinc-50 font-sans dark:bg-black">
            <div className="flex items-center justify-between">
                <Link href="/">
                    <h1 className="p-4 text-5xl font-extrabold text-zinc-950 dark:text-zinc-50">
                        THE BLOG
                    </h1>
                </Link>
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

                            {!isUserLogged ? (
                                <DropdownMenu.Item className="group relative flex min-h-6.25 items-center gap-2 pr-2 pl-2 text-[16px] leading-none text-white outline-none hover:bg-white hover:text-black">
                                    <EnterIcon />
                                    <Link href="/admin/login">Login</Link>
                                </DropdownMenu.Item>
                            ) : (
                                <DropdownMenu.Item className="group relative flex min-h-6.25 items-center gap-2 pr-2 pl-2 text-[16px] leading-none text-white outline-none hover:bg-white hover:text-black">
                                    <ExitIcon />
                                    <button onClick={() => logoutAction()}>
                                        Logout
                                    </button>
                                </DropdownMenu.Item>
                            )}
                        </DropdownMenu.Content>
                    </DropdownMenu.Portal>
                </DropdownMenu.Root>
            </div>
        </header>
    )
}
