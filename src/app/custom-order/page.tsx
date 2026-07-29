"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CustomOrderPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form States
  const [deityType, setDeityType] = useState<string>("Laddu Gopal");
  const [deitySize, setDeitySize] = useState<string>("Size 2 (6\" Dress)");
  const [customMeasurements, setCustomMeasurements] = useState({
    height: "",
    waist: "",
    chest: "",
  });
  const [useCustomSize, setUseCustomSize] = useState<boolean>(false);

  // Image Upload
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  // Styling Choices
  const [fabricType, setFabricType] = useState<string>("Brocade Silk");
  const [primaryColor, setPrimaryColor] = useState<string>("Royal Blue");
  const [embroideryType, setEmbroideryType] = useState<string>("Heavy Zari border & Stones");
  const [includeAccessories, setIncludeAccessories] = useState<string[]>(["Matching Pagdi"]);

  // Contact Info
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });

  // Success details
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [generatedOrderId, setGeneratedOrderId] = useState<string>("");

  // Price Calculation Estimation
  const calculatePrice = () => {
    let base = 350;
    if (deityType !== "Laddu Gopal") base += 100;
    
    // Size addition
    if (deitySize.includes("Size 3") || deitySize.includes("Size 4")) base += 80;
    if (deitySize.includes("Size 5") || deitySize.includes("Size 6")) base += 150;
    if (useCustomSize) base += 200; // Custom tailoring charge

    // Fabric addition
    if (fabricType === "Velvet") base += 100;
    if (fabricType === "Brocade Silk") base += 80;
    if (fabricType === "Organza / Net") base += 50;

    // Embroidery addition
    if (embroideryType.includes("Heavy")) base += 120;
    if (embroideryType.includes("Kundan")) base += 180;

    // Accessories
    base += includeAccessories.length * 75;

    return base;
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsUploading(true);
      setTimeout(() => {
        const fileNames = Array.from(e.target.files || []).map((file) => file.name);
        setUploadedFiles((prev) => [...prev, ...fileNames]);
        setIsUploading(false);
      }, 1200);
    }
  };

  const handleAccessoryToggle = (acc: string) => {
    setIncludeAccessories((prev) =>
      prev.includes(acc) ? prev.filter((i) => i !== acc) : [...prev, acc]
    );
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactInfo.name || !contactInfo.phone) {
      alert("Please fill in your Name and Phone number.");
      return;
    }
    
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const orderId = `NK-CUST-2026-${randomNum}`;
    
    setGeneratedOrderId(orderId);
    setIsSubmitted(true);
    
    // Save to local storage mock orders
    const newCustomOrder = {
      orderId,
      date: new Date().toLocaleDateString(),
      deityType,
      deitySize: useCustomSize ? "Custom Measurements" : deitySize,
      fabricType,
      primaryColor,
      total: calculatePrice(),
      status: "Order Placed",
    };
    
    try {
      const savedOrders = localStorage.getItem("nikunj_custom_orders");
      const list = savedOrders ? JSON.parse(savedOrders) : [];
      list.push(newCustomOrder);
      localStorage.setItem("nikunj_custom_orders", JSON.stringify(list));
    } catch (e) {
      console.error(e);
    }
  };

  if (isSubmitted) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="bg-white border border-brand-border rounded-2xl p-8 sm:p-12 shadow-sm">
          <i className="fa-solid fa-circle-check text-brand-green text-6xl mb-6 animate-bounce"></i>
          <h1 className="font-serif text-3xl text-brand-text mb-4">Custom Order Request Received!</h1>
          <p className="text-brand-text-light text-sm max-w-md mx-auto mb-6 leading-relaxed">
            Thank you for requesting a custom dress for your Kanha. Our artisans are reviewing your measurements and style choices.
          </p>

          <div className="bg-brand-card border border-brand-border rounded-lg p-5 max-w-sm mx-auto mb-8 text-left text-xs space-y-2">
            <div><strong>Order Request ID:</strong> <span className="font-mono text-brand-green font-semibold">{generatedOrderId}</span></div>
            <div><strong>Deity Model:</strong> {deityType}</div>
            <div><strong>Attire Specifications:</strong> {primaryColor} {fabricType} Dress</div>
            <div><strong>Embroidery:</strong> {embroideryType}</div>
            <div><strong>Estimated Price:</strong> ₹{calculatePrice()}</div>
            <div><strong>Status:</strong> <span className="bg-orange-100 text-orange-800 px-1.5 py-0.5 rounded font-medium">Pending Review</span></div>
          </div>

          <p className="text-[11px] text-brand-text-light italic mb-8">
            Note: We have sent a confirmation details mockup to your email. We will reach out via WhatsApp/Phone for fabric patterns approval.
          </p>

          <div className="flex justify-center gap-4">
            <Link
              href={`/track-order?orderId=${generatedOrderId}`}
              className="bg-brand-green hover:bg-brand-green-hover text-white text-xs font-semibold py-2.5 px-6 rounded-md shadow-sm transition-colors"
            >
              Track Request
            </Link>
            <Link
              href="/shop"
              className="bg-white hover:bg-brand-bg text-brand-text border border-brand-border text-xs font-semibold py-2.5 px-6 rounded-md shadow-sm transition-colors"
            >
              Go to Shop
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Page Title */}
      <div className="text-center mb-10">
        <h1 className="font-serif text-4xl text-brand-text mb-2">Custom Shringar Order</h1>
        <p className="text-brand-text-light text-sm italic font-serif max-w-md mx-auto">
          Design the perfect dress tailored to the precise proportions of your beloved deity.
        </p>
      </div>

      {/* Progress Tracker */}
      <div className="max-w-3xl mx-auto mb-12 flex justify-between items-center relative">
        <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-brand-border z-0 -translate-y-1/2"></div>
        <div
          className="absolute left-0 top-1/2 h-0.5 bg-brand-green transition-all duration-300 z-0 -translate-y-1/2"
          style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
        ></div>

        {[
          { step: 1, label: "Deity & Size" },
          { step: 2, label: "Design Photos" },
          { step: 3, label: "Fabric & Style" },
          { step: 4, label: "Submit Request" },
        ].map((item) => (
          <div key={item.step} className="flex flex-col items-center z-10">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all ${
                currentStep >= item.step
                  ? "bg-brand-green border-brand-green text-white"
                  : "bg-white border-brand-border text-brand-text-light"
              }`}
            >
              {item.step}
            </div>
            <span
              className={`text-[10px] sm:text-xs mt-2 font-medium bg-brand-bg px-1 ${
                currentStep >= item.step ? "text-brand-green font-semibold" : "text-brand-text-light"
              }`}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Step Content */}
        <div className="lg:col-span-2 bg-white border border-brand-border rounded-xl p-6 sm:p-8 shadow-sm">
          <form onSubmit={handleSubmitOrder}>
            
            {/* STEP 1: DEITY & SIZE */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="font-serif text-xl text-brand-text pb-2 border-b border-brand-bg">
                  Step 1: Deity Type &amp; Sizing
                </h3>
                
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-brand-text mb-2">
                    Deity Type
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {["Laddu Gopal", "Radha Rani", "Krishna", "Jugal Jodi"].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setDeityType(type)}
                        className={`py-3 border text-xs font-semibold rounded-lg transition-colors text-center ${
                          deityType === type
                            ? "border-brand-green bg-brand-card text-brand-green"
                            : "border-brand-border bg-white text-brand-text hover:bg-brand-bg"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2 py-2 border-y border-brand-bg">
                  <input
                    type="checkbox"
                    id="custom-size-toggle"
                    checked={useCustomSize}
                    onChange={(e) => setUseCustomSize(e.target.checked)}
                    className="h-4 w-4 text-brand-green border-brand-border rounded focus:ring-brand-green focus:outline-none"
                  />
                  <label htmlFor="custom-size-toggle" className="text-xs font-medium text-brand-text select-none cursor-pointer">
                    I want to provide custom measurements (height/waist)
                  </label>
                </div>

                {!useCustomSize ? (
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-brand-text-light mb-2">
                      Standard Size Selector
                    </label>
                    <select
                      value={deitySize}
                      onChange={(e) => setDeitySize(e.target.value)}
                      className="w-full text-sm border border-brand-border rounded-md p-2 focus:outline-none focus:border-brand-green bg-white text-brand-text"
                    >
                      <option>Size 0 (4&quot; Dress diameter, up to 2&quot; tall)</option>
                      <option>Size 1 (5&quot; Dress diameter, 2-2.5&quot; tall)</option>
                      <option>Size 2 (6&quot; Dress diameter, 2.5-3&quot; tall)</option>
                      <option>Size 3 (7&quot; Dress diameter, 3-3.5&quot; tall)</option>
                      <option>Size 4 (8&quot; Dress diameter, 3.5-4.5&quot; tall)</option>
                      <option>Size 5 (9&quot; Dress diameter, 4.5-5.5&quot; tall)</option>
                      <option>Size 6 (10&quot; Dress diameter, 5.5-6.5&quot; tall)</option>
                    </select>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-brand-text-light">
                      Provide Custom Measurements (Inches)
                    </label>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <span className="text-[10px] text-brand-text-light mb-1 block">Height (Toe to Crown)</span>
                        <input
                          type="text"
                          placeholder="e.g. 3.5"
                          value={customMeasurements.height}
                          onChange={(e) => setCustomMeasurements({ ...customMeasurements, height: e.target.value })}
                          className="w-full border border-brand-border rounded p-2 text-sm focus:outline-none focus:border-brand-green"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-brand-text-light mb-1 block">Waist Circumference</span>
                        <input
                          type="text"
                          placeholder="e.g. 2.8"
                          value={customMeasurements.waist}
                          onChange={(e) => setCustomMeasurements({ ...customMeasurements, waist: e.target.value })}
                          className="w-full border border-brand-border rounded p-2 text-sm focus:outline-none focus:border-brand-green"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-brand-text-light mb-1 block">Shoulder to Floor</span>
                        <input
                          type="text"
                          placeholder="e.g. 4.2"
                          value={customMeasurements.chest}
                          onChange={(e) => setCustomMeasurements({ ...customMeasurements, chest: e.target.value })}
                          className="w-full border border-brand-border rounded p-2 text-sm focus:outline-none focus:border-brand-green"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* STEP 2: UPLOAD PHOTOS */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="font-serif text-xl text-brand-text pb-2 border-b border-brand-bg">
                  Step 2: Upload Reference Images
                </h3>
                
                <p className="text-xs text-brand-text-light leading-relaxed">
                  Have a specific dress design or pattern in mind? Upload a photo, sketches, or drawing. Our homemakers can recreate patterns based on visual references.
                </p>

                {/* Upload Area */}
                <div className="border-2 border-dashed border-brand-border hover:border-brand-green/70 rounded-xl p-8 text-center bg-brand-bg/10 relative transition-colors cursor-pointer">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    disabled={isUploading}
                  />
                  <div className="space-y-2">
                    <i className={`fa-solid ${isUploading ? "fa-spinner fa-spin text-brand-green" : "fa-cloud-arrow-up text-brand-text-light"} text-4xl block mx-auto`}></i>
                    <span className="text-sm font-semibold text-brand-text block">
                      {isUploading ? "Uploading reference images..." : "Drag & Drop files here"}
                    </span>
                    <span className="text-xs text-brand-text-light block">
                      or click to browse from device (JPG, PNG, max 5MB)
                    </span>
                  </div>
                </div>

                {/* Uploaded items listing */}
                {uploadedFiles.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold uppercase text-brand-text mb-2">Uploaded References</h4>
                    <div className="space-y-2">
                      {uploadedFiles.map((filename, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between text-xs bg-brand-card p-2.5 rounded-lg border border-brand-border/60"
                        >
                          <span className="font-medium text-brand-text flex items-center gap-1.5 truncate pr-4">
                            <i className="fa-regular fa-image text-brand-green"></i> {filename}
                          </span>
                          <button
                            type="button"
                            onClick={() => setUploadedFiles(uploadedFiles.filter((_, i) => i !== index))}
                            className="text-brand-text-light hover:text-red-500 cursor-pointer"
                          >
                            <i className="fa-solid fa-trash-can"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* STEP 3: FABRIC & STYLE */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="font-serif text-xl text-brand-text pb-2 border-b border-brand-bg">
                  Step 3: Fabric &amp; Style Preferences
                </h3>
                
                {/* Fabric Type */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-brand-text-light mb-2">
                    Fabric Preference
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {["Pure Cotton (Summer)", "Velvet (Winter)", "Brocade Silk (Festive)", "Organza / Net (Light Flared)"].map((fabric) => (
                      <button
                        key={fabric}
                        type="button"
                        onClick={() => setFabricType(fabric)}
                        className={`py-3 border text-xs font-semibold rounded-lg transition-colors text-center ${
                          fabricType === fabric
                            ? "border-brand-green bg-brand-card text-brand-green"
                            : "border-brand-border bg-white text-brand-text hover:bg-brand-bg"
                        }`}
                      >
                        {fabric}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Choice */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-brand-text-light mb-2">
                    Primary Theme Color
                  </label>
                  <select
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-full text-sm border border-brand-border rounded-md p-2 focus:outline-none focus:border-brand-green bg-white text-brand-text"
                  >
                    <option>Saffron / Orange</option>
                    <option>Yellow / Pitambar</option>
                    <option>Royal Blue</option>
                    <option>Bright Red</option>
                    <option>Divine Green</option>
                    <option>Baby Pink</option>
                    <option>White & Gold</option>
                  </select>
                </div>

                {/* Embroidery preference */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-brand-text-light mb-2">
                    Embroidery &amp; Borders
                  </label>
                  <div className="space-y-2">
                    {[
                      "Simple lace & borders (Ideal for daily wear)",
                      "Heavy Zari border & Stones (Ideal for festivals)",
                      "Heavy Kundan, pearls, and stonework (Royal collection)",
                    ].map((emb) => (
                      <button
                        key={emb}
                        type="button"
                        onClick={() => setEmbroideryType(emb)}
                        className={`w-full text-left py-2.5 px-3 border text-xs rounded-md transition-colors flex items-center gap-2 ${
                          embroideryType === emb
                            ? "border-brand-green bg-brand-card text-brand-green font-semibold"
                            : "border-brand-border bg-white text-brand-text hover:bg-brand-bg"
                        }`}
                      >
                        <i
                          className={`fa-solid ${
                            embroideryType === emb ? "fa-circle-check text-brand-green" : "fa-circle text-brand-border"
                          }`}
                        ></i>
                        {emb}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Accessories */}
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-brand-text-light mb-2">
                    Add Accompanying Accessories (Optional)
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {["Matching Pagdi", "Matching Flute (Baansuri)", "Handmade Haar Set", "Side Cushions & Bedding"].map((acc) => {
                      const isAdded = includeAccessories.includes(acc);
                      return (
                        <button
                          key={acc}
                          type="button"
                          onClick={() => handleAccessoryToggle(acc)}
                          className={`py-2.5 border text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 ${
                            isAdded
                              ? "border-brand-green bg-brand-card text-brand-green"
                              : "border-brand-border bg-white text-brand-text hover:bg-brand-bg"
                          }`}
                        >
                          <i className={`fa-solid ${isAdded ? "fa-square-check text-brand-green" : "fa-square text-brand-border"}`}></i>
                          {acc}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: CONTACT & SUBMIT */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-fade-in">
                <h3 className="font-serif text-xl text-brand-text pb-2 border-b border-brand-bg">
                  Step 4: Contact Details &amp; Special Instructions
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-brand-text-light mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Radhika Aggarwal"
                      value={contactInfo.name}
                      onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                      className="w-full border border-brand-border rounded p-2 text-sm focus:outline-none focus:border-brand-green"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-brand-text-light mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. name@domain.com"
                        value={contactInfo.email}
                        onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                        className="w-full border border-brand-border rounded p-2 text-sm focus:outline-none focus:border-brand-green"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-brand-text-light mb-1">
                        WhatsApp / Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 XXXXX XXXXX"
                        value={contactInfo.phone}
                        onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                        className="w-full border border-brand-border rounded p-2 text-sm focus:outline-none focus:border-brand-green"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-brand-text-light mb-1">
                      Special Requests / Custom Notes
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Write any additional detail. (e.g. 'Use pastel colors and no plastic beads. Thread embroidery should be golden.')"
                      value={contactInfo.notes}
                      onChange={(e) => setContactInfo({ ...contactInfo, notes: e.target.value })}
                      className="w-full border border-brand-border rounded p-2 text-sm focus:outline-none focus:border-brand-green resize-none"
                    ></textarea>
                  </div>
                </div>

                <div className="p-3 bg-brand-card rounded-md border border-brand-border/40 text-[11px] text-brand-text-light leading-relaxed flex items-start gap-2">
                  <i className="fa-solid fa-circle-info text-brand-green mt-0.5"></i>
                  <span>
                    By submitting, you agree to allow our craftswomen team to reach out to you directly on WhatsApp to confirm design specifics before tailoring.
                  </span>
                </div>
              </div>
            )}

            {/* Navigation buttons inside form */}
            <div className="mt-8 pt-6 border-t border-brand-border flex justify-between">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="border border-brand-border bg-white text-brand-text hover:bg-brand-bg py-2 px-6 rounded-md font-semibold text-xs transition-colors shadow-sm focus:outline-none cursor-pointer"
                >
                  Previous
                </button>
              ) : (
                <div />
              )}

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="bg-brand-green hover:bg-brand-green-hover text-white py-2 px-6 rounded-md font-semibold text-xs transition-colors shadow-sm focus:outline-none cursor-pointer"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="bg-brand-green hover:bg-brand-green-hover text-white py-2.5 px-8 rounded-md font-semibold text-xs transition-colors shadow-md focus:outline-none cursor-pointer"
                >
                  Submit Order Request
                </button>
              )}
            </div>
          </form>
        </div>

        {/* SIDEBAR ESTIMATION SUMMARY */}
        <aside className="w-full bg-brand-card/40 border border-brand-border rounded-xl p-6 shadow-sm h-fit">
          <h3 className="font-serif text-lg font-medium text-brand-text pb-3 mb-4 border-b border-brand-border flex items-center gap-1.5">
            <i className="fa-solid fa-calculator text-brand-green"></i> Estimate Summary
          </h3>

          <div className="text-xs text-brand-text-light space-y-3 pb-4 mb-4 border-b border-brand-border/60">
            <div className="flex justify-between">
              <span>Deity (Custom {deityType}):</span>
              <span className="font-semibold text-brand-text">₹350</span>
            </div>
            
            {useCustomSize && (
              <div className="flex justify-between">
                <span>Custom Sizing charge:</span>
                <span className="font-semibold text-brand-text">+₹200</span>
              </div>
            )}
            
            {!useCustomSize && (deitySize.includes("Size 3") || deitySize.includes("Size 4")) && (
              <div className="flex justify-between">
                <span>Medium Size adjustment:</span>
                <span className="font-semibold text-brand-text">+₹80</span>
              </div>
            )}

            {!useCustomSize && (deitySize.includes("Size 5") || deitySize.includes("Size 6")) && (
              <div className="flex justify-between">
                <span>Large Size adjustment:</span>
                <span className="font-semibold text-brand-text">+₹150</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Fabric ({fabricType.split(" ")[0]}):</span>
              <span className="font-semibold text-brand-text">
                {fabricType.includes("Velvet") ? "+₹100" : fabricType.includes("Brocade") ? "+₹80" : fabricType.includes("Organza") ? "+₹50" : "+₹0"}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Embroidery Accents:</span>
              <span className="font-semibold text-brand-text">
                {embroideryType.includes("Heavy Zari") ? "+₹120" : embroideryType.includes("Kundan") ? "+₹180" : "+₹0"}
              </span>
            </div>

            {includeAccessories.length > 0 && (
              <div className="space-y-1 pl-2 border-l border-brand-green">
                <span className="text-[10px] text-brand-text-light block">Accessories ({includeAccessories.length}):</span>
                {includeAccessories.map((acc) => (
                  <div key={acc} className="flex justify-between text-[11px]">
                    <span>- {acc.split(" ")[1] || acc}:</span>
                    <span className="font-semibold text-brand-text">+₹75</span>
                  </div>
                ))}
              </div>
            )}

            {uploadedFiles.length > 0 && (
              <div className="flex justify-between text-[11px] text-green-700 bg-green-50 px-2 py-1 rounded">
                <span>Design reference loaded:</span>
                <span className="font-semibold">Free Review</span>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center text-sm font-semibold text-brand-text mb-4">
            <span>Estimated Total:</span>
            <span className="text-xl text-brand-green">₹{calculatePrice()}</span>
          </div>

          <div className="text-[10px] text-brand-text-light italic leading-relaxed">
            * This is a design-time price estimation. Final quotation is validated by our stitching experts upon receipt of the request.
          </div>
        </aside>
      </div>
    </div>
  );
}
