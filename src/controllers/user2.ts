import {Request, Response} from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from '../model/user'
import Transfers from '../model/transfer'
import Beneficiary from '../model/beneficiary'

dotenv.config()

export const getUsersBalance = async(req:Request, res:Response) => {

        try{
            const token:any = req.headers.authorization
                const payload = token.split(" ")[1]
                const user_details:any = jwt.verify(payload, process.env.APP_SECRET!)
            
                if(user_details.id){
                    const user_id = user_details.id
                   
                    const user_info:any = await User.findOne({ where: { id:user_id}})
            
                    const user_account_Balance = user_info.accountBalance
                    const user_account_Savings_Wallet_Balance = user_info.savingsWallet.amount
            
                    return res.status(200).json({
                        data: {
                            "account_balance": user_account_Balance,
                            "savings_wallet": user_account_Savings_Wallet_Balance
                        }
                    })
                }else{
                    res.status(400).json({
                        message: "Please LOGIN to get your information"
                    })
                }  
    
        }catch(error){
            console.error(error)
            res.status(500).json({
                message: "Internal Server Error"
            })   
        }
        
}

// Allows Users to see Total Balance, Total Savings, Transactions History, savings goals and beneficiaries. 

export const getUsersInfo = async(req:Request, res:Response) => {
    try{
        const token:any = req.headers.authorization

            const payload = token.split(" ")[1]
            const user_details:any = jwt.verify(payload, process.env.APP_SECRET!)
        
            if(user_details.id){
                const user_id = user_details.id
                const user_info:any = await User.findOne({ where: { id:user_id}})
        
                const user_account_Balance = user_info.accountBalance
                const user_account_Savings_Wallet_Balance = user_info.savingsWallet.amount
    
                const user_transactions = await Transfers.findAll({where: { senderId: user_id}})
                const user_beneficiary = await Beneficiary.findAll({ where: { userId: user_id}})
        
                return res.status(200).json({
                    data: {
                        "account_balance": user_account_Balance,
                        "savings_wallet": user_account_Savings_Wallet_Balance,
                        "transactions_history": user_transactions,
                        "beneficiary": user_beneficiary
                    }
                })
            }else{
                res.status(400).json({
                    message: "Please LOGIN to get your information"
                })
            }

    }catch(error){
        console.error(error)
        res.status(500).json({
            message: "Internal Server Error"
        })      
    }
}






















































