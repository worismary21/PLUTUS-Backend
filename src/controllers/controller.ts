import express, { Request, Response, NextFunction } from "express";
import User, { IUSER }  from '../model/user'
import {v4} from "uuid";
import { generateToken, hashedPassword, resetPasswordOTP, verifyToken } from "./utils/auth";
import { genAccount} from "./utils/auth";
import { generateOTP } from './utils/auth'
import {emailHtml, sendmail} from './utils/notifications';
import nodemailer from 'nodemailer'
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

export const forgotPassword = async(req: Request, res: Response, next: NextFunction)=>{
    res.json("Recover password")
}


export const reqResetPasswordOTP = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.DEV_GMAIL_USER,
                pass: process.env.DEV_GMAIL_PASSWORD
            }
        });
    
        const { email } = req.body;
    
        // Find user based on email
        const user = await User.findOne({ where: { email } });
    
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
    
        // Generate a random four-digit OTP
        const otp = resetPasswordOTP(); // You need to implement this function
    
        // Generate token for the user (assuming generateToken is asynchronous)
        const token = await generateToken(user.get()); // Get plain object of the user from the query result
    
        // Compose mail
        const mailOptions = {
            from: process.env.DEV_GMAIL_USER,
            to: user.get().email,
            subject: 'Password Reset OTP',
            text: `Your OTP for password reset is: ${otp}`
        };
    
        // Send email
        transporter.sendMail(mailOptions, (error) => {
            if (error) {
                console.log('Error sending email:', error);
                return res.status(500).json({ message: 'Error sending OTP email' });
            }
    
            return res.status(200).json({ message: 'OTP sent successfully' });
        });
    
    } catch (error) {
        return res.status(401).json({ message: 'Invalid User' });
    }
};


export const verifyResetPasswordOTP = async (req: Request, res: Response, next: NextFunction) => {
    const { email, otp, newPassword } = req.body;

    try {
        // Find user based on email
        const user = await User.findOne({ where: { email } }) as unknown as IUSER

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Verify OTP
        const decoded = verifyToken(otp);

        if (!decoded || decoded?.OTP !== otp) {
            return res.status(401).json({ message: 'Invalid OTP' });
        }

        if (Date.now() / 1000 > decoded.exp) {
            return res.status(401).json({ message: 'OTP has expired' });
        }

        // Check password
        if (newPassword === user.password) {
            return res.status(400).json({ message: 'NewPassword cannot be the same as OldPassword' });
        }

        // Update the user's password using the Sequelize update method
        await User.update(
            { password: newPassword },
            { where: { id: user.id } }
        );

        return res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
};