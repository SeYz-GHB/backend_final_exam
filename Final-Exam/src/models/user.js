import { DataTypes, Model } from "sequelize";
import sequelize from "../db/database.js";

//
//  Define User model
//
class User extends Model {}

User.init(
  {
    username: {
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
  },
  {
    sequelize,
    modelName: User.name,
  }
);

export default User;