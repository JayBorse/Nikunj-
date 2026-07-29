import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-brand-card pt-16 pb-8 border-t border-brand-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex flex-col items-start mb-4">
              <span className="font-serif text-2xl font-semibold tracking-tight text-brand-text flex items-center">
                Nikunj
                <i className="fa-solid fa-feather-pointed text-brand-green ml-1 text-lg"></i>
              </span>
              <span className="text-[9px] tracking-widest text-brand-text-light uppercase mt-1">
                Handcrafted with Devotion
              </span>
            </Link>
            <p className="text-brand-text-light text-xs leading-relaxed mb-6">
              At Nikunj, we bring devotion to life through handcrafted dresses and accessories for Laddu Gopal Ji, made with love by skilled homemakers.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-brand-text-light hover:text-pink-600 transition-colors" aria-label="Instagram">
                <i className="fa-brands fa-instagram text-lg"></i>
              </a>
              <a href="#" className="text-brand-text-light hover:text-blue-600 transition-colors" aria-label="Facebook">
                <i className="fa-brands fa-facebook text-lg"></i>
              </a>
              <a href="#" className="text-brand-text-light hover:text-red-600 transition-colors" aria-label="YouTube">
                <i className="fa-brands fa-youtube text-lg"></i>
              </a>
              <a href="#" className="text-brand-text-light hover:text-green-500 transition-colors" aria-label="WhatsApp">
                <i className="fa-brands fa-whatsapp text-lg"></i>
              </a>
            </div>
          </div>

          {/* Links Col 1 */}
          <div>
            <h4 className="font-serif text-lg text-brand-text mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-brand-text-light">
              <li>
                <Link href="/" className="hover:text-brand-green transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-brand-green transition-colors">
                  Shop All Collection
                </Link>
              </li>
              <li>
                <Link href="/custom-order" className="hover:text-brand-green transition-colors">
                  Custom Order
                </Link>
              </li>
              <li>
                <Link href="/become-artisan" className="hover:text-brand-green transition-colors">
                  Become an Artisan
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="hover:text-brand-green transition-colors">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="hover:text-brand-green transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Links Col 2 */}
          <div>
            <h4 className="font-serif text-lg text-brand-text mb-4">Customer Care</h4>
            <ul className="space-y-2 text-sm text-brand-text-light">
              <li>
                <Link href="/faqs" className="hover:text-brand-green transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/shipping-delivery" className="hover:text-brand-green transition-colors">
                  Shipping &amp; Delivery
                </Link>
              </li>
              <li>
                <Link href="/return-policy" className="hover:text-brand-green transition-colors">
                  Return Policy
                </Link>
              </li>
              <li>
                <Link href="/cancellation-policy" className="hover:text-brand-green transition-colors">
                  Cancellation Policy
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-brand-green transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-conditions" className="hover:text-brand-green transition-colors">
                  Terms &amp; Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Links Col 3 */}
          <div>
            <h4 className="font-serif text-lg text-brand-text mb-4">My Account</h4>
            <ul className="space-y-2 text-sm text-brand-text-light">
              <li>
                <Link href="/profile" className="hover:text-brand-green transition-colors">
                  Profile
                </Link>
              </li>
              <li>
                <Link href="/profile?tab=orders" className="hover:text-brand-green transition-colors">
                  My Orders
                </Link>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-brand-green transition-colors">
                  Wishlist
                </Link>
              </li>
              <li>
                <Link href="/profile?tab=measurements" className="hover:text-brand-green transition-colors">
                  Saved Measurements
                </Link>
              </li>
              <li>
                <Link href="/profile?tab=addresses" className="hover:text-brand-green transition-colors">
                  Addresses
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h4 className="font-serif text-lg text-brand-text mb-4">Contact Us</h4>
            <ul className="space-y-4 text-sm text-brand-text-light">
              <li className="flex items-start">
                <i className="fa-solid fa-phone mt-1 mr-3 text-brand-green"></i>
                <span>+91 12345 67890</span>
              </li>
              <li className="flex items-start">
                <i className="fa-regular fa-envelope mt-1 mr-3 text-brand-green"></i>
                <span>support@nikunj.com</span>
              </li>
              <li className="flex items-start">
                <i className="fa-solid fa-location-dot mt-1 mr-3 text-brand-green"></i>
                <span>
                  Ghaziabad, Uttar Pradesh
                  <br />
                  India - 201001
                </span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-brand-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-brand-text-light mb-4 md:mb-0">
            © {new Date().getFullYear()} Nikunj. All rights reserved.
          </p>
          <div className="text-brand-text/20">
            <i className="fa-solid fa-lotus text-2xl animate-pulse"></i>
          </div>
        </div>
      </div>
    </footer>
  );
}
