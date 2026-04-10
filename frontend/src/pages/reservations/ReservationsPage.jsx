import { useEffect, useState } from "react";
import reservationsApi from "../../api/endpoints/reservation";

export default function MyReservationsPage() {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        const getReservations = async () => {
            try {
                const res = await reservationsApi.getMy();
                setReservations(res.data);
            } catch (err) {
                console.error("Error fetching reservations:", err);
            }
        };
        getReservations();
    }, []);

    return (
        <div className="p-6 space-y-4">
            <h1 className="text-2xl font-bold dark:text-slate-100">My Reservations</h1>

            {reservations.length === 0 && (
                <p className="text-gray-600">No reservations yet.</p>
            )}

            <div className="space-y-3">
                {reservations.map(r => (
                    <div key={r.id} className="bg-white p-4 rounded shadow">
                        <h2 className="font-medium">{r.Event.title}</h2>
                        <p>Quantity: {r.quantity}</p>

                        <p>
                            Status:{" "}<span className="font-bold text-gray-900">{r.status}</span>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
