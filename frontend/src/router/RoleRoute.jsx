import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import DotLoader from "../components/Loader";

export default function RoleRoute({ roles }) {
    const { user, loading, role } = useAuth();

    if (loading) return <div><DotLoader className="flex items-center justify-between"/></div>;

    if (!user) return <Navigate to="/login" replace />;

    if (role === "Admin") return <Outlet />;

    const allowed = roles.includes(user.role);

    return allowed ? <Outlet /> : <Navigate to="/unauthorized" replace />;
}
