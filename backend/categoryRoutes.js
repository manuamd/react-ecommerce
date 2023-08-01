// backend/categoryRoutes.js

const express = require("express");
const router = express.Router();
const db = require("./firebase"); // Import the Firebase module
// Initialize Firebase Admin SDK

// Firestore collection reference
const categoriesCollection = db.collection("categories");

// Sample categories data (you can replace this with your database)
const sampleCategories = [
  {
    categoryId: 1,
    categoryName: "Electronics",
    createdDate: "2023-07-30",
    createdUser: "admin",
    updatedDate: "2023-07-30",
    updatedUser: "admin",
    deleted: false,
  },
  {
    categoryId: 2,
    categoryName: "Clothing",
    createdDate: "2023-07-30",
    createdUser: "admin",
    updatedDate: "2023-07-30",
    updatedUser: "admin",
    deleted: false,
  },
  {
    categoryId: 3,
    categoryName: "Books",
    createdDate: "2023-07-30",
    createdUser: "admin",
    updatedDate: "2023-07-30",
    updatedUser: "admin",
    deleted: false,
  },
];

// Seed sample categories data to Firestore (You can remove this in production)
sampleCategories.forEach((category) => {
  categoriesCollection.doc(category.categoryId.toString()).set(category);
});

// Get all categories
router.get("/", async (req, res) => {
  try {
    const snapshot = await categoriesCollection
      .where("deleted", "==", false)
      .get();
    const categories = snapshot.docs.map((doc) => doc.data());
    res.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get a single category by ID
router.get("/:id", async (req, res) => {
  const categoryId = parseInt(req.params.id);

  try {
    const doc = await categoriesCollection.doc(categoryId.toString()).get();
    if (!doc.exists) {
      return res.status(404).json({ error: "Category not found" });
    }
    const category = doc.data();
    res.json(category);
  } catch (error) {
    console.error("Error fetching category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Create a new category
router.post("/", async (req, res) => {
  const { categoryName } = req.body;
  if (!categoryName) {
    return res.status(400).json({ error: "Category name is required" });
  }

  const snapshot = await categoriesCollection.count().get();
  const newCategoryId = snapshot.data().count + 1;
  const newCategory = {
    categoryId: newCategoryId,
    categoryName,
    createdDate: new Date().toISOString(),
    createdUser: "admin",
    updatedDate: new Date().toISOString(),
    updatedUser: "admin",
    deleted: false,
  };

  try {
    await categoriesCollection.doc(newCategoryId.toString()).set(newCategory);
    res.status(201).json(newCategory);
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update a category by ID
router.put("/:id", async (req, res) => {
  const categoryId = parseInt(req.params.id);
  const { categoryName } = req.body;

  try {
    const docRef = categoriesCollection.doc(categoryId.toString());
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: "Category not found" });
    }

    await docRef.update({
      categoryName,
      updatedDate: new Date().toISOString(),
      updatedUser: "admin",
    });

    const updatedDoc = await docRef.get();
    const updatedCategory = updatedDoc.data();
    res.json(updatedCategory);
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a category by ID
router.delete("/:id", async (req, res) => {
  const categoryId = parseInt(req.params.id);

  try {
    const docRef = categoriesCollection.doc(categoryId.toString());
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: "Category not found" });
    }

    await docRef.update({
      deleted: true,
      updatedDate: new Date().toISOString(),
      updatedUser: "admin",
    });

    res.sendStatus(204);
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
