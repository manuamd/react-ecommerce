import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { ShoppingCartOutlined } from "@mui/icons-material";
import { CartContext } from "./CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <Card sx={{ maxWidth: 300, margin: "10px" }}>
      <Link
        to={`/products/${product.id}`}
        className="text-decoration-none"
        style={{ color: "blue" }}
      >
        <CardMedia
          component="img"
          height="200"
          image={product.imageUrl}
          alt={product.name}
        />
      </Link>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          <Link
            to={`/products/${product.id}`}
            className="text-decoration-none"
            style={{ color: "blue" }}
          >
            {product.name}
          </Link>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ${product.price}
        </Typography>
      </CardContent>
      <Box display="flex" justifyContent="flex-end" mt={2} pr={2}>
        <Button variant="contained" color="primary" onClick={handleAddToCart}>
          <ShoppingCartOutlined sx={{ marginRight: 1 }} />
          Add To Cart
        </Button>
      </Box>
      <br></br>
    </Card>
  );
};

export default ProductCard;
