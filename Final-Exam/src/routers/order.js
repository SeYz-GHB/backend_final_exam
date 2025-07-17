import { Router } from "express";
import OrderController from "../controllers/order.js";
import ValidatorMiddlewares from "../middlewares/middlewares.js";

const orderRouter = Router();

// GET /api/user/:id/orders - Return orders by a user
orderRouter.get("/user/:id/orders", OrderController.getUserOrders);

// POST /api/order/create - Create an order with body data and return a new created order data
orderRouter.post("/create", ValidatorMiddlewares.orderCreationValidated, OrderController.createOrder);

// PUT /api/order/:id/update-status - Update an order status and return the updated order data
orderRouter.put("/:id/update-status", ValidatorMiddlewares.orderUpdateStatusValidated, OrderController.updateOrderStatus);

export default orderRouter;
