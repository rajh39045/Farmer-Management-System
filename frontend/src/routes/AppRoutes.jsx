import { Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";

// ===========================
// Public Pages
// ===========================
import Home from "../pages/public/Home";
import Products from "../pages/public/Products";
import ProductDetails from "../pages/public/ProductDetails";
import PublicCategories from "../pages/public/Categories";
import About from "../pages/public/About";
import Contact from "../pages/public/Contact";

// ===========================
// Authentication Pages
// ===========================
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

// ===========================
// Customer Pages
// ===========================
import Cart from "../pages/customer/Cart";
import Wishlist from "../pages/customer/Wishlist";
import Checkout from "../pages/customer/Checkout";
import Orders from "../pages/customer/Orders";
import Profile from "../pages/customer/Profile";
import CustomerDashboard from "../pages/customer/CustomerDashboard";

// ===========================
// Farmer Pages
// ===========================
import FarmerDashboard from "../pages/farmer/FarmerDashboard";
import MyProducts from "../pages/farmer/MyProducts";
import AddProduct from "../pages/farmer/AddProduct";
import EditProduct from "../pages/farmer/EditProduct";
import FarmerOrders from "../pages/farmer/FarmerOrders";

// ===========================
// Admin Pages
// ===========================
import AdminDashboard from "../pages/admin/AdminDashboard";
import Categories from "../pages/admin/Categories";
import Reports from "../pages/admin/Reports";
import Users from "../pages/admin/Users";
import VerifyFarmers from "../pages/admin/VerifyFarmers";
import Settings from "../pages/settings/Settings";
import Notifications from "../pages/customer/Notifications";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import Unauthorized from "../pages/errors/Unauthorized";
import DashboardRedirect from "../pages/shared/DashboardRedirect";

// ===========================
// Middleware
// ===========================
import ProtectedRoute from "../middleware/ProtectedRoute";
import RoleRoute from "../middleware/RoleRoute";

// ===========================
// Error Page
// ===========================
import NotFound from "../pages/errors/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      {/* =======================
          Public + Protected Routes
      ======================== */}
      <Route element={<MainLayout />}>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />

        <Route
          path="/products"
          element={<Products />}
        />

        <Route
          path="/products/:id"
          element={<ProductDetails />}
        />

        <Route
          path="/dashboard"
          element={<DashboardRedirect />}
        />

        <Route
          path="/categories"
          element={<PublicCategories />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        {/* =======================
            Shared Authenticated Routes
        ======================== */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="/profile"
            element={<Profile />}
          />

          <Route
            path="/notifications"
            element={<Notifications />}
          />

          <Route
            path="/settings"
            element={<Settings />}
          />

          {/* =======================
              Customer Routes
          ======================== */}
          <Route element={<RoleRoute role="customer" />}>
            <Route
              path="/customer/dashboard"
              element={<CustomerDashboard />}
            />

            <Route
              path="/cart"
              element={<Cart />}
            />

            <Route
              path="/wishlist"
              element={<Wishlist />}
            />

            <Route
              path="/checkout"
              element={<Checkout />}
            />

            <Route
              path="/orders"
              element={<Orders />}
            />
          </Route>
        </Route>

        {/* =======================
            Farmer Routes
        ======================== */}
        <Route element={<ProtectedRoute />}>
          <Route element={<RoleRoute role="farmer" />}>
            <Route
              path="/farmer/dashboard"
              element={<FarmerDashboard />}
            />

            <Route
              path="/farmer/products"
              element={<MyProducts />}
            />

            <Route
              path="/farmer/products/add"
              element={<AddProduct />}
            />

            <Route
              path="/farmer/products/edit/:id"
              element={<EditProduct />}
            />

            <Route
              path="/farmer/orders"
              element={<FarmerOrders />}
            />
          </Route>
        </Route>

        {/* =======================
            Admin Routes
        ======================== */}
        <Route element={<ProtectedRoute />}>
          <Route element={<RoleRoute role="admin" />}>
            <Route
              path="/admin/dashboard"
              element={<AdminDashboard />}
            />

            <Route
              path="/admin/categories"
              element={<Categories />}
            />

            <Route
              path="/admin/users"
              element={<Users />}
            />

            <Route
              path="/admin/reports"
              element={<Reports />}
            />

            <Route
              path="/admin/verify-farmers"
              element={<VerifyFarmers />}
            />
          </Route>
        </Route>
      </Route>

      {/* =======================
          Authentication Routes
      ======================== */}
      <Route element={<AuthLayout />}>
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/reset-password/:token"
          element={<ResetPassword />}
        />
      </Route>

      <Route
        path="/unauthorized"
        element={<Unauthorized />}
      />

      {/* =======================
          404 Page
      ======================== */}
      <Route
        path="*"
        element={<NotFound />}
      />
    </Routes>
  );
};

export default AppRoutes;