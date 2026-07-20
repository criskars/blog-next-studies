export function Footer() {
    return (
        <footer className="p-4 flex flex-wrap items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            &copy; {new Date().getFullYear()} The Blog. All rights reserved.
        </footer>
    )
}

export default Footer
