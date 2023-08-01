// src/components/AdminLayout.js
import React from "react";
import AdminSidebar from "./components/AdminSideBar"; // Replace with the actual admin sidebar component
import "./AdminLayout.css"; // Add your custom CSS for the admin layout

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-content">{children}</main>
    </div>
  );
};

export default AdminLayout;
