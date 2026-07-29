import React from "react";
import Link from "next/link";

export default function ReturnPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 font-sans min-h-[60vh]">
      <div className="text-center mb-12">
        <span className="text-xs font-bold text-[#385623] uppercase tracking-widest block mb-2">Policies</span>
        <h1 className="font-serif text-4xl text-gray-900 mb-4">Return Policy</h1>
        <div className="flex items-center justify-center gap-2 text-[#c9a25b]">
          <div className="h-[1px] w-12 bg-[#c9a25b]"></div>
          <i className="fa-solid fa-box-open"></i>
          <div className="h-[1px] w-12 bg-[#c9a25b]"></div>
        </div>
      </div>

      <div className="bg-white border border-[#e8e0d5] rounded-2xl p-6 sm:p-10 shadow-xs space-y-6 text-sm text-gray-600 leading-relaxed">
        <section>
          <h2 className="font-serif text-xl text-gray-900 mb-3 font-semibold">1. Return Window</h2>
          <p>
            We offer a <strong>7-day replacement and return guarantee</strong> on standard shringar catalog orders. If the dress does not fit your deity, or you receive a damaged/incorrect design, you can request a return within 7 days of receiving the package.
          </p>
        </section>

        <section className="border-t border-gray-100 pt-6">
          <h2 className="font-serif text-xl text-gray-900 mb-3 font-semibold">2. Custom &amp; Tailored Outfits</h2>
          <p>
            Please note that <strong>custom-tailored dresses are non-returnable</strong> since they are crafted to the specific measurements of your Kanha. We request you to measure heights and chest sizes accurately when ordering. If there are sizing discrepancies due to our error, we will adjust it free of cost.
          </p>
        </section>

        <section className="border-t border-gray-100 pt-6">
          <h2 className="font-serif text-xl text-gray-900 mb-3 font-semibold">3. Conditions for Returns</h2>
          <p>
            To honor the devotion of our homemaker artisans, returned items must be:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Unused, clean, and in their original packaging conditions.</li>
            <li>Free of any marks, puja oils, or chandan stains.</li>
            <li>Accompanied by the original reference order invoice ID.</li>
          </ul>
        </section>

        <section className="border-t border-gray-100 pt-6">
          <h2 className="font-serif text-xl text-gray-900 mb-3 font-semibold">4. How to Initiate a Return</h2>
          <p>
            Please log a request via email at <strong>returns@nikunj.com</strong> or WhatsApp customer care with your order ID and a picture of the item. We will arrange a free reverse pickup from your registered address where available.
          </p>
        </section>
      </div>
    </div>
  );
}
