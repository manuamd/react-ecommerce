import React, { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TextField, Button, Stack, Card, Alert } from "@mui/material";
import { CartContext } from "./CartContext";
import { useAuth } from "./AuthContext";

import * as constants from "../Constants";

const CheckoutPage = () => {
  const location = useLocation();
  const { fromCart } = location.state || {};
  const { cartItems, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const { username } = useAuth();
  const [user, setUser] = useState(null); // State to store user info

  useEffect(() => {
    // Fetch user info from backend API based on the username
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(
          constants.API_BASE_URL + `/users/${username}`
        );
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          setFirstName(userData.firstName);
          setLastName(userData.lastName);
          setMobile(userData.mobile);
          setAddress(userData.address);
        } else {
          setError("Failed to fetch user information. Please try again later.");
        }
      } catch (error) {
        setError(
          "An error occurred while fetching user information. Please try again later."
        );
      }
    };

    if (fromCart && username) {
      // Check if the user is logged in before fetching user info
      fetchUserInfo();
    }
  }, [fromCart, username]);

  if (!fromCart) {
    navigate("/cart");
    return null;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!firstName || !lastName || !mobile || !address) {
      setError("Please fill in all required fields.");
      return;
    }

    let userInfo = {
      firstName: firstName,
      lastName: lastName,
      mobile: mobile,
      address: address,
    };

    const checkoutData = {
      userInfo: userInfo,
      cartItems,
      totalPrice: calculateTotalPrice(cartItems),
    };

    try {
      // Call your backend API to submit the checkout data
      const response = await fetch(constants.API_BASE_URL + "/invoices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutData),
      });

      if (response.ok) {
        // Clear the cart after successful order processing
        clearCart();
        // Redirect to a success/thank you page after successful order processing
        navigate("/thankyou");
      } else {
        // Show an error message if the order processing failed
        alert("Order processing failed. Please try again later.");
      }
    } catch (error) {
      console.error("Error during order processing:", error);
      // Show an error message if an error occurred during order processing
      alert(
        "An error occurred during order processing. Please try again later."
      );
    }
  };
  return (
    <div className="container mt-5">
      <div className="row">
        {/* User Input Form */}
        <div className="col-md-8">
          <h3>Shipping Information</h3>
          {error && <Alert severity="error">{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                label="First Name"
                variant="outlined"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                fullWidth
                required
              />
              <TextField
                label="Last Name"
                variant="outlined"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                fullWidth
                required
              />
              <TextField
                label="Mobile"
                variant="outlined"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                fullWidth
                required
              />
              <TextField
                label="Address"
                variant="outlined"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                fullWidth
                required
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Place Order
              </Button>
            </Stack>
          </form>
        </div>

        {/* Cart Items and Total Price Panel */}
        <div className="col-md-4">
          <div className="row">
            <div className="col-md-8">
              <h4>
                <span className="text-muted">Cart Summary</span>
              </h4>
            </div>
            <div className="col-md-4" style={{ textAlign: "right" }}>
              <span className="badge bg-secondary">2</span>
            </div>
          </div>
          <ul className="list-group mb-3">
            {cartItems.map((item) => (
              <li
                className="list-group-item d-flex justify-content-between lh-condensed"
                key={item.id}
              >
                <div className="col-md-8">
                  <h6 className="my-0">{item.name}</h6>
                  <small className="text-muted">{item.description}</small>
                </div>
                <div className="col-md-4" style={{ textAlign: "right" }}>
                  <span className="text-muted">${item.price}</span>
                  <br></br>
                  <small className="text-muted">x {item.quantity}</small>
                </div>
              </li>
            ))}
            <li className="list-group-item d-flex justify-content-between">
              <span>Total (USD)</span>
              <strong>${calculateTotalPrice(cartItems)}</strong>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// Function to calculate the total price of all items in the cart
const calculateTotalPrice = (cartItems) => {
  const totalPrice = cartItems.reduce(
    (total, item) => total + parseFloat(item.price),
    0
  );
  return totalPrice.toFixed(2);
};

export default CheckoutPage;
