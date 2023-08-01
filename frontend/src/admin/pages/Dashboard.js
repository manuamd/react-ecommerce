// src/components/AdminDashboard.js
import React from "react";
import { Route, Routes } from "react-router-dom";

import AdminLayout from "../AdminLayout";
import CategoryPage from "../components/CategoryPage";

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/categories" element={<CategoryPage />} />
        {/* Add more admin routes here */}
      </Routes>
    </AdminLayout>
  );
};

export default AdminDashboard;
