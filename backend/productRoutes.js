// productRoutes.js
const express = require("express");
const router = express.Router();
const db = require("./firebase"); // Import the Firebase module

const productsCollection = db.collection("products");
const categoriesCollection = db.collection("categories");

// Function to add sample products with categoryId = 1
const sampleProducts = [
  {
    id: 1,
    name: "Sample Product 1",
    description: "This is the first sample product",
    price: 10.99,
    categoryId: 1,
    Deleted: false,
  },
  {
    id: 2,
    name: "Sample Product 2",
    description: "This is the second sample product",
    price: 19.99,
    categoryId: 1,
    Deleted: false,
  },
  // Add more sample products as needed
];
// Seed sample categories data to Firestore (You can remove this in production)
sampleProducts.forEach((product) => {
  productsCollection.doc(product.id.toString()).set(product);
});

// Create a new product
router.post("/", async (req, res) => {
  try {
    const { name, description, price, categoryId, imageUrl } = req.body;

    // Check if the category ID exists
    const categoryRef = db.collection("categories").doc(categoryId.toString());
    const categoryDoc = await categoryRef.get();
    if (!categoryDoc.exists) {
      return res.status(400).json({ message: "Category not found" });
    }

    // Create the new product with the 'Deleted' field set to false (not deleted)
    const productRef = await productsCollection.add({
      name,
      description,
      price,
      categoryId,
      imageUrl,
      Deleted: false, // Add the 'Deleted' field and set it to false
    });

    res.json({ id: productRef.id, name, description, price, categoryId });
  } catch (error) {
    res.status(500).json({ message: "Failed to create product", error });
  }
});

// Update a product
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, categoryId, imageUrl } = req.body;

    // Check if the product exists
    const productRef = db.collection("products").doc(id);
    const productDoc = await productRef.get();
    if (!productDoc.exists) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if the category ID exists
    const categoryRef = db.collection("categories").doc(categoryId.toString());
    const categoryDoc = await categoryRef.get();
    if (!categoryDoc.exists) {
      return res.status(400).json({ message: "Category not found" });
    }

    // Update the product
    await productRef.update({
      name,
      description,
      price,
      categoryId, // Update the category ID
      imageUrl,
    });

    res.json({ id, name, description, price, categoryId });
  } catch (error) {
    res.status(500).json({ message: "Failed to update product", error });
  }
});

// Get all products (including categoryName)
router.get("/", async (req, res) => {
  try {
    const snapshot = await productsCollection
      .where("Deleted", "==", false)
      .get();

    const products = [];
    for (const doc of snapshot.docs) {
      const productData = doc.data();
      const categoryDoc = await categoriesCollection
        .doc(productData.categoryId.toString())
        .get();
      const categoryData = categoryDoc.data();
      const productWithCategoryName = {
        id: doc.id,
        ...productData,
        categoryName: categoryData.categoryName,
      };
      products.push(productWithCategoryName);
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to get products", error });
  }
});

// Route for getting a single product by ID
router.get("/:id", async (req, res) => {
  try {
    const productId = req.params.id;

    // Fetch the product document from Firestore using the product ID
    const productRef = await db
      .collection("products")
      .doc(productId.toString())
      .get();
    if (!productRef.exists) {
      return res.status(404).json({ error: "Product not found." });
    }

    // Extract the product data from the document
    const productData = productRef.data();

    // Return the product data as the response
    return res.json(productData);
  } catch (error) {
    console.error("Error fetching product:", error);
    return res.status(500).json({ error: "Something went wrong." });
  }
});

// Delete a product (soft delete by updating the 'Deleted' field)
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the product exists
    const productRef = productsCollection.doc(id);
    const productDoc = await productRef.get();
    if (!productDoc.exists) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Soft delete the product by updating the 'Deleted' field to true
    await productRef.update({ Deleted: true });

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product", error });
  }
});

module.exports = router;
