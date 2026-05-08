import { useState } from "react";
import venuesApi from "../../api/endpoints/venues";
import Input from "../../components/Input";
import Button from "../../components/Button";

const CreateVenuePage = () => {
    const [form, setForm] = useState({ name: "", location: "", capacity: "", pricePerHour: "", availability: true });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleToggle = (value) => {
        setForm({ ...form, availability: value });
    };

    const createVenue = async () => {
        try {
            await venuesApi.create(form);
            alert("Venue created!");
            window.location.href = "/venues";
        } catch (err) {
            alert(err.response?.data?.message || "Failed to create venue");
        }
    };

    return (
        <div className="p-6 max-w-xl space-y-3 dark:text-slate-100">
            {/* <div className="flex items-center flex-col"> */}
                <h1 className="text-2xl font-bold">Add Venue</h1>

                {/* <form className="border rounded-xl bg-white px-3"> */}
                    <Input className="input" name="name" placeholder="Venue Name" label={"Venue Name"} onChange={handleChange} />

                    <Input className="input" name="location" placeholder="Location" label={"Location:"} onChange={handleChange} />

                    <Input className="input" name="capacity" type="number" label={"Capacity"} placeholder="Capacity"
                        onChange={handleChange} />

                    <Input className="input" name="pricePerHour" type="number" placeholder="Price Per Hour" 
                        label={"Price Per Hour"} onChange={handleChange} />

                    <label className="flex items-center space-x-2 cursor-pointer">
                        <span>Available</span>

                        <div onClick={() => handleToggle(!venue.availability)}
                            className={`relative w-12 h-7 rounded-full transition cursor-pointer
                        ${form.availability ? "bg-primary-600" : "bg-gray-300"}`}>

                            <div className={`absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition
                        ${form.availability ? "translate-x-5" : ""}`}></div>
                        </div>
                    </label>

                    <Button className="bg-black text-white px-4 py-2 rounded cursor-pointer" onClick={createVenue}>
                        Add Venue
                    </Button>
                {/* </form> */}
            </div>
        // </div>
    )
}

export default CreateVenuePage