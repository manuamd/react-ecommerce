import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import ProductForm from "./ProductForm";
import ProductHistoryTable from "./ProductHistoryTable";
import api from "../services/api";

const ProductPage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    // Fetch categories from the backend API
    api.get("/categories").then((response) => {
      setCategories(response.data);
    });

    // Fetch products from the backend API
    api.get("/products").then((response) => {
      setProducts(response.data);
    });
  }, []);

  const handleProductSubmit = (data) => {
    // Send the product data to the backend API to create a new product
    if (data.id) {
      api.put(`/products/${data.id}`, data).then((response) => {
        setSelectedProduct(null);
        // Refresh the products list after creating a new product
        api.get("/products").then((response) => {
          setProducts(response.data);
        });
      });
    } else {
      api.post("/products", data).then((response) => {
        setSelectedProduct(null);
        // Refresh the products list after creating a new product
        api.get("/products").then((response) => {
          setProducts(response.data);
        });
      });
    }
  };

  const handleEditProduct = (product) => {
    setSelectedProduct(product);
  };

  const handleDeleteProduct = (productId) => {
    // Send the product ID to the backend API to delete the product
    api.delete(`/products/${productId}`).then((response) => {
      // Refresh the products list after deleting the product
      api.get("/products").then((response) => {
        setProducts(response.data);
      });
    });
  };

  return (
    <Grid container spacing={3} sx={{ padding: "20px" }}>
      <Grid item xs={12}>
        <Typography variant="h5">Product Management</Typography>
      </Grid>
      <Grid item xs={6}>
        <ProductForm
          categories={categories}
          onSubmit={handleProductSubmit}
          initialValues={selectedProduct}
        />
      </Grid>
      <Grid item xs={12}>
        <ProductHistoryTable
          products={products}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
        />
      </Grid>
    </Grid>
  );
};

export default ProductPage;
