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

const ProductForm = ({ categories, onSubmit, initialValues }) => {
  // Use local state for form fields
  const [productName, setProductName] = useState(
    initialValues?.name || "" // Set initial value for name field
  );
  const [productDescription, setProductDescription] = useState(
    initialValues?.description || "" // Set initial value for description field
  );
  const [productPrice, setProductPrice] = useState(
    initialValues?.price || "" // Set initial value for price field
  );
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    initialValues?.categoryId || "" // Set initial value for categoryId field
  );
  const [imageUrl, setImageUrl] = useState(
    initialValues?.imageUrl || "" // Set initial value for categoryId field
  );
  const [selectedProductId, setSelectedProductId] = useState(
    initialValues?.id || "" // Set initial value for categoryId field
  );

  // Update form fields' values when initialValues prop changes
  useEffect(() => {
    if (initialValues) {
      setProductName(initialValues.name || "");
      setProductDescription(initialValues.description || "");
      setProductPrice(initialValues.price || "");
      setSelectedCategoryId(initialValues.categoryId || "");
      setImageUrl(initialValues.imageUrl || "");
      setSelectedProductId(initialValues.id || null);
    }
  }, [initialValues]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      name: productName,
      description: productDescription,
      price: productPrice,
      categoryId: selectedCategoryId,
      id: selectedProductId,
      imageUrl: imageUrl,
    };
    onSubmit(data);
    resetForm();
  };

  const resetForm = () => {
    setProductName("");
    setProductDescription("");
    setProductPrice("");
    setSelectedCategoryId("");
    setImageUrl("");
    setSelectedProductId(null);
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
        <TextField
          label="Image Url"
          variant="outlined"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
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
        <Button
          type="button"
          onClick={resetForm}
          variant="contained"
          color="warning"
        >
          Reset
        </Button>
      </Stack>
    </form>
  );
};

export default ProductForm;
