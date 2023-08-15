import express, { Request, Response, NextFunction } from "express";
import Company, { ICOMPANY } from "../model/company";
import User, { IUSER } from "../model/user";
import { v4 } from "uuid";
import { hashedPassword } from "./utils/auth";
import { genAccount, tokenGenerator } from "./utils/auth";
import { generateOTP, } from "./utils/auth";
import { sendmail, emailHtmlForCompany } from "./utils/notifications";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Duration from "../model/company";
import { companyAccount } from "./utils/auth";
import Joi from "joi";
import { getPagination } from "./utils/pagination";

dotenv.config();

export const createCompany = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {

      const {
        companyName,
        company_description,
        email,
        password,
        businessType,
        roi
      } = req.body;
  
      const findCompany = (await Company.findOne({
        where: { email },
      })) as unknown as ICOMPANY;
  
      if (findCompany) {
        return res.status(400).json({
          message: `You are already a registered user`,
        });
      }else{
        const OTP = generateOTP();
        const company_account_number: string = companyAccount();

        let newCompany = (await Company.create({
          id:v4(),
          companyName,
          company_description,
          email,
          password,
          otp: OTP,
          accountNumber: company_account_number,
          wallet: 0,
          verified: true,
          user_type: "company",
          active: true,
          businessType,
          roi
        })) as unknown as ICOMPANY;
    
        if(newCompany){
          const html = emailHtmlForCompany(companyName, OTP)
          await sendmail(`${process.env.DEV_GMAIL_USER}`, email, "Welcome", html);
          return res.status(200).json({
            message: `Company created successfully`,
            data: newCompany
          });
        }
        }
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };


  export const deleteCompany = async (req: Request, res:Response, next: NextFunction) => {
    const companyId = req.params.id
    try {
      const company = await Company.findByPk(companyId)

      if(!company) {
        return res.status(404).json({message: 'Company does not exist'})
      }

      await company.destroy()
      res.status(200).json({message: 'Company deleted successfully'})
      
    } catch (error) {
      console.log('Error deleting company:', error)
      res.status(500).json({message: 'Internal server error'})
    }
  }


  export const getAllCompanies = async (req: Request, res: Response, next: NextFunction) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const {offset, limit: paginationLimit} = getPagination({page, limit})

    try {
      const companies = await Company.findAndCountAll({offset, limit: paginationLimit})

      return res.json({
        totalCompanies: companies.count,
        totalPages: Math.ceil(companies.count / limit),
        currentPage: page,
        data: companies.rows
      })
    } catch (error) {
      return res.status(500).json({error: 'Internal server error'})
    }
  }