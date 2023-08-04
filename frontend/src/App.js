// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link , useLocation} from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import ProductDetail from "./components/ProductDetail";
import useProducts from "./products";
import "./styles/App.css"; // Import the CSS styles
import Dashboard from "./admin/pages/Dashboard";
import { CartProvider } from "./components/CartContext"; // Import the CartProvider
import CartPage from "./components/CartPage";
import CheckoutPage from "./components/CheckoutPage";
import ThankYou from "./components/ThankYou";
import RegisterPage from "./components/RegisterPage";
import Registered from "./components/Registered";
import LoginPage from "./components/LoginPage";

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
              <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

const App = () => {

  return (
    <CartProvider> {/* Wrap the app with the CartProvider */}
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/admin/*" element={<Dashboard />} />
          <Route path="/cart" element={<CartPage/>} /> {/* Add the route for CartPage */}
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/thankyou" element={<ThankYou />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/registered" element={<Registered />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </div>
    </CartProvider>
  );
};

export default App;
