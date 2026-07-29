"use client";

import React, { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface PlacedOrderDetails {
  orderId: string;
  date: string;
  total: number;
  paymentMethod: string;
  shippingInfo: {
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
  };
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const [orderDetails, setOrderDetails] = useState<PlacedOrderDetails | null>(null);
  const orderId = searchParams.get("orderId") || "";

  useEffect(() => {
    if (orderId && typeof window !== "undefined") {
      try {
        const savedOrdersStr = localStorage.getItem("nikunj_placed_orders");
        if (savedOrdersStr) {
          const list = JSON.parse(savedOrdersStr);
          const match = list.find((o: any) => o.orderId === orderId);
          if (match) {
            setOrderDetails(match);
          }
        }
      } catch (e) {
        console.error("Failed to load placed order details:", e);
      }
    }
  }, [orderId]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center">
      <div className="bg-white border border-brand-border rounded-2xl p-8 sm:p-12 shadow-sm animate-fade-in">
        
        {/* Success Icon */}
        <div className="w-16 h-16 bg-green-50 border border-green-200 text-brand-green rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">
          <i className="fa-solid fa-hands-praying"></i>
        </div>

        <h1 className="font-serif text-3xl text-brand-text mb-3">Order Placed Successfully!</h1>
        <p className="text-brand-text-light text-sm max-w-md mx-auto mb-8 leading-relaxed">
          Dhanyawad! We have received your order. Our homemaker artisans are starting to package/craft your items with love and devotion.
        </p>

        {orderDetails ? (
          <div className="bg-brand-card border border-brand-border rounded-xl p-6 max-w-md mx-auto mb-8 text-left text-xs space-y-3.5">
            <h4 className="font-serif text-sm font-semibold text-brand-text border-b border-brand-border/60 pb-2">
              Invoice Details
            </h4>
            <div className="flex justify-between">
              <span>Order Reference ID:</span>
              <span className="font-mono text-brand-green font-semibold">{orderDetails.orderId}</span>
            </div>
            <div className="flex justify-between">
              <span>Date Placed:</span>
              <span>{orderDetails.date}</span>
            </div>
            <div className="flex justify-between">
              <span>Payment Mode:</span>
              <span className="font-medium text-brand-text">
                {orderDetails.paymentMethod === "COD" ? "Cash on Delivery" : orderDetails.paymentMethod === "UPI" ? "UPI Payment" : "Credit/Debit Card"}
              </span>
            </div>
            <div className="flex justify-between border-b border-brand-border/40 pb-2">
              <span>Grand Total Amount:</span>
              <span className="font-semibold text-brand-text text-sm">₹{orderDetails.total}</span>
            </div>

            <div>
              <strong className="block text-brand-text mb-1 text-[11px] uppercase tracking-wider text-brand-text-light">
                Delivery Shipping to:
              </strong>
              <div className="text-brand-text-light leading-relaxed">
                <span className="font-semibold text-brand-text block">{orderDetails.shippingInfo.name}</span>
                {orderDetails.shippingInfo.address},<br />
                {orderDetails.shippingInfo.city}, {orderDetails.shippingInfo.state} - {orderDetails.shippingInfo.zip}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-brand-card border border-brand-border rounded-xl p-5 max-w-sm mx-auto mb-8 text-left text-xs">
            <div><strong>Order Reference ID:</strong> <span className="font-mono text-brand-green font-semibold">{orderId}</span></div>
            <div className="text-brand-text-light mt-2">
              Loading detailed invoice parameters...
            </div>
          </div>
        )}

        <p className="text-[11px] text-brand-text-light italic mb-8">
          A confirmation detail has been logged on your reference. You can search or verify progress anytime.
        </p>

        <div className="flex justify-center gap-4 flex-col sm:flex-row">
          <Link
            href={`/track-order?orderId=${orderId}`}
            className="bg-brand-green hover:bg-brand-green-hover text-white text-xs font-semibold py-2.5 px-6 rounded-md shadow-sm transition-colors flex items-center justify-center gap-1.5"
          >
            <i className="fa-solid fa-truck-fast"></i> Track Handcrafting Progress
          </Link>
          <Link
            href="/shop"
            className="bg-white hover:bg-brand-bg text-brand-text border border-brand-border text-xs font-semibold py-2.5 px-6 rounded-md shadow-sm transition-colors flex items-center justify-center gap-1"
          >
            Go Back to Shop
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading Invoice Details...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
