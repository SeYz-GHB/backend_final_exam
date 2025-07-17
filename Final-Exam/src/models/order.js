import { DataTypes, Model } from "sequelize";
import sequelize from "../db/database.js";

//
//  Define Order model
//
class Order extends Model {}

Order.init(
  {
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1
      }
    },
    status: {
      type: DataTypes.ENUM('PENDING', 'COMPLETED', 'CANCELED'),
      allowNull: false,
      defaultValue: 'PENDING'
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Products',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    modelName: Order.name,
  }
);

export default Order;
