import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import otpGenerator from "otp-generator";
import { OTP_LENGTH, OTP_CONFIG } from "./notifications";
import dotenv  from "dotenv";
dotenv.config()


export const hashedPassword = async (password: string) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};


export const genAccount = () => {
  const prefix = '015';
    const num = Math.floor(10000000 + Math.random() * 9000);
  const account = `${prefix + num}`
  return account;
}
 
export const generateOTP = () => {
  const OTP = otpGenerator.generate(OTP_LENGTH, OTP_CONFIG);
  return OTP;
}

export const resetPasswordOTP = () => {
  const optExpiryMinutes = 6
  const otp = Math.floor(1000 + Math.random() * 9000).toString()
  const expirationTime = new Date()
  expirationTime.setMinutes(expirationTime.getMinutes() + optExpiryMinutes)
  const response = {
    otp,
    expiresAt: expirationTime.toISOString()
  }

  return response
}

export const generateToken = (user:any) => {
  const payload = {
      userId: user._id,
      otp: user.otp,
      exp: Math.floor(Date.now() / 1000) + 3600
      // Add any other relevant data to the payload if needed
    };

  const token = jwt.sign(payload, `${process.env.APP_SECRET}`)
  return token
}



export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, `${process.env.APP_SECRET}`) as object;
    return decoded as { userId: number; OTP: string; exp: number };
  } catch (err) {
    console.error('Token verification failed:', err);
    return null;
  }
};