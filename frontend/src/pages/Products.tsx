import { useState, useEffect } from "react";
import { getProducts } from "../services/api";
import type { Product, Category } from "../types";
import { ProductCard } from "../components/ProductCard";

const categories: Category[] = [
  "Electronics",
  "Fashion",
  "Home & Living",
  "Health & Beauty",
  "Food & Beverages",
  "Sports & Outdoors",
  "Books & Media",
  "Toys & Games",
  "Other",
];

export const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    loadProducts();
  }, [selectedCategory]);

  const loadProducts = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getProducts({
        category: selectedCategory || undefined,
      });
      setProducts(data);
    } catch (err: any) {
      setError(err.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    setError("");

    try {
      const data = await getProducts({
        search: searchQuery || undefined,
        category: selectedCategory || undefined,
      });
      setProducts(data);
    } catch (err: any) {
      setError(err.message || "Failed to search products");
    } finally {
      setLoading(false);
    }
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    loadProducts();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Browse Products</h1>
          <p className="text-gray-600 mt-1">Find the best deals in TindaPH</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search & Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          {/* Search Bar */}
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Search products..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSearch}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
            >
              Search
            </button>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory("")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === ""
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Clear Filters */}
          {(searchQuery || selectedCategory) && (
            <div className="mt-4 flex items-center gap-2">
              <span className="text-sm text-gray-600">Active filters:</span>
              {searchQuery && (
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  Search: {searchQuery}
                </span>
              )}
              {selectedCategory && (
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  {selectedCategory}
                </span>
              )}
              <button
                onClick={handleClearFilters}
                className="ml-2 text-sm text-red-600 hover:text-red-700 font-medium"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-500 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600"></div>
            <p className="text-gray-600 mt-4">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <span className="text-6xl">😔</span>
            <p className="text-gray-700 text-lg font-semibold mt-4">
              No products found
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Try different search or filters
            </p>
          </div>
        ) : (
          <>
            {/* Results Count */}
            <p className="text-gray-600 mb-4">
              Showing {products.length}{" "}
              {products.length === 1 ? "product" : "products"}
            </p>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
