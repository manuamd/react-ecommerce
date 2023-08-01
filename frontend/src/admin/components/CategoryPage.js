import React, { useEffect, useState } from "react";
import { Grid, Typography } from "@mui/material";
import CategoryForm from "./CategoryForm";
import CategoryHistoryTable from "./CategoryHistoryTable";
import api from "../services/api";

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await api.get("/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategorySubmit = async (data) => {
    try {
      await api.post("/categories", data);
      fetchCategories();
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  // Add edit and delete functions here
  // Function to delete a category from the backend (onDelete from CategoryForm.js)
  const onDeleteCategory = async (categoryId) => {
    try {
      await api.delete(`/categories/${categoryId}`);
      // Fetch updated categories from the backend after successful deletion
      fetchCategories();
    } catch (error) {
      // Handle errors if necessary
    }
  };

  // Function to handle delete button click
  const handleDelete = (categoryId) => {
    onDeleteCategory(categoryId);
  };

  // Function to handle edit button click
  const handleEdit = (category) => {
    //setSelectedCategory(category);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h5">Category Management</Typography>
      </Grid>
      <Grid item xs={6}>
        <CategoryForm onSubmit={handleCategorySubmit} />
      </Grid>
      <Grid item xs={12}>
        <CategoryHistoryTable
          categories={categories}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </Grid>
    </Grid>
  );
};

export default CategoryPage;
