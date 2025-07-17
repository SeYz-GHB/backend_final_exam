import Product from "./product.js";
import Category from "./category.js";
import User from "./user.js";
import Order from "./order.js";

//
//  Define Sequlize models associations
//
export function setupAssociations() {

  //  A category has many products - A project has 1 category
  Category.hasMany(Product, { foreignKey: "categoryId" });
  Product.belongsTo(Category, { foreignKey: "categoryId" });

  // Set up associations between UserModel and OrderModel
  User.hasMany(Order, { foreignKey: "userId" });
  Order.belongsTo(User, { foreignKey: "userId" });

  // Set up associations between OrderModel and ProductModel
  Product.hasMany(Order, { foreignKey: "productId" });
  Order.belongsTo(Product, { foreignKey: "productId" });

}
