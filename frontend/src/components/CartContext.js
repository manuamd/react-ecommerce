import React, { createContext, useState, useEffect } from 'react';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  // Load cart items from local storage when the component mounts
  const [cartItems, setCartItems] = useState(() => {
    const storedItems = localStorage.getItem('cartItems');
    return storedItems ? JSON.parse(storedItems) : [];
  });

  // Update local storage when cart items change
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // Action to add an item to the cart
  const addToCart = (product) => {
    // Check if the product is already in the cart
    const itemIndex = cartItems.findIndex((item) => item.id === product.id);

    if (itemIndex === -1) {
      // If the product is not in the cart, add it with a quantity of 1
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    } else {
      // If the product is already in the cart, update its quantity
      const updatedCartItems = [...cartItems];
      updatedCartItems[itemIndex].quantity += 1;
      setCartItems(updatedCartItems);
    }
  };

    // Action to add an item to the cart
    const removeFromCart = (product) => {
        // Check if the product is already in the cart
        const itemIndex = cartItems.findIndex((item) => item.id === product.id);
    
        if (itemIndex > -1) {
            var remainQuantity = cartItems[itemIndex].quantity ;
            if(remainQuantity - 1 < 1)
            {
                const updatedCartItems = cartItems.filter(x => x.id != product.id);
                setCartItems(updatedCartItems);
            }
            else
            {
                const updatedCartItems = [...cartItems];
                updatedCartItems[itemIndex].quantity -= 1;
                setCartItems(updatedCartItems);
            }
          // If the product is already in the cart, update its quantity

        }
      };

    // Action to clear the cart
    const clearCart = () => {
        setCartItems([]);
    };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart  }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };