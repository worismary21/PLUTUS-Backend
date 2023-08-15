// import { DataTypes, Model } from "sequelize";
// import { db } from "../config";
// import Company from "./company";

// // enum Duration {
// //   THREE_MONTH = "3 Month",
// //   SIX_MONTH = "6 Month",
// //   TWELVE_MONTH = "12 Month",
// // }

// export interface InvestmentAttributes {
//   id: string;
//   company_id: string;
//   companyName: string;
//   investment_category: string;
//   investment_description: string;
//   rateOfReturn: number;
//   duration: Duration;
//   min_investment_amount: number;
//   max_investment_amount: number;
// }

// class Investment extends Model<InvestmentAttributes> {
//   company_id: any;
//   userId: any;
//   public static associate() {
//     Investment.belongsTo(Company, { foreignKey: 'company_id', as: 'Company' });
//   }
// }

// Investment.init(
//   {
//     id: {
//       type: DataTypes.UUID,
//       primaryKey: true,
//       allowNull: false,
//     },
//     company_id: {
//       type: DataTypes.UUID,
//       allowNull: false,
//     },
//     companyName: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     investment_category: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     investment_description: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     rateOfReturn: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     duration: {
//       type: DataTypes.ENUM(...Object.values(Duration)),
//       allowNull: false,
//     },
//     min_investment_amount: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     max_investment_amount: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//   },
//   {
//     sequelize: db,
//     modelName: "Investment",
//   }
// );

// export default Investment;
