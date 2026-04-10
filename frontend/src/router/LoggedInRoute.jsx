import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import DotLoader from "../components/Loader";

export default function LoggedInRoute() {
    const { isAuthenticated, loading } = useAuth();

    if (loading) return <div className=" flex items-center justify-between"><DotLoader /></div>

    return !isAuthenticated ? <Outlet /> : <Navigate to="/home" />;
}