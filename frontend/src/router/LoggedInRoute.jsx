import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import DotLoader from "../components/Loader";

export default function LoggedInRoute() {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return <div className="flex min-h-screen items-center justify-center"><DotLoader /></div>

    return !isAuthenticated ? <Outlet /> : <Navigate to="/home" />;
}