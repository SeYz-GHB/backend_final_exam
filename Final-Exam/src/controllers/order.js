import OrderModel from "../models/order.js";
import UserModel from "../models/user.js";
import ProductModel from "../models/product.js";

class OrderController {

  // GET /api/user/:id/orders - Return orders by a user
  static async getUserOrders(req, res) {
    try {
      const { id } = req.params;
      
      const user = await UserModel.findByPk(id, {
        include: [{
          model: OrderModel,
          include: [ProductModel]
        }]
      });
      
      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }
      
      res.status(200).json(user.Orders);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch user orders" });
    }
  }

  // POST /api/order/create - Create an order with body data and return a new created order data
  static async createOrder(req, res) {
    try {
      const { quantity, status, productId, userId } = req.body;
      
      // Check if product exists
      const product = await ProductModel.findByPk(productId);
      if (!product) {
        return res.status(400).json({ error: "Product not found" });
      }
      

      const user = await UserModel.findByPk(userId);
      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }
      
      const order = await OrderModel.create({
        quantity,
        status,
        productId,
        userId
      });
      
    
      const createdOrder = await OrderModel.findByPk(order.id, {
        include: [ProductModel, UserModel]
      });
      
      res.status(200).json(createdOrder);
    } catch (error) {
      res.status(500).json({ error: "Failed to create order" });
    }
  }

  
  static async updateOrderStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      const order = await OrderModel.findByPk(id);
      if (!order) {
        return res.status(400).json({ error: "Order not found" });
      }
      
      await order.update({ status });
      
      
      const updatedOrder = await OrderModel.findByPk(id, {
        include: [ProductModel, UserModel]
      });
      
      res.status(200).json(updatedOrder);
    } catch (error) {
      res.status(500).json({ error: "Failed to update order status" });
    }
  }
}

export default OrderController;