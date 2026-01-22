import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-blue-600 mb-4">TindaPH 🛍️</h1>
          <p className="text-gray-600 text-xl mb-8">
            E-commerce platform for Philippine market
          </p>
          <div className="space-x-4">
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-semibold"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-lg hover:bg-blue-50 font-semibold"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <h1
              onClick={() => navigate("/")}
              className="text-2xl font-bold text-blue-600 cursor-pointer"
            >
              TindaPH
            </h1>
            <button
              onClick={() => navigate("/products")}
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Browse Products
            </button>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-700">
              Welcome, <span className="font-semibold">{user?.name}</span>
            </span>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              {user?.role}
            </span>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Dashboard</h2>
        <p className="text-gray-600 mb-8">
          You're logged in as a {user?.role}! 🎉
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            onClick={() => navigate("/products")}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
          >
            <div className="text-4xl mb-3">📦</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Browse Products
            </h3>
            <p className="text-gray-600 text-sm">View all available products</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-3">🛒</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Shopping Cart
            </h3>
            <p className="text-gray-600 text-sm">Coming in Day 6</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-4xl mb-3">📋</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              My Orders
            </h3>
            <p className="text-gray-600 text-sm">Coming in Day 8</p>
          </div>
        </div>
      </div>
    </div>
  );
};
