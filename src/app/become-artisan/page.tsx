"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function BecomeArtisanPage() {
  // Form States
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    state: "",
    experience: "Intermediate (1-3 years)",
    hasSewingMachine: "Yes",
    portfolioName: "",
  });

  const [skills, setSkills] = useState<string[]>(["Stitching"]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // FAQ states
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleSkillToggle = (skill: string) => {
    setSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API registration delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const faqs = [
    {
      q: "How does the training process work?",
      a: "Once your application is initially accepted, we send you a sample kit containing fabric and design sketches. We conduct a short video call to explain the design. You stitch the sample and ship it back to us (free of charge) for a quality check.",
    },
    {
      q: "Where do I get the raw material (fabric, threads, laces)?",
      a: "Nikunj provides all fabric, threads, sequins, laces, and accessories. We deliver the complete material kit directly to your doorstep and collect the finished dresses. You don't have to spend anything on materials.",
    },
    {
      q: "How and when are payments made?",
      a: "Payments are calculated on a per-dress basis, depending on the complexity of the design. All earnings are calculated at the end of the month and paid directly to your bank account or UPI by the 5th of the following month.",
    },
    {
      q: "Is there a minimum target of dresses to stitch weekly?",
      a: "No! There are no strict targets. You can choose to work according to your convenience. However, we ask that you communicate your weekly capacity in advance so we can allocate material kits accordingly.",
    },
  ];

  if (isSubmitted) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="bg-white border border-brand-border rounded-2xl p-8 sm:p-12 shadow-sm">
          <i className="fa-solid fa-face-smile-beam text-brand-green text-6xl mb-6 animate-bounce"></i>
          <h1 className="font-serif text-3xl text-brand-text mb-4">Application Submitted!</h1>
          <p className="text-brand-text-light text-sm max-w-md mx-auto mb-8 leading-relaxed">
            Dhanyawad! We have received your application to join the Nikunj Artisan program. Our team will review your skills and contact you on WhatsApp/Call within 3 working days.
          </p>

          <div className="bg-brand-card border border-brand-border rounded-lg p-5 max-w-sm mx-auto mb-8 text-left text-xs space-y-2">
            <div><strong>Applicant Name:</strong> {formData.name}</div>
            <div><strong>WhatsApp Number:</strong> {formData.phone}</div>
            <div><strong>Location:</strong> {formData.city}, {formData.state}</div>
            <div><strong>Skills Applied:</strong> {skills.join(", ")}</div>
            <div><strong>Current Stage:</strong> <span className="bg-green-100 text-green-800 px-1.5 py-0.5 rounded font-medium">Profile Review</span></div>
          </div>

          <Link
            href="/"
            className="bg-brand-green hover:bg-brand-green-hover text-white text-xs font-semibold py-2.5 px-6 rounded-md shadow-sm transition-colors"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Hero Section */}
      <section className="artisan-bg rounded-2xl flex flex-col md:flex-row items-center border border-brand-border shadow-sm overflow-hidden mb-16">
        <div className="w-full md:w-1/2 h-64 md:h-[350px] relative">
          <img
            alt="Knitting hands"
            className="w-full h-full object-cover absolute inset-0"
            src="/artisan_hands_pink.png"
          />
        </div>
        <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
          <h1 className="font-serif text-4xl text-brand-text mb-4">
            Become a Nikunj Artisan
          </h1>
          <p className="text-brand-text-light text-sm leading-relaxed mb-6">
            Nikunj was born out of a desire to empower homemakers by connecting their traditional crafting skills with devotees seeking beautiful, handcrafted dresses for their Laddu Gopal Ji. Turn your free hours into a source of pride and income.
          </p>
          
          <div className="grid grid-cols-2 gap-4 text-xs font-medium text-brand-text">
            <div className="flex items-center space-x-2">
              <i className="fa-solid fa-house text-brand-green"></i>
              <span>Work from Home</span>
            </div>
            <div className="flex items-center space-x-2">
              <i className="fa-regular fa-clock text-brand-green"></i>
              <span>Flexible Working Hours</span>
            </div>
            <div className="flex items-center space-x-2">
              <i className="fa-solid fa-indian-rupee-sign text-brand-green"></i>
              <span>Timely Payments</span>
            </div>
            <div className="flex items-center space-x-2">
              <i className="fa-solid fa-seedling text-brand-green"></i>
              <span>Support &amp; Growth</span>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-16">
        
        {/* Onboarding Flow Column */}
        <div className="lg:col-span-1 space-y-6">
          <div>
            <h2 className="font-serif text-2xl text-brand-text mb-2">How It Works</h2>
            <p className="text-brand-text-light text-xs leading-relaxed">
              Our onboarding process is transparent and designed to set you up for success.
            </p>
          </div>

          <div className="relative border-l border-brand-border/80 pl-6 space-y-8 ml-3 py-2 text-xs">
            <div className="relative">
              <div className="absolute -left-[31px] top-0 bg-brand-green text-white w-6 h-6 rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <h4 className="font-semibold text-brand-text text-sm mb-1">Fill the Application</h4>
              <p className="text-brand-text-light leading-relaxed">
                Provide your basic contact information, experience levels, and special crafting talents.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -left-[31px] top-0 bg-brand-green text-white w-6 h-6 rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <h4 className="font-semibold text-brand-text text-sm mb-1">Stitch a Sample</h4>
              <p className="text-brand-text-light leading-relaxed">
                We deliver a sample design kit to your home. You stitch it based on video guide instructions.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -left-[31px] top-0 bg-brand-green text-white w-6 h-6 rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <h4 className="font-semibold text-brand-text text-sm mb-1">Get Raw Materials</h4>
              <p className="text-brand-text-light leading-relaxed">
                Upon passing the quality check, we send weekly packages with high-quality fabric, decorations, and threads.
              </p>
            </div>
            <div className="relative">
              <div className="absolute -left-[31px] top-0 bg-brand-green text-white w-6 h-6 rounded-full flex items-center justify-center font-bold">
                4
              </div>
              <h4 className="font-semibold text-brand-text text-sm mb-1">Craft &amp; Earn</h4>
              <p className="text-brand-text-light leading-relaxed">
                Stitch dresses comfortably at your pace. We collect finished products from your home and pay you monthly.
              </p>
            </div>
          </div>
        </div>

        {/* Application Form Column */}
        <div className="lg:col-span-2 bg-white border border-brand-border rounded-xl p-6 sm:p-8 shadow-sm">
          <h2 className="font-serif text-2xl text-brand-text mb-6">Artisan Registration Form</h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-brand-text-light mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Suman Devi"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-brand-border rounded p-2 text-sm focus:outline-none focus:border-brand-green"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-brand-text-light mb-1">
                  WhatsApp Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full border border-brand-border rounded p-2 text-sm focus:outline-none focus:border-brand-green"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-1">
                <label className="block text-xs font-semibold uppercase tracking-wider text-brand-text-light mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="name@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border border-brand-border rounded p-2 text-sm focus:outline-none focus:border-brand-green"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-brand-text-light mb-1">
                  City *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ghaziabad"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full border border-brand-border rounded p-2 text-sm focus:outline-none focus:border-brand-green"
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
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full border border-brand-border rounded p-2 text-sm focus:outline-none focus:border-brand-green"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-brand-text-light mb-2">
                What skills do you possess? (Select all that apply)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {["Stitching / Sewing", "Hand Embroidery", "Zardozi / Gota Work", "Crochet & Knitting", "Bead-work & Stones"].map((skill) => {
                  const isChecked = skills.includes(skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => handleSkillToggle(skill)}
                      className={`py-2 px-3 border text-xs font-medium rounded-lg transition-colors flex items-center gap-2 ${
                        isChecked
                          ? "border-brand-green bg-brand-card text-brand-green"
                          : "border-brand-border bg-white text-brand-text hover:bg-brand-bg"
                      }`}
                    >
                      <i className={`fa-solid ${isChecked ? "fa-circle-check text-brand-green" : "fa-circle text-brand-border/60"}`}></i>
                      {skill}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-brand-text-light mb-1">
                  Tailoring Experience *
                </label>
                <select
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  className="w-full text-sm border border-brand-border rounded p-2 bg-white text-brand-text focus:outline-none"
                >
                  <option>Beginner (Less than 1 year)</option>
                  <option>Intermediate (1-3 years)</option>
                  <option>Professional (3+ years)</option>
                  <option>Just standard household sewing</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-brand-text-light mb-1">
                  Do you own a sewing machine? *
                </label>
                <select
                  value={formData.hasSewingMachine}
                  onChange={(e) => setFormData({ ...formData, hasSewingMachine: e.target.value })}
                  className="w-full text-sm border border-brand-border rounded p-2 bg-white text-brand-text focus:outline-none"
                >
                  <option>Yes (Mechanical / Standard)</option>
                  <option>Yes (Electric / Motorized)</option>
                  <option>No (Would need support to buy one)</option>
                  <option>No (I only do hand knitting / beadwork)</option>
                </select>
              </div>
            </div>

            {/* Simulated file upload */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-brand-text-light mb-1">
                Upload image of something you stitched / crafted (Optional)
              </label>
              <div className="flex items-center gap-3">
                <label className="border border-brand-border hover:bg-brand-bg text-brand-text text-xs py-2 px-4 rounded-md cursor-pointer transition-colors shadow-sm font-semibold">
                  Choose Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        setFormData({ ...formData, portfolioName: e.target.files[0].name });
                      }
                    }}
                    className="hidden"
                  />
                </label>
                <span className="text-xs text-brand-text-light truncate">
                  {formData.portfolioName || "No image chosen"}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-brand-green hover:bg-brand-green-hover text-white py-3 rounded-md font-semibold text-sm transition-colors shadow-md focus:outline-none flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin"></i> Submitting Application...
                  </>
                ) : (
                  <>Submit Registration Request</>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* FAQ SECTION */}
      <section className="max-w-4xl mx-auto mb-10 mt-20 bg-white border border-brand-border rounded-xl p-6 sm:p-8 shadow-sm">
        <h2 className="font-serif text-2xl text-brand-text mb-6 text-center">Frequently Asked Questions</h2>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div key={index} className="border-b border-brand-bg pb-3 last:border-0 last:pb-0">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center text-left py-2 focus:outline-none text-brand-text hover:text-brand-green transition-colors"
                >
                  <span className="text-sm sm:text-base font-medium">{faq.q}</span>
                  <i className={`fa-solid ${isOpen ? "fa-chevron-up" : "fa-chevron-down"} text-xs text-brand-text-light`}></i>
                </button>
                {isOpen && (
                  <p className="text-xs sm:text-sm text-brand-text-light leading-relaxed mt-2 pl-1 animate-fade-in">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
