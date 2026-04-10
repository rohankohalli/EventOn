import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import homeApi from "../api/endpoints/home";

const HomePage = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [showWarning, setShowWarning] = useState(false)
  const [stats, setStats] = useState(null)
  const [recent, setRecent] = useState([])

  const roleWarnings = {
    User: "Waitlisted reservations are promoted automatically when seats open.",
    Organizer: "Your events must be approved by admin before users can reserve.",
    Owner: "Add venues before creating or hosting events.",
    Admin: "Review pending events regularly to keep the platform active.",
  }

  const roleActions = {
    User: [
      { label: "Browse Events", path: "/events" },
      { label: "My Reservations", path: "/my-reservations" },
    ],
    Organizer: [
      { label: "Create Event", path: "/my-event/new" },
      { label: "My Events", path: "/my-events" },
    ],
    Owner: [
      { label: "Add Venue", path: "/venues/new" },
      { label: "My Venues", path: "/venues" },
    ],
    Admin: [
      { label: "Review Events", path: "/admin/events" },
      { label: "Manage Users", path: "/admin/users" },
    ],
  }

  const warningKey = user ? `home_warning_seen_${user.id}` : null;

  useEffect(() => {
    if (user && !localStorage.getItem(warningKey)) {
      setShowWarning(true);
    }
  }, [user, warningKey]);

  const dismissWarning = () => {
    localStorage.setItem(warningKey, "true");
    setShowWarning(false);
  };

  useEffect(() => {
    if (!user) return

    const val = async () => {
      try {
        const value = await homeApi.getAll()
        setStats(value.stats)
        setRecent(value.recent || [])
      } catch (error) {
        console.error("Failed to load home stats:", error);
      }
    }
    val()
  }, [user])

  const actions = user ? roleActions[user.role] : []
  return (
    <div className="h-screen bg-gray-100 flex flex-col items-center justify-center dark:bg-gray-900">
      <h1 className="text-2xl font-bold mb-4 dark:text-white">
        Welcome {user ? `,${user.name}` : ""}
      </h1>

      {user && (<p className="text-gray-600 mb-10">
        You are logged in as {" "}<span className="font-semibold">{user.role}</span>
      </p>)}

      <div className="flex gap-6 flex-wrap justify-center">
        {actions.map(a => (
          <Button key={a.label} onClick={() => navigate(a.path)}
            className="px-4 py-2 bg-black text-white rounded-xl text-base hover:bg-gray-800 transition 
              dark:bg-white dark:text-black">
            {a.label}
          </Button>
        ))}
      </div>

      {showWarning && (
        <div className="text-yellow-600 px-4 py-2 rounded mb-4 flex items-center gap-4">
          <span>{roleWarnings[user.role]}</span>
          <Button onClick={dismissWarning} className="text-sm underline cursor-pointer">
            Dismiss
          </Button>
        </div>
      )}

      {stats && (
        <p className="text-gray-500 dark:text-gray-400 mb-2">
          {stats.primary}{stats.secondary ? ` — ${stats.secondary}` : ""}
        </p>
      )}

      {recent.length > 0 && (
        <div className="mt-2 text-sm dark:text-gray-400 text-center">
          <p className="font-semibold mb-1">Recent activity</p>
          {recent.map((r, i) => (
            <p key={i}>• {r}</p>
          ))}
        </div>
      )}
    </div>
  )
}

export default HomePage
