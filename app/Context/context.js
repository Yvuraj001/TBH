"use client";
import { useState, createContext } from "react";

export const QuantityContext = createContext(1);

export function QuantityProvider({ children }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <QuantityContext.Provider value={{ quantity, setQuantity }}>
      {children}
    </QuantityContext.Provider>
  );
}