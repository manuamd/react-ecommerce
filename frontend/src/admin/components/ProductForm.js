import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const ProductForm = ({ categories, onSubmit }) => {
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  // Set the initial value for selectedCategoryId when the categories array changes
  useEffect(() => {
    if (categories.length > 0) {
      setSelectedCategoryId(null);
    }
  }, [categories]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      name: productName,
      description: productDescription,
      price: productPrice,
      categoryId: selectedCategoryId,
    };
    onSubmit(data);
    setProductName("");
    setProductDescription("");
    setProductPrice("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="row" spacing={2}>
        <TextField
          label="Product Name"
          variant="outlined"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          fullWidth
        />
        <TextField
          label="Description"
          variant="outlined"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          fullWidth
        />
        <TextField
          label="Price"
          type="number"
          variant="outlined"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
          fullWidth
        />
        <FormControl variant="outlined" fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategoryId}
            onChange={(e) => setSelectedCategoryId(e.target.value)}
            label="Category"
          >
            {categories.map((category) => (
              <MenuItem key={category.categoryId} value={category.categoryId}>
                {category.categoryName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
      </Stack>
    </form>
  );
};

export default ProductForm;