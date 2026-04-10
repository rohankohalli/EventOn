import { createContext, useCallback, useContext, useEffect, useState } from "react"
import authApi from "../api/endpoints/auth.js"
import userApi from "../api/endpoints/users.js"

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"))
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const register = async (data) => {
        setError(null)
        try {
            const res = await authApi.register(data)

            localStorage.setItem("accessToken", res.data.accessToken)
            setAccessToken(res.data.accessToken)

            setUser(res.data.user)

            return { success: true, user: res.data.user }

        } catch (err) {
            setError(err.response?.data?.message || "Registration failed")
            return { success: false }
        }
    }

    const login = async (email, password) => {
        setError(null)
        try {
            const res = await authApi.login({ email, password })

            localStorage.setItem("accessToken", res.data.accessToken)
            setAccessToken(res.data.accessToken)

            setUser(res.data.user)
            
            return { success: true, user:res.data.user }

        } catch (err) {
            setError(err.response?.data?.message || "Login failed")
            return { success: false }
        }
    }

    const logout = async() => {
        try {
            await authApi.logout()            
        } catch (error) {    
        }
        finally{
            localStorage.removeItem("accessToken")
            setUser(null)
            setAccessToken(null)
        }
    }

    const updatePreferences = async (prefs) => {
        try {
            const res = await userApi.updatePreferences(prefs);
            setUser(res.data.user);
            return true;
        } catch (err) {
            console.error("Failed to update preferences", err);
            return false;
        }
    };

    useEffect(() => {
        const auth = async () => {
            try {
                const res = await authApi.refresh()
                const newAccessToken = res.data.accessToken

                localStorage.setItem("accessToken", newAccessToken)
                setAccessToken(newAccessToken)

                const me = await authApi.me()
                setUser(me.data.user)

            } catch (err) {
                localStorage.removeItem("accessToken")
                setUser(null)
                setAccessToken(null)
            } finally {
                setLoading(false)
            }
        }
        auth()
    }, [])

    const value = { user, role: user?.role || null, accessToken, loading, error, isAuthenticated: !!accessToken && 
        !!user, login, register, logout, updatePreferences }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
