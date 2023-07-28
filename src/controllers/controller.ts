import express, { Request, Response, NextFunction } from "express";
import {Users} from '../models/user'
// import {database} from '../config/index'

export const userSignup =async (req: Request, res: Response, next: NextFunction)=>{
    
    const user =await Users.findAll();
    console.log(user)
    return res.status(200).json({user})
    
}

export const userLogin = async(req: Request, res: Response, next: NextFunction)=>{
    // UserMap(database);
    res.json("User Login")
}

export const forgotPassword = async(req: Request, res: Response, next: NextFunction)=>{
    res.json("Recover password")
}
