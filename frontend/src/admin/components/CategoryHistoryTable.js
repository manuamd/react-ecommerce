import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

const CategoryHistoryTable = ({ categories, onEdit, onDelete }) => {
  const onBtnClick = (event) => {
    console.log("clicking");
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Category Name</TableCell>
            <TableCell>Created Date</TableCell>
            <TableCell>Updated Date</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.categoryId}>
              <TableCell>{category.categoryName}</TableCell>
              <TableCell>{category.createdDate}</TableCell>
              <TableCell>{category.updatedDate}</TableCell>
              <TableCell align="center">
                {/* Update button */}
                <Button variant="outlined" onClick={() => onEdit(category)}>
                  Update
                </Button>
                {/* Delete button */}
                <Button
                  variant="outlined"
                  onClick={() => onDelete(category.categoryId)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CategoryHistoryTable;
