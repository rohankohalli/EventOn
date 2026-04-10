import Events from "../models/Events.js"
import Venues from "../models/Venues.js"

export const createVenue = async (req, res, next) => {
    try {
        const { name, location, capacity, pricePerHour } = req.body

        const venue = await Venues.create({ name, location, capacity, pricePerHour, ownerId: req.user.id })

        res.status(201).json({ message: "Venue Added Successfully", venue })
    } catch (error) {
        next(error)
    }
}

export const getAllVenues = async (req, res, next) => {
    try {
        const venues = await Venues.findAll()
        res.json(venues)
    } catch (error) {
        next(error)
    }
}

export const getMyVenues = async (req, res, next) => {
    try {
        const venues = await Venues.findAll({ where: { ownerId: req.user.id } })
        res.json(venues)
    } catch (error) {
        next(error)
    }
}

export const updateVenue = async (req, res, next) => {
    try {
        const venue = await Venues.findByPk(req.params.id);
        if (!venue) return res.status(404).json({ message: "Venue Not Found" });

        await venue.update(req.body);
        res.json({ message: "Venue Updated", venue });
    } catch (err) {
        // res.status(500).json({ message: "Failed To Update Venue" });
        next(err)
    }
}

export const deleteVenue = async (req, res, next) => {
    try {
        const venue = await Venues.findByPk(req.params.id);
        if (!venue) return res.status(404).json({ message: "Venue Not Found" });
        if (venue.ownerId !== req.user.id)
            return res.status(403).json({ message: "Not Authorized" });

        await venue.destroy();
        res.json({ message: "Venue Deleted" });
    } catch (err) {
        // res.status(500).json({ message: "Failed To Delete Venue" });
        next(err)
    }
}

export const getVenueById = async (req, res, next) => {
    try {
        const venue = await Venues.findByPk(req.params.id, {
            include: [{model:Events}]
        });

        if (!venue) return res.status(404).json({ message: "Venue not found" });

        res.json(venue);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export const getVenueEvents = async (req, res, next) => {
    try {
        const events = await Events.findAll({
            where: { venueId: req.params.id }
        });

        res.json(events);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

