import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  stock: number;
  seller: mongoose.Types.ObjectId;
  sellerName: string;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      minlength: [3, "Product name must be at least 3 characters"],
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      minlength: [10, "Description must be at least 10 characters"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "Electronics",
        "Fashion",
        "Home & Living",
        "Health & Beauty",
        "Food & Beverages",
        "Sports & Outdoors",
        "Books & Media",
        "Toys & Games",
        "Other",
      ],
    },
    images: {
      type: [String],
      default: [],
    },
    stock: {
      type: Number,
      required: [true, "Stock quantity is required"],
      min: [0, "Stock cannot be negative"],
      default: 0,
    },
    seller: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sellerName: {
      type: String,
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// Index for search
ProductSchema.index({ name: "text", description: "text" });

export default mongoose.model<IProduct>("Product", ProductSchema);
