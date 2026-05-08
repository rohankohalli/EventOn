import { useAuth } from "../context/AuthContext";
import AdminLayout from "../layout/AdminLayout";
import UserLayout from "../layout/UserLayout";
import OrganizerLayout from "../layout/OrganzierLayout";
import OwnerLayout from "../layout/OwnerLayout";
import DotLoader from "../components/Loader";

export default function RoleBasedLayout() {
    const { user } = useAuth();

    if (!user) return <div className="flex min-h-screen items-center justify-center"><DotLoader /></div>

    switch (user.role) {
        case "Admin":
            return <AdminLayout />;
        case "Organizer":
            return <OrganizerLayout />;
        case "VenueOwner":
            return <OwnerLayout />;
        default:
            return <UserLayout />;
    }
}
