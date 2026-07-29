import React from "react";
import Link from "next/link";

export default function CancellationPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 font-sans min-h-[60vh]">
      <div className="text-center mb-12">
        <span className="text-xs font-bold text-[#385623] uppercase tracking-widest block mb-2">Policies</span>
        <h1 className="font-serif text-4xl text-gray-900 mb-4">Cancellation Policy</h1>
        <div className="flex items-center justify-center gap-2 text-[#c9a25b]">
          <div className="h-[1px] w-12 bg-[#c9a25b]"></div>
          <i className="fa-solid fa-rectangle-xmark"></i>
          <div className="h-[1px] w-12 bg-[#c9a25b]"></div>
        </div>
      </div>

      <div className="bg-white border border-[#e8e0d5] rounded-2xl p-6 sm:p-10 shadow-xs space-y-6 text-sm text-gray-600 leading-relaxed">
        <section>
          <h2 className="font-serif text-xl text-gray-900 mb-3 font-semibold">1. Standard Order Cancellations</h2>
          <p>
            You can cancel standard items anytime before they are shipped. Generally, standard orders are processed and handed over to logistics partners within <strong>12 to 24 hours</strong>. If you cancel before dispatch, we will refund 100% of your order value to the original payment method.
          </p>
        </section>

        <section className="border-t border-gray-100 pt-6">
          <h2 className="font-serif text-xl text-gray-900 mb-3 font-semibold">2. Custom Shringar Cancellations</h2>
          <p>
            Because custom shringar outfits involve raw material purchases and specific design preparation by artisans, requests for cancellation on custom items are only accepted within <strong>24 hours</strong> of placement. Cancellations after 24 hours are subject to a nominal fee to compensate the homemaker's pre-stitching preparation time.
          </p>
        </section>

        <section className="border-t border-gray-100 pt-6">
          <h2 className="font-serif text-xl text-gray-900 mb-3 font-semibold">3. Shipped Orders</h2>
          <p>
            Once orders are dispatched from our central workshop, they cannot be cancelled. You can refuse delivery at your doorstep, or request a standard 7-day exchange return after delivery.
          </p>
        </section>

        <section className="border-t border-gray-100 pt-6">
          <h2 className="font-serif text-xl text-gray-900 mb-3 font-semibold">4. Refund Processing</h2>
          <p>
            Refunds on cancellations are processed within <strong>2 to 4 working days</strong>. The amount will be credited back into your source UPI account, bank, or card.
          </p>
        </section>
      </div>
    </div>
  );
}
