// components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";

const AdminSideBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link to="/admin" className="navbar-brand">
        Admin Dashboard
      </Link>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link to="/admin/categories" className="nav-link">
              Category
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default AdminSideBar;
