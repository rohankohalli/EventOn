import Events from "../models/Events.js";
import { Op } from "sequelize";

export const eventStatuses = async () => {
    try {
        const now = new Date();

        const events = await Events.findAll({
            where: {
                approvalStatus: "Approved",
                eventStatus: { [Op.notIn]: ["Cancelled", "Completed"] },
            },
        });

        for (const event of events) {
            const eventDate = new Date(event.date);
            const [startHour, startMinute] = event.startTime.split(":").map(Number);
            const [endHour, endMinute] = event.endTime.split(":").map(Number);

            const startDateTime = new Date(eventDate);
            startDateTime.setHours(startHour, startMinute, 0, 0);

            const endDateTime = new Date(eventDate);
            endDateTime.setHours(endHour, endMinute, 0, 0);

            if (endDateTime < startDateTime) {
                endDateTime.setDate(endDateTime.getDate() + 1);
            }

            let newStatus = event.eventStatus

            if (now < startDateTime) newStatus = "Upcoming";
            else if (now >= startDateTime && now <= endDateTime) newStatus = "Ongoing";
            else if (now > endDateTime) newStatus = "Completed"

            if (newStatus !== event.eventStatus) {
                await event.update({ eventStatus: newStatus });
                console.log(`Event #${event.id}: ${event.title} → ${newStatus}`);
            }
        }
        console.log("Event status update complete");
    } catch (error) {
        console.error("Error updating event statuses:", error);
    }
};
