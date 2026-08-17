// AdminToastProvider.tsx
'use client'

import * as React from 'react'
import { Toast } from 'radix-ui'

type ToastContextValue = {
    showToast: (message: string) => void
}

const ToastContext = React.createContext<ToastContextValue | null>(null)

export function AdminToast({
    children,
}: {
    children: React.ReactNode
}) {
    const [open, setOpen] = React.useState(false)
    const [message, setMessage] = React.useState('')

    function showToast(nextMessage: string) {
        setOpen(false)
        requestAnimationFrame(() => {
            setMessage(nextMessage)
            setOpen(true)
        })
    }

    return (
        <ToastContext.Provider value={{ showToast }}>
            <Toast.Provider swipeDirection="right">
                {children}

                <Toast.Root open={open} onOpenChange={setOpen} duration={3000} className="border-white border p-4">
                    <Toast.Description>{message}</Toast.Description>
                </Toast.Root>

                <Toast.Viewport className="fixed right-0 bottom-14 z-1000 m-0 flex max-w-[100vw] list-none flex-col gap-4 p-4 outline-none" />
            </Toast.Provider>
        </ToastContext.Provider>
    )
}

export function useAdminToast() {
    const context = React.useContext(ToastContext)

    if (!context) {
        throw new Error('useAdminToast must be used within AdminToastProvider')
    }

    return context
}
