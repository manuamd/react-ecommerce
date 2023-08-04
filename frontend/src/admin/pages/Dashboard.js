// src/components/AdminDashboard.js
import React from "react";
import { Route, Routes } from "react-router-dom";

import AdminLayout from "../AdminLayout";
import CategoryPage from "../components/CategoryPage";
import ProductPage from "../components/ProductPage";
import OrderManagement from "../components/OrderManagement";
import AdminLogin from "../components/AdminLogin";


const AdminDashboard = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/orders" element={<OrderManagement />} />
        <Route path="/categories" element={<CategoryPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/login" element={<AdminLogin />} />
        {/* Add more admin routes here */}
      </Routes>
    </AdminLayout>
  );
};

export default AdminDashboard;
