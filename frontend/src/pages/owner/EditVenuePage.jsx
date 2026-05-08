import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import venuesApi from '../../api/endpoints/venues'
import Input from "../../components/Input";
import DotLoader from "../../components/Loader";

const EditVenuePage = () => {
    const { id } = useParams()
    const [venue, setVenue] = useState(null);

    useEffect(() => {
        const fetchVenue = async () => {
            try {
                const res = await venuesApi.getById(id)
                setVenue(res.data)
            } catch (err) {
                console.error("Error fetching my venues:", err)
            }
        }
        fetchVenue()
    }, [id])

    if (!venue) return <div className=" flex items-center justify-between"><DotLoader /></div>;

    const handleChange = (e) => {
        setVenue({ ...venue, [e.target.name]: e.target.value });
    };

    const handleToggle = (value) => {
        setVenue({ ...venue, availability: value });
    };

    const updateVenue = async () => {
        try {
            await venuesApi.update(id, venue);
            alert("Venue updated!");
            window.location.href = "/venues";
        } catch (err) {
            alert("Failed to update venue");
        }
    };

    return (
        <div className="p-6 max-w-xl space-y-3">
            <h1 className="text-2xl font-bold">Edit Venue</h1>

            <Input className="input" name="name" value={venue.name} onChange={handleChange} />
            <Input className="input" name="location" value={venue.location} onChange={handleChange} />
            <Input className="input" name="capacity" type="number" value={venue.capacity} onChange={handleChange} />
            <Input className="input" name="pricePerHour" type="number" value={venue.pricePerHour} onChange={handleChange} />

            <label className="flex items-center space-x-2 cursor-pointer">
                <span>Available</span>

                <div onClick={() => handleToggle(!venue.availability)}
                    className={`relative w-12 h-7 rounded-full transition cursor-pointer overflow-hidden
                    ${venue.availability ? "bg-primary-600" : "bg-gray-300"}`}>

                    <div className={`absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition ${venue.availability ? "translate-x-5" : ""}`}></div>
                </div>
            </label>

            <button className="bg-black text-white px-4 py-2 rounded cursor-pointer" onClick={updateVenue}>
                Save Changes
            </button>
        </div>
    )
}

export default EditVenuePage