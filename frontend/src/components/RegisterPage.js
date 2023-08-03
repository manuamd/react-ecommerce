import React, { useState } from 'react';
import { TextField, Button, Stack, Typography } from '@mui/material';
import UserModel from '../models/UserModel'

import * as constants from "../Constants";

const RegisterPage = () => {
  const [user, setUser] = useState({ ...UserModel }); // Initialize the form fields with the UserModel

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate password length and match
    if (user.password.length < 8) {
      alert('Password must be at least 8 characters long.');
      return;
    }

    if (user.password !== user.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    try {
      // Call the register user API
      const response = await fetch(constants.API_BASE_URL + '/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      // If the registration is successful, redirect to a thank you page
      if (response.status === 201) {
        setUser({ ...UserModel });
        // Replace the next line with the URL of your thank you page
        window.location.href = '/thankyou';
      }
    } catch (error) {
      // If there's an error with the registration, display an error message
      console.error(error);
      // Display an error message to the user (you can implement this in your UI)
      alert('Error registering user. Please try again.');
    }

  };

  const handleChange = (name, value) => {
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  return (
    <div className="container mt-5">
      <Typography variant="h5">User Registration</Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="First Name"
            variant="outlined"
            value={user.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Last Name"
            variant="outlined"
            value={user.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Address"
            variant="outlined"
            value={user.address}
            onChange={(e) => handleChange('address', e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Mobile"
            variant="outlined"
            value={user.mobile}
            onChange={(e) => handleChange('mobile', e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            value={user.email}
            onChange={(e) => handleChange('email', e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Username"
            variant="outlined"
            value={user.username}
            onChange={(e) => handleChange('username', e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            value={user.password}
            onChange={(e) => handleChange('password', e.target.value)}
            fullWidth
            required
          />

          <TextField
            label="Confirm Password"
            variant="outlined"
            type="password"
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={(e) => handleChange('confirmPassword', e.target.value)}
            fullWidth
            required
          />

          <Button type="submit" variant="contained" color="primary">
            Register
          </Button>
        </Stack>
      </form>
    </div>
  );
};

export default RegisterPage;