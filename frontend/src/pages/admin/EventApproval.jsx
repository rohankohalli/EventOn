import { useEffect, useState } from "react"
import eventsApi from '../../api/endpoints/events'

const EventApproval = () => {
    const [events, setEvents] = useState([])

    const loadEvents = async () => {
        try {
            const res = await eventsApi.getAll()
            setEvents(res.data)
        } catch (err) {
            console.error("Error loading events:", err)
        }
    }

    useEffect(() => {
        loadEvents()
    }, [])

    const approveEvent = async (id) => {
        await eventsApi.approve(id)
        loadEvents()
    }

    const rejectEvent = async (id) => {
        await eventsApi.reject(id)
        loadEvents()
    }

    const cancelApproval = async (id) => {
        await eventsApi.cancelApproval(id)
        loadEvents()
    }

    return (
        <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold">Event Approvals</h1>
            <div className="space-y-3">
                {events.map(event => (
                    <div key={event.id} className="p-4 bg-white rounded shadow">
                        <h2 className="font-semibold">{event.title}</h2>
                        <p>Status: <b>{event.approvalStatus}</b></p>

                        <div className="flex gap-3 mt-2">
                            <button onClick={() => approveEvent(event.id)}
                                className="px-3 py-1 bg-green-700 text-white rounded cursor-pointer" >
                                Approve
                            </button>

                            <button onClick={() => rejectEvent(event.id)} 
                                className="px-3 py-1 bg-red-500 text-white rounded cursor-pointer">
                                Reject
                            </button>

                            <button onClick={() => cancelApproval(event.id)} 
                                className="px-3 py-1 bg-gray-700 text-white rounded cursor-pointer">
                                Cancel
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default EventApproval