"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, cartTotal, clearCart } = useCart();

  // Form States
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    email: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Discount details loaded from localstorage
  const [couponInfo, setCouponInfo] = useState({
    code: "",
    percent: 0,
    amount: 0,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedDiscount = localStorage.getItem("nikunj_applied_discount");
      if (savedDiscount) {
        setCouponInfo(JSON.parse(savedDiscount));
      }
    }
  }, []);

  // Pricing calculations
  const shippingCharges = cartTotal > 500 || cartTotal === 0 ? 0 : 60;
  const finalTotal = cartTotal - couponInfo.amount + shippingCharges;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingInfo.name || !shippingInfo.address || !shippingInfo.phone) {
      alert("Please fill in the required fields (Name, Address, Phone).");
      return;
    }

    setIsSubmitting(true);

    // Simulate Payment and Order creation delay
    setTimeout(() => {
      const randomId = Math.floor(100000 + Math.random() * 900000);
      const generatedOrderId = `NK-2026-${randomId}`;

      // Save order metadata in localStorage so tracker can fetch it
      const newOrder = {
        orderId: generatedOrderId,
        date: new Date().toLocaleDateString(),
        items: cartItems,
        total: finalTotal,
        shippingInfo,
        paymentMethod,
      };

      try {
        const existingOrdersStr = localStorage.getItem("nikunj_placed_orders");
        const list = existingOrdersStr ? JSON.parse(existingOrdersStr) : [];
        list.push(newOrder);
        localStorage.setItem("nikunj_placed_orders", JSON.stringify(list));
      } catch (e) {
        console.error(e);
      }

      setIsSubmitting(false);
      clearCart(); // Clear cart after order placed
      localStorage.removeItem("nikunj_applied_discount"); // Clear discount
      router.push(`/checkout/success?orderId=${generatedOrderId}`);
    }, 2000);
  };

  // Redirect to cart if empty (and not submitting)
  useEffect(() => {
    if (cartItems.length === 0 && !isSubmitting) {
      // Check if we already have placed orders or if the cart is just genuinely empty
      const isCartEmpty = cartItems.length === 0;
      if (isCartEmpty) {
        router.push("/cart");
      }
    }
  }, [cartItems, isSubmitting, router]);

  if (cartItems.length === 0 && !isSubmitting) {
    return <div className="text-center py-20">Redirecting...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Page header */}
      <div className="text-xs text-brand-text-light mb-6 flex items-center gap-2">
        <Link href="/cart" className="hover:text-brand-green">Cart</Link>
        <i className="fa-solid fa-chevron-right text-[8px]"></i>
        <span className="text-brand-text font-medium">Checkout</span>
      </div>

      <h1 className="font-serif text-3xl text-brand-text mb-8">Secure Checkout</h1>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Columns: Delivery & Payment Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping Address */}
          <div className="bg-white border border-brand-border rounded-xl p-6 sm:p-8 shadow-sm">
            <h3 className="font-serif text-xl text-brand-text pb-2 border-b border-brand-bg mb-5 flex items-center gap-2">
              <i className="fa-solid fa-truck-ramp-box text-brand-green"></i> Delivery Address Details
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-brand-text-light mb-1">
                  Recipient Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Radhika Aggarwal"
                  value={shippingInfo.name}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })}
                  className="w-full border border-brand-border rounded p-2.5 text-sm focus:outline-none focus:border-brand-green"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-brand-text-light mb-1">
                  Complete Delivery Address *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Flat No 302, Green Meadows Apartment, Vasundhara Sector 5"
                  value={shippingInfo.address}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                  className="w-full border border-brand-border rounded p-2.5 text-sm focus:outline-none focus:border-brand-green mb-2"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-brand-text-light mb-1">
                    City / Town *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ghaziabad"
                    value={shippingInfo.city}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                    className="w-full border border-brand-border rounded p-2.5 text-sm focus:outline-none focus:border-brand-green"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-brand-text-light mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Uttar Pradesh"
                    value={shippingInfo.state}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                    className="w-full border border-brand-border rounded p-2.5 text-sm focus:outline-none focus:border-brand-green"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-brand-text-light mb-1">
                    PIN Zip Code *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 201012"
                    value={shippingInfo.zip}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, zip: e.target.value })}
                    className="w-full border border-brand-border rounded p-2.5 text-sm focus:outline-none focus:border-brand-green"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-brand-text-light mb-1">
                    WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={shippingInfo.phone}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                    className="w-full border border-brand-border rounded p-2.5 text-sm focus:outline-none focus:border-brand-green"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-brand-text-light mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. name@domain.com"
                    value={shippingInfo.email}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                    className="w-full border border-brand-border rounded p-2.5 text-sm focus:outline-none focus:border-brand-green"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Payment Options */}
          <div className="bg-white border border-brand-border rounded-xl p-6 sm:p-8 shadow-sm">
            <h3 className="font-serif text-xl text-brand-text pb-2 border-b border-brand-bg mb-5 flex items-center gap-2">
              <i className="fa-solid fa-credit-card text-brand-green"></i> Payment Preference
            </h3>

            <div className="space-y-3">
              {[
                { id: "COD", title: "Cash on Delivery (COD)", desc: "Pay cash at the time of delivery." },
                { id: "UPI", title: "Instant UPI Scan / Pay", desc: "Pay securely via GPay, PhonePe, Paytm QR." },
                { id: "CARD", title: "Credit or Debit Card", desc: "Visa, Mastercard, RuPay cards supported." },
              ].map((method) => {
                const isSelected = paymentMethod === method.id;
                return (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() => setPaymentMethod(method.id)}
                    className={`w-full text-left p-4 border rounded-xl transition-all flex items-start gap-3.5 focus:outline-none ${
                      isSelected
                        ? "border-brand-green bg-brand-card/40 shadow-sm"
                        : "border-brand-border bg-white hover:bg-brand-bg"
                    }`}
                  >
                    <i
                      className={`fa-solid ${
                        isSelected ? "fa-circle-check text-brand-green" : "fa-circle text-brand-border/60"
                      } text-lg mt-0.5`}
                    ></i>
                    <div>
                      <strong className="block text-sm text-brand-text font-semibold">{method.title}</strong>
                      <span className="text-xs text-brand-text-light mt-0.5 block">{method.desc}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Order Items Preview & Checkout Button */}
        <div>
          <div className="bg-brand-card/45 border border-brand-border rounded-xl p-6 shadow-sm sticky top-24">
            <h3 className="font-serif text-lg font-medium text-brand-text pb-3 mb-4 border-b border-brand-border">
              Order Preview
            </h3>

            {/* Items display */}
            <div className="max-h-52 overflow-y-auto space-y-3 pr-1 pb-4 mb-4 border-b border-brand-border/60">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex gap-3 text-xs items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-10 h-10 object-cover rounded border border-brand-border bg-white"
                  />
                  <div className="flex-grow min-w-0">
                    <h4 className="font-medium text-brand-text truncate">{item.name}</h4>
                    <span className="text-[10px] text-brand-text-light block">
                      Size: {item.size} • Qty: {item.quantity}
                    </span>
                  </div>
                  <div className="font-semibold text-brand-text text-right">
                    ₹{item.price * item.quantity}
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="text-xs text-brand-text-light space-y-3.5 pb-4 mb-4 border-b border-brand-border/60">
              <div className="flex justify-between">
                <span>Subtotal ({cartItems.length} items):</span>
                <span className="font-semibold text-brand-text">₹{cartTotal}</span>
              </div>

              {couponInfo.amount > 0 && (
                <div className="flex justify-between text-green-700">
                  <span>Discount (Promo {couponInfo.code}):</span>
                  <span>-₹{couponInfo.amount}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Delivery Shipping:</span>
                <span>{shippingCharges === 0 ? "FREE" : `₹${shippingCharges}`}</span>
              </div>
            </div>

            <div className="flex justify-between items-center text-sm font-semibold text-brand-text mb-6">
              <span>Grand Total:</span>
              <span className="text-xl text-brand-green">₹{finalTotal}</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-brand-green hover:bg-brand-green-hover text-white py-3.5 rounded-md font-semibold text-xs tracking-wider uppercase transition-colors shadow-md focus:outline-none flex items-center justify-center gap-2 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin"></i> Placing Order...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-circle-check"></i> Confirm &amp; Place Order
                </>
              )}
            </button>
          </div>
        </div>

      </form>
    </div>
  );
}
