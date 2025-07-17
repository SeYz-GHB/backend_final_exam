import { DataTypes, Model } from "sequelize";
import sequelize from "../db/database.js";

//
//  Define Category model
//
class Product extends Model {}

Product.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: Product.name,
  }
);

export default Product;
