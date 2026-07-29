"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { categories, products } from "@/data/products";

export default function Header() {
  const pathname = usePathname();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = searchQuery
    ? products.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop", dropdown: true },
    { name: "Custom Order", href: "/custom-order" },
    { name: "Become an Artisan", href: "/become-artisan" },
    { name: "About Us", href: "/about-us" },
    { name: "Track Order", href: "/track-order" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-brand-bg/95 backdrop-blur-sm border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-brand-text hover:text-brand-green p-2 focus:outline-none"
            aria-label="Toggle Menu"
          >
            <i className={`fa-solid ${isMobileMenuOpen ? "fa-xmark" : "fa-bars"} text-xl`}></i>
          </button>

          {/* Logo */}
          <div className="flex-shrink-0 flex flex-col items-center justify-center">
            <Link href="/" className="flex flex-col items-center">
              <span className="font-serif text-3xl font-semibold tracking-tight text-brand-text flex items-center">
                Nikunj
                <i className="fa-solid fa-feather-pointed text-brand-green ml-1 text-xl"></i>
              </span>
              <span className="text-[10px] tracking-widest text-brand-text-light uppercase mt-1">
                Handcrafted with Devotion
              </span>
            </Link>
          </div>

          {/* Navigation for Desktop */}
          <nav className="hidden md:flex space-x-6 lg:space-x-8">
            {navLinks.map((link) => {
              if (link.dropdown) {
                return (
                  <div key={link.name} className="relative group">
                    <button className="text-brand-text hover:text-brand-green px-3 py-2 text-sm font-medium transition-colors flex items-center gap-1 focus:outline-none">
                      {link.name} <i className="fa-solid fa-chevron-down text-[10px]"></i>
                    </button>
                    {/* Hover Dropdown */}
                    <div className="absolute left-0 mt-0 w-48 bg-white border border-brand-border rounded-md shadow-lg opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 z-50 py-2">
                      <Link
                        href="/shop"
                        className="block px-4 py-2 text-xs font-semibold text-brand-text-light uppercase tracking-wider border-b border-brand-border/50 hover:bg-brand-card hover:text-brand-green"
                      >
                        All Categories
                      </Link>
                      {categories.map((cat) => (
                        <Link
                          key={cat.slug}
                          href={`/shop?category=${cat.slug}`}
                          className="block px-4 py-2 text-sm text-brand-text hover:bg-brand-card hover:text-brand-green transition-colors"
                        >
                          {cat.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              }

              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "text-brand-green border-b-2 border-brand-green"
                      : "text-brand-text hover:text-brand-green"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Utility Icons */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-brand-text hover:text-brand-green transition-colors focus:outline-none p-1"
              title="Search Products"
            >
              <i className="fa-solid fa-magnifying-glass text-lg"></i>
            </button>

            {/* Profile */}
            <Link
              href="/profile"
              className="text-brand-text hover:text-brand-green transition-colors p-1"
              title="Account"
            >
              <i className="fa-regular fa-user text-lg"></i>
            </Link>

            {/* Wishlist */}
            <Link
              href="/wishlist"
              className="text-brand-text hover:text-brand-green transition-colors relative p-1"
              title="Wishlist"
            >
              <i className="fa-regular fa-heart text-lg"></i>
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold w-4.5 h-4.5 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="text-brand-text hover:text-brand-green transition-colors relative p-1"
              title="Shopping Cart"
            >
              <i className="fa-solid fa-cart-shopping text-lg"></i>
              {cartCount > 0 ? (
                <span className="absolute -top-1 -right-1.5 bg-orange-200 text-orange-800 text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                  {cartCount}
                </span>
              ) : (
                <span className="absolute -top-1 -right-1.5 bg-brand-border text-brand-text-light text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  0
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs md:hidden flex justify-start animate-fade-in" 
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div 
            className="bg-brand-bg w-72 h-full p-6 shadow-2xl flex flex-col justify-between border-r border-brand-border animate-slide-in-left overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              {/* Drawer Header */}
              <div className="flex justify-between items-center pb-4 mb-6 border-b border-brand-border">
                <span className="font-serif text-2xl font-semibold tracking-tight text-brand-text flex items-center">
                  Nikunj
                  <i className="fa-solid fa-feather-pointed text-brand-green ml-1 text-base"></i>
                </span>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className="text-brand-text-light hover:text-brand-text focus:outline-none p-1"
                >
                  <i className="fa-solid fa-xmark text-lg"></i>
                </button>
              </div>

              {/* Links */}
              <div className="space-y-4">
                {navLinks.map((link) => {
                  if (link.dropdown) {
                    return (
                      <div key={link.name} className="py-1">
                        <span className="block px-2 py-1 text-xs font-bold text-brand-text-light uppercase tracking-wider">
                          {link.name}
                        </span>
                        <div className="pl-3 grid grid-cols-1 gap-1.5 mt-2 border-l border-brand-border">
                          <Link
                            onClick={() => setIsMobileMenuOpen(false)}
                            href="/shop"
                            className="text-sm py-1 px-2 rounded-md text-brand-text hover:bg-brand-bg"
                          >
                            All Shop
                          </Link>
                          {categories.map((cat) => (
                            <Link
                              key={cat.slug}
                              onClick={() => setIsMobileMenuOpen(false)}
                              href={`/shop?category=${cat.slug}`}
                              className="text-sm py-1 px-2 rounded-md text-brand-text hover:bg-brand-bg hover:text-brand-green transition-colors"
                            >
                              {cat.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  }

                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.name}
                      onClick={() => setIsMobileMenuOpen(false)}
                      href={link.href}
                      className={`block px-3 py-2 rounded-md text-sm font-semibold transition-all ${
                        isActive
                          ? "bg-brand-card text-brand-green border-l-4 border-brand-green"
                          : "text-brand-text hover:bg-brand-bg"
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="pt-6 border-t border-brand-border text-center text-xs text-brand-text-light space-y-4">
              <div className="flex justify-center gap-4 text-sm">
                <a href="#" className="hover:text-brand-green"><i className="fa-brands fa-instagram"></i></a>
                <a href="#" className="hover:text-brand-green"><i className="fa-brands fa-whatsapp"></i></a>
                <a href="#" className="hover:text-brand-green"><i className="fa-regular fa-envelope"></i></a>
              </div>
              <p>© 2026 Nikunj. Crafted for devotion.</p>
            </div>
          </div>
        </div>
      )}

      {/* Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-center items-start pt-20 px-4">
          <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden border border-brand-border">
            <div className="p-4 flex items-center border-b border-brand-border">
              <i className="fa-solid fa-magnifying-glass text-brand-text-light mr-3 text-lg"></i>
              <input
                type="text"
                placeholder="Search dresses, mukut, jewellery, baansuri..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-base text-brand-text focus:outline-none placeholder-brand-text-light/60 bg-transparent"
                autoFocus
              />
              <button
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery("");
                }}
                className="text-brand-text-light hover:text-brand-text focus:outline-none p-1"
              >
                <i className="fa-solid fa-xmark text-xl"></i>
              </button>
            </div>
            
            {/* Search results dropdown panel */}
            <div className="max-h-96 overflow-y-auto p-4 bg-brand-bg/30">
              {searchQuery === "" ? (
                <div className="text-center py-6 text-sm text-brand-text-light">
                  Type to search for handcrafted items...
                </div>
              ) : filteredProducts.length > 0 ? (
                <div className="space-y-3">
                  <div className="text-xs font-semibold text-brand-text-light uppercase tracking-wider mb-2">
                    Products found ({filteredProducts.length})
                  </div>
                  {filteredProducts.map((prod) => (
                    <Link
                      key={prod.id}
                      onClick={() => {
                        setIsSearchOpen(false);
                        setSearchQuery("");
                      }}
                      href={`/shop/${prod.id}`}
                      className="flex items-center gap-4 p-2 bg-white hover:bg-brand-card border border-brand-border rounded-lg transition-colors group"
                    >
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-12 h-12 object-cover rounded-md border border-brand-border"
                      />
                      <div className="flex-grow min-w-0">
                        <h4 className="font-medium text-brand-text group-hover:text-brand-green truncate">
                          {prod.name}
                        </h4>
                        <span className="text-xs text-brand-text-light">{prod.category}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-semibold text-brand-text">₹{prod.price}</span>
                        <div className="text-[10px] text-yellow-400">
                          {"★".repeat(Math.round(prod.rating))}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <i className="fa-solid fa-magnifying-glass text-brand-border text-3xl mb-2 block"></i>
                  <span className="text-sm text-brand-text-light">
                    No items found for &quot;{searchQuery}&quot;
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-brand-border h-16 z-40 flex items-center justify-around px-2 shadow-lg">
        <Link
          href="/"
          className={`flex flex-col items-center justify-center w-14 h-12 transition-all relative ${
            pathname === "/" ? "text-brand-green scale-105 font-bold" : "text-brand-text-light hover:text-brand-green"
          }`}
        >
          <i className="fa-solid fa-house text-lg"></i>
          <span className="text-[9px] font-semibold mt-1">Home</span>
          {pathname === "/" && <span className="absolute bottom-1 w-5 h-0.5 bg-brand-green rounded-full"></span>}
        </Link>

        <Link
          href="/shop"
          className={`flex flex-col items-center justify-center w-14 h-12 transition-all relative ${
            pathname.startsWith("/shop") ? "text-brand-green scale-105 font-bold" : "text-brand-text-light hover:text-brand-green"
          }`}
        >
          <i className="fa-solid fa-om text-lg"></i>
          <span className="text-[9px] font-semibold mt-1">Shop</span>
          {pathname.startsWith("/shop") && <span className="absolute bottom-1 w-5 h-0.5 bg-brand-green rounded-full"></span>}
        </Link>

        <Link
          href="/custom-order"
          className={`flex flex-col items-center justify-center w-14 h-12 transition-all relative ${
            pathname === "/custom-order" ? "text-brand-green scale-105 font-bold" : "text-brand-text-light hover:text-brand-green"
          }`}
        >
          <i className="fa-solid fa-shirt text-lg"></i>
          <span className="text-[9px] font-semibold mt-1">Custom</span>
          {pathname === "/custom-order" && <span className="absolute bottom-1 w-5 h-0.5 bg-brand-green rounded-full"></span>}
        </Link>

        <Link
          href="/wishlist"
          className={`flex flex-col items-center justify-center w-14 h-12 transition-all relative ${
            pathname === "/wishlist" ? "text-brand-green scale-105 font-bold" : "text-brand-text-light hover:text-brand-green"
          }`}
        >
          <i className="fa-regular fa-heart text-lg"></i>
          {wishlistCount > 0 && (
            <span className="absolute top-1.5 right-2 bg-red-500 text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {wishlistCount}
            </span>
          )}
          <span className="text-[9px] font-semibold mt-1">Wishlist</span>
          {pathname === "/wishlist" && <span className="absolute bottom-1 w-5 h-0.5 bg-brand-green rounded-full"></span>}
        </Link>

        <Link
          href="/profile"
          className={`flex flex-col items-center justify-center w-14 h-12 transition-all relative ${
            pathname === "/profile" ? "text-brand-green scale-105 font-bold" : "text-brand-text-light hover:text-brand-green"
          }`}
        >
          <i className="fa-regular fa-user text-lg"></i>
          <span className="text-[9px] font-semibold mt-1">Profile</span>
          {pathname === "/profile" && <span className="absolute bottom-1 w-5 h-0.5 bg-brand-green rounded-full"></span>}
        </Link>
      </div>
    </header>
  );
}
