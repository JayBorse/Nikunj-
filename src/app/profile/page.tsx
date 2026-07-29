"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface SavedDeityMeasurement {
  id: string;
  deityName: string;
  deityType: string;
  height: string;
  waist: string;
  chest: string;
}

function ProfileContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<"profile" | "orders" | "measurements" | "addresses">("profile");

  // Load active tab from URL query params
  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam === "orders" || tabParam === "measurements" || tabParam === "addresses") {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  // Profile Details State
  const [profile, setProfile] = useState({
    name: "Radhika Aggarwal",
    email: "radhika.aggarwal@gmail.com",
    phone: "+91 98765 43210",
  });

  // Placed Orders State
  const [standardOrders, setStandardOrders] = useState<any[]>([]);
  const [customOrders, setCustomOrders] = useState<any[]>([]);

  // Saved Measurements State
  const [savedMeasurements, setSavedMeasurements] = useState<SavedDeityMeasurement[]>([
    {
      id: "1",
      deityName: "Chhoti Gopal Ji",
      deityType: "Laddu Gopal",
      height: "3.2 inches",
      waist: "2.5 inches",
      chest: "3.5 inches",
    },
  ]);

  // Sizing Input States
  const [newMeasurement, setNewMeasurement] = useState({
    deityName: "",
    deityType: "Laddu Gopal",
    height: "",
    waist: "",
    chest: "",
  });

  const [addressList, setAddressList] = useState<string[]>([
    "Flat No 302, Green Meadows Apartment, Vasundhara Sector 5, Ghaziabad, UP - 201012",
  ]);

  const [newAddress, setNewAddress] = useState("");

  // Load localStorage orders & measurements
  useEffect(() => {
    try {
      const placedStr = localStorage.getItem("nikunj_placed_orders");
      if (placedStr) setStandardOrders(JSON.parse(placedStr));

      const customStr = localStorage.getItem("nikunj_custom_orders");
      if (customStr) setCustomOrders(JSON.parse(customStr));

      const savedMeasStr = localStorage.getItem("nikunj_saved_measurements");
      if (savedMeasStr) {
        setSavedMeasurements(JSON.parse(savedMeasStr));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleSaveMeasurement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMeasurement.deityName || !newMeasurement.height) {
      alert("Please fill in the Deity Name and Height.");
      return;
    }

    const updated = [
      ...savedMeasurements,
      {
        id: Date.now().toString(),
        deityName: newMeasurement.deityName,
        deityType: newMeasurement.deityType,
        height: `${newMeasurement.height} inches`,
        waist: `${newMeasurement.waist || "N/A"} inches`,
        chest: `${newMeasurement.chest || "N/A"} inches`,
      },
    ];

    setSavedMeasurements(updated);
    localStorage.setItem("nikunj_saved_measurements", JSON.stringify(updated));
    setNewMeasurement({ deityName: "", deityType: "Laddu Gopal", height: "", waist: "", chest: "" });
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddress.trim()) return;
    const updated = [...addressList, newAddress.trim()];
    setAddressList(updated);
    setNewAddress("");
  };

  const handleDeleteMeasurement = (id: string) => {
    const updated = savedMeasurements.filter((m) => m.id !== id);
    setSavedMeasurements(updated);
    localStorage.setItem("nikunj_saved_measurements", JSON.stringify(updated));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Breadcrumbs */}
      <div className="text-xs text-brand-text-light mb-8 flex items-center gap-2">
        <Link href="/" className="hover:text-brand-green">Home</Link>
        <i className="fa-solid fa-chevron-right text-[8px]"></i>
        <span className="text-brand-text font-medium">My Account</span>
      </div>

      <div className="text-center mb-10">
        <h1 className="font-serif text-3xl text-brand-text mb-2">My Account</h1>
        <p className="text-brand-text-light text-sm italic font-serif">
          Manage your addresses, track shringar orders, and save your deity measurements.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Navigation Sidebar */}
        <aside className="lg:col-span-1 bg-white border border-brand-border rounded-xl p-4 shadow-sm h-fit">
          <div className="flex flex-col gap-1 text-xs sm:text-sm">
            {[
              { id: "profile", label: "Profile Information", icon: "fa-regular fa-id-card" },
              { id: "orders", label: "My Orders & Requests", icon: "fa-solid fa-receipt" },
              { id: "measurements", label: "Saved Measurements", icon: "fa-solid fa-ruler-combined" },
              { id: "addresses", label: "Delivery Addresses", icon: "fa-solid fa-map-location-dot" },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full text-left py-2.5 px-3 rounded-lg font-medium transition-colors flex items-center gap-2.5 focus:outline-none cursor-pointer ${
                    isActive
                      ? "bg-brand-card text-brand-green font-semibold"
                      : "text-brand-text hover:bg-brand-bg"
                  }`}
                >
                  <i className={`${tab.icon} ${isActive ? "text-brand-green" : "text-brand-text-light"}`}></i>
                  {tab.label}
                </button>
              );
            })}
          </div>
        </aside>

        {/* Tab content panel */}
        <main className="lg:col-span-3 bg-white border border-brand-border rounded-xl p-6 sm:p-8 shadow-sm">
          
          {/* TAB 1: PROFILE INFORMATION */}
          {activeTab === "profile" && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="font-serif text-xl text-brand-text pb-2 border-b border-brand-bg">
                Profile Information
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                <div>
                  <strong className="block text-brand-text-light text-xs uppercase mb-1">Full Name</strong>
                  <span className="text-brand-text font-medium bg-brand-bg/35 border border-brand-border/40 py-2 px-3 rounded block">
                    {profile.name}
                  </span>
                </div>
                <div>
                  <strong className="block text-brand-text-light text-xs uppercase mb-1">WhatsApp Number</strong>
                  <span className="text-brand-text font-medium bg-brand-bg/35 border border-brand-border/40 py-2 px-3 rounded block">
                    {profile.phone}
                  </span>
                </div>
                <div className="sm:col-span-2">
                  <strong className="block text-brand-text-light text-xs uppercase mb-1">Email Address</strong>
                  <span className="text-brand-text font-medium bg-brand-bg/35 border border-brand-border/40 py-2 px-3 rounded block">
                    {profile.email}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-brand-bg">
                <button
                  onClick={() => alert("Details updates are disabled for this demo profile.")}
                  className="bg-brand-green hover:bg-brand-green-hover text-white text-xs font-semibold py-2 px-4 rounded transition-colors shadow-sm"
                >
                  Edit Profile Details
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: MY ORDERS & REQUESTS */}
          {activeTab === "orders" && (
            <div className="space-y-8 animate-fade-in">
              {/* Placed Store orders */}
              <div>
                <h3 className="font-serif text-xl text-brand-text pb-2 border-b border-brand-bg mb-4">
                  Store orders
                </h3>
                
                {standardOrders.length > 0 ? (
                  <div className="space-y-4">
                    {standardOrders.map((order) => (
                      <div
                        key={order.orderId}
                        className="border border-brand-border rounded-lg p-4 bg-brand-bg/10 flex flex-col sm:flex-row justify-between sm:items-center gap-4 text-xs"
                      >
                        <div>
                          <div className="font-mono text-brand-green font-semibold text-sm">{order.orderId}</div>
                          <div className="text-brand-text-light mt-1">Placed on: {order.date}</div>
                          <div className="font-medium text-brand-text mt-1">
                            Items: {order.items.map((i: any) => `${i.quantity}x ${i.name} (${i.size})`).join(", ")}
                          </div>
                        </div>
                        <div className="flex flex-col sm:items-end gap-2">
                          <span className="font-semibold text-brand-text">Total: ₹{order.total}</span>
                          <Link
                            href={`/track-order?orderId=${order.orderId}`}
                            className="bg-brand-green text-white hover:bg-brand-green-hover py-1 px-3 rounded text-[10px] font-semibold text-center"
                          >
                            Track Order
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-brand-text-light italic">No store orders placed yet.</p>
                )}
              </div>

              {/* Placed Custom orders */}
              <div>
                <h3 className="font-serif text-xl text-brand-text pb-2 border-b border-brand-bg mb-4">
                  Custom Attire Requests
                </h3>

                {customOrders.length > 0 ? (
                  <div className="space-y-4">
                    {customOrders.map((request) => (
                      <div
                        key={request.orderId}
                        className="border border-brand-border rounded-lg p-4 bg-brand-bg/10 flex flex-col sm:flex-row justify-between sm:items-center gap-4 text-xs"
                      >
                        <div>
                          <div className="font-mono text-brand-green font-semibold text-sm">{request.orderId}</div>
                          <div className="text-brand-text-light mt-1">Request Date: {request.date}</div>
                          <div className="font-medium text-brand-text mt-1">
                            Design: {request.primaryColor} {request.fabricType} custom dress ({request.deityType})
                          </div>
                        </div>
                        <div className="flex flex-col sm:items-end gap-2">
                          <span className="font-semibold text-brand-text">Est. Price: ₹{request.total}</span>
                          <span className="bg-orange-100 text-orange-800 text-[10px] px-2 py-0.5 rounded font-medium">
                            {request.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-brand-text-light italic">No custom order requests filed yet.</p>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: SAVED MEASUREMENTS */}
          {activeTab === "measurements" && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="font-serif text-xl text-brand-text pb-2 border-b border-brand-bg">
                Saved Deity Proportions
              </h3>

              {savedMeasurements.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {savedMeasurements.map((m) => (
                    <div
                      key={m.id}
                      className="border border-brand-border rounded-lg p-4 bg-brand-card/20 relative text-xs"
                    >
                      <button
                        onClick={() => handleDeleteMeasurement(m.id)}
                        className="absolute top-2 right-2 text-brand-text-light hover:text-red-500 cursor-pointer"
                        title="Delete Measurements"
                      >
                        <i className="fa-solid fa-circle-xmark"></i>
                      </button>
                      <h4 className="font-serif text-sm font-semibold text-brand-text mb-2 flex items-center gap-1">
                        <i className="fa-solid fa-om text-brand-green text-[10px]"></i> {m.deityName}
                      </h4>
                      <div className="space-y-1 text-brand-text-light">
                        <div><strong>Deity Type:</strong> {m.deityType}</div>
                        <div><strong>Height (Toe to Head):</strong> {m.height}</div>
                        <div><strong>Waist Width:</strong> {m.waist}</div>
                        <div><strong>Shoulder length:</strong> {m.chest}</div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-brand-text-light italic mb-6">No custom measurements logged yet.</p>
              )}

              {/* Add measurements form */}
              <div className="bg-brand-card/45 border border-brand-border rounded-xl p-5">
                <h4 className="font-serif text-base font-semibold text-brand-text mb-3">Add Deity Size</h4>
                
                <form onSubmit={handleSaveMeasurement} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <span className="text-[10px] text-brand-text-light block mb-1">Deity Name *</span>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Bal Gopal Ji"
                        value={newMeasurement.deityName}
                        onChange={(e) => setNewMeasurement({ ...newMeasurement, deityName: e.target.value })}
                        className="w-full border border-brand-border rounded p-2 text-xs bg-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-brand-text-light block mb-1">Deity Type</span>
                      <select
                        value={newMeasurement.deityType}
                        onChange={(e) => setNewMeasurement({ ...newMeasurement, deityType: e.target.value })}
                        className="w-full border border-brand-border rounded p-2 text-xs bg-white focus:outline-none"
                      >
                        <option>Laddu Gopal</option>
                        <option>Radha Rani</option>
                        <option>Krishna</option>
                        <option>Jugal Jodi</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <span className="text-[10px] text-brand-text-light block mb-1">Height (inches) *</span>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 3.0"
                        value={newMeasurement.height}
                        onChange={(e) => setNewMeasurement({ ...newMeasurement, height: e.target.value })}
                        className="w-full border border-brand-border rounded p-2 text-xs bg-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-brand-text-light block mb-1">Waist (inches)</span>
                      <input
                        type="text"
                        placeholder="e.g. 2.2"
                        value={newMeasurement.waist}
                        onChange={(e) => setNewMeasurement({ ...newMeasurement, waist: e.target.value })}
                        className="w-full border border-brand-border rounded p-2 text-xs bg-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-brand-text-light block mb-1">Shoulder (inches)</span>
                      <input
                        type="text"
                        placeholder="e.g. 4.0"
                        value={newMeasurement.chest}
                        onChange={(e) => setNewMeasurement({ ...newMeasurement, chest: e.target.value })}
                        className="w-full border border-brand-border rounded p-2 text-xs bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="bg-brand-green hover:bg-brand-green-hover text-white text-xs font-semibold py-2 px-4 rounded transition-colors shadow-sm cursor-pointer"
                  >
                    Save Proportions
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* TAB 4: DELIVERY ADDRESSES */}
          {activeTab === "addresses" && (
            <div className="space-y-6 animate-fade-in">
              <h3 className="font-serif text-xl text-brand-text pb-2 border-b border-brand-bg">
                Delivery Addresses
              </h3>

              <div className="space-y-3 mb-6">
                {addressList.map((addr, index) => (
                  <div
                    key={index}
                    className="border border-brand-border rounded-lg p-3 bg-brand-bg/10 flex items-center justify-between text-xs gap-4"
                  >
                    <span className="text-brand-text leading-relaxed">{addr}</span>
                    <button
                      onClick={() => setAddressList(addressList.filter((_, i) => i !== index))}
                      className="text-brand-text-light hover:text-red-500 cursor-pointer p-1"
                      title="Delete Address"
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
                ))}
              </div>

              {/* Add Address form */}
              <div className="bg-brand-card/45 border border-brand-border rounded-xl p-5">
                <h4 className="font-serif text-base font-semibold text-brand-text mb-3">Add New Address</h4>
                <form onSubmit={handleAddAddress} className="flex gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Enter complete address (House No, Street, City, State, ZIP)..."
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                    className="flex-grow border border-brand-border rounded p-2 text-xs bg-white focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-brand-green hover:bg-brand-green-hover text-white text-xs font-semibold py-2 px-4 rounded transition-colors shadow-sm cursor-pointer"
                  >
                    Add Address
                  </button>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading Account Details...</div>}>
      <ProfileContent />
    </Suspense>
  );
}

