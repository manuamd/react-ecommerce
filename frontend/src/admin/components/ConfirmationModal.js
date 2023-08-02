import React from "react";
import { Modal, Button } from "@mui/material";

const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
  return (
    <Modal open={isOpen} onClose={onClose} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ backgroundColor: "#fff", boxShadow: 24, p: 16, position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", borderRadius: 8, margin: "auto", maxWidth: 600, padding:'20px' }}>
        <h2>Confirm</h2>
        <p style={{ margin: "16px 0" }}>{message}</p>
        <Button variant="contained" color="primary" onClick={onConfirm} sx={{ mr: 2 }}>
          Confirm
        </Button>
        <Button variant="contained" color="secondary" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;