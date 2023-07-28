import {DataTypes, Model} from 'sequelize';
import {database} from '../config/index';
import { UserInterface } from '../interface/userInterface';
import { NUMBER } from 'sequelize';

export class Users extends Model<UserInterface> {}
Users.init({

    id: {
      type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
  },
    dateOfBirth: {
      type: DataTypes.STRING,
      allowNull: false,
  },
    email: {
        type: DataTypes.STRING,
         allowNull: false,
         unique: true,
        validate: {
        notNull: {
          msg: "Email is required",
        },
        isEmail: {
          msg: "Email is invalid",
        },
      },
      
    },
    
    phone:{
        type: DataTypes.STRING,
        allowNull: false,   
    },       
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {

        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
              msg: "Password is required",
            },
            notEmpty: {
              msg: "Password is required",
            },
          },
    },
},{
    sequelize: database,
    tableName: 'Users',
    timestamps: true
})

// import { Model, Sequelize, DataTypes } from 'sequelize';
// export default class User extends Model {
//   public id?: number;
//   public firstName!: string;
//   public lastName!: string;
//   public email!: string;
//   public address!: string;
//   public birthdate!: Date;
//   public phoneNum!: number;
//   public country?: string;
// }
// export const UserMap = (sequelize: Sequelize) => {
//   User.init({
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true
//     },
//     firstName: {
//       type: DataTypes.STRING(255)
//     },
//     lastName: {
//         type: DataTypes.STRING(255)
//       },
//       email: {
//         type: DataTypes.STRING(255)
//       },
//       address: {
//         type: DataTypes.STRING(255)
//       },
//     birthdate: {
//       type: DataTypes.DATE,
//     },
//     phoneNum: {
//         type: DataTypes.INTEGER
//       },
//     country: {
//       type: DataTypes.STRING(100),
//       allowNull: true
//     }
//   }, {
//     sequelize,
//     tableName: 'users',
//     timestamps: true
//   });
//   User.sync();
// }