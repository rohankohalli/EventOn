import { useEffect, useState } from "react";
import eventsApi from "../../api/endpoints/events";

export default function EventsPage() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const res = await eventsApi.getAll();
                setEvents(res.data);
            } catch (err) {
                console.error("Failed to fetch events:", err);
            }
        };
        fetchEvents();
    }, []);

    return (
        <div className="p-4 space-y-4">
            <h1 className="text-2xl font-bold dark:text-slate-100">Events</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {events.map(event => (
                    <div key={event.id} className="p-4 rounded-xl bg-white shadow">
                        <h2 className="font-semibold">{event.title}</h2>
                        <p className="text-sm">{event.description}</p>
                        <a href={`/events/${event.id}`} className="text-blue-600 text-sm">
                            View Details →
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}
