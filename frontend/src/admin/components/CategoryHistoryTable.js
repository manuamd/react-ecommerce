import React, { useState } from "react";
import ConfirmationModal from "./ConfirmationModal";
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
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const handleDeleteClick = (itemId) => {
    setSelectedItemId(itemId);
    setIsConfirmModalOpen(true);
  };


  const handleConfirmDelete = async () => {
    onDelete(selectedItemId);
    resetDelete();
  };

  const resetDelete = () => {
    setIsConfirmModalOpen(false);
    setSelectedItemId(null);
  }

  const handleCloseConfirmModal = () => {
    resetDelete();
  };

  return (
    <div>
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
                <TableCell>
                  {new Date(category.createdDate).toLocaleDateString("en-GB")} {/* Format date to DD/MM/YYYY */}
                </TableCell>
                <TableCell>
                  {new Date(category.updatedDate).toLocaleDateString("en-GB")} {/* Format date to DD/MM/YYYY */}
                </TableCell>
                <TableCell align="center">
                  {/* Update button */}
                  <Button variant="outlined" onClick={() => onEdit(category)} sx={{ mr: 2 }}>
                    Edit
                  </Button>
                  {/* Delete button */}
                  <Button
                    variant="outlined"
                    onClick={() => handleDeleteClick(category.categoryId)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ConfirmationModal
        isOpen={isConfirmModalOpen}
        onClose={handleCloseConfirmModal}
        onConfirm={handleConfirmDelete}
        message="Are you sure you want to delete this category history item?"
      />
    </div>
  );
};

export default CategoryHistoryTable;
