import express, { Request, Response, NextFunction } from "express";
import Company, { BusinessType, ICOMPANY } from "../model/company";
import User, { IUSER } from "../model/user";
import { v4 } from "uuid";
import { hashedPassword } from "./utils/auth";
import { genAccount, tokenGenerator } from "./utils/auth";
import { generateOTP, } from "./utils/auth";
import { emailHtml, sendmail } from "./utils/notifications";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Duration from "../model/company";
dotenv.config();




export const createCompany = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const {
        companyName,
        description,
        rateOfReturn,
        duration,
        email,
        password,
        businessType,
      } = req.body;
  
      const findCompany = (await Company.findOne({
        where: { companyName },
      })) as unknown as ICOMPANY;
  
      if (findCompany) {
        return res.status(400).json({
          message: `Company already exists`,
        });
      }
  
      const OTP = generateOTP();
  
      let newCompany = (await Company.create({
        id: v4(),
        companyName,
        description,
        rateOfReturn,
        duration,
        email,
        password,
        verified: true,
        active: true,
        businessType,
      })) as unknown as ICOMPANY;
  
    //   const html = emailHtml(email, OTP);
    //   await sendmail(`${process.env.GMAIL_USER}`, email, "Welcome", html);
      return res.status(200).json({
        message: `Company created successfully`,
        newCompany,
      });
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };
  