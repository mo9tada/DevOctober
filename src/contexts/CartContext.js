// src/contexts/CartContext.js
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product, size) => {
    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(
        item => item.id === product.id && item.size === size
      );

      if (existingIndex !== -1) {
        const updatedCart = [...prevCart];
        const currentQuantity = updatedCart[existingIndex].quantity || 1;
        updatedCart[existingIndex] = {
          ...updatedCart[existingIndex],
          quantity: currentQuantity + 1,
        };
        return updatedCart;
      }

      return [...prevCart, { ...product, size, quantity: 1 }];
    });
  };

  const removeFromCart = (productId, size) => {
    setCart(prevCart => prevCart.filter(
      item => !(item.id === productId && item.size === size)
    ));
  };

  const increaseQuantity = (productId, size) => {
    setCart(prevCart => prevCart.map(item => {
      if (item.id === productId && item.size === size) {
        const currentQuantity = item.quantity || 1;
        return { ...item, quantity: currentQuantity + 1 };
      }
      return item;
    }));
  };

  const decreaseQuantity = (productId, size) => {
    setCart(prevCart => prevCart.reduce((acc, item) => {
      if (item.id === productId && item.size === size) {
        const currentQuantity = item.quantity || 1;
        if (currentQuantity > 1) {
          acc.push({ ...item, quantity: currentQuantity - 1 });
        }
        return acc;
      }
      acc.push(item);
      return acc;
    }, []));
  };

  const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      increaseQuantity,
      decreaseQuantity,
      cartCount 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};