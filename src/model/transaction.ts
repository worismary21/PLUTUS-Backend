import { DataTypes, Model, Sequelize } from "sequelize"
import { db } from "../config"
import Company from "./company"



export type TRANSACTIONS = {
    id:string,
    transactionId:string,
    senderAccountNum:string,
    receiverAccountNum:string,
    email:string,
    investedCapital:number,
    expectedReturn:number,
    monthlyReturn:number,
    active: boolean,
    companyId:string
}

class Transaction extends Model<TRANSACTIONS>{
    public static associate(models: { Company: typeof Company }): void {
     Transaction.belongsTo(models.Company, {foreignKey:'companyId', as:'Company'} )
    }
}

Transaction.init({
    id:{
        type:DataTypes.UUID,
        primaryKey:true,
        allowNull:false
    },
    transactionId:{
        type:DataTypes.STRING,
        allowNull:false
    },
    senderAccountNum:{
        type:DataTypes.STRING,
        allowNull:false
    },
    receiverAccountNum:{
        type:DataTypes.STRING,
        allowNull:true
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    investedCapital:{
        type:DataTypes.FLOAT,
        allowNull:true
    },
    expectedReturn:{
        type:DataTypes.FLOAT,
        allowNull:true
    },
    monthlyReturn:{
        type:DataTypes.FLOAT,
        allowNull:true
    },
    active:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    },
    companyId:{
        type:DataTypes.UUID,
        references: {
            model: Company,
            key: "id"
        }
    }


}, {
    sequelize:db,
    tableName:"Transactions",
    modelName:"Transactions"
})





export default Transaction
