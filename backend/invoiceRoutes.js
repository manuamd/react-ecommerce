const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const db = require("./firebase"); // Import the Firebase module

// Firebase Firestore instance
const invoicesCollection = db.collection("invoices");
const invoiceItemsCollection = db.collection("invoiceItems");


// Route to handle the checkout process
router.post('/', async (req, res) => {
    try {
      const { userInfo, cartItems, totalPrice } = req.body;
  
      // Create a new invoice document with user checkout information
      const invoiceRef = await invoicesCollection.add({
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        mobile: userInfo.mobile,
        address: userInfo.address,
        totalPrice: totalPrice,
        createdDate: new Date().toISOString(),
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

// Route to get all invoices with invoice items
router.get('/', async (req, res) => {
    try {
      const invoicesSnapshot = await invoicesCollection.get();
      const invoices = [];
  
      for (const doc of invoicesSnapshot.docs) {
        const invoiceData = doc.data();
        const invoiceId = doc.id;
  
        // Fetch the associated invoice items using the invoice ID
        const invoiceItemsSnapshot = await invoiceItemsCollection.doc(invoiceId).get();
        const invoiceItemsData = invoiceItemsSnapshot.data();
        const invoiceItems = invoiceItemsData ? invoiceItemsData.items : [];
  
        const invoice = {
          id: invoiceId,
          firstName: invoiceData.firstName,
          lastName: invoiceData.lastName,
          mobile: invoiceData.mobile,
          address: invoiceData.address,
          totalPrice: invoiceData.totalPrice,
          createdAt: invoiceData.createdAt.toDate(),
          invoiceItems: invoiceItems,
        };
  
        invoices.push(invoice);
      }
  
      res.status(200).json(invoices);
    } catch (error) {
      console.error('Error getting invoices:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
module.exports = router;