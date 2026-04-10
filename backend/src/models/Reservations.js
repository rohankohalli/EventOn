import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Reservations = sequelize.define("Reservations", {
    id:{
        type:DataTypes.UUID,
        primaryKey:true,
        defaultValue:DataTypes.UUIDV1
    },
    quantity:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        validate: { min: 1 },
    },
    status:{
        type:DataTypes.ENUM("Reserved", "Cancelled", "Waitlisted")
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    eventId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    timestamps:true,
    freezeTableName:true
})

export default Reservations