import { useState, useEffect } from "react"
import eventsApi from "../../api/endpoints/events"
import venuesApi from "../../api/endpoints/venues"
import Input from "../../components/Input"
import Button from "../../components/Button"

export default function CreateEventPage() {
    const [venues, setVenues] = useState([])
    const [form, setForm] = useState({ title: "", description: "", startDate: "", endDate: "", startTime: "", endTime: "", capacity: "", venueId: "" })

    useEffect(() => {
        const fetchVenues = async () => {
            try {
                const res = await venuesApi.getAll()
                setVenues(res.data)
            } catch (err) {
                console.error("Error loading venues:", err)
            }
        }
        fetchVenues()
    }, [])

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const createEvent = async () => {
        try {
            await eventsApi.create({ ...form })
            alert("Event created!")
            window.location.href = "/my-events"
        } catch (err) {
            alert("Failed to create event")
            console.error(err)
        }
    }

    return (
        <div className="p-7 space-y-4 max-w-xl">
            <h1 className="text-2xl font-bold">Create Event</h1>

            <Input className="input" name="title" label={"Enter Event name"} onChange={handleChange} />

            <div className="flex items-center gap-4">
                <label className="text-sm font-medium w-32 text-right"> Description: </label>
                <div className="flex-1">
                    <textarea className="w-full border rounded-lg px-3 py-2 focus:border-transparent" name="description"
                        onChange={handleChange} />
                </div>
            </div>
            <Input className="input" type="date" name="startDate" label={"Start Date:"} onChange={handleChange} />
            <Input className="input" type="date" name="endDate" label={"End Date:"} onChange={handleChange} />
            <Input className="input" type="time" name="startTime" label={"Start Time:"} onChange={handleChange} />
            <Input className="input" type="time" name="endTime" label={"End Time:"} onChange={handleChange} />

            <Input className="input" type="number" name="capacity" label={"Capacity: "} onChange={handleChange} />

            <select name="venueId" className="input" onChange={handleChange}>
                <option value="">Select venue</option>
                {venues.map(v => (
                    <option key={v.id} value={v.id}>{v.name}</option>
                ))}
            </select>

            <Button className="bg-black text-white px-4 py-2 rounded cursor-pointer" onClick={createEvent}>
                Create Event
            </Button>
        </div>
    )
}
