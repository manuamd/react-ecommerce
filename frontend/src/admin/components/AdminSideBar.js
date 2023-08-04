import React from "react";
import { Link } from "react-router-dom";

const AdminSideBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to="/admin" className="navbar-brand">
          Admin Dashboard
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/admin/categories" className="nav-link">
                Category
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/products" className="nav-link">
                Product
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/orders" className="nav-link">
                Orders
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AdminSideBar;
