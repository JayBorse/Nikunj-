"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, cartTotal, clearCart } = useCart();

  // Multi-step Checkout Wizard State
  const [checkoutStep, setCheckoutStep] = useState<"address" | "payment">("address");

  // Shipping Form States
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    email: "",
  });

  // Payment Accordion State
  const [activePaymentAccordion, setActivePaymentAccordion] = useState<string>("UPI");
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [saveCard, setSaveCard] = useState(true);

  // Nikunj Gems State
  const [useGems, setUseGems] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Coupon Info loaded from localstorage
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

  // Price calculations
  const packagingCharges = 40;
  const shippingCharges = cartTotal > 500 || cartTotal === 0 ? 0 : 60;
  const gemsDeduction = useGems ? 120 : 0;
  const finalTotal = Math.max(0, cartTotal - couponInfo.amount + shippingCharges + packagingCharges - gemsDeduction);

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingInfo.name || !shippingInfo.address || !shippingInfo.city || !shippingInfo.state || !shippingInfo.zip || !shippingInfo.phone) {
      alert("Please fill in all required delivery fields.");
      return;
    }
    setCheckoutStep("payment");
  };

  const handlePlaceOrder = () => {
    if (activePaymentAccordion === "UPI" && !upiId) {
      alert("Please enter a valid UPI ID (e.g., name@upi) or select a UPI app.");
      return;
    }
    if (activePaymentAccordion === "CARD" && (!cardNumber || !cardExpiry || !cardCvv)) {
      alert("Please fill in all credit/debit card details.");
      return;
    }

    setIsSubmitting(true);

    // Simulate Payment processing and Order placement
    setTimeout(() => {
      const randomId = Math.floor(100000 + Math.random() * 900000);
      const generatedOrderId = `NKJ${randomId}`;

      // Save order metadata in localStorage so order tracker can find it
      const newOrder = {
        orderId: generatedOrderId,
        date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
        items: cartItems.map((i) => `${i.quantity}x ${i.name} (${i.size})`).join(", "),
        total: finalTotal,
        shippingName: shippingInfo.name,
        shippingAddress: `${shippingInfo.address}, ${shippingInfo.city} - ${shippingInfo.zip}, ${shippingInfo.state}`,
        shippingPhone: shippingInfo.phone,
        status: "Order Placed",
        deliveryDate: "5-7 working days (Estimated)",
        paymentStatus: activePaymentAccordion === "COD" ? "Pay on Delivery (COD)" : "Paid Online",
        productImage: cartItems[0]?.image || "https://lh3.googleusercontent.com/aida-public/AB6AXuDqf94G8cxYbyFG3Ap59eyZZpBStMn3rhdQ_pz7cE6Q5bwe85_6m3cub95LxDVd4skAaPKWpuMIrIyWas5ztxjfHH8s-ZVeb3WI41wX7HjpeKVzQhn1k1Q3Mfi9CxXFUhDyOJRmRdH_xT29Jhn0CFuull4StCtzkiGrg1jPPb28uvOgnAFMPD1Vs6WNAxPbhTUPI8r31ZbQFV44t-26tbwXZU1-v0s77ZnF0joddhLloUYFlHSkGgGnNA"
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
      clearCart(); // Flush the checkout cart items
      localStorage.removeItem("nikunj_applied_discount"); // Clear discount code
      router.push(`/checkout/success?orderId=${generatedOrderId}`);
    }, 2000);
  };

  // Redirect to cart if empty (and not submitting)
  useEffect(() => {
    if (cartItems.length === 0 && !isSubmitting) {
      router.push("/cart");
    }
  }, [cartItems, isSubmitting, router]);

  if (cartItems.length === 0 && !isSubmitting) {
    return <div className="text-center py-20">Redirecting...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">
      
      {/* Checkout Progress Indicator */}
      <div className="flex items-center justify-start space-x-4 mb-10 overflow-x-auto pb-4 scrollbar-none border-b border-gray-100">
        <Link href="/cart" className="flex items-center shrink-0">
          <span className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 bg-white text-gray-500 text-sm font-medium mr-3">1</span>
          <span className="text-sm font-medium text-gray-500">Cart</span>
        </Link>
        <div className="h-px w-6 bg-gray-200 shrink-0"></div>
        <div className="flex items-center shrink-0">
          <span
            onClick={() => setCheckoutStep("address")}
            className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium mr-3 border cursor-pointer ${
              checkoutStep === "address" ? "bg-[#1a472a] text-white border-transparent" : "bg-white text-gray-500 border-gray-300"
            }`}
          >
            2
          </span>
          <span className={`text-sm font-medium ${checkoutStep === "address" ? "text-[#1a472a] font-semibold" : "text-gray-500"}`}>Address</span>
        </div>
        <div className="h-px w-6 bg-gray-200 shrink-0"></div>
        <div className="flex items-center shrink-0">
          <span
            className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium mr-3 border ${
              checkoutStep === "payment" ? "bg-[#1a472a] text-white border-transparent" : "bg-white text-gray-500 border-gray-300"
            }`}
          >
            3
          </span>
          <span className={`text-sm font-medium ${checkoutStep === "payment" ? "text-[#1a472a] font-semibold" : "text-gray-500"}`}>Payment</span>
        </div>
        <div className="h-px w-6 bg-gray-200 shrink-0"></div>
        <div className="flex items-center shrink-0">
          <span className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 bg-white text-gray-400 text-sm font-medium mr-3">4</span>
          <span className="text-sm font-medium text-gray-400">Review</span>
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
        
        {/* LEFT COLUMN: Input Forms (Step-dependent) */}
        <div className="lg:col-span-8 space-y-6">
          
          {checkoutStep === "address" ? (
            /* STEP 2: ADDRESS FORM */
            <form onSubmit={handleProceedToPayment} className="space-y-6 animate-fade-in">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                  Delivery Address details
                  <i className="fa-solid fa-leaf text-[#1a472a] text-xl"></i>
                </h1>
                <p className="mt-2 text-sm text-gray-500">Provide shipping coordinates for dispatching your deity's attire</p>
              </div>

              <div className="bg-white border border-[#e5dfd3] rounded-xl p-6 sm:p-8 shadow-xs space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-brand-text-light mb-1.5">
                    Recipient Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aman Sharma"
                    value={shippingInfo.name}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })}
                    className="w-full border border-gray-300 rounded-md p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#1a472a] focus:border-[#1a472a]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-brand-text-light mb-1.5">
                    Complete Shipping Address *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Flat 101, Sunflower Apartments, Baner Road"
                    value={shippingInfo.address}
                    onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                    className="w-full border border-gray-300 rounded-md p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#1a472a] focus:border-[#1a472a]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-brand-text-light mb-1.5">
                      City / Town *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Pune"
                      value={shippingInfo.city}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                      className="w-full border border-gray-300 rounded-md p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#1a472a] focus:border-[#1a472a]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-brand-text-light mb-1.5">
                      State *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maharashtra"
                      value={shippingInfo.state}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, state: e.target.value })}
                      className="w-full border border-gray-300 rounded-md p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#1a472a] focus:border-[#1a472a]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-brand-text-light mb-1.5">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 411045"
                      value={shippingInfo.zip}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, zip: e.target.value })}
                      className="w-full border border-gray-300 rounded-md p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#1a472a] focus:border-[#1a472a]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-brand-text-light mb-1.5">
                      WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={shippingInfo.phone}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                      className="w-full border border-gray-300 rounded-md p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#1a472a] focus:border-[#1a472a]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-brand-text-light mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. name@domain.com"
                      value={shippingInfo.email}
                      onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })}
                      className="w-full border border-gray-300 rounded-md p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#1a472a] focus:border-[#1a472a]"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className="bg-[#1a472a] hover:bg-green-800 text-white px-8 py-3 rounded-md font-semibold text-sm transition-colors shadow-xs flex items-center gap-2 cursor-pointer"
                >
                  Proceed to Payment <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </form>
          ) : (
            /* STEP 3: PAYMENT METHOD CHOICE & ACCORDIONS */
            <div className="space-y-6 animate-fade-in">
              <div className="mb-6 flex justify-between items-end">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                    Choose Your Payment Method
                    <i className="fa-solid fa-leaf text-[#1a472a] text-xl"></i>
                  </h1>
                  <p className="mt-2 text-sm text-gray-500">Secure, trusted and hassle-free payments</p>
                </div>
                <button
                  onClick={() => setCheckoutStep("address")}
                  className="text-xs text-[#1a472a] hover:underline font-semibold cursor-pointer"
                >
                  <i className="fa-solid fa-arrow-left"></i> Edit Shipping Details
                </button>
              </div>

              {/* Payment Accordion options list */}
              <div className="space-y-4">
                
                {/* 1. UPI ACCORDION */}
                <div className={`bg-white border rounded-xl overflow-hidden shadow-xs ${activePaymentAccordion === "UPI" ? "border-[#1a472a]" : "border-gray-200"}`}>
                  <div
                    onClick={() => setActivePaymentAccordion("UPI")}
                    className="p-5 flex items-center justify-between cursor-pointer hover:bg-gray-50/50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 flex items-center justify-center border border-gray-200 rounded-lg bg-gray-50">
                        <span className="font-bold text-gray-700 italic text-sm">UPI</span>
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-gray-900">UPI</h3>
                        <p className="text-xs text-gray-500">Pay instantly using any UPI app</p>
                      </div>
                    </div>
                    <i className={`fa-solid ${activePaymentAccordion === "UPI" ? "fa-chevron-up text-[#1a472a]" : "fa-chevron-down text-gray-400"}`}></i>
                  </div>
                  
                  {activePaymentAccordion === "UPI" && (
                    <div className="p-5 bg-gray-50/50 border-t border-gray-100">
                      <div className="bg-white p-5 rounded-lg border border-gray-200">
                        <h4 className="text-xs font-semibold text-gray-900 mb-3 uppercase tracking-wider text-brand-text-light">Pay with UPI ID / VPA</h4>
                        <div className="flex flex-col sm:flex-row gap-3 mb-6">
                          <input
                            type="text"
                            placeholder="Enter UPI ID (e.g. name@upi)"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            className="flex-grow border border-gray-300 rounded-md p-2.5 text-sm focus:outline-none focus:border-[#1a472a]"
                          />
                          <button
                            onClick={() => {
                              if (!upiId) {
                                alert("Please enter your UPI ID.");
                                return;
                              }
                              handlePlaceOrder();
                            }}
                            disabled={isSubmitting}
                            className="bg-[#1a472a] hover:bg-green-800 text-white px-6 py-2.5 rounded-md text-sm font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                          >
                            Pay Now <i className="fa-solid fa-arrow-right"></i>
                          </button>
                        </div>
                        
                        <div className="flex flex-wrap gap-3">
                          {["G Pay", "PhonePe", "Paytm", "Amazon Pay", "BHIM"].map((app) => (
                            <button
                              key={app}
                              onClick={() => {
                                setUpiId(`devotee@${app.toLowerCase().replace(" ", "")}`);
                                alert(`Selected ${app}. Click Pay Now or Place Order to complete.`);
                              }}
                              className="px-3.5 py-2.5 border border-gray-200 rounded-lg bg-white cursor-pointer hover:border-[#1a472a] hover:text-[#1a472a] text-xs font-semibold text-gray-600 transition-colors"
                            >
                              {app}
                            </button>
                          ))}
                          <div className="px-3 py-2 border border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center text-gray-400">
                            <span className="text-[9px] font-bold">Other UPI</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. CARD ACCORDION */}
                <div className={`bg-white border rounded-xl overflow-hidden shadow-xs ${activePaymentAccordion === "CARD" ? "border-[#1a472a]" : "border-gray-200"}`}>
                  <div
                    onClick={() => setActivePaymentAccordion("CARD")}
                    className="p-5 flex items-center justify-between cursor-pointer hover:bg-gray-50/50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 flex items-center justify-center border border-gray-200 rounded-lg bg-gray-50 text-gray-500">
                        <i className="fa-regular fa-credit-card text-xl"></i>
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-gray-900">Cards</h3>
                        <p className="text-xs text-gray-500">Visa, MasterCard, RuPay &amp; more</p>
                      </div>
                    </div>
                    <i className={`fa-solid ${activePaymentAccordion === "CARD" ? "fa-chevron-up text-[#1a472a]" : "fa-chevron-down text-gray-400"}`}></i>
                  </div>

                  {activePaymentAccordion === "CARD" && (
                    <div className="p-5 bg-white border-t border-gray-100 space-y-4">
                      <div className="relative">
                        <label className="block text-xs font-semibold text-gray-700 mb-1">Card Number</label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="block w-full border border-gray-300 rounded-md p-2.5 text-sm focus:outline-none focus:border-[#1a472a] pr-20"
                        />
                        <div className="absolute right-3 top-7 flex space-x-1.5 text-[9px] font-bold text-gray-400 pointer-events-none">
                          <span className="text-blue-800 italic">VISA</span>
                          <span>MC</span>
                          <span className="text-blue-500">RuPay</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">Card Holder Name</label>
                          <input
                            type="text"
                            placeholder="Name on Card"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            className="block w-full border border-gray-300 rounded-md p-2.5 text-sm focus:outline-none focus:border-[#1a472a]"
                          />
                        </div>
                        <div className="flex gap-4">
                          <div className="flex-1">
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Expiry Date</label>
                            <input
                              type="text"
                              placeholder="MM / YY"
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              className="block w-full border border-gray-300 rounded-md p-2.5 text-sm focus:outline-none focus:border-[#1a472a]"
                            />
                          </div>
                          <div className="flex-1">
                            <label className="block text-xs font-semibold text-gray-700 mb-1">CVV</label>
                            <input
                              type="password"
                              placeholder="123"
                              maxLength={3}
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value)}
                              className="block w-full border border-gray-300 rounded-md p-2.5 text-sm focus:outline-none focus:border-[#1a472a]"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center pt-2">
                        <input
                          id="save-card"
                          type="checkbox"
                          checked={saveCard}
                          onChange={(e) => setSaveCard(e.target.checked)}
                          className="h-4 w-4 rounded border-gray-300 text-brand-green focus:ring-[#1a472a]"
                        />
                        <label htmlFor="save-card" className="ml-2.5 block text-xs text-gray-600">
                          Save this card for faster checkouts
                        </label>
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. COD ACCORDION */}
                <div className={`bg-white border rounded-xl overflow-hidden shadow-xs ${activePaymentAccordion === "COD" ? "border-[#1a472a]" : "border-gray-200"}`}>
                  <div
                    onClick={() => setActivePaymentAccordion("COD")}
                    className="p-5 flex items-center justify-between cursor-pointer hover:bg-gray-50/50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 flex items-center justify-center border border-gray-200 rounded-lg bg-gray-50 text-gray-500">
                        <i className="fa-solid fa-hand-holding-dollar text-xl"></i>
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-gray-900">Cash on Delivery</h3>
                        <p className="text-xs text-gray-500">Pay when your order is delivered</p>
                      </div>
                    </div>
                    <i className={`fa-solid ${activePaymentAccordion === "COD" ? "fa-chevron-up text-[#1a472a]" : "fa-chevron-down text-gray-400"}`}></i>
                  </div>
                  
                  {activePaymentAccordion === "COD" && (
                    <div className="p-5 bg-white border-t border-gray-100">
                      <div className="bg-orange-50 border border-orange-100 rounded-md p-3.5 flex items-center text-xs text-orange-800">
                        <i className="fa-solid fa-circle-check mr-2 text-sm shrink-0"></i>
                        <span>Available for orders up to ₹5,000. Cash will be collected at delivery.</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* 4. NET BANKING ACCORDION */}
                <div className={`bg-white border rounded-xl overflow-hidden shadow-xs ${activePaymentAccordion === "NETBANK" ? "border-[#1a472a]" : "border-gray-200"}`}>
                  <div
                    onClick={() => setActivePaymentAccordion("NETBANK")}
                    className="p-5 flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 flex items-center justify-center border border-gray-200 rounded-lg bg-gray-50 text-gray-500">
                        <i className="fa-solid fa-building-columns text-xl"></i>
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-gray-900">Net Banking</h3>
                        <p className="text-xs text-gray-500">Pay securely using your bank portal</p>
                      </div>
                    </div>
                    <i className={`fa-solid ${activePaymentAccordion === "NETBANK" ? "fa-chevron-up text-[#1a472a]" : "fa-chevron-down text-gray-400"}`}></i>
                  </div>
                </div>

              </div>

              {/* Nikunj Gems Balance Box */}
              <div className="bg-[#fcf9f2] border border-[#e5dfd3] rounded-xl overflow-hidden mt-8">
                <div className="p-5 border-b border-[#e5dfd3]/50">
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <i className="fa-solid fa-gem text-[#1a472a] text-lg"></i>
                    <h3 className="text-lg font-bold text-gray-900 font-serif">Nikunj Gems Balance</h3>
                  </div>
                  <p className="text-xs text-gray-600">Use your gems and enjoy more blessings on checkout</p>
                </div>
                
                <div className="p-5 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                  <div className="flex-shrink-0 text-center sm:text-left">
                    <p className="text-[10px] text-gray-500 uppercase tracking-wide font-semibold mb-1">Available Gems</p>
                    <div className="flex items-center justify-center sm:justify-start gap-1.5 text-2xl font-bold text-gray-900 mb-0.5">
                      <i className="fa-solid fa-gem text-[#1a472a]"></i> 120
                    </div>
                    <p className="text-[10px] text-gray-500">Worth ₹120.00</p>
                  </div>
                  
                  <div className="flex-grow w-full bg-white rounded-lg p-4 border border-[#e5dfd3]">
                    <div className="space-y-4">
                      
                      {/* Radio 1: Use Gems */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-start">
                          <input
                            id="use-gems"
                            type="radio"
                            name="gem-usage"
                            checked={useGems}
                            onChange={() => setUseGems(true)}
                            className="focus:ring-[#1a472a] h-4 w-4 text-[#1a472a] border-gray-300 accent-[#1a472a]"
                          />
                          <label htmlFor="use-gems" className="ml-3 text-xs font-semibold text-gray-700 cursor-pointer">
                            Use Gems
                            <p className="text-gray-500 text-[10px] font-normal mt-0.5">Deduct 120 Gems (Value ₹120.00)</p>
                          </label>
                        </div>
                        <div className="flex items-center border border-gray-200 rounded px-2.5 py-1 bg-gray-50 text-xs">
                          <i className="fa-solid fa-gem text-[#1a472a] mr-1 text-[10px]"></i>
                          <span className="font-semibold text-gray-800">120</span>
                        </div>
                      </div>
                      
                      {/* Radio 2: Don't Use */}
                      <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                        <div className="flex items-start">
                          <input
                            id="dont-use-gems"
                            type="radio"
                            name="gem-usage"
                            checked={!useGems}
                            onChange={() => setUseGems(false)}
                            className="focus:ring-[#1a472a] h-4 w-4 text-[#1a472a] border-gray-300 accent-[#1a472a]"
                          />
                          <label htmlFor="dont-use-gems" className="ml-3 text-xs font-semibold text-gray-700 cursor-pointer">
                            Do Not Use Gems
                            <p className="text-gray-500 text-[10px] font-normal mt-0.5">Save gems for future orders</p>
                          </label>
                        </div>
                        {useGems && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-orange-100 text-orange-800">
                            You save ₹120.00
                          </span>
                        )}
                      </div>
                      
                    </div>
                  </div>
                </div>

                <div className="bg-[#e5dfd3]/20 px-5 py-3 border-t border-[#e5dfd3]/30 flex items-center text-[10px] text-gray-600">
                  <i className="fa-solid fa-hands-praying text-[#1a472a] mr-2"></i>
                  <span>100% of the gems are earned from being a part of Nikunj Parivaar.</span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="mt-8 border-t border-gray-200 pt-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-xs leading-relaxed">
                <div className="flex items-start gap-3">
                  <i className="fa-solid fa-shield-halved text-[#1a472a] text-xl shrink-0"></i>
                  <div>
                    <h4 className="font-bold text-gray-900">Secure Payments</h4>
                    <p className="text-gray-500 mt-0.5">Your transactions are 100% safe.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <i className="fa-solid fa-arrow-rotate-left text-[#1a472a] text-xl shrink-0"></i>
                  <div>
                    <h4 className="font-bold text-gray-900">Easy Returns</h4>
                    <p className="text-gray-500 mt-0.5">Hassle-free returns within 7 days.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <i className="fa-solid fa-hands-praying text-[#1a472a] text-xl shrink-0"></i>
                  <div>
                    <h4 className="font-bold text-gray-900">Devotion Assured</h4>
                    <p className="text-gray-500 mt-0.5">Crafted with love and devotion.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <i className="fa-solid fa-headset text-[#1a472a] text-xl shrink-0"></i>
                  <div>
                    <h4 className="font-bold text-gray-900">Support</h4>
                    <p className="text-gray-500 mt-0.5">We're here for you always.</p>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* RIGHT COLUMN: Order Summary Sidebar (Fixed) */}
        <div className="lg:col-span-4 mt-10 lg:mt-0">
          <div className="bg-gray-50 rounded-xl p-6 sticky top-24 border border-gray-200 text-sm">
            <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-4">
              <h2 className="text-lg font-bold text-gray-900 font-serif">Order Summary</h2>
              <span className="text-xs text-gray-500 font-semibold">{cartItems.length} {cartItems.length === 1 ? "Item" : "Items"}</span>
            </div>

            {/* Product List */}
            <ul className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <li key={`${item.id}-${item.size}`} className="flex py-2">
                  <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 bg-white">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="ml-4 flex flex-1 flex-col justify-center text-xs">
                    <div className="flex justify-between font-semibold text-gray-900 gap-1.5">
                      <h3 className="line-clamp-2 leading-relaxed">{item.name}</h3>
                      <p className="whitespace-nowrap">₹{item.price * item.quantity}</p>
                    </div>
                    <p className="mt-1 text-gray-500">Size: {item.size}</p>
                    <p className="mt-0.5 text-gray-500">Qty: {item.quantity}</p>
                  </div>
                </li>
              ))}
            </ul>

            {/* Totals */}
            <div className="border-t border-gray-200 pt-4 space-y-3 mb-6 text-xs">
              <div className="flex items-center justify-between">
                <p className="text-gray-600">Subtotal</p>
                <p className="font-semibold text-gray-900">₹{cartTotal}</p>
              </div>
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-600">Shipping</p>
                  <p className="text-[10px] text-gray-500">Standard Delivery</p>
                </div>
                <p className="font-semibold text-gray-900">
                  {shippingCharges === 0 ? "FREE" : `₹${shippingCharges}`}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-gray-600">Packaging Charges</p>
                <p className="font-semibold text-gray-900">₹{packagingCharges}</p>
              </div>

              {couponInfo.amount > 0 && (
                <div className="flex items-center justify-between text-green-700 font-semibold">
                  <p>Coupon Discount ({couponInfo.code})</p>
                  <p>-₹{couponInfo.amount}</p>
                </div>
              )}

              {useGems && (
                <div className="flex items-center justify-between text-[#1a472a] font-semibold">
                  <p>Gems Applied (120 Gems)</p>
                  <p>-₹120</p>
                </div>
              )}

              <div className="flex items-end justify-between pt-3 border-t border-dashed border-gray-200">
                <div>
                  <p className="text-sm font-bold text-gray-900 font-serif">Total Amount</p>
                  <p className="text-[10px] text-gray-500">Inclusive of all taxes</p>
                </div>
                <p className="text-2xl font-bold text-gray-900">₹{finalTotal}</p>
              </div>
            </div>

            {/* Earn Gems Info */}
            <div className="bg-[#fcf9f2] rounded-lg p-4 mb-6 flex items-start border border-[#e5dfd3]/50 text-xs">
              <i className="fa-solid fa-gem text-[#1a472a] text-lg mr-3 mt-0.5"></i>
              <div>
                <p className="text-gray-600">You will earn</p>
                <p className="font-bold text-[#1a472a] flex items-center gap-1 mt-0.5">
                  <i className="fa-solid fa-leaf text-[10px]"></i> 12 Nikunj Gems
                </p>
                <p className="text-[10px] text-gray-500 flex items-center gap-1 mt-1">
                  on this order <i className="fa-regular fa-circle-question"></i>
                </p>
              </div>
            </div>

            {/* Why Shop Info */}
            <div className="mb-6 space-y-3">
              <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider text-brand-text-light font-serif">Why shop with Nikunj?</h4>
              <ul className="space-y-3 text-[11px] leading-relaxed">
                <li className="flex items-start">
                  <i className="fa-solid fa-hands-praying text-[#1a472a] mt-0.5 mr-2 w-4 text-center"></i>
                  <div>
                    <span className="font-bold text-gray-800 block">Handcrafted with Devotion</span>
                    <span className="text-gray-500">Every piece made with love by homemakers</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <i className="fa-solid fa-users text-[#1a472a] mt-0.5 mr-2 w-4 text-center"></i>
                  <div>
                    <span className="font-bold text-gray-800 block">Trusted by 100K+ Devotees</span>
                    <span className="text-gray-500">Spanning across India</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <i className="fa-solid fa-leaf text-[#1a472a] mt-0.5 mr-2 w-4 text-center"></i>
                  <div>
                    <span className="font-bold text-gray-800 block">Eco-friendly Packaging</span>
                    <span className="text-gray-500">Plastic-free, highly sustainable</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            {checkoutStep === "address" ? (
              <button
                type="button"
                onClick={handleProceedToPayment}
                className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-[#1a472a] hover:bg-green-800 transition-colors focus:outline-none cursor-pointer"
              >
                Proceed to Payment <i className="fa-solid fa-arrow-right ml-2"></i>
              </button>
            ) : (
              <button
                type="button"
                onClick={handlePlaceOrder}
                disabled={isSubmitting}
                className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-[#1a472a] hover:bg-green-800 transition-colors focus:outline-none cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin mr-2"></i> Placing Order...
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-lock mr-2"></i> Place Order Securely
                  </>
                )}
              </button>
            )}

            <p className="text-center text-[10px] text-gray-500 mt-4 px-2 leading-relaxed">
              By placing this order you agree to our <a className="underline hover:text-gray-700" href="#">Terms &amp; Conditions</a> and <a className="underline hover:text-gray-700" href="#">Privacy Policy</a>.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
