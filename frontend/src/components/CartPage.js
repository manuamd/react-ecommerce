import React, { useContext } from 'react';
import { CartContext } from './CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

const CartPage = () => {
    const { cartItems, addToCart, removeFromCart } = useContext(CartContext);
    const navigate = useNavigate();

    const handleIncreaseQuantity = (item) => {
        addToCart(item);
    };

    const handleDecreaseQuantity = (item) => {
        removeFromCart(item);
    };

    const handleCheckout = () => {
        // Redirect to the Checkout page and pass a state to indicate that it's coming from the Cart page
        navigate('/checkout', { state: { fromCart: true } });
    };

    return (
        <div style={{ padding: '20px' }}>
            <h3>Cart Items</h3>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((item) => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>
                                    <div className="btn-group" role="group">
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={() => handleDecreaseQuantity(item)}
                                        >
                                            -
                                        </button>
                                        <span className="btn btn-light">{item.quantity}</span>
                                        <button
                                            type="button"
                                            className="btn btn-secondary"
                                            onClick={() => handleIncreaseQuantity(item)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </td>
                                <td>${item.price}</td>
                                <td>${item.price * item.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {cartItems.length > 0 && (
                <div style={{ textAlign: 'right' }}>
                    <h3>Total: ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}</h3>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleCheckout}
                        disabled={cartItems.length === 0}
                    >
                        Checkout
                    </Button>
                </div>
            )}
        </div>
    );
};

export default CartPage;