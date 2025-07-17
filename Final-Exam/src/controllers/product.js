import ProductModel from "../models/product.js";
import { Op } from "sequelize";

class ProductController {

  // Get all products
  static async getAllProducts(req, res) {
    try {
      const products = await ProductModel.findAll();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products" });
    }
  }

  // Delete a product by id
  static async deleteProduct(req, res) {
    try {
      const { id } = req.params;
      const deletedRows = await ProductModel.destroy({
        where: { id }
      });

      if (deletedRows === 0) {
        return res.status(400).json({ error: "Product not found" });
      }

      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete product" });
    }
  }

  // Get products by price range
  static async getProductsByPriceRange(req, res) {
    try {
      const { min, max } = req.query;

      // Validate query parameters
      if (!min || !max) {
        return res.status(400).json({ error: "Both min and max price parameters are required" });
      }

      const minPrice = parseFloat(min);
      const maxPrice = parseFloat(max);

      if (isNaN(minPrice) || isNaN(maxPrice)) {
        return res.status(400).json({ error: "Min and max prices must be valid numbers" });
      }

      if (minPrice < 0 || maxPrice < 0) {
        return res.status(400).json({ error: "Prices cannot be negative" });
      }

      if (minPrice > maxPrice) {
        return res.status(400).json({ error: "Min price cannot be greater than max price" });
      }

      const products = await ProductModel.findAll({
        where: {
          price: {
            [Op.between]: [minPrice, maxPrice]
          }
        }
      });

      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch products by price range" });
    }
  }

  // Create a new product
  static async createProduct(req, res) {
    try {
      const product = await ProductModel.create(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ error: "Failed to create product" });
    }
  }
}

export default ProductController;
