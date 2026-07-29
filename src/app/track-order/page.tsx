"use client";

import React, { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface TrackedOrder {
  orderId: string;
  date: string;
  items: string;
  total: number;
  status: "Order Placed" | "Fabric Approved" | "Handcrafting" | "Dispatched" | "Delivered" | "Pending Review";
  trackingPartner?: string;
  trackingNumber?: string;
  deliveryDate?: string;
}

// Mock Standard Orders Database
const mockStandardOrders: Record<string, TrackedOrder> = {
  "NK-2026-101": {
    orderId: "NK-2026-101",
    date: "25/07/2026",
    items: "1x Royal Peacock Dress (Size 2), 1x Royal Peacock Mukut",
    total: 748,
    status: "Dispatched",
    trackingPartner: "DTDC Express",
    trackingNumber: "DTDC10029384",
    deliveryDate: "02/08/2026 (Estimated)",
  },
  "NK-2026-102": {
    orderId: "NK-2026-102",
    date: "28/07/2026",
    items: "1x Summer Cotton Set (Size 1)",
    total: 399,
    status: "Order Placed",
    deliveryDate: "04/08/2026 (Estimated)",
  },
  "NK-2026-103": {
    orderId: "NK-2026-103",
    date: "20/07/2026",
    items: "1x Pure Ashtagandha Chandan, 1x Golden Designer Baansuri (Medium)",
    total: 269,
    status: "Delivered",
    deliveryDate: "24/07/2026 (Delivered)",
  },
};

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const [orderIdInput, setOrderIdInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [trackedOrder, setTrackedOrder] = useState<TrackedOrder | null>(null);

  // Check URL params on load
  useEffect(() => {
    const urlOrderId = searchParams.get("orderId");
    if (urlOrderId) {
      setOrderIdInput(urlOrderId);
      handleTrack(urlOrderId);
    }
  }, [searchParams]);

  const handleTrack = (idToSearch?: string) => {
    const targetId = (idToSearch || orderIdInput).trim();
    if (!targetId) return;

    setSearchTriggered(true);

    // 1. Search in static database
    if (mockStandardOrders[targetId]) {
      setTrackedOrder(mockStandardOrders[targetId]);
      return;
    }

    // 2. Search in custom orders (localStorage)
    try {
      const customOrdersStr = localStorage.getItem("nikunj_custom_orders");
      if (customOrdersStr) {
        const customOrders = JSON.parse(customOrdersStr);
        const match = customOrders.find((o: any) => o.orderId === targetId);
        if (match) {
          setTrackedOrder({
            orderId: match.orderId,
            date: match.date,
            items: `${match.primaryColor} ${match.fabricType} custom dress`,
            total: match.total,
            status: match.status,
            deliveryDate: "TBD (Expert will confirm details)",
          });
          return;
        }
      }
    } catch (e) {
      console.error("Failed to read custom orders from localStorage:", e);
    }

    // 3. Search in standard checkouts (localStorage)
    try {
      const ordersStr = localStorage.getItem("nikunj_placed_orders");
      if (ordersStr) {
        const orders = JSON.parse(ordersStr);
        const match = orders.find((o: any) => o.orderId === targetId);
        if (match) {
          setTrackedOrder({
            orderId: match.orderId,
            date: match.date,
            items: match.items.map((i: any) => `${i.quantity}x ${i.name} (${i.size})`).join(", "),
            total: match.total,
            status: "Order Placed",
            deliveryDate: "5-7 working days",
          });
          return;
        }
      }
    } catch (e) {
      console.error(e);
    }

    // Not found
    setTrackedOrder(null);
  };

  const getStepIndex = (status: string) => {
    if (status === "Pending Review") return 0;
    if (status === "Order Placed") return 1;
    if (status === "Fabric Approved" || status === "Handcrafting") return 2;
    if (status === "Dispatched") return 3;
    if (status === "Delivered") return 4;
    return 1;
  };

  const stepIndex = trackedOrder ? getStepIndex(trackedOrder.status) : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Page Title */}
      <div className="text-center mb-10">
        <h1 className="font-serif text-4xl text-brand-text mb-2">Track Your Order</h1>
        <p className="text-brand-text-light text-sm italic font-serif max-w-sm mx-auto">
          Enter your unique Order Reference ID to verify handcrafting and shipping progress.
        </p>
      </div>

      <div className="bg-white border border-brand-border rounded-xl p-6 sm:p-8 shadow-sm mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end mb-6">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-brand-text-light mb-1.5">
              Order ID / Reference ID *
            </label>
            <input
              type="text"
              placeholder="e.g. NK-2026-101 or NK-CUST-2026-9999"
              value={orderIdInput}
              onChange={(e) => setOrderIdInput(e.target.value)}
              className="w-full border border-brand-border rounded p-2.5 text-sm focus:outline-none focus:border-brand-green"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-brand-text-light mb-1.5">
              Phone / Email (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. +91 98765 43210"
              value={phoneInput}
              onChange={(e) => setPhoneInput(e.target.value)}
              className="w-full border border-brand-border rounded p-2.5 text-sm focus:outline-none focus:border-brand-green"
            />
          </div>
        </div>

        <button
          onClick={() => handleTrack()}
          className="w-full bg-brand-green hover:bg-brand-green-hover text-white py-3 rounded-md font-semibold text-xs tracking-wider uppercase transition-colors shadow-sm focus:outline-none flex items-center justify-center gap-2"
        >
          <i className="fa-solid fa-map-location-dot"></i> Track Status
        </button>

        {/* Info Box */}
        <div className="mt-4 bg-brand-card/50 p-3.5 rounded-lg border border-brand-border/40 text-[11px] text-brand-text-light leading-relaxed">
          <strong>Tip:</strong> Try searching with mock order id <span className="font-mono text-brand-green font-semibold bg-white border border-brand-border px-1.5 py-0.5 rounded">NK-2026-101</span> (Dispatched status) or <span className="font-mono text-brand-green font-semibold bg-white border border-brand-border px-1.5 py-0.5 rounded">NK-2026-102</span> (Placed status).
        </div>
      </div>

      {/* TRACKING TIMELINE DISPLAY */}
      {searchTriggered && (
        <div className="bg-white border border-brand-border rounded-xl p-6 sm:p-8 shadow-sm">
          {trackedOrder ? (
            <div>
              {/* Order Metadata summary */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 pb-6 mb-8 border-b border-brand-border">
                <div>
                  <h3 className="font-serif text-lg font-semibold text-brand-text">
                    Order ID: <span className="text-brand-green font-mono">{trackedOrder.orderId}</span>
                  </h3>
                  <p className="text-xs text-brand-text-light mt-1">
                    Placed on: <span className="font-medium text-brand-text">{trackedOrder.date}</span>
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-xs text-brand-text-light block">Estimated Delivery:</span>
                  <span className="text-sm font-semibold text-brand-text">{trackedOrder.deliveryDate}</span>
                </div>
              </div>

              {/* Items summary */}
              <div className="mb-8 bg-brand-card/30 p-4 rounded-lg border border-brand-border/40 text-xs">
                <strong>Attire &amp; Accessories:</strong> {trackedOrder.items}
                <div className="mt-1 font-semibold text-brand-text">Total: ₹{trackedOrder.total}</div>
              </div>

              {/* Visual Timeline progress bar */}
              <div className="relative flex flex-col md:flex-row md:justify-between items-start md:items-center gap-6 md:gap-0 mt-4 mb-10 pl-6 md:pl-0 border-l-2 md:border-l-0 md:border-t-2 border-brand-border">
                
                {/* 1. Placed */}
                <div className="relative md:pt-4 flex md:flex-col items-center gap-4 md:gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold md:absolute md:top-0 md:-translate-y-1/2 -ml-[33px] md:ml-0 ${
                    stepIndex >= 1
                      ? "bg-brand-green text-white"
                      : "bg-white border-2 border-brand-border text-brand-text-light"
                  }`}>
                    {stepIndex >= 1 ? <i className="fa-solid fa-check"></i> : "1"}
                  </div>
                  <div className="text-left md:text-center mt-0 md:mt-2">
                    <h4 className={`text-xs font-semibold ${stepIndex >= 1 ? "text-brand-green" : "text-brand-text-light"}`}>
                      Order Placed
                    </h4>
                    <p className="text-[10px] text-brand-text-light">We received your request</p>
                  </div>
                </div>

                {/* 2. Handcrafting */}
                <div className="relative md:pt-4 flex md:flex-col items-center gap-4 md:gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold md:absolute md:top-0 md:-translate-y-1/2 -ml-[33px] md:ml-0 ${
                    stepIndex >= 2
                      ? "bg-brand-green text-white"
                      : "bg-white border-2 border-brand-border text-brand-text-light"
                  }`}>
                    {stepIndex >= 2 ? (stepIndex > 2 ? <i className="fa-solid fa-check"></i> : <i className="fa-solid fa-spinner fa-spin"></i>) : "2"}
                  </div>
                  <div className="text-left md:text-center mt-0 md:mt-2">
                    <h4 className={`text-xs font-semibold ${stepIndex >= 2 ? "text-brand-green" : "text-brand-text-light"}`}>
                      Handcrafting
                    </h4>
                    <p className="text-[10px] text-brand-text-light">Stitched by homemakers</p>
                  </div>
                </div>

                {/* 3. Dispatched */}
                <div className="relative md:pt-4 flex md:flex-col items-center gap-4 md:gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold md:absolute md:top-0 md:-translate-y-1/2 -ml-[33px] md:ml-0 ${
                    stepIndex >= 3
                      ? "bg-brand-green text-white"
                      : "bg-white border-2 border-brand-border text-brand-text-light"
                  }`}>
                    {stepIndex >= 3 ? (stepIndex > 3 ? <i className="fa-solid fa-check"></i> : <i className="fa-solid fa-truck-fast"></i>) : "3"}
                  </div>
                  <div className="text-left md:text-center mt-0 md:mt-2">
                    <h4 className={`text-xs font-semibold ${stepIndex >= 3 ? "text-brand-green" : "text-brand-text-light"}`}>
                      Dispatched
                    </h4>
                    <p className="text-[10px] text-brand-text-light">Handed over to courier</p>
                  </div>
                </div>

                {/* 4. Delivered */}
                <div className="relative md:pt-4 flex md:flex-col items-center gap-4 md:gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold md:absolute md:top-0 md:-translate-y-1/2 -ml-[33px] md:ml-0 ${
                    stepIndex >= 4
                      ? "bg-brand-green text-white"
                      : "bg-white border-2 border-brand-border text-brand-text-light"
                  }`}>
                    {stepIndex >= 4 ? <i className="fa-solid fa-house-chimney-user"></i> : "4"}
                  </div>
                  <div className="text-left md:text-center mt-0 md:mt-2">
                    <h4 className={`text-xs font-semibold ${stepIndex >= 4 ? "text-brand-green" : "text-brand-text-light"}`}>
                      Delivered
                    </h4>
                    <p className="text-[10px] text-brand-text-light">Arrived at your location</p>
                  </div>
                </div>

              </div>

              {/* Shipped/Tracking details box */}
              {trackedOrder.status === "Dispatched" && trackedOrder.trackingNumber && (
                <div className="bg-brand-card p-4 rounded-lg border border-brand-border/60 text-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <div>
                    <strong>Courier Partner:</strong> {trackedOrder.trackingPartner}
                  </div>
                  <div>
                    <strong>AWB Tracking ID:</strong> <span className="font-mono text-brand-green font-semibold bg-white border border-brand-border px-1.5 py-0.5 rounded">{trackedOrder.trackingNumber}</span>
                  </div>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      alert("Simulating courier portal tracking lookup...");
                    }}
                    className="text-xs text-white bg-brand-green hover:bg-brand-green-hover py-1 px-3.5 rounded font-medium transition-colors"
                  >
                    Track on Partner Portal
                  </a>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <i className="fa-solid fa-triangle-exclamation text-brand-border text-5xl mb-4 block"></i>
              <h3 className="font-serif text-lg text-brand-text mb-1">Order ID Not Found</h3>
              <p className="text-xs text-brand-text-light leading-relaxed max-w-sm mx-auto">
                We couldn&apos;t find any details matching &quot;{orderIdInput}&quot;. Please verify the spelling or check the confirmation details sent to your phone.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading Tracker...</div>}>
      <TrackOrderContent />
    </Suspense>
  );
}
