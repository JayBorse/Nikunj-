import React from "react";
import Link from "next/link";

export default function ShippingDeliveryPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 font-sans min-h-[60vh]">
      <div className="text-center mb-12">
        <span className="text-xs font-bold text-[#385623] uppercase tracking-widest block mb-2">Policies</span>
        <h1 className="font-serif text-4xl text-gray-900 mb-4">Shipping &amp; Delivery</h1>
        <div className="flex items-center justify-center gap-2 text-[#c9a25b]">
          <div className="h-[1px] w-12 bg-[#c9a25b]"></div>
          <i className="fa-solid fa-truck-fast"></i>
          <div className="h-[1px] w-12 bg-[#c9a25b]"></div>
        </div>
      </div>

      <div className="bg-white border border-[#e8e0d5] rounded-2xl p-6 sm:p-10 shadow-xs space-y-6 text-sm text-gray-600 leading-relaxed">
        <section>
          <h2 className="font-serif text-xl text-gray-900 mb-3 font-semibold">1. Standard Delivery Timelines</h2>
          <p>
            Since all standard products are stored at our central workshop, we dispatch catalog orders within <strong>24 to 48 hours</strong> of verification. Standard transit times across India are:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Metro Cities:</strong> 3 - 4 working days</li>
            <li><strong>Tier 2 &amp; 3 Cities:</strong> 4 - 6 working days</li>
            <li><strong>Special/Remote Regions:</strong> 6 - 8 working days</li>
          </ul>
        </section>

        <section className="border-t border-gray-100 pt-6">
          <h2 className="font-serif text-xl text-gray-900 mb-3 font-semibold">2. Custom Shringar Orders</h2>
          <p>
            Custom dress tailored by our homemaker artisans takes time to craft cleanly. Tailoring requests take <strong>7 to 10 working days</strong> to execute and package before they can be handed over to dispatch partners.
          </p>
        </section>

        <section className="border-t border-gray-100 pt-6">
          <h2 className="font-serif text-xl text-gray-900 mb-3 font-semibold">3. Shipping Fees &amp; Rates</h2>
          <p>
            We offer <strong>Free Delivery</strong> on all orders containing a total value above <strong>₹500</strong>. For orders under ₹500, a nominal shipping charge of <strong>₹60</strong> is calculated at checkout.
          </p>
        </section>

        <section className="border-t border-gray-100 pt-6">
          <h2 className="font-serif text-xl text-gray-900 mb-3 font-semibold">4. Packaging Devotion</h2>
          <p>
            Every shringar set is wrapped inside premium bubble layers, enclosed in separate clean boxes to avoid any crushing, bending, or damage to zari crowns, flutes, and dresses during transit.
          </p>
        </section>
      </div>

      <div className="mt-8 text-center text-xs text-gray-500">
        Need express delivery for an upcoming festival? Please contact us on WhatsApp directly.
      </div>
    </div>
  );
}
