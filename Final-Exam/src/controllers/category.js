import CategoryModel from "../models/category.js";
import ProductModel from "../models/product.js";
class CategoryController {

  //Get all categories
  static async getAllCategories(req, res) {
    try {
      const categories = await CategoryModel.findAll();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  }
  
  // Get products by category ID
  static async getCategoryProducts(req, res) {
    try {
      // 1. Get the categoryId from request parameters
      const { id } = req.params;

      // 2. Try to find the category by its primary key, including its products
      const category = await CategoryModel.findByPk(id, {
        include: [ProductModel]
      });

      // 3. If category not found, return 404 error
      if (!category) {
        return res.status(400).json({ error: "Category not found" });
      }

      // 4. If found, return category with products as JSON
      res.status(200).json(category.Products);
    } catch (error) {
      // 5. Catch any errors and return 500 error
      res.status(500).json({ error: "Failed to fetch products for category" });
    }
  }
}

export default CategoryController;