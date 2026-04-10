import { createContext, useContext, useEffect, useState } from "react"

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState("system")

    useEffect(() => {
        const root = document.documentElement
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

        if (theme === "dark" || (theme === "system" && prefersDark)) {
            root.classList.add("dark")
        } else {
            root.classList.remove("dark")
        }
    }, [theme])

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => useContext(ThemeContext)
