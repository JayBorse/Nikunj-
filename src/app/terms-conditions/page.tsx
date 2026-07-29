import React from "react";
import Link from "next/link";

export default function TermsConditionsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 font-sans min-h-[60vh]">
      <div className="text-center mb-12">
        <span className="text-xs font-bold text-[#385623] uppercase tracking-widest block mb-2">Legal</span>
        <h1 className="font-serif text-4xl text-gray-900 mb-4">Terms &amp; Conditions</h1>
        <div className="flex items-center justify-center gap-2 text-[#c9a25b]">
          <div className="h-[1px] w-12 bg-[#c9a25b]"></div>
          <i className="fa-solid fa-gavel"></i>
          <div className="h-[1px] w-12 bg-[#c9a25b]"></div>
        </div>
      </div>

      <div className="bg-white border border-[#e8e0d5] rounded-2xl p-6 sm:p-10 shadow-xs space-y-6 text-sm text-gray-600 leading-relaxed">
        <section>
          <h2 className="font-serif text-xl text-gray-900 mb-3 font-semibold">1. Use of Website</h2>
          <p>
            Welcome to Nikunj. By accessing this platform, ordering shringar dresses, or setting up measurements profiles, you agree to comply with our terms of use. The platform is designed solely to facilitate handcrafted deity shringar purchases.
          </p>
        </section>

        <section className="border-t border-gray-100 pt-6">
          <h2 className="font-serif text-xl text-gray-900 mb-3 font-semibold">2. Handcrafted Variations</h2>
          <p>
            Please note that our products are stitched, sequinned, and detailed individually by homemaker artisans. Slight variations in embroidery patterns, sequin shades, or stone count are natural indicators of authentic manual handcrafting. They should not be misconstrued as design defects.
          </p>
        </section>

        <section className="border-t border-gray-100 pt-6">
          <h2 className="font-serif text-xl text-gray-900 mb-3 font-semibold">3. Sizing Liability</h2>
          <p>
            While we supply size charts and automatic size recommendations based on saved deity profiles, the ultimate responsibility for selecting standard clothing sizes rests on the buyer. We are happy to exchange standard outfits, but custom-tailored dresses remain ineligible for standard returns.
          </p>
        </section>
      </div>
    </div>
  );
}
