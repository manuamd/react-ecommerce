import React, { useState, useEffect } from "react";
import { TextField, Button, Stack } from "@mui/material";


const CategoryForm = ({ initialValues, onSubmit }) => {

  const [isEditing, setIsEditing] = useState(!!initialValues);
  const [categoryData, setCategoryData] = useState({
    categoryName: "",
    ...initialValues,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    // When initialValues prop changes (e.g., when in edit mode), update the form state
    setIsEditing(!!initialValues);
    setCategoryData({ categoryName: "", ...initialValues });
  }, [initialValues]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCategoryData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setIsEditing(false);
    setCategoryData({ categoryName: "" });
    setError(""); 
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (categoryData.categoryName.trim() === "") {
      setError("Category name cannot be empty");
      return;
    }

    const data = { ...categoryData };
    onSubmit(data);
    resetForm(); // Reset form after submission
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="row" spacing={2}>
        <TextField
          label="Category Name"
          variant="outlined"
          name="categoryName"
          value={categoryData.categoryName}
          onChange={handleChange}
          fullWidth
          error={!!error}
          helperText={error}
        />
        <Button type="submit" variant="contained" color="primary">
          {isEditing ? "Update" : "Save"}
        </Button>
        <Button type="button" onClick={resetForm} variant="contained" color="warning">
          Reset
        </Button>
      </Stack>
    </form>
  );
};

export default CategoryForm;