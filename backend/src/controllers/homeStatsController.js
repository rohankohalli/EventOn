import Events from "../models/Events.js"
import Reservations from "../models/Reservations.js"
import Venues from "../models/Venues.js"

const getHomeStats = async (req , res, next) => {
    try {
        const { role, id } = req.user
        let stats = []
        let recent = []

        if (role === "User") {
            const active = await Reservations.count({
                where: { userId: id, status: "Reserved" },
            })
            const waitlisted = await Reservations.count({
                where: { userId: id, status: "Waitlisted" },
            })

            const recentRes = await Reservations.findAll({
                where: { userId: id },
                include: [{ model: Events, attributes: ["title"] }],
                order: [["createdAt", "DESC"]],
                limit: 3,
            })

            stats.primary = `You have ${active} active reservation(s)`
            if (waitlisted > 0) stats.secondary = `${waitlisted} waitlisted`

            recent = recentRes.map(r => `Reservation for '${r.Event?.title}' (${r.status})`)
        }

        if (role === "Organizer") {
            const total = await Events.count({ where: { organizerId: id } })
            const pending = await Events.count({ where: { organizerId: id, approvalStatus: "Pending" } })

            const recentEvents = await Events.findAll({ where: { organizerId: id }, order: [["createdAt", "DESC"]], limit: 3 })

            stats.primary = `You have ${total} event(s)`;
            if (pending > 0) stats.secondary = `${pending} pending approval`

            recent = recentEvents.map(e => `Event '${e.title}' (${e.approvalStatus})`)
        }

        if (role === "Owner") {
            const total = await Venues.count({ where: { ownerId: id } })

            const recentVenues = await Venues.findAll({ where: { organizerId: id }, order: [["createdAt", "DESC"]], limit: 3 })
            
            stats.primary = `You have ${total} venue(s) listed`
            recent = recentVenues.map(v => `Venue '${v.name}' added`)
        }

        if (role === "Admin") {
            const pending = await Events.count({ where: { approvalStatus: "Pending" } })

            const recentPending = await Events.findAll({ where: { approvalStatus: "Pending" }, order: [["createdAt", "DESC"]],
                limit: 3,})

            stats.primary = `There are ${pending} event(s) pending approval`;
            recent = recentPending.map(e => `Pending event '${e.title}'`)
        }

        res.json({ stats, recent })

    } catch (error) {
        next(error)
    }
}
export default getHomeStats