import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Events = sequelize.define("Events", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description:{
        type:DataTypes.TEXT,
    },
    startDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    endDate: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    startTime: {
        type: DataTypes.TIME,
        allowNull: false
    },
    endTime: {
        type: DataTypes.TIME,
        allowNull: false
    },
    capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 1 }
    },
    eventStatus: {
        type: DataTypes.ENUM("Upcoming", "Completed", "Ongoing", "Cancelled"),
        defaultValue: "Upcoming"
    },
    approvalStatus: {
        type: DataTypes.ENUM("Pending", "Approved", "Rejected", "Cancelled"),
        defaultValue: "Pending"
    },
    bookingStatus: {
        type: DataTypes.ENUM("Requested", "Approved", "Rejected", "Cancelled"),
        defaultValue: "Requested",
    },
    organizerId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    venueId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    freezeTableName:true
})

export default Events
