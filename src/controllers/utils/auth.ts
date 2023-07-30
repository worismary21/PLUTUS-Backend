import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
 