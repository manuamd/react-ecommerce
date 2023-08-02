// src/components/AdminDashboard.js
import React from "react";
import { Route, Routes } from "react-router-dom";

import AdminLayout from "../AdminLayout";
import CategoryPage from "../components/CategoryPage";
import ProductPage from "../components/ProductPage";

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/categories" element={<CategoryPage />} />
        <Route path="/products" element={<ProductPage />} />
        {/* Add more admin routes here */}
      </Routes>
    </AdminLayout>
  );
};

export default AdminDashboard;
