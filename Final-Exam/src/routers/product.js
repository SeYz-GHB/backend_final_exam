import { Router } from "express";
import ProductController from "../controllers/product.js";

const productRouter = Router();

// GET /api/product/all - Return all products
productRouter.get("/all", ProductController.getAllProducts);

// DELETE /api/product/:id - Delete a product by id and return success/fail message
productRouter.delete("/:id", ProductController.deleteProduct);

// GET /api/product/price-range?min=X&max=Y - Return products that have prices between a given min and max
productRouter.get("/price-range", ProductController.getProductsByPriceRange);

export default productRouter;
