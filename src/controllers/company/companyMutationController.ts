import express, { Request, Response, NextFunction } from "express";
import Company, { ICOMPANY } from "../../model/company";
import User, { IUSER } from "../../model/user";
import { v4 } from "uuid";
import { hashedPassword } from "../../utils/auth";
import { generateOTP } from "../../utils/auth";
import { sendmail, emailHtmlForCompany } from "../../utils/notifications";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { companyAccount } from "../../utils/auth";
import Joi from "joi";
import bcrypt from "bcrypt";
import { createCompanySchema } from "../../utils/inputvalidation";

dotenv.config();

//Controller For Creating Company
export const createCompany = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const schema = createCompanySchema
      const { error, value } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
  
      console.log("hello")
      const token: any = req.headers.authorization;
      const token_info = token.split(" ")[1];
      const decodedToken: any = jwt.verify(token_info, process.env.APP_SECRET!);

      const userId = decodedToken.id
      const user_details:any = await User.findOne({
        where: { id: userId}
      }) 
      const user_role = user_details.role

      if (decodedToken) {
        const {
          companyName,
          company_description,
          email,
          password,
          businessType,
          roi,
          investment_category,
          investment_description,
          duration,
          min_investment_amount,
          max_investment_amount,
        } = req.body;
  
        const findCompany = (await Company.findOne({
          where: { email: email, companyName: companyName },
        })) as unknown as ICOMPANY;
  
        if (findCompany) {
          return res.status(400).json({
            message: `${companyName} has already been registered.`,
          });
        } else {
          if (user_role=== "admin") {
            const OTP = generateOTP();
  
            const company_account_number: string = companyAccount();
  
            const hashPassword: string = await hashedPassword(password);
  
            let newCompany = (await Company.create({
              id: v4(),
              companyName,
              company_description,
              email,
              password: hashPassword,
              otp: OTP,
              accountNumber: company_account_number,
              wallet: 0,
              verified: true,
              role: "company",
              active: true,
              businessType,
              roi,
              noOfInvestors: 0,
              investment_category,
              investment_description,
              duration,
              min_investment_amount,
              max_investment_amount,
            })) as unknown as ICOMPANY;
  
            const company_dets = (await Company.findOne({
              where: { email },
            })) as unknown as ICOMPANY;
  
            if (newCompany) {
              const html = emailHtmlForCompany(companyName, email, password);
              await sendmail(
                `${process.env.DEV_GMAIL_USER}`,
                email,
                "Welcome",
                html
              );
              return res.status(200).json({
                message: `${companyName} created successfully`,
                data: newCompany,
              });
            }
          } else {
            return res.status(400).json({
              message: "You are not an ADMIN user.",
            });
          }
        }
      } else {
        return res.status(400).json({
          message: `You are not an AUTHENTICATED USER`,
        });
      }
    } catch (error) {
      console.error("Error creating company:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  };

  //Controller for deleting company
  export const deleteCompany = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const companyId = req.params.id;
    try {
      const company = await Company.findByPk(companyId);
  
      if (!company) {
        return res.status(404).json({ message: "Company does not exist" });
      }
  
      await company.destroy();
      res.status(200).json({ message: "Company deleted successfully" });
    } catch (error) {
      console.log("Error deleting company:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  















