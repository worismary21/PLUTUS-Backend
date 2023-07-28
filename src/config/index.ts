import {Sequelize} from 'sequelize'
import dotenv from 'dotenv'
dotenv.config()

const {DB_HOST, DB_NAME, DB_USERNAME,DB_PASSWORD} = process.env 


export const database = new Sequelize(
    DB_NAME!, //database name
    DB_USERNAME!, //username
    DB_PASSWORD!,
 
   
  
    {
      host: DB_HOST,
      port: 5432,
      dialect: "postgres",
      logging: false,
      dialectOptions: {
        encrypt: true,
        // ssl: {
        //   rejectUnauthorized: false,
        // },
      },
    }
  );