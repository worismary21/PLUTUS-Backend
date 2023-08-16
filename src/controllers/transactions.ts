import express, { Request, Response, NextFunction } from "express";
import Transfers from "../model/transfer";
import User from "../model/user";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { getPagination } from "./utils/pagination";

dotenv.config();



export const getAllExpenses = async (
     req: Request,
     res: Response,
     NextFunction: NextFunction) => {
     try {
          const token: any = req.headers.authorization;
          const token_info = token.split(" ")[1];
          const decodedToken: any = jwt.verify(token_info, process.env.APP_SECRET!);

          const user_Id = decodedToken.id

          if(user_Id){
               const user_TransactionsDetails: any = await Transfers.findAll({
                    where: {id: user_Id},
               })
               return res.status(200).json({
                    message:"All expenses for user",
                    user_TransactionsDetails
               })
          }else{
               return res.status(400).json({
                    message: "Log in to get transaction details"
               })
          }
     } catch (error) {
          console.error(error)
     }
};

export const getUserDetails = async (
     req: Request,
     res: Response,
     NextFunction: NextFunction) => {

     try {
          const token: any = req.headers.authorization;
          const token_info = token.split(" ")[1];
          const decodedToken: any = jwt.verify(token_info, process.env.APP_SECRET!);
          

          const user_Id = decodedToken.id
          

          if(user_Id){
               const user_Details: any = await User.findOne({
                    where: {id: user_Id},
               })
               return res.status(200).json({
                    message:"All user's details",
                    user_Details
               })
          }else{
               return res.status(400).json({
                    message: "Log in to get users details"
               })
          }
          
     } catch (error) {
          console.error(error)
     }
};

export const getAllIncome = async (
     req: Request,
     res: Response,
     NextFunction: NextFunction)=>{
          try {
               const token: any = req.headers.authorization;
               const token_info = token.split(" ")[1];
               const decodedToken: any = jwt.verify(token_info, process.env.APP_SECRET!);
          
               const user_Id = decodedToken.id


               if(user_Id){

                    const user_Details: any = await User.findOne({
                         where: {id: user_Id},
                    })

                    const userAccountNumber = user_Details.accountNumber

                    if(userAccountNumber){
                    const userIncome: any = await Transfers.findOne({
                         where: {accountNumber: userAccountNumber},
                    })


                         if(userIncome){
                              return res.status(200).json({
                                   message:"List of user's income",
                                   userIncome
                              })
                         }else{
                              return res.status(400).json({
                                   message: "No income yet"
                                   }) 
                         }

                    }else{
                         return res.status(400).json({
                         message: "Invalid account number"
                         })
                    }


               }else{
                    return res.status(400).json({
                         message: "Log in to get users income"
                    })
               
               }

               
          } catch (error) {
               console.error(error)
          }
}


export const getAllTransactions = async (req: Request, res: Response, next:NextFunction) => {
     try {
          const token: any = req.headers.authorization;
          const token_info = token.split(' ')[1];
          const decodedToken: any = jwt.verify(token_info, process.env.APP_SECRET!);

          const user_Id = decodedToken.id;

          if(user_Id) {
               const user_Details: any = await User.findOne({where: {id:user_Id}})
     

               const transfer_Details: any = await Transfers.findAll({where: {senderId:user_Id}})
             

               const userAccountNumber = user_Details.accountNumber;
               const senderId = user_Id
            

               if(userAccountNumber && senderId) {
                    const page = Number(req.query.page) || 1;
                    const limit = Number(req.query.limit) || 10;

                    const {offset, limit: paginationLimit} = getPagination({page, limit})

                    const getAllTransactions: any = await Transfers.findAndCountAll({
                         where: {senderId: senderId},
                         offset,
                         limit: paginationLimit
                    })

                    if(getAllTransactions) {
                         return res.status(200).json({
                              message: `User's transactions`,
                              transactions: getAllTransactions.rows,
                              totalCount: getAllTransactions.count,
                              currentPage: page,
                              totalPages: Math.ceil(getAllTransactions.count / limit)
                         })
                    }
               } else {
                    return res.status(400).json({message: 'No such user present'})
               }
          } else {
               return res.status(400).json({message: 'Login to get users transactions'})
          }
     } catch (error) {
          return res.status(500).json({message: 'An error occurred'})
     }
}