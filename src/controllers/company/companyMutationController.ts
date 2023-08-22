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
import { createCompanySchema, companyLogin } from "../../utils/inputvalidation";


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
              imageUrl:"",
              phoneNumber:"",
              address:"",
              zipCode:"",
              city:"",
              state:"",
              country:""
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
  
  //Controller for Company Login
  
  export const loginCompany = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const schema = companyLogin
      const { error, value } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }
  
      const { email, password } = req.body;
  
      const company_details = (await Company.findOne({
        where: { email },
      })) as unknown as IUSER;
  
      if (!company_details) {
        return res
          .status(404)
          .json({
            message: `Company does not exist, please register via the Signup page`,
          });
      } else {
        const validate = await bcrypt.compare(password, company_details.password);
  
        if (validate) {
          const token = jwt.sign(
            { email: company_details.email, id: company_details.id },
            process.env.APP_SECRET!,
            { expiresIn: "1d" }
          );
  
          return res.status(200).json({
            message: `Login SUCCESSFUL`,
            token,
          });
        } else {
          return res.status(400).json({
            message: `Invalid Password. Please ensure password is correct.`,
          });
        }
      }
    } catch (error) {
      console.error("Login company:", error);
      return res.status(500).json({
        message: `Internal Server Error`,
        Error: "/company/login",
      });
    }
  };

  export const updateCompanyProfile = async(req: Request, res: Response, next: NextFunction) => { 
    try { 
       
    let { companyName,email, phoneNumber, address, zipCode, city, state, country } = req.body
  
      console.log("image live", companyName, email, phoneNumber, address, zipCode, city, state, country)
  
    const updateField: Partial<ICOMPANY> = {}
  
    if(companyName !== ""){
        updateField.companyName = companyName
    }
    if(email !== ""){
        updateField. email =  email
    }
    if(phoneNumber !== ""){
        updateField. phoneNumber =  phoneNumber
    }
    if(address !== ""){
        updateField. address =  address
    }
    if(zipCode !== ""){
        updateField. zipCode =  zipCode
    }
    if(city !== ""){
        updateField. city =  city
    }
    if(state !== ""){
        updateField. state =  state
    }
    if(country !== ""){
        updateField. country =  country
    }
    console.log('update live',updateField)
    const updatedCompany = await Company.update(updateField,  {where: {email: email }} ) as unknown as ICOMPANY
  
       if (updatedCompany) {
          return res.status(200).json({
             message: `Company updated successfully`,
             data: updatedCompany
          });
       }
  
       return res.status(401).json({
          message: `Update operation failed`
       });
    } catch (error: any) {
       console.log(error.message);
       return res.status(500).json({ message: 'Internal server error' });
    }
  };

  export const createCompanyImage = async (req: Request, res: Response) =>{
    try{
  
        const {email} = req.body
  
    console.log("email ",email)
  
    const user = await Company.findOne({where: {email: email }} ) as unknown as ICOMPANY
  
    const updateField: Partial<ICOMPANY> = {}
  
  
    const updateUserImage = await Company.update({ imageUrl : req.file?.path },  {where: { email : email}} ) as unknown as ICOMPANY
  
    if (updateUserImage) {
        return res.status(200).json({
           message: `User updated successfully`,
           data: updateUserImage
        });
     }
  
     return res.status(401).json({
        message: `Update operation failed`
     });
  
    }catch(error){
        return res.status(500).json({
            message: `Error Uploading Imsge`
         });
    }
  
  }
  
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
  

  // try { 
  //   await Company.drop()
  //   console.log("table has been drop")














