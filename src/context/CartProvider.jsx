import { useState } from "react";
import { CartContext } from "./CartContext";

export function CartProvider({children}) {
    const [cart, setCart] = useState([]);

    const addToCart = (Product) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.id === Product.id);
  
            if (existing) {
                return prev.map((item) => item.id === Product.id ? {...item, qty: item.qty + 1} : item);
            }

            return [...prev, {...Product, qty: 1}];
        })
    }

    return (
        <CartContext.Provider value={{cart, addToCart}}>
            {children}
        </CartContext.Provider>
    )
}