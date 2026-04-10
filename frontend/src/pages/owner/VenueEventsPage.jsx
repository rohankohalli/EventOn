import { useEffect } from "react"
import { useState } from "react"
import { useParams } from "react-router-dom"
import venuesApi from "../../api/endpoints/venues"

const VenueEventsPage = () => {
    const { id } = useParams()
    const [events, setEvents] = useState([])

    useEffect(() => {
        const loadEvents = async () => {
            try {
                const res = await venuesApi.getVenueEvents(id)
                setEvents(res.data)
            } catch (err) {
                console.error("Error loading venue events:", err)
            }
        }
        loadEvents()
    }, [id])

    return (
        <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold">Events at This Venue</h1>

            {events.length === 0 && (
                <p className="text-gray-600">No events hosted here yet.</p>
            )}

            <div className="space-y-3">
                {events.map((e) => (
                    <div key={e.id} className="bg-white p-4 rounded shadow">
                        <h2 className="font-semibold">{e.title}</h2>
                        <p className="text-xl">{e.description}</p>
                        <p className="text-xs font-medium">Start Date: {e.startDate}</p>
                        <p className="text-xs font-medium">End Date: {e.endDate}</p>
                        <p className="text-xs font-medium">Start Time: {e.startTime}</p>
                        <p className="text-xs font-medium">End Time: {e.endTime}</p>
                    </div>
                ))}
            </div>
        </div>
)}

export default VenueEventsPage