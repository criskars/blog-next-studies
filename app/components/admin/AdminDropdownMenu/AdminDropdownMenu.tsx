'use client'

import * as React from 'react'
import { DropdownMenu } from 'radix-ui'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { AlertDialog } from 'radix-ui'
import { deletePost } from '@/app/admin/posts/actions'

type AdminDropdownMenuProps = {
    id: string
}

const AdminDropdownMenu = ({ id }: AdminDropdownMenuProps) => {
    // const [bookmarksChecked, setBookmarksChecked] = React.useState(true)
    // const [urlsChecked, setUrlsChecked] = React.useState(false)
    // const [person, setPerson] = React.useState('pedro')

    const [open, setOpen] = React.useState(false)

    async function handleConfirmDelete() {
        await deletePost(id)
        setOpen(false)
    }

    return (
        <>
            <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                    <button
                        className="inline-flex size-10 items-center justify-center bg-transparent transition-transform duration-300 ease-out outline-none hover:scale-180"
                        aria-label="Customise options"
                    >
                        <HamburgerMenuIcon />
                    </button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                    <DropdownMenu.Content
                        className="data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade data-[side=right]:animate-slideLeftAndFade data-[side=top]:animate-slideDownAndFade overflow-auto border bg-black p-2 will-change-[opacity,transform]"
                        sideOffset={5}
                    >
                        <DropdownMenu.Item className="group relative flex h-6.25 items-center pr-2 pl-2 text-[16px] leading-none text-white outline-none hover:bg-white hover:text-black">
                            <Link href={`/admin/posts/${id}`}>Edit</Link>
                        </DropdownMenu.Item>
                        <DropdownMenu.Item
                            className="group relative flex h-6.25 items-center pr-2 pl-2 text-[16px] leading-none text-white outline-none hover:bg-white hover:text-black"
                            onSelect={(event) => {
                                event.preventDefault()
                                setOpen(true)
                            }}
                        >
                            Delete
                        </DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Portal>
            </DropdownMenu.Root>

            <AlertDialog.Root open={open} onOpenChange={setOpen}>
                <AlertDialog.Portal>
                    <AlertDialog.Overlay className="fixed inset-0 bg-black/50" />
                    <AlertDialog.Trigger asChild>
                        <button></button>
                    </AlertDialog.Trigger>
                    <AlertDialog.Content className="fixed top-1/2 left-1/2 z-60 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 border bg-black p-4 shadow-xl focus:outline-none">
                        <AlertDialog.Title className="text-lg font-semibold text-white">
                            Confirm Delete
                        </AlertDialog.Title>
                        <AlertDialog.Description className="mt-2 text-sm text-white">
                            Are you sure you want to delete this post?
                        </AlertDialog.Description>
                        <AlertDialog.Cancel asChild>
                            <button className="p-4 text-white">
                                Cancel
                            </button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action asChild>
                            <button className="p-4 text-white" onClick={handleConfirmDelete}>
                                Delete
                            </button>
                        </AlertDialog.Action>
                    </AlertDialog.Content>
                </AlertDialog.Portal>
            </AlertDialog.Root>
        </>
    )
}

export default AdminDropdownMenu
