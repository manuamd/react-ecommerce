const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const db = require("./firebase"); // Import the Firebase module

// Firebase Firestore instance
const invoicesCollection = db.collection("invoices");
const invoiceItemsCollection = db.collection("invoiceItems");
const productsCollection = db.collection("products");

// Route to handle the checkout process
router.post('/', async (req, res) => {
  try {
    const { userInfo, cartItems, totalPrice } = req.body;

    // Create a new invoice document with user checkout information
    const invoiceRef = await invoicesCollection.add({
      username: userInfo.username,
      firstName: userInfo.firstName,
      lastName: userInfo.lastName,
      mobile: userInfo.mobile,
      address: userInfo.address,
      totalPrice: totalPrice,
      createdDate: new Date().toISOString(),
      status: 'New'
    });

    // Create invoice items and associate them with the invoice
    for (const cartItem of cartItems) {
      await invoiceItemsCollection.add({
        invoiceId: invoiceRef.id, // Link the invoice item to the invoice document
        productId: cartItem.id, // Assuming each product has an "id" property
        quantity: cartItem.quantity,
        price: cartItem.price,
      });
    }

    res.status(200).json({ message: 'Invoice created successfully!' });
  } catch (error) {
    console.error('Error creating invoice:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to update invoice status and updatedDate
router.put('/:invoiceId', async (req, res) => {
  try {
    const { invoiceId } = req.params;
    const { status } = req.body;

    // Get the invoice document reference
    const invoiceRef = invoicesCollection.doc(invoiceId);

    // Update the status and updatedDate fields
    await invoiceRef.update({
      status: status,
      updatedDate: new Date().toISOString(),
    });

    res.status(200).json({ message: 'Invoice status updated successfully!' });
  } catch (error) {
    console.error('Error updating invoice status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to get all invoices with invoice items
router.get('/', async (req, res) => {
  try {
    const invoicesSnapshot = await invoicesCollection.get();
    const invoices = [];

    for (const doc of invoicesSnapshot.docs) {
      const invoiceData = doc.data();
      const invoiceId = doc.id;

      // Fetch the associated invoice items using the invoice ID
      const invoiceItemsSnapshot = await invoiceItemsCollection.where("invoiceId", "==", invoiceId).get();
      const invoiceItems = [];

      for (const itemDoc of invoiceItemsSnapshot.docs) {
        const itemData = itemDoc.data();
        // Fetch the product details using the productId in the invoice item
        const productDoc = await productsCollection.doc(itemData.productId).get();
        const productData = productDoc.data();

        const invoiceItem = {
          product: productData ? productData.name : null,
          quantity: itemData.quantity,
          price: itemData.price,
        };

        invoiceItems.push(invoiceItem);
      }
      if (invoiceItems.length > 0) {
        const invoice = {
          id: invoiceId,
          firstName: invoiceData.firstName,
          lastName: invoiceData.lastName,
          mobile: invoiceData.mobile,
          address: invoiceData.address,
          totalPrice: invoiceData.totalPrice,
          createdDate: invoiceData.createdDate ? invoiceData.createdDate : null,
          invoiceItems: invoiceItems,
          status: invoiceData.status
        };

        invoices.push(invoice);
      }

    }

    res.status(200).json(invoices);
  } catch (error) {
    console.error('Error getting invoices:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;