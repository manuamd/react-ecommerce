// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import ProductDetail from './components/ProductDetail';
import products from './products'; // Import the products array
import './styles/App.css'; // Import the CSS styles

const Home = () => {
  return (
    <div className="container">
      <h1>Welcome to Our E-commerce Store!</h1>
      <p>Explore our amazing products and find great deals.</p>

      <div className="row">
        {products.map((product) => (
          <div key={product.id} className="col-md-4">
            <Link to={`/products/${product.id}`} className="text-decoration-none">
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
          <Route
            path="/products/:id"
            element={<ProductDetail products={products} />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;