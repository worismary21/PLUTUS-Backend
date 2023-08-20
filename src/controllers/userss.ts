import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../model/user";
import { transferableAbortSignal } from "util";
import Transfers from "../model/transfer";
import bodyParser from 'body-parser';

// dotenv.config();

export const getUsersByAdmin = async (req: Request, res: Response) => {
  try {
    const token: any = req.headers.authorization;
    const token_info = token.split(" ")[1];
    const decodedToken: any = jwt.verify(token_info, process.env.APP_SECRET!);

    const user_id = decodedToken.id;

    const user_details: any = await User.findOne({ where: { id: user_id } });

    const user_role = user_details.role;
    console.log(user_role);

    if (user_role === "admin") {
      const getAllUsers = await User.findAll();

      return res.status(200).json({
        message: `User Successfully gotten`,
        data: getAllUsers,
      });
    } else {
      return res.status(400).json({
        message: "You are not an admin user",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// const failed_transaction = await Transfers.findAll({ where: { status: trans_status})
export const trackSuccessfulTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token: any = req.headers.authorization;
    const token_info = token.split(" ")[1];
    const decodedToken: any = jwt.verify(token_info, process.env.APP_SECRET!);

    const getting_user_role: any = await User.findOne({
      where: { id: decodedToken.id },
    });
    const user_role = getting_user_role.role;

    if (user_role === "admin") {
      const trans_status = "SUCCESSFUL";

      const successfulTransaction = await Transfers.findAll({
        where: { status: trans_status },
      });

      if (!successfulTransaction) {
        return res.status(404).json({
          message: `Failed to fetch Successful Transactions`,
        });
      } else {
        return res.status(200).json({
          message: `Successful Transactions`,
          data: successfulTransaction,
        });
      }
    } else {
      return res.status(400).json({
        message: `You are not an admin`,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// export const trackFailedTransaction = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const token: any = req.headers.authorization;
//     const token_info = token.split(" ")[1];
//     const decodedToken: any = jwt.verify(token_info, process.env.APP_SECRET!);

//     const user_id = decodedToken.id;
//     const trans_statuss = "FAILED";

//     const failedTransaction = await Transfers.findAll({
//       where: { status: trans_statuss },
//     });
//     if (failedTransaction) {
//       return res.status(200).json({
//         message: `Failed Transactions`,
//         data: failedTransaction,
//       });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

export const trackFailedTransaction = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token: any = req.headers.authorization;
    const token_info = token.split(" ")[1];
    const decodedToken: any = jwt.verify(token_info, process.env.APP_SECRET!);

    const getting_user_role: any = await User.findOne({
      where: { id: decodedToken.id },
    });
    const user_role = getting_user_role.role;

    if (user_role === "admin") {
      const trans_status = "FAILED";

      const failedTransaction = await Transfers.findAll({
        where: { status: trans_status },
      });

      if (!failedTransaction) {
        return res.status(404).json({
          message: `Failed to fetch Failed Transactions`,
        });
      } else {
        return res.status(200).json({
          message: `Failed Transactions`,
          data: failedTransaction,
        });
      }
    } else {
      return res.status(400).json({
        message: `You are not an admin`,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteUserByAdmin = async (req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.params.id;
  console.log( "user",userId)
  
  try{
    const result = await User.findOne({where: {id: userId }});
    console.log( "results" ,result)
    if (!result){ 
          return res
          .status(404)
          .json({ message: 'user with id ${req.params.id} not found'});
    }else{
     await User.destroy({ where: {id: userId}});
     return res.status(200).json({ message: 'user deleted successfully'})
    }
     
  } catch (err:any){
     console.log(err.message);
     return res.status(500).json ({message: 'Internal Server Error'});
  }
  }
 
 
  export const getAllUsersByAdmin = async (req: Request, res: Response, next: NextFunction) =>{ 
              try {
                let page = 1;
                if (req.query.page) {
                  page = parseInt(req.query.page as string);
                  if (Number.isNaN(page)) {
                    return res.status(400).json({
                      message: "Invalid page number",
                    });
                  }
                }  
            
                const pageSize = 10;
                const offset = (page - 1) * pageSize;
            
                const getUsersAdmin = await User.findAll();
                const totalPages = Math.ceil(getUsersAdmin.length / pageSize);
            
                if (page > totalPages) {
                  page = totalPages;
                }
                const allUsers = getUsersAdmin.slice(offset, page * pageSize);
            
                return res.status(200).json({
                  allUsers,
                  currentPage: page,
                  totalPages,
                });
              } catch (err) {
                console.error("Error executing getUsers:", err);
                return res.status(500).json({
                  Error: "Internal Server Error",
                });
              }
            } 
  