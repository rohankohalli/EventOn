import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import eventsApi from "../../api/endpoints/events";
import Input from "../../components/Input";
import DotLoader from "../../components/Loader";

export default function EditEventPage() {
  const { id } = useParams();
  const [form, setForm] = useState(null);

  useEffect(() => {
    const loadEvent = async () => {
      try {
        const res = await eventsApi.getById(id);
        setForm(res.data);
      } catch (err) {
        console.error("Error loading event:", err);
      }
    };
    loadEvent();
  }, [id]);

  if (!form) return <div className="flex items-center justify-between"><DotLoader /></div>;
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const updateEvent = async () => {
    try {
      await eventsApi.update(id, form);
      alert("Updated successfully");
      window.location.href = "my-events";
    } catch (err) {
      alert("Failed to update event");
    }
  };

  return (
    <div className="p-6 max-w-xl space-y-3">
      <h1 className="text-2xl font-bold">Edit Event</h1>

      <Input className="input" name="title" value={form.title} onChange={handleChange} />
      <textarea className="w-full border rounded-lg px-3 py-2 focus:border-transparent" name="description"
        value={form.description} onChange={handleChange} />

      <Input className="input" type="date" name="date" value={form.date} onChange={handleChange} />
      <Input className="input" type="time" name="startTime" value={form.startTime} onChange={handleChange} />
      <Input className="input" type="time" name="endTime" value={form.endTime} onChange={handleChange} />
      <Input className="input" type="number" name="capacity" value={form.capacity} onChange={handleChange} />
      <button className="bg-black text-white px-4 py-2 rounded" onClick={updateEvent}>
        Save Changes
      </button>

    </div>
  )
}
