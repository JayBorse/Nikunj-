"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState("");
  const [couponApplied, setCouponApplied] = useState("");

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === "KOPAL10") {
      setDiscountPercent(10);
      setCouponApplied("KOPAL10");
      setCouponError("");
      setCouponCode("");
    } else if (code === "JANM20") {
      setDiscountPercent(20);
      setCouponApplied("JANM20");
      setCouponError("");
      setCouponCode("");
    } else {
      setCouponError("Invalid Coupon Code. Try KOPAL10 (10% Off) or JANM20 (20% Off).");
      setDiscountPercent(0);
      setCouponApplied("");
    }
  };

  const handleRemoveCoupon = () => {
    setDiscountPercent(0);
    setCouponApplied("");
  };

  // Pricing calculations
  const discountAmount = Math.round(cartTotal * (discountPercent / 100));
  const shippingCharges = cartTotal > 500 || cartTotal === 0 ? 0 : 60;
  const finalTotal = cartTotal - discountAmount + shippingCharges;

  // Save applied discount context info in localstorage for checkout page
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("nikunj_applied_discount", JSON.stringify({
        code: couponApplied,
        percent: discountPercent,
        amount: discountAmount
      }));
    }
  }, [couponApplied, discountPercent, discountAmount]);

  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="bg-white border border-brand-border rounded-2xl p-10 sm:p-16 shadow-sm">
          <i className="fa-solid fa-cart-shopping text-brand-border text-6xl mb-6 block mx-auto animate-pulse"></i>
          <h1 className="font-serif text-3xl text-brand-text mb-4">Your Cart is Empty</h1>
          <p className="text-brand-text-light text-sm max-w-sm mx-auto mb-8">
            You haven&apos;t added any beautiful handcrafted dresses to your cart yet.
          </p>
          <Link
            href="/shop"
            className="bg-brand-green hover:bg-brand-green-hover text-white text-xs font-semibold py-3 px-8 rounded-md shadow-md transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Page Title */}
      <h1 className="font-serif text-3xl text-brand-text mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Cart items table */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-brand-border rounded-xl shadow-sm overflow-hidden">
            <div className="hidden sm:grid grid-cols-12 gap-4 bg-brand-card p-4 text-xs font-semibold uppercase tracking-wider text-brand-text-light border-b border-brand-border">
              <div className="col-span-6">Product Details</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
            </div>

            <div className="divide-y divide-brand-border/60">
              {cartItems.map((item) => (
                <div
                  key={`${item.id}-${item.size}`}
                  className="p-4 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center"
                >
                  {/* Product Details (Image, Name, Size) */}
                  <div className="col-span-6 flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md border border-brand-border bg-brand-bg flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="font-medium text-brand-text text-sm sm:text-base truncate">
                        <Link href={`/shop/${item.id}`} className="hover:text-brand-green">
                          {item.name}
                        </Link>
                      </h4>
                      <span className="text-xs text-brand-green font-medium mt-0.5 block bg-brand-card py-0.5 px-2 rounded-full border border-brand-border/30 w-fit">
                        Size: {item.size}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id, item.size)}
                        className="text-[10px] text-brand-text-light hover:text-red-500 font-semibold uppercase mt-2 block sm:hidden"
                      >
                        <i className="fa-solid fa-trash-can mr-1"></i> Remove
                      </button>
                    </div>
                  </div>

                  {/* Unit Price */}
                  <div className="col-span-2 text-left sm:text-center text-sm font-semibold text-brand-text">
                    <span className="inline sm:hidden text-brand-text-light text-xs font-normal">Price: </span>
                    ₹{item.price}
                  </div>

                  {/* Quantity Selector */}
                  <div className="col-span-2 flex justify-start sm:justify-center">
                    <div className="flex items-center border border-brand-border rounded overflow-hidden bg-white max-w-[80px]">
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                        className="w-6 py-0.5 text-brand-text hover:bg-brand-bg font-semibold text-xs text-center"
                      >
                        -
                      </button>
                      <span className="flex-grow text-center text-xs font-bold px-1">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                        className="w-6 py-0.5 text-brand-text hover:bg-brand-bg font-semibold text-xs text-center"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Total price & desktop Delete Button */}
                  <div className="col-span-2 flex items-center justify-between sm:justify-end text-sm font-semibold text-brand-text">
                    <span className="inline sm:hidden text-brand-text-light text-xs font-normal">Subtotal: </span>
                    <div className="flex items-center gap-3">
                      <span>₹{item.price * item.quantity}</span>
                      <button
                        onClick={() => removeFromCart(item.id, item.size)}
                        className="hidden sm:block text-brand-text-light hover:text-red-500 transition-colors p-1"
                        title="Remove Item"
                      >
                        <i className="fa-solid fa-trash-can"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart actions row */}
          <div className="flex justify-between items-center bg-white border border-brand-border rounded-xl p-4 shadow-sm">
            <Link
              href="/shop"
              className="text-xs text-brand-green hover:underline font-semibold flex items-center gap-1.5"
            >
              <i className="fa-solid fa-arrow-left-long"></i> Continue Shopping
            </Link>
            <button
              onClick={clearCart}
              className="text-xs text-brand-text-light hover:text-red-500 font-semibold flex items-center gap-1"
            >
              <i className="fa-solid fa-circle-xmark"></i> Clear Shopping Cart
            </button>
          </div>
        </div>

        {/* Right Column: Coupon Form & Pricing Summary */}
        <div className="space-y-6">
          {/* Coupon Code Block */}
          <div className="bg-white border border-brand-border rounded-xl p-6 shadow-sm">
            <h3 className="font-serif text-base font-semibold text-brand-text mb-3">Promo Code</h3>
            
            {couponApplied ? (
              <div className="bg-green-50 border border-green-200 text-green-700 text-xs p-3 rounded-lg flex justify-between items-center">
                <div>
                  <strong>Code Applied: </strong>
                  <span className="font-mono">{couponApplied} ({discountPercent}% Off)</span>
                </div>
                <button
                  onClick={handleRemoveCoupon}
                  className="text-red-500 hover:text-red-700 font-semibold cursor-pointer"
                >
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyCoupon}>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. KOPAL10"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-grow border border-brand-border rounded p-2 text-xs uppercase focus:outline-none focus:border-brand-green font-mono"
                  />
                  <button
                    type="submit"
                    className="bg-brand-green hover:bg-brand-green-hover text-white text-xs font-semibold py-2 px-4 rounded transition-colors shadow-sm focus:outline-none"
                  >
                    Apply
                  </button>
                </div>
                {couponError && (
                  <p className="text-[10px] text-red-500 mt-2 font-medium leading-relaxed">
                    {couponError}
                  </p>
                )}
                <div className="text-[10px] text-brand-text-light italic mt-2.5">
                  Try coupon code <span className="font-mono text-brand-green font-semibold">KOPAL10</span> (10% Off) or <span className="font-mono text-brand-green font-semibold">JANM20</span> (20% Off).
                </div>
              </form>
            )}
          </div>

          {/* Checkout pricing card */}
          <div className="bg-brand-card/45 border border-brand-border rounded-xl p-6 shadow-sm">
            <h3 className="font-serif text-lg font-medium text-brand-text pb-3 mb-4 border-b border-brand-border">
              Order Summary
            </h3>

            <div className="text-xs text-brand-text-light space-y-3 pb-4 mb-4 border-b border-brand-border/60">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-semibold text-brand-text">₹{cartTotal}</span>
              </div>
              
              {discountPercent > 0 && (
                <div className="flex justify-between text-green-700">
                  <span>Coupon Discount ({discountPercent}%):</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Shipping Charges:</span>
                <span>{shippingCharges === 0 ? "FREE" : `₹${shippingCharges}`}</span>
              </div>

              {shippingCharges > 0 && (
                <div className="text-[10px] text-brand-text-light italic text-right">
                  Add ₹{500 - cartTotal} more for FREE shipping
                </div>
              )}
            </div>

            <div className="flex justify-between items-center text-sm font-semibold text-brand-text mb-6">
              <span>Grand Total:</span>
              <span className="text-xl text-brand-green">₹{finalTotal}</span>
            </div>

            <Link
              href="/checkout"
              className="w-full bg-brand-green hover:bg-brand-green-hover text-white py-3 rounded-md font-semibold text-xs tracking-wider uppercase transition-colors shadow-md focus:outline-none flex items-center justify-center gap-1.5"
            >
              <i className="fa-solid fa-shield-halved"></i> Proceed to Checkout
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
