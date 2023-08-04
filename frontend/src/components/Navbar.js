import React, { useContext } from "react";
import { Link,useLocation  } from "react-router-dom";
import { CartContext } from "./CartContext";
import { useAuth } from "./AuthContext";
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Typography,
  Button,
} from "@mui/material";
import { Home, ShoppingCart, ExitToApp, Person } from "@mui/icons-material";
import StorefrontIcon from "@mui/icons-material/Storefront";

const Navbar = () => {
  const location = useLocation();
  const hideNavbar = location.pathname.indexOf('/admin') > -1;

  const { cartItems } = useContext(CartContext);
  const { isLoggedIn, username, logout } = useAuth();

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  if (hideNavbar) {
    return null;
  }

  return (
    <AppBar position="static" sx={{ backgroundColor: "#343a40" }}>
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          style={{ color: "white", textDecoration: "none" }}
        >
          <StorefrontIcon /> E-commerce Store
        </Typography>
        {/* <IconButton color="inherit" component={Link} to="/products">
          <i className="bi bi-grid"></i>
        </IconButton> */}
        <IconButton color="inherit" component={Link} to="/cart">
          <Badge badgeContent={totalItems} color="secondary">
            <ShoppingCart />
          </Badge>
        </IconButton>
        <div
          style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}
        >
          {isLoggedIn ? (
            <div className="d-flex align-items-center">
              <div className="me-3 text-white">
                <Person fontSize="small" style={{ marginRight: "4px" }} />
                Hi, {username}
              </div>
              <IconButton color="inherit" onClick={logout}>
                <ExitToApp />
              </IconButton>
            </div>
          ) : (
            <div>
              <Button color="inherit" component={Link} to="/login">
                <i className="bi bi-person me-2"></i> Login
              </Button>
              <Button
                color="inherit"
                variant="outlined"
                component={Link}
                to="/register"
                style={{ marginLeft: "10px" }}
              >
                Register
              </Button>
            </div>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
