import Events from "../models/Events.js"
import Venues from "../models/Venues.js"

export const createEvent = async (req, res, next) => {
    try {
        const { title, description, startDate, endDate, startTime, endTime, capacity, venueId } = req.body

        const venue = await Venues.findByPk(venueId)
        if (!venue) return res.status(404).json({ message: "Venue Not Found" })

        const event = await Events.create({
            title, description, startDate, endDate, startTime, endTime, capacity, venueId, organizerId: req.user.id })
        res.status(201).json({ message: "Event Created", event })

    } catch (error) {
        console.error("Create Event Error:", error)
        res.status(500).json({ message: "Failed to Create Event" })
    }
}

export const getAllEvents = async (req, res, next) => {
    try {
        const events = await Events.findAll()
        res.json(events)
    } catch (error) {
        console.error("Get Events error:", error)
        res.status(500).json({ message: "Failed to fetch events" })
    }
}

export const getMyEvents = async (req, res, next) => {
    try {
        const events = await Events.findAll({ where: { organizerId: req.user.id } })
        res.json(events)
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch your events" })
    }
}

export const approveEvent = async (req, res, next) => {
    try {
        const event = await Events.findByPk(req.params.id)
        if (!event) return res.status(404).json({ message: "Event not found" })

        if (req.user.role !== "Admin")
            return res.status(403).json({ message: "Access Denied — Admin only" })

        await event.update({ approvalStatus: "Approved" })
        res.json({ message: "Event approved successfully", event })
    } catch (error) {
        console.error("Approve Event Error:", error)
        res.status(500).json({ message: "Failed to approve Event" })
    }
}

export const rejectEvent = async (req, res, next) => {
    try {
        const event = await Events.findByPk(req.params.id)
        if (!event) return res.status(404).json({ message: "Event not found" })

        if (req.user.role !== "Admin")
            return res.status(403).json({ message: "Access denied — Admin only" })

        await event.update({ approvalStatus: "Rejected" })
        res.json({ message: "Event rejected successfully", event })
    } catch (error) {
        console.error("Reject Event Error:", error)
        res.status(500).json({ message: "Failed to reject event" })
    }
}

export const cancelEventApproval = async (req, res, next) => {
    try {
        const event = await Events.findByPk(req.params.id)
        if (!event) return res.status(404).json({ message: "Event not found" })

        if (req.user.role !== "Admin")
            return res.status(403).json({ message: "Access denied — Admin only" })

        await event.update({ approvalStatus: "Cancelled" })
        res.json({ message: "Event approval cancelled", event })
    } catch (error) {
        console.error("Cancel Approval Error:", error)
        res.status(500).json({ message: "Failed to cancel approval" })
    }
}

export const getEventById = async (req, res, next) => {
    try {
        const event = await Events.findByPk(req.params.id, {
            include: {model:Venues}
        });

        if (!event) return res.status(404).json({ message: "Event not found" });

        res.json(event);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const updateEvent = async (req, res, next) => {
    try {
        const event = await Events.findByPk(req.params.id);

        if (!event) return res.status(404).json({ message: "Event not found" });

        if (req.user.role === "Organizer" && event.organizerId !== req.user.id) {
            return res.status(403).json({ message: "Not allowed" });
        }

        await event.update(req.body);

        res.json({ message: "Event updated", event });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const deleteEvent = async (req, res, next) => {
    try {
        const event = await Events.findByPk(req.params.id);

        if (!event) return res.status(404).json({ message: "Event not found" });

        if (req.user.role === "Organizer" && event.organizerId !== req.user.id) {
            return res.status(403).json({ message: "Not allowed" });
        }

        await event.destroy();

        res.json({ message: "Event deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
