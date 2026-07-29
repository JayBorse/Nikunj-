"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function AboutUsPage() {
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactForm({ name: "", email: "", subject: "", message: "" });
      setContactSubmitted(false);
      alert("Dhanyawad! We have received your query. We will respond within 24 hours.");
    }, 1000);
  };

  const artisans = [
    {
      name: "Smt. Shashi Devi",
      role: "Master Artisan (Vrindavan Embroidery)",
      quote: "Sewing dresses for Bal Gopal Ji fills my home with a divine presence. Nikunj has given me both financial independence and spiritual joy.",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200&h=200",
    },
    {
      name: "Smt. Rekha Sharma",
      role: "Crochet & Knitting Expert (Mathura)",
      quote: "Stitching these tiny flutes and crowns requires a lot of patience. Doing it with other mothers in the village makes it a joyful community effort.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200&h=200",
    },
    {
      name: "Smt. Pushpa Aggarwal",
      role: "Velvet Dress Specialist (Ghaziabad)",
      quote: "Using my free hours to earn from home helped me fund my daughter's graduation. I feel proud every time a devotee chooses our handcrafted designs.",
      image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=200&h=200",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Page Title */}
      <div className="text-center mb-16">
        <h1 className="font-serif text-4xl text-brand-text mb-2">Our Story</h1>
        <p className="text-brand-text-light text-sm italic font-serif">
          Handcrafted with Devotion, Empowering with Care.
        </p>
      </div>

      {/* Brand Concept & Mission */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <h2 className="font-serif text-3xl text-brand-text mb-4">
            Bringing Devotion to Life
          </h2>
          <p className="text-brand-text-light text-sm leading-relaxed mb-4">
            Nikunj was established with a singular, heartfelt vision: to adorn the beloved deity, Laddu Gopal Ji, with attires crafted with absolute devotion and cleanliness. We believe that dressing our deities is a personal form of meditation and worship.
          </p>
          <p className="text-brand-text-light text-sm leading-relaxed mb-6">
            Every dress, mukut, and flute listed on our store is not just a commodity; it is a labor of love. We carefully source fabrics, laces, and accessories, ensuring they are crafted in clean, prayerful home environments that honor the sanctity of your home temples.
          </p>
          <div className="flex gap-4">
            <Link
              href="/shop"
              className="bg-brand-green hover:bg-brand-green-hover text-white text-xs font-semibold py-2.5 px-6 rounded-md shadow-sm transition-colors"
            >
              Browse Collection
            </Link>
            <Link
              href="/custom-order"
              className="bg-white hover:bg-brand-bg text-brand-text border border-brand-border text-xs font-semibold py-2.5 px-6 rounded-md shadow-sm transition-colors"
            >
              Order Custom Fit
            </Link>
          </div>
        </div>
        <div className="relative h-80 rounded-xl overflow-hidden shadow-md">
          <img
            alt="Handcrafting process"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2Cp0JWYcsrMrfnbHqIRBGXF2c0fQ3ABekuo_LhKjciKYma1oBokDdo7XlUlVOH7uXf4dmQOlRR3ORVxwnDX50_R7WsTOh2e8BVkIMJBczvd6CG5kGpS1HgTXzbEjGI3o3tCYZ_sXazpXPJqsqh5Lk9vnWhr-g0l5WEQK3nhX1G5V_HPFiQtaxZpRGcQZGLNaaVOY5u-XLy_aej0ixla4JkC3ETl6onugbyG9Q7dhB0ykZ3swt7tj3QA"
          />
        </div>
      </div>

      {/* Empowerment focus banner */}
      <div className="bg-brand-card rounded-2xl p-8 sm:p-12 border border-brand-border shadow-sm mb-20 text-center max-w-4xl mx-auto">
        <span className="text-xs font-bold text-brand-green uppercase tracking-widest block mb-2">Our Core Value</span>
        <h2 className="font-serif text-3xl text-brand-text mb-4">Empowering Homemakers</h2>
        <p className="text-brand-text-light text-sm leading-relaxed max-w-2xl mx-auto">
          Over 90% of our products are stitched, knitted, and decorated by suburban and rural women who cannot leave their homes due to domestic responsibilities. By training them and providing raw materials directly to their doorsteps, Nikunj provides them with sustainable, proud livelihoods. Your purchases directly support a mother, a sister, and a home.
        </p>
      </div>

      {/* Meet the Artisans */}
      <section className="mb-20">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl text-brand-text mb-2">Meet the Hands Behind the Stitches</h2>
          <p className="text-brand-text-light text-sm italic font-serif">
            A few of the 50+ talented craftswomen in our community
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {artisans.map((artisan, index) => (
            <div key={index} className="bg-white border border-brand-border rounded-xl p-6 shadow-sm flex flex-col items-center text-center">
              <img
                src={artisan.image}
                alt={artisan.name}
                className="w-20 h-20 rounded-full object-cover mb-4 border-2 border-brand-green/30"
              />
              <h4 className="font-serif text-lg font-semibold text-brand-text mb-1">{artisan.name}</h4>
              <span className="text-xs text-brand-green font-medium mb-4">{artisan.role}</span>
              <p className="text-xs text-brand-text-light italic leading-relaxed">
                &ldquo;{artisan.quote}&rdquo;
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Contact Info */}
        <div className="lg:col-span-1 space-y-6 bg-brand-card/40 border border-brand-border rounded-xl p-6 shadow-sm">
          <h3 className="font-serif text-xl text-brand-text mb-4">Contact Info</h3>
          <ul className="space-y-4 text-sm text-brand-text-light">
            <li className="flex items-start">
              <i className="fa-solid fa-phone mt-1 mr-3 text-brand-green text-base"></i>
              <div>
                <strong className="block text-brand-text text-xs uppercase font-semibold">Phone</strong>
                <span>+91 12345 67890 (9 AM - 6 PM)</span>
              </div>
            </li>
            <li className="flex items-start">
              <i className="fa-regular fa-envelope mt-1 mr-3 text-brand-green text-base"></i>
              <div>
                <strong className="block text-brand-text text-xs uppercase font-semibold">Email</strong>
                <span>support@nikunj.com</span>
              </div>
            </li>
            <li className="flex items-start">
              <i className="fa-solid fa-location-dot mt-1 mr-3 text-brand-green text-base"></i>
              <div>
                <strong className="block text-brand-text text-xs uppercase font-semibold">Workshop Address</strong>
                <span>Ghaziabad, Uttar Pradesh, India - 201001</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 bg-white border border-brand-border rounded-xl p-6 sm:p-8 shadow-sm">
          <h3 className="font-serif text-xl text-brand-text mb-2">Send Us a Message</h3>
          <p className="text-brand-text-light text-xs mb-6">
            For wholesale orders, special size requests, or general queries, write to us.
          </p>

          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-xs text-brand-text-light mb-1 block">Your Name *</span>
                <input
                  type="text"
                  required
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  placeholder="e.g. Radhika"
                  className="w-full border border-brand-border rounded p-2 text-sm focus:outline-none focus:border-brand-green"
                />
              </div>
              <div>
                <span className="text-xs text-brand-text-light mb-1 block">Your Email *</span>
                <input
                  type="email"
                  required
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  placeholder="e.g. name@domain.com"
                  className="w-full border border-brand-border rounded p-2 text-sm focus:outline-none focus:border-brand-green"
                />
              </div>
            </div>
            <div>
              <span className="text-xs text-brand-text-light mb-1 block">Subject *</span>
              <input
                type="text"
                required
                value={contactForm.subject}
                onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                placeholder="e.g. Bulk orders for temple"
                className="w-full border border-brand-border rounded p-2 text-sm focus:outline-none focus:border-brand-green"
              />
            </div>
            <div>
              <span className="text-xs text-brand-text-light mb-1 block">Message *</span>
              <textarea
                required
                rows={4}
                value={contactForm.message}
                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                placeholder="Write your message here..."
                className="w-full border border-brand-border rounded p-2 text-sm focus:outline-none focus:border-brand-green resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={contactSubmitted}
              className="bg-brand-green hover:bg-brand-green-hover text-white text-xs font-semibold py-2.5 px-6 rounded transition-colors shadow-sm focus:outline-none"
            >
              {contactSubmitted ? "Submitting..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
