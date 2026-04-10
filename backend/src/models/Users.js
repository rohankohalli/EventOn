import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Users =  sequelize.define("Users", {
    id:{
        primaryKey:true,
        type:DataTypes.INTEGER,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    dateOfBirth:{
        type:DataTypes.DATEONLY,
        allowNull:false
    },
    mobileNo:{
        type:DataTypes.BIGINT,
        allowNull:false,
        unique:true
    },
    role:{
        type:DataTypes.ENUM("Admin", "User", "Organizer", "VenueOwner"),
        defaultValue:"User",
        allowNull:false
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    status:{
        type:DataTypes.ENUM("Active", "Inactive", "Banned", "Disabled"),
        defaultValue:"Active",
        allowNull:false
    },
    refreshToken:{
        type:DataTypes.STRING
    },
    avatar:{
        type: DataTypes.ENUM("avatar_1", "avatar_2", "avatar_3", "avatar_4"),
        allowNull:false
    },
    sidebarPinned:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:0
    },
    theme:{
        type:DataTypes.ENUM("light", "dark", "system"),
        allowNull:false,
        defaultValue:"system"
    }
}, {
    timestamps:true,
    freezeTableName:true
})

export default Users
