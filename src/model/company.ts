import { DataTypes, Model, Sequelize } from "sequelize";
import { db } from "../config";
import Investor from "./investor";

export type ICOMPANY = {
  id: string;
  companyName: string;
  company_description: string;
  email: string;
  password: string;
  otp: string;
  accountNumber: string;
  wallet: number;
  verified: boolean;
  role: string;
  active: boolean;
  businessType: string;
  roi: number;
  noOfInvestors: number;
  investment_category: string;
  investment_description: string;
  duration: string;
  min_investment_amount: string;
  max_investment_amount: string;
};

class Company extends Model<ICOMPANY> {
  public static associate(models: { Investor: typeof Investor }): void {
    Company.hasMany(models.Investor, {
      foreignKey: "companyId",
      as: "Company",
    });
  }
}

Company.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    companyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company_description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accountNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    wallet: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    businessType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roi: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    noOfInvestors: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    investment_category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    investment_description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    min_investment_amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    max_investment_amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: "Company",
  }
);

export default Company;


