import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import eventsApi from "../../api/endpoints/events"
import reservationsApi from "../../api/endpoints/reservation"
import DotLoader from "../../components/Loader"

export default function EventDetailsPage() {
    const { id } = useParams()
    const [event, setEvent] = useState(null)
    const [qty, setQty] = useState(1)

    useEffect(() => {
        const getEvent = async () => {
            try {
                const res = await eventsApi.getById(id)
                setEvent(res.data)
            } catch (err) {
                console.error("Error fetching event:", err)
            }
        }
        getEvent()
    }, [id])

    const reserve = async () => {
        try {
            await reservationsApi.create({ eventId: id, quantity: qty })
            alert("Reservation submitted!")
        } catch (err) {
            console.error("Reservation failed:", err)
            alert(err.response?.data?.message || "Reservation failed")
        }
    }

    if (!event) return <div className=" flex items-center justify-between"><DotLoader /></div>;

    return (
        <div className="p-6 space-y-4 max-w-xl">
            <h1 className="text-3xl font-bold">{event.title}</h1>

            <p>{event.description}</p>

            <div className="flex items-center gap-3">
                <input 
                type="number" value={qty} min={1} onChange={(e) => setQty(Number(e.target.value))} 
                className="border rounded p-2 w-20" />
                <button onClick={reserve} className="bg-black text-white px-4 py-2 rounded cursor-pointer">
                    Reserve
                </button>
            </div>
        </div>
    )
}
