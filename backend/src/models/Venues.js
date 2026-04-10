import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Venues = sequelize.define("Venues", {
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    location:{
        type:DataTypes.STRING,
        allowNull:false
    },
    capacity:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    pricePerHour:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    availability:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:0
    },
    bookingStatus:{
        type:DataTypes.ENUM("Pending", "Booked"),
        defaultValue:"Pending"
    },
    ownerId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    timestamps:false,
    freezeTableName:true
})

export default Venues