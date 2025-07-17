import { Router } from "express";
import CategoryController from "../controllers/category.js";

const categoryRouter = Router();

categoryRouter.get("/all", CategoryController.getAllCategories);

// GET /api/category/:id/products - Return all products under a specific category
categoryRouter.get("/:id/products", CategoryController.getCategoryProducts);

export default categoryRouter;
