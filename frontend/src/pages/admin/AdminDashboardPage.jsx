import { useEffect, useState } from "react";
import eventsApi from "../../api/endpoints/events";
import reservationsApi from "../../api/endpoints/reservation";
import usersApi from "../../api/endpoints/users";
import { Link } from "react-router-dom";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({ users: 0, events: 0, reservations: 0, pending: 0 });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const usersRes = await usersApi.getAll();
        const eventsRes = await eventsApi.getAll();
        const reservationsRes = await reservationsApi.getAll();

        const pending = eventsRes.data.filter(e => e.approvalStatus === "Pending").length;

        setStats({
          users: usersRes.data.length,
          events: eventsRes.data.length,
          reservations: reservationsRes.data.length,
          pending
        });
      } catch (err) {
        console.error("Dashboard loading error:", err);
      }
    };

    loadStats();
  }, []);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl dark:text-gray-300 font-bold">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

        <Link to={"/admin/users"} >
          <div className="bg-white p-4 rounded shadow text-center dark:bg-gray-900 dark:text-gray-100">
            <h2 className="text-lg font-semibold">Users</h2>
            <p className="text-3xl font-bold">{stats.users}</p>
          </div>
        </Link>

        <Link to={"/events"} >
          <div className="bg-white p-4 rounded shadow text-center dark:bg-gray-900 dark:text-gray-100">
            <h2 className="text-lg font-semibold">Events</h2>
            <p className="text-3xl font-bold">{stats.events}</p>
          </div>
        </Link>

        <Link to={""} >
          <div className="bg-white p-4 rounded shadow text-center dark:bg-gray-900 dark:text-gray-100">
            <h2 className="text-lg font-semibold">Reservations</h2>
            <p className="text-3xl font-bold">{stats.reservations}</p>
          </div>
        </Link>

        <Link to={"/admin/events"} >
          <div className="bg-white p-4 rounded shadow text-center dark:bg-gray-900 dark:text-gray-100">
            <h2 className="text-lg font-semibold">Pending Approvals</h2>
            <p className="text-3xl font-bold">{stats.pending}</p>
          </div>
        </Link>

      </div>
    </div>
  );
}
