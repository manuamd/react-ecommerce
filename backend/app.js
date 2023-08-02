const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const categoryRoutes = require("./categoryRoutes"); // Import the categoryRoutes.js
const productRoutes = require("./productRoutes");
const cors = require("cors"); // Import the cors package

const port = 5000; // Change this to the desired port number

app.use(bodyParser.json());
app.use(cors({ origin: true }));

// Define your routes
app.use("/api/categories", categoryRoutes); // Use the categoryRoutes.js for category-related routes

// Route for product APIs
app.use("/api/products", productRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
