import { DataTypes, Model } from "sequelize";
import sequelize from "../db/database.js";

//
//  Define Category model
//
class Category extends Model {}

Category.init(
  {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: Category.name,
  }
);

export default Category;
