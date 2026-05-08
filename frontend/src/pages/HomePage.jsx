import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import homeApi from "../api/endpoints/home";

const HomePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showWarning, setShowWarning] = useState(false);
  const [stats, setStats] = useState(null);
  const [recent, setRecent] = useState([]);

  const roleWarnings = {
    User: "Waitlisted reservations are promoted automatically when seats open.",
    Organizer: "Your events must be approved by admin before users can reserve.",
    Owner: "Add venues before creating or hosting events.",
    Admin: "Review pending events regularly to keep the platform active.",
  };

  const roleActions = {
    User: [
      { label: "Browse Events", path: "/events", icon: "🔍" },
      { label: "My Reservations", path: "/my-reservations", icon: "🎟️" },
    ],
    Organizer: [
      { label: "Create Event", path: "/my-event/new", icon: "➕" },
      { label: "My Events", path: "/my-events", icon: "📅" },
    ],
    Owner: [
      { label: "Add Venue", path: "/venues/new", icon: "🏢" },
      { label: "My Venues", path: "/venues", icon: "📍" },
    ],
    Admin: [
      { label: "Review Events", path: "/admin/events", icon: "🛡️" },
      { label: "Manage Users", path: "/admin/users", icon: "👥" },
    ],
  };

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
    if (!user) return;

    const val = async () => {
      try {
        const value = await homeApi.getAll();
        setStats(value.stats);
        setRecent(value.recent || []);
      } catch (error) {
        console.error("Failed to load home stats:", error);
      }
    };
    val();
  }, [user]);

  const actions = user ? roleActions[user.role] : [];
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-10 pb-20 px-6 sm:px-12">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-2">
            Welcome back, <span className="text-primary-600">{user?.name || "Guest"}</span>
          </h1>
          {user && (
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Dashboard access level: <span className="font-semibold text-gray-800 dark:text-gray-200">{user.role}</span>
            </p>
          )}
        </header>

        {/* Warning Notification */}
        {showWarning && user && (
          <div className="mb-8 p-5 bg-yellow-50 dark:bg-yellow-900/30 border border-yellow-200 dark:border-yellow-800 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm">
            <div className="flex items-center gap-3">
              <span className="text-yellow-600 dark:text-yellow-500 text-xl">💡</span>
              <span className="text-yellow-800 dark:text-yellow-200 font-medium">{roleWarnings[user.role]}</span>
            </div>
            <button onClick={dismissWarning} className="text-sm font-semibold text-yellow-700 dark:text-yellow-400 hover:text-yellow-900 dark:hover:text-yellow-300 transition-colors">
              Dismiss
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {actions.map(a => (
                  <button 
                    key={a.label} 
                    onClick={() => navigate(a.path)}
                    className="flex flex-col items-start p-6 glass-panel dark:glass-panel-dark rounded-2xl text-left hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group border-t border-l border-white/40 dark:border-white/10"
                  >
                    <span className="text-3xl mb-3 group-hover:scale-110 transition-transform">{a.icon}</span>
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">{a.label}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage {a.label.toLowerCase()}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* Recent Activity */}
            {recent.length > 0 && (
              <section className="glass-panel dark:glass-panel-dark p-8 rounded-2xl border-t border-l border-white/40 dark:border-white/10">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <span>⏱️</span> Recent Activity
                </h2>
                <div className="space-y-4">
                  {recent.map((r, i) => (
                    <div key={i} className="flex items-start gap-4 pb-4 border-b border-gray-100 dark:border-gray-800 last:border-0 last:pb-0">
                      <div className="w-2 h-2 mt-2 rounded-full bg-primary-500"></div>
                      <p className="text-gray-700 dark:text-gray-300 font-medium">{r}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar / Stats */}
          <div className="lg:col-span-1">
            <section className="glass-panel dark:glass-panel-dark p-8 rounded-2xl sticky top-8 border-t border-l border-white/40 dark:border-white/10">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Overview</h2>
              {stats ? (
                <div className="space-y-6">
                  <div className="p-4 bg-gray-50/50 dark:bg-gray-800/50 rounded-xl">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Primary Metric</p>
                    <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">{stats.primary}</p>
                  </div>
                  {stats.secondary && (
                    <div className="p-4 bg-gray-50/50 dark:bg-gray-800/50 rounded-xl">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Secondary Metric</p>
                      <p className="text-xl font-semibold text-gray-800 dark:text-gray-200">{stats.secondary}</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="animate-pulse space-y-4">
                  <div className="h-20 bg-gray-200 dark:bg-gray-800 rounded-xl w-full"></div>
                  <div className="h-16 bg-gray-200 dark:bg-gray-800 rounded-xl w-full"></div>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
