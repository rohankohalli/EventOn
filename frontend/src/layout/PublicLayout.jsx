import { Link, Outlet } from "react-router-dom"
import AppIcon from "../components/Icon"

const PublicLayout = () => {
    return (
        <div className="h-screen flex flex-col bg-gray-200 dark:bg-gray-900">
            <header className="w-full bg-white dark:bg-zinc-800 shadow-lg px-6 py-2 flex items-center justify-between 
                shrink-0">
                <div className="flex flex-row gap-2 text-xl font-bold text-blue-400 dark:text-blue-600">
                    <Link to="/">
                        <span className="dark:text-white"><AppIcon /></span> Occura
                    </Link>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Welcome</div>
            </header>

            <main className="flex-1">
                <Outlet />
            </main>
            <footer className="py-2 text-center text-gray-500 bg-white">
                © {new Date().getFullYear()} Occura
            </footer>
        </div>
    )
}

export default PublicLayout
