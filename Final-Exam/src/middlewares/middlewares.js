import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../controllers/user.js";


class ValidatorMiddlewares {
  /**
   * Order Middlewares
   */

  // Middleware to validate order creation
  static orderCreationValidated = (req, res, next) => {
    // Extract quantity, status, productId, userId from req.body
    const { quantity, status, productId, userId } = req.body;

    // Validate all fields are provided
    if (!quantity || !status || !productId || !userId) {
      return res.status(400).json({
        error: "All fields are required: quantity, status, productId, userId"
      });
    }

    // Validate quantity is a positive number
    const quantityNum = Number(quantity);
    if (isNaN(quantityNum) || quantityNum <= 0 || !Number.isInteger(quantityNum)) {
      return res.status(400).json({
        error: "Quantity must be a positive integer greater than 0"
      });
    }

    // Validate status is "PENDING", "COMPLETED", or "CANCELED"
    const validStatuses = ['PENDING', 'COMPLETED', 'CANCELED'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        error: "Status must be one of: PENDING, COMPLETED, CANCELED"
      });
    }

    // Validate productId and userId are positive integers
    const productIdNum = Number(productId);
    const userIdNum = Number(userId);

    if (isNaN(productIdNum) || productIdNum <= 0 || !Number.isInteger(productIdNum)) {
      return res.status(400).json({
        error: "ProductId must be a positive integer"
      });
    }

    if (isNaN(userIdNum) || userIdNum <= 0 || !Number.isInteger(userIdNum)) {
      return res.status(400).json({
        error: "UserId must be a positive integer"
      });
    }

    next();
  }

  // Middleware to validate order update status
  static orderUpdateStatusValidated = (req, res, next) => {
    // Extract 'status' from req.body
    const { status } = req.body;

    // Validate that status is provided
    if (!status) {
      return res.status(400).json({
        error: "Status is required"
      });
    }

    // Validate that 'status' is either "COMPLETED" or "CANCELED"
    const validStatuses = ['COMPLETED', 'CANCELED'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        error: "Status must be either COMPLETED or CANCELED"
      });
    }

    next();
  }
}

export default ValidatorMiddlewares;