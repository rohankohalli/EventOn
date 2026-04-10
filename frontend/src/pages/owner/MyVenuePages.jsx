import { useEffect, useState } from "react"
import venuesApi from '../../api/endpoints/venues.js'

const MyVenuePages = () => {
    const [venues, setVenues] = useState([])

    useEffect(() => {
        const fetchMyVenues = async () => {
            try {
                const res = await venuesApi.getMy()
                setVenues(res.data)
            } catch (err) {
                console.error("Error fetching my events:", err)
            }
        }
        fetchMyVenues()
    }, [])

    return (
        <div className="p-6 space-y-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold dark:text-slate-200">My Venues</h1>
                <a href="/venues/new" className="px-4 py-2 bg-black text-white rounded">
                    + Add Venue
                </a>
            </div>

            <div className="space-y-3">
                {venues.map(v => (
                    <div key={v.id} className="p-4 bg-white rounded shadow">
                        <h2 className="font-semibold">{v.name}</h2>
                        <p className="text-sm text-gray-600">{v.location}</p>
                        <p className="text-sm">Capacity: {v.capacity}</p>

                        <div className="flex gap-4 mt-2 text-sm">
                            <a href={`/venues/${v.id}/edit`} className="text-blue-600">Edit</a>
                            <a href={`/venues/${v.id}/events`} className="text-green-600">View Events</a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyVenuePages