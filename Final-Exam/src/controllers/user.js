import UserModel from "../models/user.js";
import OrderModel from "../models/order.js";
import ProductModel from "../models/product.js";
import jwt from "jsonwebtoken";

export const TOKEN_SECRET = "pisey_KhenChandara";

class UserController {
  
  static async getAllUsers(req, res) {
    try {
      const users = await UserModel.findAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch users" });
    }
  }

  static async login(req, res) {
    try {
      // 1. Extract email and password from req.body
      const { email, password } = req.body;

      // Validate required fields
      if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
      }

      // 2. Find user by email and password using UserModel.findOne
      const user = await UserModel.findOne({
        where: {
          email: email,
          password: password
        }
      });

      // 3. If user not found, return 401 error
      if (!user) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      // 4. If user found, generate JWT token with user ID
      const token = jwt.sign({ userId: user.id }, TOKEN_SECRET);

      // 5. Return token and user information with 200 status
      res.status(200).json({
        token: token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        }
      });
    } catch (error) {
      // 6. Handle any errors and return 500 error if something goes wrong
      res.status(500).json({ error: "Login failed" });
    }
  }

  // get me (current user) by token
  static async getCurrentUser(req, res) {
    try {
      // 1. Get the current user's ID from req.user
      const userId = req.user.userId;

      // 2. Fetch the user by primary key using UserModel.findByPk
      const user = await UserModel.findByPk(userId);

      // 3. If user not found, return 404 error
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // 4. If found, return user data with 200 status
      res.status(200).json({
        id: user.id,
        username: user.username,
        email: user.email
      });
    } catch (error) {
      // 5. Handle any errors and return 500 error if something goes wrong
      res.status(500).json({ error: "Failed to fetch current user" });
    }
  }


  // get orders by user ID
  static async getUserOrders(req, res) {
    try {
      // 1. Get the current user's ID from the request (req.user.userId)
      const userId = req.user.userId;

      // 2. Fetch the user by primary key, including their orders (using the OrderModel association)
      const user = await UserModel.findByPk(userId, {
        include: [{
          model: OrderModel,
          include: [ProductModel]
        }]
      });

      // 3. If user not found, return 404 error
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // 4. If found, return orders with 200 status
      res.status(200).json(user.Orders);
    } catch (error) {
      // 5. Handle any errors and return 500 error if something goes wrong
      res.status(500).json({ error: "Failed to fetch user orders" });
    }
  }
}

export default UserController;