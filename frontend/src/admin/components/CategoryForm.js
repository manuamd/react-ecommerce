import React, { useState } from "react";
import { TextField, Button, Stack } from "@mui/material";

const CategoryForm = ({ initialValues, onSubmit }) => {
  const [categoryName, setCategoryName] = useState(
    initialValues?.categoryName || ""
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = { categoryName };
    onSubmit(data);
    setCategoryName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack direction="row" spacing={2}>
        <TextField
          label="Category Name"
          variant="outlined"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
      </Stack>
    </form>
  );
};

export default CategoryForm;
