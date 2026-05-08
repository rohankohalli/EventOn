import { useEffect, useState } from "react"
import eventsApi from "../../api/endpoints/events"

export default function MyEventsPage() {
    const [events, setEvents] = useState([])

    useEffect(() => {
        const fetchMyEvents = async () => {
            try {
                const res = await eventsApi.getMy()
                setEvents(res.data)
            } catch (err) {
                console.error("Error fetching my events:", err)
            }
        }
        fetchMyEvents()
    }, [])

    return (
        <div className="p-6 space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">My Events</h1>
                <a href="/my-event/new" className="px-4 py-2 bg-gray-800 text-white rounded">
                   Create Event
                </a>
            </div>

            <div className="space-y-3">
                {events.map(event => (
                    <div key={event.id} className="p-4 bg-white rounded shadow">
                        <h2 className="font-semibold">{event.title}</h2>
                        <p className="text-sm">{event.description}</p>

                        <div className="flex gap-4 mt-2 text-sm">
                            <a href={`/my-event/${event.id}/edit`} className="text-primary-600">Edit</a>
                            <a href={`/my-event/${event.id}/reservations`} className="text-green-600">
                                Reservations
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
