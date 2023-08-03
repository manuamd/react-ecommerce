const express = require("express");
const usersRouter = express.Router();
const admin = require("firebase-admin");
const db = require("./firebase"); // Import the Firebase module

// Firebase Firestore instance
const usersCollection = db.collection("users");

// Function to check if the username already exists
const checkDuplicateUsername = async (username) => {
  const snapshot = await usersCollection
    .where("username", "==", username)
    .get();
  return !snapshot.empty;
};

// Route to check if a user can login
usersRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user with the provided username
    const userSnapshot = await usersCollection
      .where("username", "==", username)
      .get();
    const user = userSnapshot.docs[0];

    // If user not found, return 'User not found' error
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const userData = user.data();

    // Check if the password is correct
    if (userData.password !== password) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // If username and password are correct, return success message
    res.json({ message: "Login successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Route to register a new user
usersRouter.post("/", async (req, res) => {
  try {
    const { firstName, lastName, address, mobile, email, username, password } =
      req.body;

    // Check if the username is already taken
    const isDuplicateUsername = await checkDuplicateUsername(username);
    if (isDuplicateUsername) {
      return res.status(400).json({ error: "Username is already taken" });
    }

    // Save the user data to Firestore
    const newUserRef = await usersCollection.add({
      firstName,
      lastName,
      address,
      mobile,
      email,
      username,
      password,
    });

    // Return the newly created user ID
    res.status(201).json({ id: newUserRef.id });
  } catch (error) {
    res.status(500).json({ error: "Error registering user" });
  }
});

// Route to get user by user ID
// usersRouter.get('/:userId', async (req, res) => {
//     try {
//         const { userId } = req.params;

//         // Fetch user data from Firestore by user ID
//         const userSnapshot = await usersCollection.doc(userId).get();
//         if (!userSnapshot.exists) {
//             return res.status(404).json({ error: 'User not found' });
//         }

//         // Return the user data
//         const user = userSnapshot.data();
//         res.json(user);
//     } catch (error) {
//         res.status(500).json({ error: 'Error fetching user' });
//     }
// });

// Route to get user by user ID
usersRouter.get("/:username", async (req, res) => {
  try {
    const { username } = req.params;

    // Find the user with the provided username
    const userSnapshot = await usersCollection
      .where("username", "==", username)
      .get();

    // Check if the user exists
    if (userSnapshot.empty) {
      return res.status(404).json({ error: "User not found" });
    }

    // Assuming there is only one user with a unique username
    const userData = userSnapshot.docs[0].data();

    // Return the user data as the response
    res.json(userData);
  } catch (error) {
    res.status(500).json({ error: "Error fetching user" });
  }
});

// Route to get all users
usersRouter.get("/", async (req, res) => {
  try {
    const usersSnapshot = await usersCollection.get();
    const users = [];
    usersSnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });

    // Return the list of users
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error fetching users" });
  }
});

module.exports = usersRouter;
