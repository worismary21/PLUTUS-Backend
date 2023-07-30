import express, { Request, Response, NextFunction } from "express";
import { Users } from '../models/user'
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

// import {database} from '../config/index'

dotenv.config();

export const userSignup =async (req: Request, res: Response, next: NextFunction)=>{
    
    const user =await Users.findAll();
    console.log(user)
    return res.status(200).json({user})
    
}

export const userLogin = async(req: Request, res: Response, next: NextFunction)=>{
    // UserMap(database);
    res.json("User Login")
}

export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    try {
        const user = await Users.findOne({email})
        if (!user) {
            return res.status(400).json({error: "User does not exist!"});
        }
        const token = jwt.sign({ email: user.email, _id: user._id }, process.env.RESET_PASSWORD_KEY, {
            expiresIn: '10m'})
        const data = {
            from: 'noreply@plutus.com',
            to: email,
            subject: "Account Reset Password Link",
            html: `
                <h2>Please click on given link to reset your password</h2>
                <p>${process.env.CLIENT_URL}/resetpassword/${token}</p>
            `
        }
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
