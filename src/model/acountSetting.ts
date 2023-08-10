import { DataTypes, Model } from "sequelize";
import { db } from "../config";


export type ISETTING = {
  firstName:string,
  lastName:string,
  email:string,
  password:string,
  imageUrl:string,
  phoneNumber:string,
  address:string,
  zipCode:string,
  city:string,
  state:string,
  country:string
}


class Setting extends Model <ISETTING>{}

Setting.init(
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
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
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    zipCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    tableName: "Setting",
    modelName: "Setting",
  }
);

export default Setting;




