"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface WishlistItem {
  id: string | number;
  name: string;
  price: number;
  image: string;
}

interface WishlistContextType {
  wishlistItems: WishlistItem[];
  toggleWishlist: (item: WishlistItem) => void;
  isWishlisted: (id: string | number) => boolean;
  clearWishlist: () => void;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem("nikunj_wishlist");
      if (savedWishlist) {
        setWishlistItems(JSON.parse(savedWishlist));
      }
    } catch (e) {
      console.error("Failed to load wishlist from localStorage:", e);
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem("nikunj_wishlist", JSON.stringify(wishlistItems));
      } catch (e) {
        console.error("Failed to save wishlist to localStorage:", e);
      }
    }
  }, [wishlistItems, isInitialized]);

  const toggleWishlist = (item: WishlistItem) => {
    setWishlistItems((prevItems) => {
      const exists = prevItems.some((i) => i.id === item.id);
      if (exists) {
        return prevItems.filter((i) => i.id !== item.id);
      }
      return [...prevItems, item];
    });
  };

  const isWishlisted = (id: string | number) => {
    return wishlistItems.some((item) => item.id === id);
  };

  const clearWishlist = () => {
    setWishlistItems([]);
  };

  const wishlistCount = wishlistItems.length;

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        toggleWishlist,
        isWishlisted,
        clearWishlist,
        wishlistCount,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
