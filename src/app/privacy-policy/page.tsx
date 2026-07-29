import React from "react";
import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 font-sans min-h-[60vh]">
      <div className="text-center mb-12">
        <span className="text-xs font-bold text-[#385623] uppercase tracking-widest block mb-2">Legal</span>
        <h1 className="font-serif text-4xl text-gray-900 mb-4">Privacy Policy</h1>
        <div className="flex items-center justify-center gap-2 text-[#c9a25b]">
          <div className="h-[1px] w-12 bg-[#c9a25b]"></div>
          <i className="fa-solid fa-shield-halved"></i>
          <div className="h-[1px] w-12 bg-[#c9a25b]"></div>
        </div>
      </div>

      <div className="bg-white border border-[#e8e0d5] rounded-2xl p-6 sm:p-10 shadow-xs space-y-6 text-sm text-gray-600 leading-relaxed">
        <section>
          <h2 className="font-serif text-xl text-gray-900 mb-3 font-semibold">1. Information We Collect</h2>
          <p>
            We collect information you provide directly when setting up deity profiles, placing custom shringar orders, or registering as an artisan. This includes your name, shipping address, phone number (WhatsApp coordinate for design updates), and payment selections.
          </p>
        </section>

        <section className="border-t border-gray-100 pt-6">
          <h2 className="font-serif text-xl text-gray-900 mb-3 font-semibold">2. How We Use Information</h2>
          <p>
            Your address coordinates are utilized solely for logistics dispatch. WhatsApp phone contacts are used for confirming custom embroidery design preferences or coordinating dimensions. We do not sell or rent user contacts to third-party databases.
          </p>
        </section>

        <section className="border-t border-gray-100 pt-6">
          <h2 className="font-serif text-xl text-gray-900 mb-3 font-semibold">3. Data Security</h2>
          <p>
            All payment checkouts and credit cards parameters are protected via secure socket layers (SSL) and processed by trusted gateway partners. Profile statistics and deity profiles are stored securely in browser caches and database instances.
          </p>
        </section>
      </div>
    </div>
  );
}
