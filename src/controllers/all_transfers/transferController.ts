import express, { Request, Response, NextFunction } from "express";
import User from "../../model/user";
import Transfers, { TRANSFER } from "../../model/transfer";
import { v4 } from "uuid";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

import Company from "../../model/company";
import investment_Records from '../../model/investmentRecord'
import Investor from "../../model/investor";


dotenv.config();

export const transferToBeneficiary = async (
  req: Request,
  res: Response,
  NextFunction: NextFunction
) => {
  try {

    const token: any = req.headers.authorization;
    const token_info = token.split(" ")[1];
    const decodedToken: any = jwt.verify(token_info, process.env.APP_SECRET!);

    const {
      accountNumber,
      amount,
      transfer_purpose,
      beneficiary_name,
      beneficiary_email,
      payer_reference,
      information_for_beneficiary,
    } = req.body;

    const validated_Beneficiary: any = await User.findOne({
      where: { accountNumber },
    });

    if (decodedToken.email) {
      if (validated_Beneficiary) {
        const beneficiary_AccountNumber = validated_Beneficiary.accountNumber;

        const sender_id = decodedToken.id;
        const sender_accountDetails: any = await User.findOne({
          where: { id: sender_id },
        });
        const sender_AccountBalance = sender_accountDetails.accountBalance;
        const sender_accountNumber = sender_accountDetails.accountNumber;

        if ( +sender_accountNumber !== +beneficiary_AccountNumber && +beneficiary_AccountNumber === +accountNumber) {
          if (sender_AccountBalance > amount) {
    
              const beneficiary_old_Account_Balance = validated_Beneficiary.accountBalance;
              const beneficiary_new_AccountBalance = amount + beneficiary_old_Account_Balance;

              const fulfilled_transaction = await User.update(
                { accountBalance: beneficiary_new_AccountBalance },
                {
                  where: {
                    accountNumber: beneficiary_AccountNumber,
                  },
                }
              );

              const sender_old_Account_Balance = sender_AccountBalance;
              const sender_new_Account_Balance = sender_old_Account_Balance - amount;

              const user_Transaction_Status = await User.update(
                { accountBalance: sender_new_Account_Balance },
                {
                  where: {
                    accountNumber: sender_accountNumber,
                  },
                }
              );

                const beneficiary_AccNumber = beneficiary_AccountNumber;

                const expected_beneficiary_balance: any = await User.findOne({
                  where: { accountNumber: beneficiary_AccNumber },
                });
                const expected_beneficiary_AccountBalance = expected_beneficiary_balance.accountBalance

                if (beneficiary_new_AccountBalance !== expected_beneficiary_AccountBalance) {

                  const update_beneficiary_accountBalance = await User.update({ accountBalance: beneficiary_old_Account_Balance }, { where: {accountNumber: beneficiary_AccNumber}})
                  const update_sender_accountBalance = await User.update({ accountBalance: sender_old_Account_Balance }, { where: {accountNumber: sender_accountNumber}})

                  if(update_beneficiary_accountBalance && update_sender_accountBalance){
                    const pending_transfer = await Transfers.create({
                      id: v4(),
                      accountNumber,
                      amount,
                      transfer_purpose,
                      beneficiary_name,
                      beneficiary_email,
                      payer_reference,
                      information_for_beneficiary,
                      status: "PENDING",
                      senderId: sender_id,
                    });
  
                    return res.status(400).json({
                      message: "Transaction PENDING. Please wait for few minutes before trying again.",
                      data: pending_transfer 
                    });
                  }else{
                    return res.status(400).json({
                      message: `PENDING TRANSACTION. Please contact customer service or go to the nearest plutus branch.`
                    })
                  }
                }else{
                    if (fulfilled_transaction && user_Transaction_Status ){
                      const sucessful_transfer = await Transfers.create({
                        id: v4(),
                        accountNumber,
                        amount,
                        transfer_purpose,
                        beneficiary_name,
                        beneficiary_email,
                        payer_reference,
                        information_for_beneficiary,
                        status: "SUCCESSFUL",
                        senderId: sender_id,
                      });
                      return res.status(200).json({
                        message: "Transaction Successful",
                        data: sucessful_transfer
                      });
                    } else {
                      const failed_transfer = await Transfers.create({
                        id: v4(),
                        accountNumber,
                        amount,
                        transfer_purpose,
                        beneficiary_name,
                        beneficiary_email,
                        payer_reference,
                        information_for_beneficiary,
                        status: "FAILED",
                        senderId: sender_id,
                      });
                      return res.status(400).json({
                        message: "Transaction Failed",
                        data: failed_transfer
                      });
                    }
                  }   
                
          } else {
            return res.status(400).json({
              message: "Insufficient Funds",
            });
          }

        } else {
          return res.status(400).json({
            message: "Cannot make TRANSFER. Please check details properly.",
          });
        }
      } else {
        return res.status(400).json({
          message: "Beneficiary Account Number is not found",
        });
      }
    } else {
      return res.status(400).json({
        message: "You must be LOGGED IN to make a transfer",
      });
    }
  } catch (error) {
    console.error("Error Transferring to user:", error);
    return res.status(500).json({
      Error: "Internal Server Error",
    });
  }
};


export const transferToSavingsWallet = async (
  req: Request,
  res: Response,
  NextFunction: NextFunction
) => {
  try {

    const token: any = req.headers.authorization;
    const token_info = token.split(" ")[1];
    const decodedToken: any = jwt.verify(token_info, process.env.APP_SECRET!);

    if (decodedToken.email) {
      const { amount } = req.body;

      const user_id = decodedToken.id
      const user_info:any = await User.findOne({ where: { id: user_id}})

      const user_savings_balance = user_info.savingsWallet
      const user_balance_amount = user_savings_balance.amount
      const user_accountBalance = user_info.accountBalance

      if(amount < user_accountBalance){

      const new_Savings_Balance = user_balance_amount + amount

      const savings_wallet_obj = { id: user_id, amount:new_Savings_Balance }
  
      const current_savings_balance = await User.update(
        { savingsWallet: savings_wallet_obj },
        {
          where: {
            id: user_id 
          },
        }
      );

     const user_new_balance = user_accountBalance - amount

      const updating_user_balance = await User.update(
        { accountBalance: user_new_balance },
        {
          where: {
            id: user_id
          },
        }
      );
  
      if(current_savings_balance && updating_user_balance){
        return res.status(200).json({
          message: "Amount Transferred to Savings Wallet"
        })
      }else{
        return res.status(400).json({
          message: "Transfer PENDING!! Please wait a few minutes or contact customer service. "
        })
      }

      }else{
        return res.status(400).json({
          message: "You do not have sufficient balance to execute this savings transfer"
        })
      }
    }
  } catch (error) {
    console.error(error);
  }
};


export const transferToInvestmentCompany = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token: any = req.headers.authorization;
    const token_info = token.split(" ")[1];
    const decodedToken: any = jwt.verify(token_info, process.env.APP_SECRET!);

    if (decodedToken.email) {
      const user_id = decodedToken.id
      const {amount, company_account_number} = req.body

      const user_details:any = await User.findOne({where: {id:user_id}})
      const user_account_balance = user_details.accountBalance
      const user_account_number = user_details.accountNumber
      const user_firstName = user_details.firstName
      const user_lastName = user_details.lastName

      if( user_account_balance > amount){
        const user_new_balance = user_account_balance - amount
        const investment_Transfer = await User.update(
          { accountBalance: user_new_balance },
          {
            where: {
              accountNumber: user_account_number,
            },
          }
        );

        const company_details:any = await Company.findOne({where: { accountNumber: company_account_number }})
 
        const company_id = company_details.id
        const company_account_balance = company_details.wallet
        const comapany_wallet_balance = amount + company_account_balance

        const successful_Transfer = await Company.update(
          { wallet: comapany_wallet_balance },
          {
            where: {
              accountNumber: company_account_number,
            },
          }
        );

        if( investment_Transfer && successful_Transfer){
          const sucessful_transaction_record = await investment_Records.create({
            id: v4(),
            amount: amount,
            investor_name: user_firstName + " " + user_lastName,
            investor_id: user_id,
            investment_company_id: company_id,
            transaction_status: "SUCCESSFUL",
          })

          await Investor.create({
            id:v4(),
            firstName:user_details.firstName,
            lastName:user_details.lastName,
            accountNumber:user_details.accountNumber,
            email:user_details.email,
            investedCapital:amount,
            expectedReturn:amount * company_details.roi,
            monthlyReturn:amount * company_details.roi / 4,
            active: true,
            companyId:company_id
          })

    
          return res.status(200).json({
            message: `Transfer SUCCESSFUL!!`,
            data: sucessful_transaction_record
          })

        }else{
          const failed_transaction_record = await investment_Records.create({
            id: v4(),
            amount: amount,
            investor_name: user_firstName + " " + user_lastName,
            investor_id: user_id,
            investment_company_id: company_id,
            transaction_status: "FAILED"
          })

          return res.status(400).json({
            message: `Transfer is UNSUCESSFUL. Please wait for some minutes and try again.`,
            data: failed_transaction_record
          })        
        }
      }else{
        return res.status(400).json({
          message: `Sorry! You do not have sufficient funds to make this investment. Please credit your account`
        })
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

