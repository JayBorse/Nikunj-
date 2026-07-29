"use client";

import React from "react";
import Link from "next/link";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";

export default function WishlistPage() {
  const { wishlistItems, toggleWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (item: any) => {
    addToCart(
      {
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
        size: "Size 2 (6\" Dress)", // Default standard size
      },
      1
    );
    toggleWishlist(item); // Remove from wishlist
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="bg-white border border-brand-border rounded-2xl p-10 sm:p-16 shadow-sm">
          <i className="fa-regular fa-heart text-brand-border text-6xl mb-6 block mx-auto animate-pulse"></i>
          <h1 className="font-serif text-3xl text-brand-text mb-4">Your Wishlist is Empty</h1>
          <p className="text-brand-text-light text-sm max-w-sm mx-auto mb-8">
            Save your favorite dresses and accessories here to view them later or add them to your cart.
          </p>
          <Link
            href="/shop"
            className="bg-brand-green hover:bg-brand-green-hover text-white text-xs font-semibold py-3 px-8 rounded-md shadow-md transition-colors"
          >
            Browse Collection
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Page header */}
      <div className="flex justify-between items-center mb-8 border-b border-brand-border pb-4">
        <h1 className="font-serif text-3xl text-brand-text">My Wishlist</h1>
        <button
          onClick={clearWishlist}
          className="text-xs text-brand-text-light hover:text-red-500 font-semibold flex items-center gap-1 cursor-pointer focus:outline-none"
        >
          <i className="fa-solid fa-trash-can"></i> Clear All Wishlist
        </button>
      </div>

      {/* Wishlist items Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {wishlistItems.map((item) => (
          <div
            key={item.id}
            className="group bg-white rounded-xl border border-brand-border overflow-hidden hover:shadow-lg transition-shadow relative flex flex-col justify-between"
          >
            {/* Delete/Heart button */}
            <button
              onClick={() => toggleWishlist(item)}
              className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-red-500 hover:bg-white transition-colors cursor-pointer"
              title="Remove from Wishlist"
            >
              <i className="fa-solid fa-heart"></i>
            </button>

            <Link href={`/shop/${item.id}`} className="block overflow-hidden flex-grow animate-fade-in">
              <div className="aspect-[4/5] bg-gray-50 overflow-hidden">
                <img
                  alt={item.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  src={item.image}
                />
              </div>
              <div className="p-4 pb-2 text-xs">
                <h3 className="font-semibold text-gray-900 truncate group-hover:text-brand-green transition-colors text-sm mb-1.5">
                  {item.name}
                </h3>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-brand-green text-base font-serif">₹{item.price}</span>
                </div>
              </div>
            </Link>

            <div className="p-4 pt-0">
              <button
                onClick={() => handleMoveToCart(item)}
                className="w-full bg-brand-green hover:bg-brand-green-hover text-white py-2.5 rounded-lg font-semibold text-xs transition-colors shadow-sm focus:outline-none flex items-center justify-center gap-1.5 mt-2 cursor-pointer"
              >
                <i className="fa-solid fa-cart-shopping"></i> Move to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
