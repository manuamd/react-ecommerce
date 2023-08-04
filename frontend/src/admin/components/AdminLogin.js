import React, { useState } from "react";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { createBrowserHistory } from "history";

const AdminLogin = () => {
  const history = createBrowserHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (event) => {
    event.preventDefault();
    // Here, you can perform the login logic, such as calling an API to validate the credentials
    // For this example, we'll check if the username and password are "admin"
    if (username === "admin" && password === "admin") {
      setError("");
      // If login is successful, redirect to the admin dashboard
      history.push("/admin");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5} p={3} boxShadow={2}>
        <Typography variant="h4" align="center">
          Admin Login
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </form>
        {error && <Typography color="error">{error}</Typography>}
      </Box>
    </Container>
  );
};

export default AdminLogin;
