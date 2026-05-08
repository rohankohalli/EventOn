import { Outlet } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import UserBox from "../components/UserBox"
import { userLinks } from "../config/sidebarConfig"
import Sidebar from "../components/Sidebar"
import { useState } from "react"
import { useTheme } from "../context/ThemeContext";

const UserLayout = () => {
    const { user, updatePreferences } = useAuth()
    const { theme, setTheme } = useTheme()
    const [isHovered, setIsHovered] = useState(false)
    const isPinned = user.sidebarPinned;

    const togglePin = () => {
        updatePreferences({ sidebarPinned: !isPinned });
    }

    const handleChange = async (e) => {
        const value = e.target.value
        setTheme(value)
        try {
            await updatePreferences({ theme: value })
        } catch (error) {
            setTheme("system")
        }
    }
    return (
        <div className="min-h-screen flex bg-gray-100 dark:bg-gray-950">

            <Sidebar subtitle="User Panel" items={userLinks} isPinned={isPinned} onTogglePin={togglePin} isHovered={isHovered}
                setIsHovered={setIsHovered} />
            <div className="flex-1 flex flex-col">
                <header className="h-14 bg-white shadow-sm dark:bg-gray-900 flex items-center justify-between px-6">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 text-left">User Area</h2>

                    <div className="flex items-center gap-2">
                        <select value={theme} onChange={handleChange}
                            className="border rounded bg-white dark:bg-gray-800 border-gray-300 
                                dark:border-gray-700 text-gray-800 dark:text-gray-100">
                            <option value="system">System</option>
                            <option value="light">Light</option>
                            <option value="dark">Dark</option>
                        </select>

                        <UserBox user={user} />
                    </div>
                </header>

                <main className="flex-1 p-6">
                    <Outlet />
                </main>
            </div>
            {/* <footer className="py-6 text-center text-gray-500">
                © {new Date().getFullYear()} EventOn
            </footer> */}
        </div>
    )
}

export default UserLayout
