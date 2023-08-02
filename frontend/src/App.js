// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import ProductDetail from "./components/ProductDetail";
import useProducts from "./products";
import "./styles/App.css"; // Import the CSS styles
import Dashboard from "./admin/pages/Dashboard";

const Home = () => {
  const { products, loading } = useProducts();

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="container">
      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-4">
            <Link
              to={`/products/${product.id}`}
              className="text-decoration-none"
            >
              <ProductCard product={product} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/admin/*" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
