import { LayoutGrid, Calendar, Plus, ClipboardList, Users, Building } from "lucide-react"

export const userLinks = [
    // { label: "Dashboard", path: "/user", icon: LayoutGrid },
    { label: "Browse Events", path: "/events", icon: Calendar },
    { label: "My Reservations", path: "/my-reservations", icon: ClipboardList },
]

export const organizerLinks = [
    // { label: "Dashboard", path: "/organizer", icon: LayoutGrid },
    { label: "My Events", path: "/my-events", icon: Calendar },
    { label: "Create Event", path: "/my-event/new", icon: Plus },
    { label: "Reservations", path: "/my-event/:id/reservations", icon: ClipboardList },
]

export const ownerLinks = [
    // { label: "Dashboard", path: "/owner", icon: LayoutGrid },
    { label: "My Venues", path: "/venues", icon: Building },
    { label: "Create Venue", path: "/venues/new", icon: Plus },
    { label: "Bookings", path: "/venues/:id/events", icon: ClipboardList },
]

export const adminLinks = [
    { label: "Dashboard", path: "/admin", icon: LayoutGrid },
    { label: "Users", path: "/admin/users", icon: Users },
    { label: "Events", path: "/admin/events", icon: Calendar },
    // { label: "Venues", path: "/admin/venues", icon: Building },
]
