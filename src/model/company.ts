import { DataTypes, Model, Sequelize } from "sequelize"
import { db } from "../config"
import Investor from "./investor"


export type ICOMPANY = {
    id:string,
    companyName:string,
    company_description:string,
    email:string,
    password:string,
    otp: string,
    accountNumber:string,
    wallet:number,
    verified:boolean,
    user_type: string,
    active:boolean,
    businessType:string,
    roi:number
}

class Company extends Model<ICOMPANY>{
    public static associate(models: { Investor: typeof Investor }): void {
        Company.hasMany(models.Investor, {foreignKey:'companyId', as:'Company'} )
    }
}

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
    company_description:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    otp:{
        type:DataTypes.STRING,
        allowNull:false
    },
    accountNumber:{
        type:DataTypes.STRING,
        allowNull:false
    },
    wallet:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    verified:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    },
    user_type:{
        type:DataTypes.STRING,
        allowNull:false
    },
   active:{
        type:DataTypes.BOOLEAN,
        allowNull:false
   },
   businessType:{
    type:DataTypes.STRING,
    allowNull:false,
    },
    roi:{
        type:DataTypes.FLOAT,
        allowNull:false
    },
}, {
    sequelize:db,
    tableName:"Company"
})

export default Company









// id:string,
// companyName:string,
// company_description:string,
// investment_description:string
// rateOfReturn:number,
// duration:string ,
// email:string,
// password:string,
// otp: string,
// accountNumber:string,
// wallet:number,
// verified:boolean,
// user_type: "company"
// active:boolean,
// businessType:string,



// export enum Duration {
//     THREE_MONTH = "3 Month",
//     SIX_MONTH = "6 Month",
//     TWELVE_MONTH = "12 Month",
//     DEFAULT = ""

//   }

// export enum BusinessType {
//     AGRICULTURE = "Agriculture",
//     MANUFACTURING = "Manufacturing",
//     MINING = "Mining",
//     TRANSPORTATION = "Transportation",
//     CONSTRUCTION = "Construction",
//     FINANCE = "Finance",
//     REAL_ESTATE = "Real Estate",
//     EDUCATION = "Education",
//     HEALTH_CARE = "Health Care",
//     INFORMATION_TECHNOLOGY = "Information Technology",
//     COMMUNICATION = "Communication",
//     ENTERTAINMENT = "Entertainment",
//     HOSPITALITY = "Hospitality",
//     RETAIL = "Retail",
//     OTHERS = "Others",
//     DEFAULT = "",
// }

