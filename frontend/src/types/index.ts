export interface User {
  id: string;
  name: string;
  email: string;
  role: "buyer" | "seller" | "admin";
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role?: "buyer" | "seller";
}

export interface LoginData {
  email: string;
  password: string;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  stock: number;
  seller: string;
  sellerName: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export type Category =
  | "Electronics"
  | "Fashion"
  | "Home & Living"
  | "Health & Beauty"
  | "Food & Beverages"
  | "Sports & Outdoors"
  | "Books & Media"
  | "Toys & Games"
  | "Other";

// NEW: Cart types
export interface CartItem {
  product: Product;
  quantity: number;
}
