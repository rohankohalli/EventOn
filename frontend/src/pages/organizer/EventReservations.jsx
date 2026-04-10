import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import reservationsApi from '../../api/endpoints/reservation'

export default function EventReservationsPage() {
    const { id } = useParams()
    const [reservations, setReservations] = useState([])

    useEffect(() => {
        const loadReservations = async () => {
            try {
                const res = await reservationsApi.getAll();
                setReservations(res.data);
            } catch (err) {
                console.error("Error loading reservations:", err);
            }
        }
        loadReservations();
    }, [])

    return (
        <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold">Event Reservations</h1>

            {reservations.map(r => (
                <div key={r.id} className="bg-white p-4 rounded shadow">
                    <p><b>User:</b> {r.User?.name}</p>
                    <p><b>Event Name:</b> {r.Event.title} </p>
                    <p><b>Quantity:</b> {r.quantity}</p>
                    <p><b>Status:</b> {r.status}</p>
                </div>
            ))}
        </div>
    );
}