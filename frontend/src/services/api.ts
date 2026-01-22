import type { AuthResponse, RegisterData, LoginData, Product } from "../types";

const API_URL = "http://localhost:4000/api";

// Register user
export const register = async (data: RegisterData): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Registration failed");
  }

  return response.json();
};

// Login user
export const login = async (data: LoginData): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Login failed");
  }

  return response.json();
};

// Product APIs
export const getProducts = async (params?: {
  category?: string;
  search?: string;
}): Promise<Product[]> => {
  const queryParams = new URLSearchParams();
  if (params?.category) queryParams.append("category", params.category);
  if (params?.search) queryParams.append("search", params.search);

  const url = `${API_URL}/products${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
};

export const getProduct = async (id: string): Promise<Product> => {
  const response = await fetch(`${API_URL}/products/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch product");
  }

  return response.json();
};
