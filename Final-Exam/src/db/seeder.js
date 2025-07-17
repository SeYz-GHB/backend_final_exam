import Product from "../models/product.js";
import Category from "../models/category.js";
import User from "../models/user.js";
import sequelize from "./database.js";

export default async function seedDatabase() {

  // 1 - Force Sync database 
  await sequelize.sync({ force: true });

  // 2 - Seed categories
  await Category.bulkCreate([
    { name: "Electronics", description: "Devices and gadgets" },
    { name: "Furniture", description: "Home and office furniture" },
    { name: "Accessories", description: "Various accessories" },
    { name: "Kitchenware", description: "Kitchen tools and utensils" },
  ]);

  // 3- Seed products
  const categories = await Category.findAll();
  const categoryMap = {};
  categories.forEach((cat) => {
    categoryMap[cat.name] = cat.id;
  });

  await Product.bulkCreate([
    {
      name: "Laptop",
      categoryId: categoryMap["Electronics"],
      price: 1200,
      stock: 15,
      description: "High-performance laptop for work and play.",
    },
    {
      name: "Smartphone",
      categoryId: categoryMap["Electronics"],
      price: 800,
      stock: 30,
      description: "Latest model smartphone with advanced features.",
    },
    {
      name: "Desk Chair",
      categoryId: categoryMap["Furniture"],
      price: 150,
      stock: 20,
      description: "Ergonomic desk chair for comfortable seating.",
    },
    {
      name: "Water Bottle",
      categoryId: categoryMap["Accessories"],
      price: 20,
      stock: 50,
      description: "Reusable water bottle for everyday hydration.",
    },
    {
      name: "Notebook",
      categoryId: null,
      price: 5,
      stock: 100,
      description: "Spiral notebook for notes and sketches.",
    },
    {
      name: "Headphones",
      categoryId: categoryMap["Electronics"],
      price: 100,
      stock: 25,
      description: "Noise-cancelling headphones for immersive sound.",
    },
    {
      name: "Backpack",
      categoryId: categoryMap["Accessories"],
      price: 60,
      stock: 40,
      description: "Durable backpack for travel and school.",
    },
    {
      name: "Monitor",
      categoryId: categoryMap["Electronics"],
      price: 300,
      stock: 10,
      description: "24-inch HD monitor for clear visuals.",
    },
    {
      name: "Keyboard",
      categoryId: categoryMap["Electronics"],
      price: 45,
      stock: 35,
      description: "Mechanical keyboard for fast typing.",
    },
    {
      name: "Mouse",
      categoryId: categoryMap["Electronics"],
      price: 25,
      stock: 40,
      description: "Wireless mouse with ergonomic design.",
    },
    {
      name: "Coffee Mug",
      categoryId: categoryMap["Kitchenware"],
      price: 12,
      stock: 60,
      description: "Ceramic coffee mug for hot beverages.",
    },
    {
      name: "Desk Lamp",
      categoryId: categoryMap["Furniture"],
      price: 35,
      stock: 18,
      description: "LED desk lamp with adjustable brightness.",
    },
    {
      name: "Pen Set",
      categoryId: null,
      price: 8,
      stock: 80,
      description: "Assorted pen set for writing and drawing.",
    },
    {
      name: "Tablet",
      categoryId: categoryMap["Electronics"],
      price: 400,
      stock: 12,
      description: "Portable tablet for entertainment and work.",
    },
    {
      name: "Sneakers",
      categoryId: null,
      price: 90,
      stock: 22,
      description: "Comfortable sneakers for daily wear.",
    },
    {
      name: "T-shirt",
      categoryId: null,
      price: 25,
      stock: 55,
      description: "Cotton t-shirt available in various sizes.",
    },
    {
      name: "Jeans",
      categoryId: null,
      price: 50,
      stock: 30,
      description: "Classic blue jeans for casual style.",
    },
    {
      name: "Sunglasses",
      categoryId: categoryMap["Accessories"],
      price: 70,
      stock: 28,
      description: "Stylish sunglasses with UV protection.",
    },
    {
      name: "Watch",
      categoryId: categoryMap["Accessories"],
      price: 150,
      stock: 16,
      description: "Analog wristwatch with leather strap.",
    },
    {
      name: "Bluetooth Speaker",
      categoryId: categoryMap["Electronics"],
      price: 60,
      stock: 20,
      description: "Portable Bluetooth speaker with rich sound.",
    },
  ]);

  // 4 - Seed users
  await User.bulkCreate([
    {
      username: "john_doe",
      email: "john_doe@test.com",
      password: "password123",
    },
    {
      username: "jane_smith",
      email: "jane_smith@test.com",
      password: "password123",
    },
    {
      username: "alice_jones",
      email: "alice_jones@test.com",
      password: "password123",
    },
  ]);
}
