import { DataTypes, Model, Sequelize } from "sequelize"
import { db } from "../config"
import User from "./user"
import { v4 as uuidV4 } from "uuid";
import Investor from "./investor";

export enum Duration {
    THREE_MONTH = "3 Month",
    SIX_MONTH = "6 Month",
    TWELVE_MONTH = "12 Month",
    DEFAULT = ""

  }

export enum BusinessType {
    AGRICULTURE = "Agriculture",
    MANUFACTURING = "Manufacturing",
    MINING = "Mining",
    TRANSPORTATION = "Transportation",
    CONSTRUCTION = "Construction",
    FINANCE = "Finance",
    REAL_ESTATE = "Real Estate",
    EDUCATION = "Education",
    HEALTH_CARE = "Health Care",
    INFORMATION_TECHNOLOGY = "Information Technology",
    COMMUNICATION = "Communication",
    ENTERTAINMENT = "Entertainment",
    HOSPITALITY = "Hospitality",
    RETAIL = "Retail",
    OTHERS = "Others",
    DEFAULT = "",
}

export type ICOMPANY = {
    id:string,
    companyName:string,
    description:string,
    rateOfReturn:number,
    duration:string ,
    email:string,
    password:string,
    verified:boolean,
    active:boolean,
    businessType:string,
}

class Company extends Model<ICOMPANY>{}

Company.init({
    id:{
        type:DataTypes.UUID,
        primaryKey:true,
        allowNull:false
    },
    companyName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false
    },
    rateOfReturn:{
        type:DataTypes.FLOAT,
        allowNull:false
    },
    duration:{
        type:DataTypes.ENUM(...Object.values(Duration)),
        allowNull:true,
        defaultValue:Duration.DEFAULT
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    verified:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    },
   active:{
        type:DataTypes.BOOLEAN,
        allowNull:false
   },
   businessType:{
    type:DataTypes.ENUM(...Object.values(BusinessType)),
    allowNull:true,
    defaultValue:BusinessType.DEFAULT
}


}, {
    sequelize:db,
    tableName:"Company"
})

Company.hasMany(Investor, { foreignKey: "companyId", as: "Investor" })

export default Company