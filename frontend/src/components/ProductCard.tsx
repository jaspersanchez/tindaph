import type { Product } from "../types";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();
  const { addToCart, isInCart } = useCart();

  const formatPrice = (price: number) => {
    return `₱${price.toLocaleString("en-PH")}`;
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation to product detail
    addToCart(product);
  };

  return (
    <div
      onClick={() => navigate(`/products/${product._id}`)}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer flex flex-col"
    >
      {/* Image */}
      <div className="relative h-48 bg-gray-200">
        {product.images.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <span className="text-4xl">📦</span>
          </div>
        )}
        {product.featured && (
          <span className="absolute top-2 left-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">
            FEATURED
          </span>
        )}
        {product.stock === 0 && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            OUT OF STOCK
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Category */}
        <span className="text-xs text-blue-600 font-medium">
          {product.category}
        </span>

        {/* Name */}
        <h3 className="text-lg font-bold text-gray-900 mt-1 line-clamp-2">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mt-2 line-clamp-2 flex-1">
          {product.description}
        </p>

        {/* Price & Stock */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-2xl font-bold text-blue-600">
            {formatPrice(product.price)}
          </span>
          <span className="text-sm text-gray-500">
            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
          </span>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className={`mt-4 w-full py-2 rounded-lg font-semibold transition-colors ${
            product.stock === 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : isInCart(product._id)
                ? "bg-green-600 text-white hover:bg-green-700"
                : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {product.stock === 0
            ? "Out of Stock"
            : isInCart(product._id)
              ? "✓ In Cart"
              : "Add to Cart"}
        </button>

        {/* Seller */}
        <div className="mt-3 pt-3 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Sold by{" "}
            <span className="font-medium text-gray-700">
              {product.sellerName}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
