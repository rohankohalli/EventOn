import Events from "./Events.js";
import Users from "./Users.js";
import Reservations from "./Reservations.js";
import Venues from "./Venues.js";

// USER <> EVENT (Organizer relationship)
Users.hasMany(Events, {
    foreignKey: "organizerId",
});

Events.belongsTo(Users, {
    foreignKey: "organizerId",
});

// USER <> VENUE (Venue Owner relationship)
Users.hasMany(Venues, {
    foreignKey: "ownerId",
});

Venues.belongsTo(Users, {
    foreignKey: "ownerId",
});

// VENUE <> EVENT
Venues.hasMany(Events, {
    foreignKey: "venueId",
});

Events.belongsTo(Venues, {
    foreignKey: "venueId",
});

// USER <> EVENT (Attendee relationship via Reservation)
Users.belongsToMany(Events, {
    through: Reservations,
    foreignKey: "userId",
    otherKey: "eventId",
});

Events.belongsToMany(Users, {
    through: Reservations,
    foreignKey: "eventId",
    otherKey: "userId",
});

// USER <> RESERVATION
Users.hasMany(Reservations, {
    foreignKey: "userId",
});

Reservations.belongsTo(Users, {
    foreignKey: "userId",
});

// EVENT <> RESERVATION
Events.hasMany(Reservations, {
    foreignKey: "eventId",
});

Reservations.belongsTo(Events, {
    foreignKey: "eventId",
});

export { Events, Users, Venues, Reservations };
