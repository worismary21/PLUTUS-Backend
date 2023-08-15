import express, { Request, Response, NextFunction } from "express";
import Investor, {INVESTOR} from "../model/investor";
import dotenv from "dotenv";
import { generateOTP, tokenGenerator, verifyToken } from "./utils/auth";
import { v4 } from "uuid";
import jwt, { JwtPayload } from "jsonwebtoken";
import { emailHtml, sendmail } from "./utils/notifications";
import Company from "../model/company";


export const getInvestor = async (req: Request, res: Response) => {
    try {
 
     const token: any = req.headers.authorization;
     const token_info = token.split(" ")[1];
     const decodedToken: any = jwt.verify(token_info, process.env.APP_SECRET!);

     
     const companyId = decodedToken.id;
 
      const investor = await Investor.findAll({ where: { id : companyId } });
      if(investor){
        
        return  res.status(200).json({
            message:"Fetching Investor Successfully",
            data: investor
        })
        }else{
            res.status(400).json({
            message: "Error Fetching Investor"
            }); 
        }
     
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };






// export const createInvestor = async (req: Request, res: Response) => {

//     try {
//       const { 
//         firstName,
//         lastName,
//         accountNumber,
//         email,
//         investedCapital,
//         expectedReturn,
//         monthlyReturn,

//     }  = req.body

//         const companyId = req.params.id

//         const existingCompany = await Company.findOne({where : {id : companyId}})

//         if(!existingCompany){
//             return res.status(400).json({
//                 message: "Invalid already exists"
//              }); 
//         }

        

//         const existingInvestor = await Investor.findOne({ where: { email } }) as unknown as INVESTOR;

//         if(!existingInvestor){
//             return res.status(400).json({
//                 message: "Invalid already exists"
//              }); 
//         }

//           // OTP
//         const OTP = generateOTP()

//         const newInvestor = await Investor.create({
//             id : v4(),
//             firstName,
//             lastName,
//             accountNumber,
//             email,
//             investedCapital,
//             expectedReturn,
//             monthlyReturn,
//             active: true,
//             companyId,
//             otp: OTP
//         }) as unknown as INVESTOR;

//         const investor = await Investor.findOne({ where: { email } }) as unknown as INVESTOR

//          const token = jwt.sign({ email: investor.email, id: investor.id }, process.env.APP_SECRET!, {
//             expiresIn: '1d'})


//         //RETURN NEW INVESTOR
//             const html = emailHtml(email, OTP)
//             await sendmail(`${process.env.GMAIL_INVESTOR}`, email, "Welcome", html)
//             return res.status(200).json({
//                 message:`User created successfully`,
//                 newInvestor,
//                 token
//             });


//     } catch (error) {
//         console.log(error);
//     }
// }