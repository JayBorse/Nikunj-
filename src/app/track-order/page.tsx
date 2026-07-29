"use client";

import React, { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface TrackedOrder {
  orderId: string;
  date: string;
  items: string;
  total: number;
  status: "Pending Review" | "Order Placed" | "Fabric Approved" | "Handcrafting" | "Dispatched" | "Delivered";
  trackingPartner?: string;
  trackingNumber?: string;
  deliveryDate?: string;
  shippingName?: string;
  shippingAddress?: string;
  shippingPhone?: string;
  paymentStatus?: string;
  productImage?: string;
}

// Mock Standard Orders Database (matching the template details for NKJ123456)
const mockStandardOrders: Record<string, TrackedOrder> = {
  "NKJ123456": {
    orderId: "NKJ123456",
    date: "12 May 2024",
    items: "Custom Dress for Laddu Gopal Ji",
    total: 799,
    status: "Handcrafting", // Maps to step 3: "Final Touches"
    deliveryDate: "20 – 22 May 2024",
    shippingName: "Aman Sharma",
    shippingAddress: "Flat 101, Sunflower Apartments, Baner Road, Pune – 411045, Maharashtra, India",
    shippingPhone: "+91 98765 43210",
    paymentStatus: "Paid Online",
    productImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDqf94G8cxYbyFG3Ap59eyZZpBStMn3rhdQ_pz7cE6Q5bwe85_6m3cub95LxDVd4skAaPKWpuMIrIyWas5ztxjfHH8s-ZVeb3WI41wX7HjpeKVzQhn1k1Q3Mfi9CxXFUhDyOJRmRdH_xT29Jhn0CFuull4StCtzkiGrg1jPPb28uvOgnAFMPD1Vs6WNAxPbhTUPI8r31ZbQFV44t-26tbwXZU1-v0s77ZnF0joddhLloUYFlHSkGgGnNA"
  },
  "NK-2026-101": {
    orderId: "NK-2026-101",
    date: "25 Jul 2026",
    items: "1x Royal Peacock Dress (Size 2), 1x Royal Peacock Mukut",
    total: 748,
    status: "Dispatched", // Maps to step 5: "Out for Delivery"
    deliveryDate: "02 Aug 2026",
    shippingName: "Gopal Bhakt",
    shippingAddress: "ISKCON Temple Mandir, Mayapur, West Bengal - 741313, India",
    shippingPhone: "+91 99999 88888",
    paymentStatus: "Paid Online",
    productImage: "/royal peacock dress.PNG",
    trackingPartner: "DTDC Express",
    trackingNumber: "DTDC10029384"
  },
  "NK-2026-102": {
    orderId: "NK-2026-102",
    date: "28 Jul 2026",
    items: "1x Summer Cotton Set (Size 1)",
    total: 399,
    status: "Order Placed", // Maps to step 1: "Confirmed"
    deliveryDate: "04 Aug 2026",
    shippingName: "Radha Dasi",
    shippingAddress: "Vrindavan Dham, Kesi Ghat, Mathura - 281121, Uttar Pradesh, India",
    shippingPhone: "+91 88888 77777",
    paymentStatus: "Cash on Delivery (COD)",
    productImage: "/summer cotton set.PNG"
  },
  "NK-2026-103": {
    orderId: "NK-2026-103",
    date: "20 Jul 2026",
    items: "1x Pure Ashtagandha Chandan, 1x Golden Designer Baansuri (Medium)",
    total: 269,
    status: "Delivered", // Maps to step 6: "Delivered"
    deliveryDate: "24 Jul 2026",
    shippingName: "Hari Prasad",
    shippingAddress: "Flat 402, Lotus Residency, Baner, Pune - 411045, Maharashtra, India",
    shippingPhone: "+91 77777 66666",
    paymentStatus: "Paid Online",
    productImage: "/cat_baansuri.png"
  }
};

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const [orderIdInput, setOrderIdInput] = useState("");
  const [searchTriggered, setSearchTriggered] = useState(false);
  const [trackedOrder, setTrackedOrder] = useState<TrackedOrder | null>(null);

  // Check URL params or set default template order on load
  useEffect(() => {
    const urlOrderId = searchParams.get("orderId");
    if (urlOrderId) {
      setOrderIdInput(urlOrderId);
      handleTrack(urlOrderId);
    } else {
      // Default to showing the beautiful preview for NKJ123456 on load
      setOrderIdInput("NKJ123456");
      setSearchTriggered(true);
      setTrackedOrder(mockStandardOrders["NKJ123456"]);
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
            status: match.status === "Pending Review" ? "Pending Review" : "Handcrafting",
            deliveryDate: "TBD (Details being finalized)",
            shippingName: match.fullName || "Valued Devotee",
            shippingAddress: match.shippingAddress || "Saved details in measurements log",
            shippingPhone: match.phoneNumber,
            paymentStatus: "Paid Online",
            productImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuDqf94G8cxYbyFG3Ap59eyZZpBStMn3rhdQ_pz7cE6Q5bwe85_6m3cub95LxDVd4skAaPKWpuMIrIyWas5ztxjfHH8s-ZVeb3WI41wX7HjpeKVzQhn1k1Q3Mfi9CxXFUhDyOJRmRdH_xT29Jhn0CFuull4StCtzkiGrg1jPPb28uvOgnAFMPD1Vs6WNAxPbhTUPI8r31ZbQFV44t-26tbwXZU1-v0s77ZnF0joddhLloUYFlHSkGgGnNA"
          });
          return;
        }
      }
    } catch (e) {
      console.error("Failed to read custom orders:", e);
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
            shippingName: match.fullName,
            shippingAddress: `${match.addressLine}, ${match.city} - ${match.zipCode}, ${match.state}`,
            shippingPhone: match.phoneNumber,
            paymentStatus: match.paymentMethod === "cod" ? "Cash on Delivery" : "Paid Online",
            productImage: match.items[0]?.image || "https://lh3.googleusercontent.com/aida-public/AB6AXuDqf94G8cxYbyFG3Ap59eyZZpBStMn3rhdQ_pz7cE6Q5bwe85_6m3cub95LxDVd4skAaPKWpuMIrIyWas5ztxjfHH8s-ZVeb3WI41wX7HjpeKVzQhn1k1Q3Mfi9CxXFUhDyOJRmRdH_xT29Jhn0CFuull4StCtzkiGrg1jPPb28uvOgnAFMPD1Vs6WNAxPbhTUPI8r31ZbQFV44t-26tbwXZU1-v0s77ZnF0joddhLloUYFlHSkGgGnNA"
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

  const getStepIndex = (status: string): number => {
    if (status === "Pending Review") return 1;
    if (status === "Order Placed") return 1;
    if (status === "Fabric Approved") return 2;
    if (status === "Handcrafting") return 3;
    if (status === "Dispatched") return 5;
    if (status === "Delivered") return 6;
    return 1;
  };

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "Pending Review":
        return {
          title: "Reviewing Specifications ⌛",
          desc: "Our design experts are currently reviewing your custom requirements to assign a specialized artisan.",
          badge: "Pending Review"
        };
      case "Order Placed":
        return {
          title: "Order Placed & Confirmed 🌸",
          desc: "We have received your order. Fabrics are being readied for handcrafting.",
          badge: "Order Placed"
        };
      case "Fabric Approved":
        return {
          title: "Fabric Selected & Approved ✨",
          desc: "The sacred fabrics and threadworks have been chosen and approved for tailoring.",
          badge: "Fabric Approved"
        };
      case "Handcrafting":
        return {
          title: "Final Touches in Progress ✨",
          desc: "Our artisans are adding the final details to make your Kanha attire absolutely perfect.",
          badge: "Final Touches"
        };
      case "Dispatched":
        return {
          title: "Out for Delivery / Shipped 🚚",
          desc: "Your package has been handed to our courier partner. It will reach you shortly.",
          badge: "Dispatched"
        };
      case "Delivered":
        return {
          title: "Delivered successfully! 🏠",
          desc: "Your attire has reached your doorstep. Thank you for supporting handmade devotion!",
          badge: "Delivered"
        };
      default:
        return {
          title: "Order Processing ⚙️",
          desc: "We are processing your order. Updates will be visible shortly.",
          badge: "In Progress"
        };
    }
  };

  const stepIndex = trackedOrder ? getStepIndex(trackedOrder.status) : 0;
  const statusInfo = trackedOrder ? getStatusInfo(trackedOrder.status) : null;

  // Calculate dynamic dashed progress line widths based on 6 steps (0%, 20%, 40%, 60%, 80%, 100%)
  const progressPercent = trackedOrder ? Math.max(0, Math.min(100, (stepIndex - 1) * 20)) : 0;

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans">
      
      {/* Track Order Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-serif text-brand-text mb-2 flex items-center">
            Track Your Order <span className="ml-2 text-2xl text-pink-400">🌸</span>
          </h1>
          <p className="text-brand-text-light text-sm">From our hands to your home – we ensure your Kanha reaches you with love and care.</p>
        </div>
        <div className="flex w-full md:w-auto space-x-2">
          <input
            type="text"
            value={orderIdInput}
            onChange={(e) => setOrderIdInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleTrack()}
            className="border border-brand-border rounded-md px-4 py-2 text-sm w-full md:w-64 focus:outline-none focus:ring-1 focus:ring-brand-green focus:border-brand-green bg-white text-brand-text"
            placeholder="Order ID (e.g. NKJ123456)"
          />
          <button
            onClick={() => handleTrack()}
            className="bg-[#1a561f] hover:bg-green-800 text-white px-6 py-2 rounded-md text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer"
          >
            Track Order
          </button>
        </div>
      </div>

      {searchTriggered && (
        <div className="space-y-8 animate-fade-in">
          {trackedOrder ? (
            <>
              {/* Status Hero Card */}
              <section className="bg-white rounded-2xl border border-[#f3efe6] p-8 md:p-12 shadow-xs flex flex-col md:flex-row items-center gap-10">
                {/* Illustration */}
                <div className="w-full md:w-5/12 flex justify-center">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCa-OYgfZNSq-XlfQd7LMpRAJDgcXjA_5902IldF1yo5Owi6FyYiRUfoncY2ebbBMTKWS9RjZo4hPkkiWVSPYGjBwc8IaY9jjBB2tgv1_fjA5Z6sWYQ-l1OMy2WkpU1QfpFEu_RmWXFBClAeqvS9Z7Cj0_bixrRSbIVmqs5HV4dSq-v7Ul88TZtebv0Lp0zQWmtFrc94VYfEZF1KmRaj_NhnvLXKdJgp5PG5oi5nXQKsqiUC6JyqebSRg"
                    alt="Gift Box with Peacock Feather"
                    className="max-w-full h-auto drop-shadow-lg rounded-xl"
                  />
                </div>
                
                {/* Status Details */}
                <div className="w-full md:w-7/12 space-y-6">
                  <div>
                    <span className="inline-block bg-green-50 text-[#1a561f] text-xs font-bold px-3 py-1 rounded-full mb-3">
                      Current Status
                    </span>
                    <h2 className="text-3xl font-serif text-brand-text mb-3 flex items-center">
                      {statusInfo?.title}
                    </h2>
                    <p className="text-brand-text-light leading-relaxed max-w-md">
                      {statusInfo?.desc}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-gray-100">
                    {/* Estimated Delivery */}
                    <div>
                      <div className="flex items-center text-brand-text font-semibold mb-2 text-sm">
                        <i className="fa-solid fa-calendar-days text-[#1a561f] mr-2"></i>
                        Estimated Delivery
                      </div>
                      <div className="text-2xl font-serif text-[#1a561f] mb-1">{trackedOrder.deliveryDate}</div>
                      <p className="text-brand-text-light text-xs">We will update you as soon as dispatch occurs.</p>
                    </div>
                    
                    {/* Delivery Address */}
                    <div>
                      <div className="flex items-center text-brand-text font-semibold mb-2 text-sm">
                        <i className="fa-solid fa-location-dot text-[#1a561f] mr-2"></i>
                        Delivery Address
                      </div>
                      <address className="not-italic text-sm text-brand-text-light space-y-1">
                        <p className="font-semibold text-brand-text">{trackedOrder.shippingName}</p>
                        <p className="leading-relaxed">{trackedOrder.shippingAddress}</p>
                        <p className="font-semibold text-brand-text pt-1">{trackedOrder.shippingPhone}</p>
                      </address>
                    </div>
                  </div>
                </div>
              </section>

              {/* Timeline Section */}
              <section className="bg-white rounded-2xl border border-[#f3efe6] p-6 md:p-8 shadow-xs overflow-hidden">
                <div className="flex items-center gap-4 mb-8">
                  <h3 className="text-2xl font-serif text-brand-text">Order Tracking</h3>
                  <span className="text-[#d4af37] text-xl">✤</span>
                  <div className="h-px bg-gray-200 flex-grow"></div>
                </div>
                
                <div className="relative py-8 overflow-x-auto scrollbar-none">
                  {/* Connecting Line Base */}
                  <div className="absolute top-[60px] left-[8%] right-[8%] h-[2px] bg-[repeating-linear-gradient(to_right,#ccc_0,#ccc_5px,transparent_5px,transparent_10px)] z-0 pointer-events-none"></div>
                  {/* Active Connecting Line */}
                  <div
                    style={{ width: `calc(${progressPercent}% - 40px)` }}
                    className="absolute top-[60px] left-[8%] h-[2px] bg-[repeating-linear-gradient(to_right,#1a561f_0,#1a561f_5px,transparent_5px,transparent_10px)] z-0 transition-all duration-500 pointer-events-none"
                  ></div>
                  
                  <div className="flex justify-between relative z-10 min-w-[850px] px-4">
                    
                    {/* Step 1: Confirmed */}
                    <div className={`flex flex-col items-center w-1/6 text-center ${stepIndex < 1 ? "opacity-40 grayscale" : ""}`}>
                      <div className={`relative w-24 h-24 rounded-full bg-white p-1 mb-3 shadow-xs border-2 ${stepIndex === 1 ? "border-[#1a561f] scale-105" : "border-transparent"}`}>
                        <img
                          alt="Order Confirmed"
                          className="w-full h-full rounded-full object-cover"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC44N55eJX4qM2HNd9AtetI8-kmy-btPMywwohkcBg5iYRZAcWALaYLrGkGaCcU7S1AotNRsO-ICsj7BBbn_EvxolmXedW2rWttvAMhpjoow5vDnGveJPAfk9blmXsyxmE2jE14V44T9gnvlVX3vNksLW5W9ASYPnj3V6JdSVAyqr33GzdjW0KEWCO1RJHMG1zDnK5ZRtR5017Z5MpR5VoKdoQdHLluY0LGswmvfAl2-IOz7wy3HXuImg"
                        />
                        {stepIndex >= 1 && (
                          <div className="absolute -top-1 -right-1 bg-[#1a561f] text-white rounded-full w-6 h-6 flex items-center justify-center border-2 border-white shadow-xs">
                            {stepIndex > 1 ? <i className="fa-solid fa-check text-[10px]"></i> : <i className="fa-solid fa-circle-dot text-[10px] animate-pulse"></i>}
                          </div>
                        )}
                      </div>
                      <h4 className={`font-semibold text-xs ${stepIndex === 1 ? "text-[#1a561f]" : "text-brand-text"}`}>Order Confirmed</h4>
                      <p className="text-[10px] text-brand-text-light mt-1">12 May, 10:30 AM</p>
                    </div>

                    {/* Step 2: Crafted */}
                    <div className={`flex flex-col items-center w-1/6 text-center ${stepIndex < 2 ? "opacity-40 grayscale" : ""}`}>
                      <div className={`relative w-24 h-24 rounded-full bg-white p-1 mb-3 shadow-xs border-2 ${stepIndex === 2 ? "border-[#1a561f] scale-105" : "border-transparent"}`}>
                        <img
                          alt="Being Crafted"
                          className="w-full h-full rounded-full object-cover"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAJE-TPKvHS3wPyn3UsGFrmrL6LmrycyeSx7qhu45ALmWFISJy8FfE47nRMF9K0qOIcbrnISGy1mOxjGik3jKW8zrwG-ODS8HijyH4a7MBfecr0qQWRLbsqfy5_mX9rp969byM5jsS5pF_SW6C8VFEAeaPa-SBHoiviLFBccbXiuQ_wnAvSCBgHiQdEbo_cOuF5219M1cVQZuFYLhVNuvjDF1A-hmXlrrr8qfLFXnAKjhqJr4Hln8YyxA"
                        />
                        {stepIndex >= 2 && (
                          <div className="absolute -top-1 -right-1 bg-[#1a561f] text-white rounded-full w-6 h-6 flex items-center justify-center border-2 border-white shadow-xs">
                            {stepIndex > 2 ? <i className="fa-solid fa-check text-[10px]"></i> : <i className="fa-solid fa-circle-dot text-[10px] animate-pulse"></i>}
                          </div>
                        )}
                      </div>
                      <h4 className={`font-semibold text-xs ${stepIndex === 2 ? "text-[#1a561f]" : "text-brand-text"}`}>Being Crafted</h4>
                      <p className="text-[10px] text-brand-text-light mt-1">13 May, 2:15 PM</p>
                    </div>

                    {/* Step 3: Final Touches */}
                    <div className={`flex flex-col items-center w-1/6 text-center ${stepIndex < 3 ? "opacity-40 grayscale" : ""}`}>
                      <div className={`relative w-24 h-24 rounded-full bg-white p-1 mb-3 shadow-xs border-2 ${stepIndex === 3 ? "border-[#1a561f] scale-105" : "border-transparent"}`}>
                        <img
                          alt="Final Touches"
                          className="w-full h-full rounded-full object-cover"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8LC036ZaunEsT7m8qbr4HFA9HCcsWobVtbUwZkqw5vkIVgjHI_MjCowTVfSz2AblBdOcNvCPXeW6A2KM4k9lrKataTzYPjEDUTcnPBeUM0-cjC_CaV1UFF1eHlJJCi1X7R0fSGbhAqzatoTQeBwsH3RKIhWFIOP20OFOr4K6KnG6luouhKheIXsq02dAJOLkxFzaf2cj8cE4WiXBr8sqaw3TbZ4g7UFcgrEpxEng3ozj0yGtS7REL-Q"
                        />
                        {stepIndex >= 3 && (
                          <div className="absolute -top-1 -right-1 bg-[#1a561f] text-white rounded-full w-6 h-6 flex items-center justify-center border-2 border-white shadow-xs">
                            {stepIndex > 3 ? (
                              <i className="fa-solid fa-check text-[10px]"></i>
                            ) : (
                              <i className="fa-solid fa-spinner animate-spin text-[10px]"></i>
                            )}
                          </div>
                        )}
                      </div>
                      <h4 className={`font-semibold text-xs ${stepIndex === 3 ? "text-[#1a561f]" : "text-brand-text"}`}>Final Touches</h4>
                      <p className="text-[10px] text-brand-text-light mt-1">15 May, 9:45 AM</p>
                    </div>

                    {/* Step 4: Packed & Ready */}
                    <div className={`flex flex-col items-center w-1/6 text-center ${stepIndex < 4 ? "opacity-40 grayscale" : ""}`}>
                      <div className={`relative w-24 h-24 rounded-full bg-white p-1 mb-3 shadow-xs border-2 ${stepIndex === 4 ? "border-[#1a561f] scale-105" : "border-transparent"} flex items-center justify-center`}>
                        <img
                          alt="Packed & Ready"
                          className="w-16 h-16 object-contain rounded-full"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAO8AoEdTw3xv-mvTZL8JOVyNtgbyfzkKK3P5xXAvrMiUa_f7QwrYTvZ2f4hPDh-Fv9RmdC0jjDw2YxTDNIwqabjy7wu6XR-q_F_kn2rWp2czI0PtfXvUFljNkfGTzxVwhbvbizvbqK0hyXB0RE2B2uOekmiZwqNb9sGio5hEgSMi3AWNVnLNVUJ0Vho08OrujCgT4SKotzXxKrq3N5g4uuCcU-o0ZyysIuW3wiOz2Loa2tWdvXNZTQ7g"
                        />
                        {stepIndex >= 4 && (
                          <div className="absolute -top-1 -right-1 bg-[#1a561f] text-white rounded-full w-6 h-6 flex items-center justify-center border-2 border-white shadow-xs">
                            {stepIndex > 4 ? <i className="fa-solid fa-check text-[10px]"></i> : <i className="fa-solid fa-circle-dot text-[10px] animate-pulse"></i>}
                          </div>
                        )}
                      </div>
                      <h4 className={`font-semibold text-xs ${stepIndex === 4 ? "text-[#1a561f]" : "text-brand-text"}`}>Packed &amp; Ready</h4>
                      <p className="text-[10px] text-brand-text-light mt-1">{stepIndex >= 4 ? "Finished" : "Upcoming"}</p>
                    </div>

                    {/* Step 5: Out for Delivery */}
                    <div className={`flex flex-col items-center w-1/6 text-center ${stepIndex < 5 ? "opacity-40 grayscale" : ""}`}>
                      <div className={`relative w-24 h-24 rounded-full bg-gray-50 border-2 ${stepIndex === 5 ? "border-[#1a561f]" : "border-brand-border/40"} p-1 mb-3 flex items-center justify-center`}>
                        <i className={`fa-solid fa-truck-fast text-3xl ${stepIndex >= 5 ? "text-[#1a561f]" : "text-gray-400"}`}></i>
                        {stepIndex >= 5 && (
                          <div className="absolute -top-1 -right-1 bg-[#1a561f] text-white rounded-full w-6 h-6 flex items-center justify-center border-2 border-white shadow-xs">
                            {stepIndex > 5 ? <i className="fa-solid fa-check text-[10px]"></i> : <i className="fa-solid fa-circle-dot text-[10px] animate-pulse"></i>}
                          </div>
                        )}
                      </div>
                      <h4 className={`font-semibold text-xs ${stepIndex === 5 ? "text-[#1a561f]" : "text-brand-text"}`}>Out for Delivery</h4>
                      <p className="text-[10px] text-brand-text-light mt-1">{stepIndex >= 5 ? "On its way" : "Upcoming"}</p>
                    </div>

                    {/* Step 6: Delivered */}
                    <div className={`flex flex-col items-center w-1/6 text-center ${stepIndex < 6 ? "opacity-40 grayscale" : ""}`}>
                      <div className={`relative w-24 h-24 rounded-full bg-gray-50 border-2 ${stepIndex === 6 ? "border-[#1a561f]" : "border-brand-border/40"} p-1 mb-3 flex items-center justify-center`}>
                        <i className={`fa-solid fa-house-chimney-user text-3xl ${stepIndex >= 6 ? "text-[#1a561f]" : "text-gray-400"}`}></i>
                        {stepIndex >= 6 && (
                          <div className="absolute -top-1 -right-1 bg-[#1a561f] text-white rounded-full w-6 h-6 flex items-center justify-center border-2 border-white shadow-xs">
                            <i className="fa-solid fa-check text-[10px]"></i>
                          </div>
                        )}
                      </div>
                      <h4 className={`font-semibold text-xs ${stepIndex === 6 ? "text-[#1a561f]" : "text-brand-text"}`}>Delivered</h4>
                      <p className="text-[10px] text-brand-text-light mt-1">{stepIndex >= 6 ? "Arrived" : "Upcoming"}</p>
                    </div>

                  </div>
                </div>

                {/* Courier specific info if dispatched */}
                {trackedOrder.status === "Dispatched" && trackedOrder.trackingNumber && (
                  <div className="mt-6 bg-[#fbfbf6] p-4 rounded-xl border border-[#f3efe6] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs">
                    <div>
                      <strong className="text-brand-text">Courier Partner:</strong> {trackedOrder.trackingPartner}
                    </div>
                    <div>
                      <strong className="text-brand-text">AWB Tracking ID:</strong> <span className="font-mono text-[#1a561f] font-semibold bg-white border border-brand-border px-1.5 py-0.5 rounded">{trackedOrder.trackingNumber}</span>
                    </div>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        alert(`Simulating lookup for AWB: ${trackedOrder.trackingNumber}`);
                      }}
                      className="text-xs text-white bg-[#1a561f] hover:bg-green-800 py-1.5 px-4 rounded font-semibold transition-colors cursor-pointer"
                    >
                      Track on Partner Portal
                    </a>
                  </div>
                )}
              </section>

              {/* Order Details Section */}
              <section className="space-y-6">
                <div className="flex items-center gap-4 mb-6">
                  <h3 className="text-2xl font-serif text-brand-text">Order Details</h3>
                  <span className="text-[#d4af37] text-xl">✤</span>
                  <div className="h-px bg-gray-200 flex-grow"></div>
                </div>

                <div className="bg-white rounded-2xl border border-[#f3efe6] p-6 shadow-xs flex flex-col lg:flex-row gap-6">
                  {/* Product Image */}
                  <div className="w-full lg:w-1/4 shrink-0 h-48 relative">
                    <img
                      src={trackedOrder.productImage || "https://lh3.googleusercontent.com/aida-public/AB6AXuDqf94G8cxYbyFG3Ap59eyZZpBStMn3rhdQ_pz7cE6Q5bwe85_6m3cub95LxDVd4skAaPKWpuMIrIyWas5ztxjfHH8s-ZVeb3WI41wX7HjpeKVzQhn1k1Q3Mfi9CxXFUhDyOJRmRdH_xT29Jhn0CFuull4StCtzkiGrg1jPPb28uvOgnAFMPD1Vs6WNAxPbhTUPI8r31ZbQFV44t-26tbwXZU1-v0s77ZnF0joddhLloUYFlHSkGgGnNA"}
                      alt={trackedOrder.items}
                      className="w-full h-full object-cover rounded-xl shadow-xs"
                    />
                  </div>
                  
                  {/* Details Grid */}
                  <div className="w-full lg:w-1/2 grid grid-cols-2 sm:grid-cols-3 gap-6 py-2 text-sm">
                    {/* Column 1 */}
                    <div className="space-y-6">
                      <div>
                        <p className="text-[10px] text-brand-text-light mb-1 uppercase tracking-wider font-semibold">Order ID</p>
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-brand-text">{trackedOrder.orderId}</p>
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(trackedOrder.orderId);
                              alert("Order ID copied to clipboard!");
                            }}
                            className="text-gray-400 hover:text-brand-green cursor-pointer"
                            title="Copy Order ID"
                          >
                            <i className="fa-regular fa-copy"></i>
                          </button>
                        </div>
                      </div>
                      <div>
                        <p className="text-[10px] text-brand-text-light mb-1 uppercase tracking-wider font-semibold">Order Date</p>
                        <p className="font-medium text-brand-text">{trackedOrder.date}</p>
                      </div>
                    </div>
                    
                    {/* Column 2 */}
                    <div className="space-y-6 sm:col-span-2 md:col-span-1">
                      <div>
                        <p className="text-[10px] text-brand-text-light mb-1 uppercase tracking-wider font-semibold">Product Details</p>
                        <p className="font-medium text-brand-text line-clamp-2 leading-relaxed">{trackedOrder.items}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-brand-text-light mb-1 uppercase tracking-wider font-semibold">Attire Sizing</p>
                        <p className="font-medium text-brand-text">Size 5 (Default / Logged)</p>
                      </div>
                    </div>
                    
                    {/* Column 3 */}
                    <div className="space-y-6 border-t sm:border-t-0 sm:border-l border-gray-100 pt-4 sm:pt-0 sm:pl-6">
                      <div>
                        <p className="text-[10px] text-brand-text-light mb-1 uppercase tracking-wider font-semibold">Total Amount</p>
                        <p className="font-bold text-brand-text">₹{trackedOrder.total}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-brand-text-light mb-1 uppercase tracking-wider font-semibold">Payment Status</p>
                        <p className="font-semibold text-[#1a561f]">{trackedOrder.paymentStatus || "Paid Online"}</p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Help Card */}
                  <div className="w-full lg:w-1/4">
                    <div className="bg-[#fbfbf6] h-full rounded-xl p-6 flex flex-col items-center justify-center text-center space-y-3 border border-gray-100">
                      <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-[#1a561f]">
                        <i className="fa-solid fa-headset text-2xl"></i>
                      </div>
                      <h4 className="font-bold text-brand-text text-sm">Need Help?</h4>
                      <a
                        href="https://wa.me/919999999999?text=Hare%20Krishna!%20I%20need%20assistance%20tracking%20my%20Order%20NKJ123456."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-brand-text-light hover:text-brand-green underline decoration-gray-300 underline-offset-4"
                      >
                        Chat with us
                      </a>
                    </div>
                  </div>
                </div>
              </section>
            </>
          ) : (
            <div className="text-center py-16 bg-white border border-brand-border rounded-xl shadow-xs">
              <i className="fa-solid fa-magnifying-glass text-brand-border text-5xl mb-4 block"></i>
              <h3 className="font-serif text-xl text-brand-text mb-2">Order ID Not Found</h3>
              <p className="text-brand-text-light text-xs max-w-sm mx-auto leading-relaxed">
                We couldn&apos;t find any details matching &quot;{orderIdInput}&quot;. Please verify the spelling or check the confirmation details sent to your phone.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Footer Features */}
      <div className="bg-white border-t border-gray-100 mt-12 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="flex items-start gap-4">
              <div className="text-[#d4af37] text-3xl shrink-0">
                <i className="fa-solid fa-hands-praying"></i>
              </div>
              <div>
                <h4 className="font-bold text-brand-text text-sm mb-1">Handmade with Love</h4>
                <p className="text-xs text-brand-text-light leading-relaxed">Each piece is crafted<br/>by skilled homemakers</p>
              </div>
            </div>
            
            {/* Feature 2 */}
            <div className="flex items-start gap-4">
              <div className="text-[#d4af37] text-3xl shrink-0">
                <i className="fa-solid fa-truck-fast"></i>
              </div>
              <div>
                <h4 className="font-bold text-brand-text text-sm mb-1">Pan India Delivery</h4>
                <p className="text-xs text-brand-text-light leading-relaxed">Safe &amp; timely delivery<br/>across India</p>
              </div>
            </div>
            
            {/* Feature 3 */}
            <div className="flex items-start gap-4">
              <div className="text-[#d4af37] text-3xl shrink-0">
                <i className="fa-solid fa-shield-halved"></i>
              </div>
              <div>
                <h4 className="font-bold text-brand-text text-sm mb-1">Secure Packaging</h4>
                <p className="text-xs text-brand-text-light leading-relaxed">Your Kanha is packed<br/>with extra care</p>
              </div>
            </div>
            
            {/* Feature 4 */}
            <div className="flex items-start gap-4">
              <div className="text-[#d4af37] text-3xl shrink-0">
                <i className="fa-solid fa-comment-dots"></i>
              </div>
              <div>
                <h4 className="font-bold text-brand-text text-sm mb-1">24/7 Support</h4>
                <p className="text-xs text-brand-text-light leading-relaxed">We're here to help<br/>you anytime</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </main>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading Tracker...</div>}>
      <TrackOrderContent />
    </Suspense>
  );
}
