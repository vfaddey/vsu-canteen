import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCart, addToCart as addToCartService, removeFromCart as removeFromCartService, clearCart as clearCartService } from '../services/cartService';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        setCartItems(getCart());
    }, []);

    const addToCart = (dish) => {
        addToCartService(dish);
        setCartItems(getCart());
    };

    const removeFromCart = (dishId) => {
        console.log("Удаление элемента с id:", dishId); // Лог для отладки
        removeFromCartService(dishId);
        setCartItems(getCart());
    };

    const clearCart = () => {
        clearCartService();
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};