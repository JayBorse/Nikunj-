"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function BecomeArtisanPage() {
  // Form States
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    whatsapp: "",
    email: "",
    city: "",
    portfolioName: "",
  });

  const [skills, setSkills] = useState<string[]>(["Poshak (Dresses)"]);
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
    if (!formData.name || !formData.city || !formData.phone) {
      alert("Please fill in the required fields (Name, Residence, WhatsApp/Phone).");
      return;
    }
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
      <div className="max-w-3xl mx-auto px-4 py-16 text-center font-sans">
        <div className="bg-white border border-[#f5ead5] rounded-3xl p-8 sm:p-12 shadow-lg">
          <i className="fa-solid fa-face-smile-beam text-[#286821] text-6xl mb-6 animate-bounce"></i>
          <h1 className="font-serif text-3xl text-gray-900 mb-4">Application Submitted Successfully!</h1>
          <p className="text-gray-600 text-sm max-w-md mx-auto mb-8 leading-relaxed">
            Dhanyawad! We have received your application to join the Nikunj Artisan family. Our team will review your credentials and contact you on WhatsApp within 3 working days.
          </p>

          <div className="bg-[#fdfaf6] border border-[#f5ead5] rounded-2xl p-5 max-w-sm mx-auto mb-8 text-left text-xs space-y-2.5">
            <div><strong>Applicant Name:</strong> {formData.name}</div>
            <div><strong>WhatsApp Number:</strong> {formData.phone}</div>
            <div><strong>Location:</strong> {formData.city}</div>
            <div><strong>Skills Applied:</strong> {skills.join(", ")}</div>
            <div><strong>Current Stage:</strong> <span className="bg-green-100 text-[#286821] px-1.5 py-0.5 rounded font-semibold">Profile Review</span></div>
          </div>

          <Link
            href="/"
            className="bg-[#286821] hover:bg-green-800 text-white text-xs font-semibold py-3 px-8 rounded-full shadow-md transition-colors cursor-pointer"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative overflow-hidden font-sans">
      
      {/* Background floral decorations - Top Right */}
      <div className="absolute top-0 right-0 -mr-20 -mt-10 opacity-30 pointer-events-none z-0 hidden lg:block">
        <img
          alt=""
          className="w-64 h-auto object-cover transform rotate-45"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwQLFyOisTCtvpT5dUjkdDxDXv5T-AtXrdAfLvIgE5LgYcKXFlERJ2XnL4bNZQRtRI8hYv1clyu2pitT2B8Phs-FNw2Ob6O2NenYAwRr5fPNVOOq0LjXIZguq3ZvJ6WMJNCNsc1rTbBd-STmvadC43VgqO33gbowmC_W33wfrMJRl63COCsPSJ-TEqKDqox5LlNLiuoWzE7qHjUz_Xyl6PyWOXmfXr156IftzogbHFi79pF_EUQU_1qA"
        />
      </div>

      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center justify-between mb-24 relative z-10 gap-10">
        
        {/* Text Content */}
        <div className="lg:w-1/2 pr-0 lg:pr-12">
          <h1 className="text-4xl lg:text-5xl font-serif text-gray-900 leading-tight mb-4">
            Become a <br />
            <span className="text-[#286821] flex items-center gap-2">
              Nikunj Artisan
              <svg className="w-8 h-8 text-[#e59572]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M12 4c-3-2-6-2-8 0s-2 6 0 8 8 10 8 10 8-10 8-10 0-6-2-8-8 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                <path d="M12 12c-1.5-1.5-3-1.5-4 0s-1 3 0 4 4 5 4 5 4-5 5-5 5 1-3 0-4-4 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
              </svg>
            </span>
          </h1>
          <p className="text-gray-600 text-base lg:text-lg mb-10 max-w-md leading-relaxed">
            Join hundreds of talented artisans across India who craft beautiful attire for Laddu Gopal Ji with love, care, and devotion.
          </p>
          
          {/* Value Props */}
          <div className="flex space-x-6">
            <div className="flex flex-col items-center text-center w-24">
              <div className="w-16 h-16 rounded-full bg-[#fdf3ec] flex items-center justify-center mb-3 text-[#e59572] border border-[#f5d0be]">
                <i className="fa-regular fa-heart text-2xl"></i>
              </div>
              <span className="text-xs font-semibold text-gray-800 leading-relaxed">Respect &amp;<br />Recognition</span>
            </div>
            <div className="flex flex-col items-center text-center w-24">
              <div className="w-16 h-16 rounded-full bg-[#f1f8ec] flex items-center justify-center mb-3 text-[#286821] border border-[#d0e6c6]">
                <i className="fa-solid fa-indian-rupee-sign text-2xl"></i>
              </div>
              <span className="text-xs font-semibold text-gray-800 leading-relaxed">Fair &amp; Timely<br />Earnings</span>
            </div>
            <div className="flex flex-col items-center text-center w-24">
              <div className="w-16 h-16 rounded-full bg-[#f0f9ec] flex items-center justify-center mb-3 text-[#286821] border border-[#d0e6c6]">
                <i className="fa-solid fa-users text-2xl"></i>
              </div>
              <span className="text-xs font-semibold text-gray-800 leading-relaxed">Supportive<br />Community</span>
            </div>
          </div>
        </div>

        {/* Image Content */}
        <div className="lg:w-1/2 relative w-full max-w-md lg:max-w-none mx-auto">
          <div className="rounded-tl-[80px] rounded-br-[80px] rounded-tr-3xl rounded-bl-3xl overflow-hidden shadow-xl border-4 border-white relative z-10">
            <img
              alt="Artisan crafting"
              className="w-full h-auto object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtZzU7dYHPN6tI3JSMq6e71BDXeHzkc9MoyOzCMJQB7WHoN_Ya1tOk5vwmVRt6JdJnasqdUYGtgo8zbxBrghmTYap0rgVMife3wG9qGVSDCt2DZy6QpZhdmb284a7undOkH3Y7eSNvA3ATmDtnF6qd6bLlWItv1F7Ft8qC3PApXNaMRdWMPW5SeaP0MYwTtDA0Wj5jIQ1HkguqDIWn7M_pOz0bDlViSZc53vtWAqGp_UomP2EY2uGTjQ"
            />
          </div>
          {/* Testimonial Card Overlay */}
          <div className="absolute -bottom-6 -left-4 bg-[#fdfaf6] p-5 rounded-2xl shadow-lg border border-gray-100 max-w-[280px] z-20">
            <div className="text-[#e59572] text-3xl font-serif leading-none mb-1">“</div>
            <p className="text-xs text-gray-700 italic mb-3">Nikunj gave me the platform to turn my passion into purpose.</p>
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-gray-900">- Sunita Devi, Artisan</span>
              <div className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center text-red-400">
                <i className="fa-solid fa-heart text-[10px]"></i>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Application Form Section */}
      <section className="max-w-4xl mx-auto relative z-10 mb-20">
        
        {/* Lotus Icon Top Center of Form */}
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 z-20">
          <svg className="w-8 h-8 text-[#e59572]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M12 4c-3-2-6-2-8 0s-2 6 0 8 8 10 8 10 8-10 8-10 0-6-2-8-8 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>

        <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-8 pt-12 flex flex-col md:flex-row border border-[#faf9f6]">
          
          {/* Left Sidebar - Trust Indicator */}
          <div className="md:w-1/3 mb-8 md:mb-0 md:pr-8 border-b md:border-b-0 md:border-r border-gray-100 pb-6 md:pb-0">
            <div className="bg-[#fdfaf5] border border-[#f5ead5] rounded-2xl p-6 h-full flex flex-col items-center text-center relative overflow-hidden min-h-[300px]">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xs border border-gray-100 mb-4 text-[#286821]">
                <i className="fa-solid fa-shield-halved text-lg"></i>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-sm leading-snug">Your information<br />is safe with us</h3>
              <p className="text-[11px] text-gray-500 mb-8 leading-relaxed">We value your trust and keep your data fully private and secure.</p>
              
              {/* Peacock Feather Illustration Placeholder */}
              <div className="mt-auto absolute bottom-0 left-0 right-0 flex justify-center pb-2 opacity-90">
                <img
                  alt="Peacock feather decoration"
                  className="h-36 w-auto object-contain"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuALg0kqSGwJF6JGgNPoSFB4RSf3dSaC7Mn_Jpw3PN1eKQNV0XTmfWkPll7dnVbrqHDQ5q28enoNadBVU9X0hKKeSZPU7dUnR-fT5-EtGQ2K9ZTSxW0s2uv--SL7S8XDBUJPyL5xZdeYKO63ZdYDKkPgmwB2a27DCsc8ng5pklMRZYJvS04zRrtDkDb3BwNp4cCsvm5tTiJn-aiNMZ20hyO6mWAorrgGr3w00IRpfrG5yBt-7Gq6TKMdBg"
                />
              </div>
            </div>
          </div>

          {/* Right Side - Form Fields */}
          <div className="md:w-2/3 md:pl-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Name Field */}
              <div className="flex items-start space-x-4">
                <div className="mt-1 w-10 h-10 rounded-full bg-[#f4f7f4] flex-shrink-0 flex items-center justify-center text-[#286821]">
                  <i className="fa-regular fa-user"></i>
                </div>
                <div className="flex-grow">
                  <label className="block text-sm font-semibold text-gray-900" htmlFor="full_name">Your Name *</label>
                  <p className="text-xs text-gray-500 mb-2">Let us know what we can call you.</p>
                  <input
                    type="text"
                    required
                    id="full_name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="block w-full rounded-lg border-gray-300 shadow-xs focus:border-[#286821] focus:ring-[#286821] sm:text-sm p-3 border placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Residence Field */}
              <div className="flex items-start space-x-4">
                <div className="mt-1 w-10 h-10 rounded-full bg-[#f4f7f4] flex-shrink-0 flex items-center justify-center text-[#286821]">
                  <i className="fa-solid fa-location-dot"></i>
                </div>
                <div className="flex-grow">
                  <label className="block text-sm font-semibold text-gray-900" htmlFor="residence">Area of Residence *</label>
                  <p className="text-xs text-gray-500 mb-2">Where are you based?</p>
                  <input
                    type="text"
                    required
                    id="residence"
                    placeholder="Enter your city / village / state"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="block w-full rounded-lg border-gray-300 shadow-xs focus:border-[#286821] focus:ring-[#286821] sm:text-sm p-3 border placeholder-gray-400"
                  />
                </div>
              </div>

              {/* Skills Field */}
              <div className="flex items-start space-x-4">
                <div className="mt-1 w-10 h-10 rounded-full bg-[#f4f7f4] flex-shrink-0 flex items-center justify-center text-[#286821]">
                  <i className="fa-solid fa-scissors"></i>
                </div>
                <div className="flex-grow">
                  <label className="block text-sm font-semibold text-gray-900">What Can You Build? *</label>
                  <p className="text-xs text-gray-500 mb-3">Select the items you are skilled in making.</p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { name: "Poshak (Dresses)", value: "Poshak (Dresses)", icon: "fa-solid fa-shirt text-[#286821]" },
                      { name: "Pagdi", value: "Pagdi", icon: "fa-solid fa-crown text-[#e59572]" },
                      { name: "Shawl", value: "Shawl", icon: "fa-solid fa-border-all text-[#e59572]" },
                      { name: "Embroidery", value: "Embroidery", icon: "fa-solid fa-wand-magic-sparkles text-[#e59572]" },
                      { name: "Other", value: "Other", icon: "fa-solid fa-plus text-gray-400" },
                    ].map((item) => {
                      const isSelected = skills.includes(item.value);
                      return (
                        <button
                          key={item.value}
                          type="button"
                          onClick={() => handleSkillToggle(item.value)}
                          className={`flex items-center space-x-2 border px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                            isSelected
                              ? "border-[#286821] bg-[#f1f8ec] text-[#286821]"
                              : "border-gray-200 bg-white text-gray-700 hover:border-[#286821]"
                          }`}
                        >
                          <i className={item.icon}></i>
                          <span>{item.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Contact Field */}
              <div className="flex items-start space-x-4">
                <div className="mt-1 w-10 h-10 rounded-full bg-[#f4f7f4] flex-shrink-0 flex items-center justify-center text-[#286821]">
                  <i className="fa-solid fa-phone"></i>
                </div>
                <div className="flex-grow">
                  <label className="block text-sm font-semibold text-gray-900">Contact Information *</label>
                  <p className="text-xs text-gray-500 mb-3">How can we reach you?</p>
                  
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row gap-3">
                      {/* WhatsApp / Mobile Phone input */}
                      <div className="relative flex items-center flex-grow">
                        <span className="absolute left-3 text-xs text-gray-500 font-semibold border-r border-gray-200 pr-2 pointer-events-none">
                          +91
                        </span>
                        <input
                          type="tel"
                          required
                          placeholder="WhatsApp number"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="block w-full rounded-lg border-gray-300 shadow-xs focus:border-[#286821] focus:ring-[#286821] sm:text-sm p-3 pl-[55px] border placeholder-gray-400"
                        />
                      </div>
                      
                      {/* Secondary Phone (Optional) */}
                      <div className="relative flex items-center flex-grow">
                        <div className="absolute left-3 text-green-500 text-xs font-semibold pointer-events-none">
                          <i className="fa-brands fa-whatsapp text-sm"></i>
                        </div>
                        <input
                          type="tel"
                          placeholder="Alt WhatsApp (optional)"
                          value={formData.whatsapp}
                          onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                          className="block w-full rounded-lg border-gray-300 shadow-xs focus:border-[#286821] focus:ring-[#286821] sm:text-sm p-3 pl-8 border placeholder-gray-400"
                        />
                      </div>
                    </div>

                    {/* Email address */}
                    <div className="relative flex items-center">
                      <div className="absolute left-3 text-gray-400 pointer-events-none">
                        <i className="fa-regular fa-envelope"></i>
                      </div>
                      <input
                        type="email"
                        placeholder="Email address (optional)"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="block w-full rounded-lg border-gray-300 shadow-xs focus:border-[#286821] focus:ring-[#286821] sm:text-sm p-3 pl-9 border placeholder-gray-400"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Upload Section */}
              <div className="flex items-start space-x-4">
                <div className="mt-1 w-10 h-10 rounded-full bg-[#f4f7f4] flex-shrink-0 flex items-center justify-center text-[#286821]">
                  <i className="fa-regular fa-image"></i>
                </div>
                <div className="flex-grow">
                  <label className="block text-sm font-semibold text-gray-900">
                    Add Photos of Your Work <span className="font-normal text-gray-500">(Optional)</span>
                  </label>
                  <p className="text-xs text-gray-500 mb-3">Share pictures of your beautiful creations with us.</p>
                  
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    {/* Choose files button */}
                    <label className="w-full sm:w-1/2 border-2 border-dashed border-gray-200 bg-[#fafafa] rounded-xl flex flex-col items-center justify-center p-4 cursor-pointer hover:bg-gray-50 transition-colors h-24 text-center">
                      <i className="fa-solid fa-cloud-arrow-up text-gray-400 text-lg mb-1"></i>
                      <span className="text-xs font-semibold text-gray-700">Upload up to 5 photos</span>
                      <span className="text-[9px] text-gray-400 mt-0.5">PNG, JPG up to 5MB each</span>
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
                    
                    {/* Thumbnail Placeholders */}
                    <div className="flex space-x-2 w-full sm:w-1/2 overflow-x-auto pb-1 items-center">
                      <div className="h-16 w-16 flex-shrink-0 rounded-lg overflow-hidden border border-gray-200 bg-white">
                        <img
                          alt="Sample work 1"
                          className="w-full h-full object-cover"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDVvlhMpkKRgr1D9yQmKhGXeIIVf2-LaS0D4KFUyZNUqcdaU4izQElCm0PLGr_N6-ZroUZRlb1l2x3pqghtSx6Ww4x5SmydVglTZ3g1qzAig8KLMq41fjAUvqG8jf5Y1zUt0d-SS0_Sh9SOgSi2EvkCibDnD9mg9Ry41U0kdM4bCBdV5uWJGM_99ELKdTERvobn3J6N6xMXCzUU5yrSWaXlYAcn8F-VszMBncYbNu92XHEpuzgX9fQy8Q"
                        />
                      </div>
                      <div className="h-16 w-16 flex-shrink-0 rounded-lg overflow-hidden border border-gray-200 bg-white">
                        <img
                          alt="Sample work 2"
                          className="w-full h-full object-cover"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCglg1WNivjdkwBOBRxVWvCyPwj5pvqywlAEvJO26Qo_BkiddOhLikLRChJoXaiVcfmc1qtiPrQpTgCuFTmwEQZo1WPhF8iUOyDRBAXM03Suk0HW6H5fMivKftk6PnOfib-VCSe41J0zmrraE10QFYcN2WpjvG7kdIiECB78IF8XI6mEcCHEuAytnW5mcrYIn72m0uzWQptvN2Gn5yVCrN4br7MLibCQS2qa2dmTbQ2-FAoNnP4fXjesg"
                        />
                      </div>
                      
                      {formData.portfolioName ? (
                        <div className="h-16 w-16 flex-shrink-0 rounded-lg border border-[#286821] bg-green-50 flex items-center justify-center text-[#286821] p-1 text-[9px] font-semibold truncate text-center">
                          {formData.portfolioName}
                        </div>
                      ) : (
                        <div className="h-16 w-16 flex-shrink-0 rounded-lg border border-dashed border-gray-200 flex items-center justify-center bg-gray-50 text-gray-400">
                          <i className="fa-solid fa-plus text-xs"></i>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-gray-100">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-xl shadow-md text-sm font-semibold text-white bg-[#286821] hover:bg-green-800 transition-all focus:outline-none cursor-pointer gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <i className="fa-solid fa-spinner fa-spin"></i> Submitting...
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-hands-praying"></i> Submit Application
                    </>
                  )}
                </button>
                <div className="mt-4 flex items-center justify-center space-x-2 text-[10px] text-gray-500">
                  <i className="fa-solid fa-lock text-gray-400"></i>
                  <span>By submitting, you agree to our <a className="text-[#286821] hover:underline" href="#">Privacy Policy</a> and <a className="text-[#286821] hover:underline" href="#">Terms of Use</a>.</span>
                </div>
              </div>

            </form>
          </div>

        </div>
      </section>

      {/* FAQs Section */}
      <section className="max-w-4xl mx-auto mb-16 bg-white border border-[#e5dfd3] rounded-3xl p-6 sm:p-8 shadow-xs">
        <h2 className="font-serif text-2xl text-gray-900 mb-6 text-center">Frequently Asked Questions</h2>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div key={index} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center text-left py-2 focus:outline-none text-gray-800 hover:text-[#286821] transition-colors"
                >
                  <span className="text-sm sm:text-base font-semibold">{faq.q}</span>
                  <i className={`fa-solid ${isOpen ? "fa-chevron-up text-[#286821]" : "fa-chevron-down text-gray-400"} text-xs`}></i>
                </button>
                {isOpen && (
                  <p className="text-xs sm:text-sm text-gray-500 leading-relaxed mt-2 pl-1 animate-fade-in">
                    {faq.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Support Banner Info */}
      <section className="max-w-4xl mx-auto bg-[#fdf8f4] border border-[#f5ead5] rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between mb-10 relative z-10 gap-6">
        <div className="mb-4 md:mb-0 text-center md:text-left pr-0 md:pr-8 md:border-r border-gray-200 flex-shrink-0">
          <h4 className="text-base font-bold text-gray-900 font-serif">Have Questions?</h4>
          <p className="text-xs text-gray-500 mb-3">We are here to assist you in joining the parivaar.</p>
          <a
            href="https://wa.me/919876543210?text=Hare%20Krishna!%20I%20have%20questions%20about%20becoming%20a%20Nikunj%20Artisan."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-full text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            Contact Support
            <i className="fa-solid fa-arrow-right ml-2 text-[10px]"></i>
          </a>
        </div>
        
        <div className="flex flex-col sm:flex-row flex-wrap space-y-4 sm:space-y-0 sm:space-x-8 w-full md:w-auto md:pl-8 justify-around gap-y-4 text-xs">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-green-500 border border-gray-100 shadow-xs">
              <i className="fa-brands fa-whatsapp text-lg"></i>
            </div>
            <div>
              <span className="block text-[10px] text-gray-500">WhatsApp Chat</span>
              <span className="block font-semibold text-gray-900">+91 98765 43210</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-600 border border-gray-100 shadow-xs">
              <i className="fa-regular fa-envelope text-base"></i>
            </div>
            <div>
              <span className="block text-[10px] text-gray-500">Email Address</span>
              <span className="block font-semibold text-gray-900">artisan@nikunj.com</span>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-600 border border-gray-100 shadow-xs">
              <i className="fa-regular fa-clock text-base"></i>
            </div>
            <div>
              <span className="block text-[10px] text-gray-500">Working Timings</span>
              <span className="block font-semibold text-gray-900">Mon - Sat, 10 AM - 6 PM</span>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
