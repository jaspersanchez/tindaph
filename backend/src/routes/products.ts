import express, { Response } from "express";
import Product from "../models/Product";
import { authMiddleware, sellerOnly, AuthRequest } from "../middleware/auth";
import User from "../models/User";

const router = express.Router();

// GET all products (public)
router.get("/", async (req, res: Response) => {
  try {
    const { category, search, sort = "-createdAt" } = req.query;

    let query: any = {};

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Search by name or description
    if (search) {
      query.$text = { $search: search as string };
    }

    const products = await Product.find(query)
      .sort(sort as string)
      .select("-__v");

    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products", error });
  }
});

// GET single product (public)
router.get("/:id", async (req, res: Response) => {
  try {
    const product = await Product.findById(req.params.id).select("-__v");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Error fetching product", error });
  }
});

// POST create product (seller only)
router.post(
  "/",
  authMiddleware,
  sellerOnly,
  async (req: AuthRequest, res: Response) => {
    try {
      const { name, description, price, category, images, stock } = req.body;

      // Get seller info
      const seller = await User.findById(req.user?.userId);
      if (!seller) {
        return res.status(404).json({ message: "Seller not found" });
      }

      const product = new Product({
        name,
        description,
        price,
        category,
        images: images || [],
        stock,
        seller: req.user?.userId,
        sellerName: seller.name,
      });

      await product.save();

      res.status(201).json({
        message: "Product created successfully",
        product,
      });
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ message: "Error creating product", error });
    }
  },
);

// PUT update product (seller only - own products)
router.put(
  "/:id",
  authMiddleware,
  sellerOnly,
  async (req: AuthRequest, res: Response) => {
    try {
      const product = await Product.findById(req.params.id);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      // Check if user is the seller of this product
      if (
        product.seller.toString() !== req.user?.userId &&
        req.user?.role !== "admin"
      ) {
        return res
          .status(403)
          .json({ message: "Not authorized to update this product" });
      }

      const { name, description, price, category, images, stock, featured } =
        req.body;

      // Update fields
      if (name) product.name = name;
      if (description) product.description = description;
      if (price !== undefined) product.price = price;
      if (category) product.category = category;
      if (images) product.images = images;
      if (stock !== undefined) product.stock = stock;
      if (featured !== undefined) product.featured = featured;

      await product.save();

      res.json({
        message: "Product updated successfully",
        product,
      });
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ message: "Error updating product", error });
    }
  },
);

// DELETE product (seller only - own products)
router.delete(
  "/:id",
  authMiddleware,
  sellerOnly,
  async (req: AuthRequest, res: Response) => {
    try {
      const product = await Product.findById(req.params.id);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      // Check if user is the seller of this product
      if (
        product.seller.toString() !== req.user?.userId &&
        req.user?.role !== "admin"
      ) {
        return res
          .status(403)
          .json({ message: "Not authorized to delete this product" });
      }

      await Product.findByIdAndDelete(req.params.id);

      res.json({
        message: "Product deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ message: "Error deleting product", error });
    }
  },
);

// GET seller's own products (seller only)
router.get(
  "/seller/my-products",
  authMiddleware,
  sellerOnly,
  async (req: AuthRequest, res: Response) => {
    try {
      const products = await Product.find({ seller: req.user?.userId })
        .sort("-createdAt")
        .select("-__v");

      res.json(products);
    } catch (error) {
      console.error("Error fetching seller products:", error);
      res.status(500).json({ message: "Error fetching products", error });
    }
  },
);

export default router;
