import express, { Request, Response, NextFunction } from "express";
import Company, { ICOMPANY } from "../../model/company";
import dotenv from "dotenv";
import { getPagination } from "../../utils/pagination";

dotenv.config();

export const getAllCompanies = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
