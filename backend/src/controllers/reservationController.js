import sequelize from '../config/db.js'
import Events from '../models/Events.js'
import Reservations from '../models/Reservations.js'
import Users from '../models/Users.js'

export const createReservation = async (req, res, next) => {
    const t = await sequelize.transaction()
    try {
        const { eventId, quantity } = req.body

        const event = await Events.findByPk(eventId, {
            transaction: t,
            lock: t.LOCK.UPDATE
        })

        if (!event) {
            await t.rollback()
            return res.status(404).json({ message: "Event not found" })
        }
        if (event.approvalStatus !== "Approved"){
            return res.status(403).json({ message: "Event not approved for reservations yet" })
        }

        if (["Completed", "Cancelled"].includes(event.eventStatus)) {
            await t.rollback();
            return res.status(400).json({ message: "Event not open" });
        }

        const totalReservedSeats = await Reservations.sum("quantity", {
            where: { eventId, status: "Reserved" },
            transaction: t,
            lock: t.LOCK.UPDATE
        })
        const available = event.capacity - (totalReservedSeats || 0)

        let status = available >= quantity ? "Reserved" : "Waitlisted";
        
        const existing = await Reservations.findOne({
            where: { userId: req.user.id, eventId },
            transaction: t,
            lock: t.LOCK.UPDATE
        })

        let reservations;

        if (existing) {
            const newQty = existing.quantity + quantity
            if (available < quantity) status = "Waitlisted"
            await existing.update({ quantity: newQty, status }, {transaction: t})
            return res.json({
                message: `Reservation updated — total ${newQty} seat(s).`,
                reservation: existing,
            })
        }

        else {
            reservations = await Reservations.create(
                {
                    userId: req.user.id,
                    eventId,
                    quantity,
                    status,
                },
                { transaction: t }
            );
        }

        await t.commit()

        return res.status(201).json({
            message: `Reservation ${status === "Waitlisted" ? "waitlisted" : "successful"}.`,
            reservations,
        });

    } catch (error) {
        await t.rollback();
        next(error);
    }
}

export const getMyReservations = async (req, res, next) => {
    try {
        const reservations = await Reservations.findAll({
            where: { userId: req.user.id },
            include: { model: Events },
        })
        res.status(200).json(reservations)
    } catch (error) {
        next(error)
    }
}

export const getAllReservations = async (req, res, next) => {
    try {
        const reservations = await Reservations.findAll({
            attributes: { exclude: ["updatedAt", "createdAt"] },
            include: [
                { model: Events, attributes: ["id", "title"] },
                { model: Users, attributes: ["id", "name", "role"] }
            ]
        })
        res.json(reservations)
    } catch (err) {
        console.error(err)
        next(err)
    }
}

export const getEventReservations = async (req, res, next) => {
    try {
        const event = await Events.findByPk(req.params.eventId)
        if (!event) return res.status(404).json({ message: "Event not found" })

        if (req.user.role !== "Admin" && req.user.id !== event.organizerId)
            return res.status(403).json({ message: "Access denied" })

        const reservations = await Reservations.findAll({
            where: { eventId: event.id },
            include: { model: Events },
        })

        res.json(reservations)
    } catch (error) {
        next(error)
    }
}

export const cancelReservation = async (req, res, next) => {
    try {
        const { cancelQuantity = 1 } = req.body
        const reservation = await Reservations.findByPk(req.params.id)

        if (!reservation)
            return res.status(404).json({ message: "Reservation not found" })

        if (reservation.userId !== req.user.id)
            return res.status(403).json({ message: "You cannot cancel this reservation" })

        if (reservation.status === "Cancelled")
            return res.status(400).json({ message: "Reservation already cancelled" })

        if (cancelQuantity < 1)
            return res.status(400).json({ message: "Cancel quantity must be at least 1" })

        if (cancelQuantity > reservation.quantity)
            return res.status(400).json({
                message: `You only have ${reservation.quantity} seat(s) reserved.`,
            })

        const event = await Events.findByPk(reservation.eventId)
        if (!event) return res.status(404).json({ message: "Event not found" })

        if (["Ongoing", "Completed", "Cancelled"].includes(event.eventStatus)) {
            return res.status(400).json({
                message: `Cannot cancel reservations for ${event.eventStatus.toLowerCase()} events.`,
            })
        }

        const newQty = reservation.quantity - cancelQuantity

        if (newQty === 0) {
            await reservation.update({ status: "Cancelled", quantity: 0 })
            // return res.json({
            //     message: "All seats cancelled. Reservation marked as Cancelled",
            //     reservation,
            // })
        } else {
            await reservation.update({ quantity: newQty })
            // return res.json({
            //     message: `Cancelled ${cancelQuantity} seat(s). ${newQty} remaining.`,
            //     reservation,
            // })
        }

        const totalReservedSeats = await Reservations.sum("quantity", {
            where: { eventId: event.id, status: "Reserved" },
        })
        const availableSeats = event.capacity - (totalReservedSeats || 0)

        if (availableSeats > 0) {
            const waitlistedUsers = await Reservations.findAll({
                where: { eventId: event.id, status: "Waitlisted" },
                order: [["createdAt", "ASC"]],
                limit: availableSeats,
            })

            let promotedCount = 0
            for (const w of waitlistedUsers) {
                // Promote whole reservation if it fits, or partially
                if (w.quantity <= availableSeats - promotedCount) {
                    await w.update({ status: "Reserved" })
                    promotedCount += w.quantity
                }
            }

            if (promotedCount > 0) {
                console.log(`Promoted ${promotedCount} seat(s) from waitlist → reserved`)
            }
        }

        res.json({
            message: newQty === 0 ? "All seats cancelled. Reservation marked as Cancelled"
                : `Cancelled ${cancelQuantity} seat(s). ${newQty} remaining.`,
        })
    } catch (error) {
        next(error)
    }
}

export const getReservationById = async (req, res) => {
    try {
        const reservation = await Reservations.findByPk(req.params.id, {
            include: [{ model: Events }, { model: Users }]
        })

        if (!reservation) {
            return res.status(404).json({ message: "Reservation not found" })
        }

        // User can only view their own reservation
        if (req.user.role === "User" && reservation.userId !== req.user.id) {
            return res.status(403).json({ message: "Not allowed" })
        }

        res.json(reservation)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

export const deleteReservation = async (req, res) => {
    try {
        const reservation = await Reservations.findByPk(req.params.id)

        if (!reservation) {
            return res.status(404).json({ message: "Reservation not found" })
        }

        await reservation.destroy()
        res.json({ message: "Reservation deleted" })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
