"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function FAQsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "How do I choose the correct size dress for my Laddu Gopal Ji?",
      a: "Measure the height of your deity from head to toe (excluding the crown). If your deity is healthy (broad shoulders), we recommend ordering one size larger. You can refer to our Ladoo Gopal Size Chart located on each product detail page, or save your deity profile on your account page for auto-fit recommendations!"
    },
    {
      q: "What is your shringar custom order process?",
      a: "Go to our 'Custom Order' page. Step 1 lets you choose the deity model and measurement height. Step 2 allows you to upload reference pictures of designs you love. Step 3 lets you pick fabrics (Silk, Velvet, Cotton, Organza) and accessories. Once submitted, our team reviews it and will contact you via WhatsApp to finalize details and pattern layouts."
    },
    {
      q: "How long does custom shringar tailoring take?",
      a: "Since every custom dress is carefully hand-embroidered by homemaker artisans under pure and clean home settings, custom shringar tailoring usually takes 7 to 10 working days for dispatch."
    },
    {
      q: "What materials do you use for your deity dresses?",
      a: "We only use premium, skin-safe fabrics such as raw silk, soft velvet, pure cotton, and designer laces. All metallic embroidery borders (zari), stone arrangements, and sequence highlights are securely stitched so they do not cause any damage or stains to the deity metals."
    },
    {
      q: "How can I track my shringar parcel?",
      a: "Once dispatched, you will receive a tracking ID. Enter it on our 'Track Order' page to view real-time shipping updates. You can also view active order progress directly inside your Customer Profile panel."
    },
    {
      q: "What payment options do you support?",
      a: "We support major Credit/Debit Cards, Net Banking, UPI Apps (Google Pay, PhonePe, Paytm), and Cash on Delivery (COD)."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 font-sans min-h-[60vh]">
      <div className="text-center mb-12">
        <span className="text-xs font-bold text-[#385623] uppercase tracking-widest block mb-2">Help Center</span>
        <h1 className="font-serif text-4xl text-gray-900 mb-4">Frequently Asked Questions</h1>
        <div className="flex items-center justify-center gap-2 text-[#c9a25b]">
          <div className="h-[1px] w-12 bg-[#c9a25b]"></div>
          <i className="fa-solid fa-feather"></i>
          <div className="h-[1px] w-12 bg-[#c9a25b]"></div>
        </div>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="bg-white border border-[#e8e0d5] rounded-xl overflow-hidden shadow-xs transition-shadow hover:shadow-sm"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full text-left p-5 flex justify-between items-center font-semibold text-gray-900 text-sm focus:outline-none cursor-pointer"
              >
                <span>{faq.q}</span>
                <i className={`fa-solid ${isOpen ? "fa-chevron-up text-[#385623]" : "fa-chevron-down text-gray-400"} text-xs shrink-0 ml-4 transition-transform`}></i>
              </button>
              {isOpen && (
                <div className="p-5 pt-0 text-xs text-gray-600 border-t border-gray-50 leading-relaxed animate-fade-in">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-12 bg-[#f5efe6] border border-[#e8e0d5]/60 rounded-2xl p-6 text-center text-xs">
        <p className="font-bold text-gray-900 mb-2">Have other queries regarding shringar dimensions or wholesale?</p>
        <p className="text-gray-500 mb-4">Feel free to connect directly with our artisan customer support desk.</p>
        <div className="flex justify-center gap-4">
          <Link
            href="/about-us"
            className="bg-[#385623] hover:bg-green-800 text-white font-semibold py-2.5 px-5 rounded-lg transition-colors text-[11px]"
          >
            Contact Support
          </Link>
          <a
            href="https://wa.me/919999999999?text=Hare%20Krishna!%20I%20have%20questions%20about%20Nikunj%20products."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white border border-[#e8e0d5] text-gray-700 hover:bg-gray-50 font-semibold py-2.5 px-5 rounded-lg transition-colors text-[11px] flex items-center gap-1.5"
          >
            <i className="fa-brands fa-whatsapp text-green-600"></i> WhatsApp Support
          </a>
        </div>
      </div>
    </div>
  );
}
