import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const RoleApplications = sequelize.define("RoleApplications", {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true
    },
    requestedRole: {
        type: DataTypes.ENUM("Organizer", "VenueOwner"),
        allowNull: false
    },
    businessName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    details: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM("Pending", "Approved", "Rejected"),
        defaultValue: "Pending",
        allowNull: false
    }
}, {
    timestamps: true,
    freezeTableName: true
});

export default RoleApplications;
