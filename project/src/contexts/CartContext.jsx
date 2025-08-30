import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item, size, color, quantity = 1) => {
    setCartItems(prev => {
      const existingItem = prev.find(
        cartItem => cartItem.item.id === item.id && 
        cartItem.selectedSize === size && 
        cartItem.selectedColor === color
      );

      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.id === existingItem.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      }

      return [...prev, {
        id: `${item.id}-${size}-${color}`,
        item,
        quantity,
        selectedSize: size,
        selectedColor: color
      }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.item.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalItems,
      getTotalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};