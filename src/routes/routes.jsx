import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import Loading from "../components/Loading.jsx";
import { AuthProvider } from "../context/AuthContext.jsx";
import ProtectedRoute from "../components/PrivateRoute.jsx";
// Site
const Home = lazy(() => import("../pages/Site/Home.jsx"));
const Services = lazy(() => import("../pages/Site/Services.jsx"));
const NotFound = lazy(() => import("../pages/Site/NotFound.jsx"));
const Shop = lazy(() => import("../pages/Site/Shop.jsx"));
const ProductDetails = lazy(() => import("../pages/Site/ProductDetails.jsx"));
const Cart = lazy(() => import("../pages/Site/Cart.jsx"));
const ChangePassword = lazy(() => import("../pages/Site/ChangePassword.jsx"));
const ForgetPassword = lazy(() => import("../pages/Site/ForgetPassword.jsx"));
const Login = lazy(() => import("../pages/Site/Login.jsx"));
const Register = lazy(() => import("../pages/Site/Register.jsx"));
const CheckCode = lazy(() => import("../pages/Site/CheckCode.jsx"));
const About = lazy(() => import("../pages/Site/About.jsx"));

// Dashboard
const Dashboard = lazy(() => import("../pages/Admin/Dashboard.jsx"));
const Login_Admin = lazy(() => import("../pages/Admin/Login.jsx"));
const Product = lazy(() => import("../pages/Admin/Product.jsx"));
const Services_Admin = lazy(() => import("../pages/Admin/Services.jsx"));
const Add_Service = lazy(() => import("../pages/Admin/Add_Service.jsx"));
const UpdateService = lazy(() => import("../pages/Admin/Update_Service.jsx"));
const AddProduct = lazy(() => import("../pages/Admin/Add_Product.jsx"));
const UpdateProduct = lazy(() => import("../pages/Admin/Update_Product.jsx"));
const Admin = lazy(() => import("../pages/Admin/Admin.jsx"));
const AddAdmin = lazy(() => import("../pages/Admin/Add_Admin.jsx"));
const Users = lazy(() => import("../pages/Admin/Users.jsx"));
const Orders = lazy(() => import("../pages/Admin/Orders.jsx"));
// Layout
import MainLayout from "../layouts/MainLayout.jsx";
import AdminLayout from "../layouts/AdminLayout.jsx";

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/check-code" element={<CheckCode />} />
        <Route path="/admin/login" element={<Login_Admin />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/product" element={<Product />} />
            <Route path="/admin/add-product" element={<AddProduct />} />
            <Route path="/admin/services" element={<Services_Admin />} />
            <Route path="/admin/add-service" element={<Add_Service />} />
            <Route path="/admin/update-service" element={<UpdateService />} />
            <Route path="/admin/update-product" element={<UpdateProduct />} />
            <Route path="/admin/admin" element={<Admin />} />
            <Route path="/admin/add-admin" element={<AddAdmin />} />
            <Route path="/admin/users" element={<Users />} />
            <Route path="/admin/orders" element={<Orders />} />
          </Route>
        </Route>

        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/Product-details" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
