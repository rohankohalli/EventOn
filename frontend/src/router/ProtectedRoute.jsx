import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import DotLoader from "../components/Loader.jsx";

export default function ProtectedRoute() {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return <div className="flex min-h-screen items-center justify-center"><DotLoader /></div>;

    return isAuthenticated ? <Outlet /> : <Navigate to="/login"/>;
}

