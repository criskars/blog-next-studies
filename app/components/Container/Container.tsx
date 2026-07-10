type ContainerProps = {
    children: React.ReactNode
}

export function Container({ children }: ContainerProps) {
    return (
        <main className="flex w-full flex-1 flex-col items-center justify-center bg-white dark:bg-black">
            {children}
        </main>
    )
}

export default Container