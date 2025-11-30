import { useState, useEffect } from "react";
import { CartContext } from "./CartContext";

export function CartProvider({children}) {
    const [cart, setCart] = useState(() => {
        const stored = localStorage.getItem('cart')

        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart])

    const addToCart = (Product) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.id === Product.id);
  
            if (existing) {
                return prev.map((item) => item.id === Product.id ? {...item, qty: item.qty + 1} : item);
            }

            return [...prev, {...Product, qty: 1}];
        })
    }

    const removeFromCart = (id) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    }

    const clearCart = () => setCart([]);

    return (
        <CartContext.Provider value={{cart, addToCart, removeFromCart, clearCart}}>
            {children}
        </CartContext.Provider>
    )
}