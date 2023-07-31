import express, { Request, Response, NextFunction } from "express";
import User, { IUSER }  from '../model/user'
import {v4} from "uuid";
import { hashedPassword } from "./utils/auth";
import { genAccount} from "./utils/auth";
import { generateOTP } from './utils/auth'
import { emailHtml, sendmail } from './utils/notifications';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
dotenv.config()
// import {database} from '../config/index'

export const userSignup = async (req: Request, res: Response, next: NextFunction) => { 

    // TO CREATE USER
    try {
        const { firstName, lastName, email,password } = req.body 
       
        //CHECK IF THE NEW USER EMAIL ALREADY EXISTS 
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }

        //HASH THE PASSWORD
       
        const hashPassword: string = await hashedPassword(password);

        // Account number
        const accNumber: string = genAccount();

        // OTP
        const OTP = generateOTP()

        //CREATE THE NEW USER
        const newUser = await User.create({
            id: v4(),
            firstName,
            lastName,
            email,
            password: hashPassword,
            accountNumber: accNumber,
            savingsWallet: {id:v4(), amount:0},
            otp: OTP,
            token: "",
            imageUrl: "",
            notification: "",
            accountBalance: 0
        });

        //RETURN NEW USER
        const html = emailHtml(email, OTP)
            await sendmail(`${process.env.GMAIL_USER}`, email, "Welcome", html)
        return res.status(200).json({
            message:`User created successfully`,
            newUser
        });
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
    // const user = await Users.findAll();
    // console.log(user)
    
}

export const userLogin = async(req: Request, res: Response, next: NextFunction)=>{
    // UserMap(database);
    res.json("User Login")
}

export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
    const { email} = req.body;
    try {
        const user = await User.findOne({where:{email}}) as unknown as IUSER
        if (!user) {
            return res.status(400).json({error: "User does not exist!"});
        }
        const token = jwt.sign({ email: user.email, _id: user.id }, process.env.RESET_PASSWORD_KEY!, {
            expiresIn: '10m'})
       
            const html = `
                <h2>Please click on given link to reset your password</h2>
                <p>${process.env.CLIENT_URL}/resetpassword/${token}</p>
            `
      

        await sendmail(`${process.env.GMAIL_USER}`, email, "Welcome", html)
        return res.status(200).json({
            message: "Verification Sent",
            method:req.method
        })
        // return user.updateOne({ resetLink: token }, function (error, success) {
        //     if (error) {
        //         return res.status(400).json({ error: "result password link error" })
        //     } else {

        //     }
        // });

    } catch (error) {
        console.error(error);
    }
    res.json("Recover password")
}
