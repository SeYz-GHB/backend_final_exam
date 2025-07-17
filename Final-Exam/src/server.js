import express, { json } from "express";
import cors from "cors";
import seedDatabase from "./db/seeder.js";
import productRouter from "./routers/product.js";
import categoryRouter from "./routers/category.js";
import userRouter from "./routers/user.js";
import orderRouter from "./routers/order.js";
import { setupAssociations } from './models/associations.js';

// 1- Setup database model associations
setupAssociations();

// 2 - Seed database
seedDatabase();

// 3 - Express setup
const app = express();

// 4 - Middleware
app.use(cors());
app.use(json());

// 5 Routes
app.use("/api/product", productRouter);
app.use("/api/category", categoryRouter);
app.use("/api/user", userRouter);
app.use("/api/order", orderRouter);

// 6 Run Server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
