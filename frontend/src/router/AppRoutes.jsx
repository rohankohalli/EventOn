import { Routes, BrowserRouter, Route } from "react-router-dom"
import Login from "../pages/auth/Login"
import Register from "../pages/auth/Register"
import NotFound from "../pages/NotFound"
import HomePage from "../pages/HomePage"
import EventsPage from "../pages/events/EventList"
import EventDetailsPage from "../pages/events/EventDetails"
import MyReservationsPage from "../pages/reservations/ReservationsPage";
import MyEventsPage from "../pages/organizer/MyEventsPage";
import CreateEventPage from "../pages/organizer/CreateEventPage";
import EditEventPage from "../pages/organizer/EditEventPage";
import EventReservationsPage from "../pages/organizer/EventReservations";
import MyVenuePages from "../pages/owner/MyVenuePages";
import CreateVenuePage from "../pages/owner/CreateVenuePage";
import EditVenuePage from "../pages/owner/EditVenuePage";
import VenueEventsPage from "../pages/owner/VenueEventsPage";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import EventApproval from "../pages/admin/EventApproval";
import AdminUsersPage from "../pages/admin/UsersPage";
import ProtectedRoute from "./ProtectedRoute";
import LoggedInRoute from "./LoggedInRoute";
import Unauthorized from "../pages/auth/Unauthorized"
import PublicLayout from "../layout/PublicLayout"
import OwnerLayout from "../layout/OwnerLayout"
import OrganizerLayout from "../layout/OrganzierLayout"
import AdminLayout from "../layout/AdminLayout"
import UserLayout from "../layout/UserLayout"
import RoleRoute from "../router/RoleRoute"
import RoleBasedLayout from "../layout/RoleBasedLayout"
import Profile from "../pages/Profile"
import LandingPage from "../pages/LandingPage"
import ResetPassword from "../pages/ResetPassword"

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<LoggedInRoute />}>
                    <Route element={<PublicLayout />}>
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/reset-password" element={<ResetPassword />} />
                    </Route>
                </Route>

                <Route element={<ProtectedRoute />}>
                    <Route element={<PublicLayout />}>
                        <Route path="/home" element={<HomePage />} />
                    </Route>
                </Route>

                <Route element={<ProtectedRoute />}>
                    <Route element={<RoleRoute roles={["User"]} />}>
                        <Route element={<UserLayout />}>
                            <Route path="/events" element={<EventsPage />} />
                            <Route path="/events/:id" element={<EventDetailsPage />} />
                            <Route path="/my-reservations" element={<MyReservationsPage />} />
                        </Route>
                    </Route>

                    <Route element={<RoleRoute roles={["Organizer"]} />}>
                        <Route element={<OrganizerLayout />} >
                            <Route path="/my-events" element={<MyEventsPage />} />
                            <Route path="/my-event/new" element={<CreateEventPage />} />
                            <Route path="/my-event/:id/edit" element={<EditEventPage />} />
                            <Route path="/my-event/:id/reservations" element={<EventReservationsPage />} />
                        </Route>
                    </Route>

                    <Route element={<RoleRoute roles={["Owner"]} />}>
                        <Route element={<OwnerLayout />}>
                            <Route path="/venues" element={<MyVenuePages />} />
                            <Route path="/venues/new" element={<CreateVenuePage />} />
                            <Route path="/venues/:id/edit" element={<EditVenuePage />} />
                            <Route path="/venues/:id/events" element={<VenueEventsPage />} />
                        </Route>
                    </Route>

                    <Route element={<RoleRoute roles={["Admin"]} />}>
                        <Route element={<AdminLayout />}>
                            <Route path="/admin" element={<AdminDashboardPage />} />
                            <Route path="/admin/events" element={<EventApproval />} />
                            <Route path="/admin/users" element={<AdminUsersPage />} />
                        </Route>
                    </Route>

                    <Route element={<RoleBasedLayout />}>
                        <Route path="/profile" element={<Profile />} />
                    </Route>

                    <Route path="/unauthorised" element={<Unauthorized />} />
                </Route>

                <Route path="/*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes
