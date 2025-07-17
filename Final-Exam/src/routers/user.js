import { Router } from "express";
import UserController from "../controllers/user.js";
import AuthMiddlewares from "../middlewares/auth.js";

const userRouter = Router();


userRouter.get("/all", UserController.getAllUsers);

// POST /api/user/login - Login to a user and return user's data including a generated token
userRouter.post("/login", UserController.login);

// GET /api/user/current-user - Return current user's data by just a token given
userRouter.get("/current-user", AuthMiddlewares.isAuthenticated, UserController.getCurrentUser);

// GET /api/user/my-orders - Return current user's orders by just a token given
userRouter.get("/my-orders", AuthMiddlewares.isAuthenticated, UserController.getUserOrders);

export default userRouter;
