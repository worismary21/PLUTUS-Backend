import { DataTypes, Model, Sequelize } from "sequelize"
import { db } from "../config"

type Saving = {
    id:string,
    amount:number,
}

export type IPROFILE = {
    id:string,
    companyName:string,
    email:string,
    imageUrl?:string,
    phoneNumber:string,
    address:string,
    zipCode:string,
    city:string,
    state:string,
    country:string
}

class companyProfile extends Model<IPROFILE>{
  
}

companyProfile.init({
    id:{
        type:DataTypes.UUID,
        primaryKey:true,
        allowNull:false
    },
    companyName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    imageUrl:{
        type:DataTypes.STRING,
        allowNull:true
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    zipCode: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    city: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    state: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    country: {
        type: DataTypes.STRING,
        allowNull: true,
      },
},{
    sequelize:db,
    tableName:"Company"
    
})