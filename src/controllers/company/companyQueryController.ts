import express, { Request, Response, NextFunction } from "express";
import Company, { ICOMPANY } from "../../model/company";
import dotenv from "dotenv";
import { getPagination } from "../../utils/pagination";
import Investor from "../../model/investor";
import jwt from "jsonwebtoken";
<<<<<<< HEAD
=======
import User from "../../model/user";
>>>>>>> eed3fa75007fc845cdd7f013f7667eaf73d925a5

dotenv.config();

export const getAllCompanies = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
<<<<<<< HEAD
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;

  const { offset, limit: paginationLimit } = getPagination({ page, limit });

  try {
    const companies = await Company.findAndCountAll({
      offset,
      limit: paginationLimit,
    });

    return res.json({
      totalCompanies: companies.count,
      totalPages: Math.ceil(companies.count / limit),
      currentPage: page,
      data: companies.rows,
    });
=======
  try {
    const token: any = req.headers.authorization;
    const token_info = token.split(" ")[1];
    const decodedToken: any = jwt.verify(token_info, process.env.APP_SECRET!);

    const user_id = decodedToken.id;

    const get_user_dets: any = await User.findOne({ where: { id: user_id } });
    const user_role = get_user_dets.role;

    if (user_role === "admin") {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 5;

      const { offset, limit: paginationLimit } = getPagination({ page, limit });

      const companies = await Company.findAndCountAll({
        offset,
        limit: paginationLimit,
      });

      return res.json({
        totalCompanies: companies.count,
        totalPages: Math.ceil(companies.count / limit),
        currentPage: page,
        data: companies.rows,
      });

    }else{
      return res.status(400).json({
        message: "You are not an ADMIN user.",
      });
    }
>>>>>>> eed3fa75007fc845cdd7f013f7667eaf73d925a5
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

<<<<<<< HEAD

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
=======
export const getInvestor = async (req: Request, res: Response) => {
  try {
    const token: any = req.headers.authorization;
    const token_info = token.split(" ")[1];
    const decodedToken: any = jwt.verify(token_info, process.env.APP_SECRET!);

    const companyId = decodedToken.id;

    const investor = await Investor.findAll({ where: { id: companyId } });
    if (investor) {
      return res.status(200).json({
        message: "Fetching Investor Successfully",
        data: investor,
      });
    } else {
      res.status(400).json({
        message: "Error Fetching Investor",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};










>>>>>>> eed3fa75007fc845cdd7f013f7667eaf73d925a5
