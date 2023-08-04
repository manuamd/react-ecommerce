import React, { useEffect, useState } from "react";
import {
    TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Button, Select,
    MenuItem,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";
import api from "../services/api";
import '../AdminLayout.css';
import "jspdf-autotable";

import jsPDF from "jspdf";

const OrderManagement = () => {
    const [invoices, setInvoices] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // State to manage loading status
    const [selectedInvoice, setSelectedInvoice] = useState(null);
    const [isInvoiceDialogOpen, setIsInvoiceDialogOpen] = useState(false);

    useEffect(() => {
        // Fetch the list of invoices from the API and update the state
        fetchInvoices();
    }, []);

    const generateInvoicePDF = (invoiceData) => {
        // Create a new jsPDF instance
        const doc = new jsPDF();
      
        // Add content to the PDF
        doc.setFontSize(18).text("Invoice", doc.internal.pageSize.getWidth() / 2, 20, { align: "center" });
        doc.setFontSize(14).text(`Invoice ID: ${invoiceData.id}`, 20, 40);
        doc.setFontSize(14).text(`Customer: ${invoiceData.firstName} ${invoiceData.lastName}`, 20, 50);
        doc.setFontSize(14).text(`Address: ${invoiceData.address}`, 20, 60);
        doc.text(20, 70, ""); // Blank line
      
         // Custom column names for the table
        const columnNames = ["Product", "Price", "Quantity", "Total"];

        // Loop through invoice items and add them to the PDF
        const tableData = [
           columnNames, // Custom column names for the table
          ...invoiceData.invoiceItems.map((item) => [item.product, item.price, item.quantity, item.price * item.quantity]),
        ];
      
        doc.autoTable({
          startY: 80,
          head: [columnNames],
          body: tableData.slice(1),
          styles: { fontSize: 12 },
        });
      
        // Add total price
        doc.setFontSize(14).text(`Total Price: $${invoiceData.totalPrice}`, 20, doc.autoTable.previous.finalY + 20);
      
        return doc;
      };
      
      const handlePrintInvoice = (invoice) => {
        // Generate the PDF invoice
        const pdfDoc = generateInvoicePDF(invoice);
      
        // Get the PDF blob
        const pdfBlob = pdfDoc.output("blob");
      
        // Create a URL for the PDF blob
        const pdfURL = URL.createObjectURL(pdfBlob);
      
        // Open the PDF in a new tab for print preview
        const printWindow = window.open(pdfURL, "_blank");
        printWindow.onload = () => {
          // Revoke the URL when the print preview tab is closed
          URL.revokeObjectURL(pdfURL);
        };
      };

    const fetchInvoices = async () => {
        try {
            setIsLoading(true);
            const response = await api.get("/invoices");
            setInvoices(response.data);
        } catch (error) {
            console.error("Error fetching invoices:", error);
        } finally {
            setIsLoading(false); // Set loading to false after data is fetched (success or error)
        }
    };

    // Function to handle the status update
    const handleStatusUpdate = async (invoiceId, status) => {
        if (!status) {
            return;
        }

        try {
            setIsLoading(true);
            // Make a PUT request to update the status
            await api.put(`/invoices/${invoiceId}`, { status });
            // Refresh the list of invoices after the update
            fetchInvoices();
        } catch (error) {
            console.error("Error updating status:", error);
        } finally {
            setIsLoading(false); // Set loading to false after the API call (success or error)
        }
    };

    // Function to handle row click and display invoice items
    const handleRowClick = (invoiceId, e) => {
        const cell = e.target.closest("td");
        if (!cell) return;

        const cellIndex = cell.cellIndex;

        // Exclude clicks on the last column (Status column)
        if (cellIndex === 5 || cellIndex === 6) {
            return;
        }

        const selectedInvoice = invoices.find((invoice) => invoice.id === invoiceId);
        setSelectedInvoice(selectedInvoice);
        setIsInvoiceDialogOpen(true);
    };

    return (
        <>
            {isLoading && ( // Show loading modal while isLoading is true
                <Dialog open={true}>
                    <DialogTitle>Loading</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Please wait...</DialogContentText>
                        <CircularProgress />
                    </DialogContent>
                </Dialog>
            )}
            <TableContainer component={Paper} sx={{ padding: "20px" }}>
                <Table className="table table-striped">
                    <TableHead>
                        <TableRow>
                            <TableCell className="border-right">Customer Name</TableCell>
                            <TableCell className="border-right">Address</TableCell>
                            <TableCell className="border-right">Mobile</TableCell>
                            <TableCell className="border-right">Price</TableCell>
                            <TableCell className="border-right">Status</TableCell>
                            <TableCell className="border-right">Action</TableCell>
                            <TableCell className="border-right">Print</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {invoices.map((invoice) => (
                            <TableRow
                                key={invoice.id}
                                onClick={(e) => handleRowClick(invoice.id, e)}
                                style={{ cursor: "pointer" }} // Set cursor style to indicate it's clickable
                            >
                                <TableCell className="border-right">{invoice.firstName} {invoice.lastName}</TableCell>
                                <TableCell className="border-right">{invoice.address}</TableCell>
                                <TableCell className="border-right">{invoice.mobile}</TableCell>
                                <TableCell className="border-right">${invoice.totalPrice}</TableCell>
                                <TableCell className="border-right">{invoice.status ? invoice.status : 'New'}</TableCell>
                                <TableCell className="border-right">
                                    {invoice.status == "New" || invoice.status == null ? (
                                        <Select
                                            value={""}
                                            onChange={(e) =>
                                                handleStatusUpdate(invoice.id, e.target.value)
                                            }
                                        >
                                            <MenuItem value="">Select An Option</MenuItem>
                                            <MenuItem value="Cancelled">Cancelled</MenuItem>
                                            <MenuItem value="Complete">Complete</MenuItem>
                                        </Select>
                                    ) : ""}
                                </TableCell>
                                <TableCell>
                                    {/* Add the "Print" button */}
                                    {invoice.status === "Complete" ? (
                                        <Button variant="contained" color="primary" onClick={() => handlePrintInvoice(invoice)}>
                                            Print
                                        </Button>
                                    ) : null}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Invoice Details Dialog */}
            <Dialog
                open={isInvoiceDialogOpen}
                onClose={() => setIsInvoiceDialogOpen(false)}
            >
                <DialogTitle>Order Details</DialogTitle>
                {selectedInvoice && (
                    <DialogContent>
                        <List>
                            {selectedInvoice.invoiceItems.map((item) => (
                                <ListItem key={item.productId}>
                                    <ListItemText
                                        primary={item.product}
                                        secondary={`Quantity: ${item.quantity}, Price: $${item.price}`}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </DialogContent>
                )}
                <DialogActions>
                    <Button onClick={() => setIsInvoiceDialogOpen(false)}>Close</Button>
                </DialogActions>
            </Dialog>

        </>
    );
};

export default OrderManagement;
