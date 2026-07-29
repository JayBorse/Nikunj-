"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { products, categories } from "@/data/products";

export default function Home() {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const [activeFeaturedTab, setActiveFeaturedTab] = useState("All");

  // Get filtered featured products based on active tab
  const featuredProducts = products
    .filter((p) => {
      if (activeFeaturedTab === "All") return p.rating >= 4.5;
      return p.categorySlug === activeFeaturedTab.toLowerCase();
    })
    .slice(0, 4);

  return (
    <>
      {/* Hero Section */}
      <section className="relative mx-4 sm:mx-8 lg:mx-12 mt-6 rounded-2xl overflow-hidden shadow-sm h-[500px] hero-bg flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-bg/90 to-transparent w-2/3"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-8 lg:px-16 w-full">
          <div className="max-w-lg">
            <h1 className="font-serif text-5xl md:text-6xl text-brand-text leading-tight mb-4">
              Handcrafted
              <br />
              with Devotion,
              <br />
              for Your Kanha
            </h1>
            <p className="text-brand-text-light text-lg mb-8 font-serif italic">
              Beautiful dresses &amp; accessories
              <br />
              for Laddu Gopal Ji
            </p>
            <Link
              href="/shop"
              className="inline-block bg-brand-green hover:bg-brand-green-hover text-white px-8 py-3 rounded-md font-medium transition-colors shadow-md"
            >
              Shop Collection
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="max-w-6xl mx-auto mt-6 mb-16 px-4">
        <div className="bg-brand-card rounded-xl py-6 px-4 flex flex-col md:flex-row justify-around items-center border border-brand-border/50 shadow-sm gap-6 md:gap-0">
          <div className="flex items-center space-x-4">
            <div className="text-brand-green flex items-center justify-center">
              <svg className="w-10 h-10" viewBox="0 0 24 24" fill="currentColor">
                {/* Heart */}
                <path d="M12,5C13.88,5 15.4,6.5 15.4,8.4C15.4,11.5 12,14.7 12,14.7C12,14.7 8.6,11.5 8.6,8.4C8.6,6.5 10.12,5 12,5Z" />
                {/* Left Hand */}
                <path d="M6,13C6.55,13 7,13.45 7,14C7,15.1 7.9,16 9,16C9.55,16 10,16.45 10,17C10,17.55 9.55,18 9,18C6.8,18 5,16.2 5,14C5,13.45 5.45,13 6,13Z" />
                {/* Right Hand */}
                <path d="M18,13C18.55,13 19,13.45 19,14C19,16.2 17.2,18 15,18C14.45,18 14,17.55 14,17C14,16.45 14.45,16 15,16C16.1,16 17,15.1 17,14C17,13.45 17.45,13 18,13Z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium text-brand-text leading-tight">
                Handmade by
                <br />
                Homemakers
              </h3>
            </div>
          </div>
          <div className="hidden md:block h-10 w-px bg-brand-border"></div>
          <div className="flex items-center space-x-4">
            <div className="text-brand-green text-3xl">
              <i className="fa-solid fa-truck-fast"></i>
            </div>
            <div>
              <h3 className="font-medium text-brand-text leading-tight">
                Pan India
                <br />
                Delivery
              </h3>
            </div>
          </div>
          <div className="hidden md:block h-10 w-px bg-brand-border"></div>
          <div className="flex items-center space-x-4">
            <div className="text-brand-green text-3xl">
              <i className="fa-solid fa-om"></i>
            </div>
            <div>
              <h3 className="font-medium text-brand-text leading-tight">
                Crafted with
                <br />
                Devotion
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* Category Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center mb-10 flex items-center justify-center">
          <div className="h-px bg-brand-border w-12 mr-4"></div>
          <h2 className="font-serif text-3xl text-brand-text">Shop by Category</h2>
          <div className="h-px bg-brand-border w-12 ml-4"></div>
        </div>
        <div className="flex overflow-x-auto snap-x scrollbar-none pb-4 gap-4 md:grid md:grid-cols-5 lg:grid-cols-10 mb-10">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/shop?category=${cat.slug}`}
              className="flex flex-col items-center flex-shrink-0 snap-start w-20 group"
            >
              <div className="w-20 h-20 rounded-2xl category-icon flex items-center justify-center mb-3 shadow-sm group-hover:shadow-md transition-shadow">
                <img
                  alt={cat.name}
                  className="w-14 h-14 object-contain group-hover:scale-110 transition-transform duration-300"
                  src={cat.image}
                />
              </div>
              <span className="text-xs font-medium text-brand-text text-center group-hover:text-brand-green transition-colors truncate w-full">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
        <div className="text-center">
          <Link
            href="/shop"
            className="inline-block border border-brand-border bg-white hover:bg-brand-bg text-brand-text px-6 py-2 rounded-md font-medium text-sm transition-colors shadow-sm"
          >
            View All Categories
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="text-center mb-10 flex items-center justify-center">
          <div className="h-px bg-brand-border w-12 mr-4"></div>
          <h2 className="font-serif text-3xl text-brand-text">Featured Collection</h2>
          <div className="h-px bg-brand-border w-12 ml-4"></div>
        </div>

        {/* Dynamic Category Tabs */}
        <div className="flex justify-start md:justify-center mb-8 overflow-x-auto scrollbar-none pb-2 gap-2 snap-x px-2">
          {["All", "Dresses", "Mukut", "Jewellery", "Jhula"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFeaturedTab(tab)}
              className={`px-5 py-2 rounded-full text-xs font-semibold whitespace-nowrap snap-start transition-all duration-200 cursor-pointer focus:outline-none ${
                activeFeaturedTab === tab
                  ? "bg-brand-green text-white shadow-sm"
                  : "bg-white text-brand-text border border-brand-border hover:bg-brand-bg"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div key={activeFeaturedTab} className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10 animate-fade-in">
          {featuredProducts.map((product) => {
            const isFav = isWishlisted(product.id);
            return (
              <div
                key={product.id}
                className="bg-white rounded-xl overflow-hidden border border-brand-border shadow-sm group relative flex flex-col justify-between"
              >
                {/* Wishlist toggle */}
                <button
                  onClick={() =>
                    toggleWishlist({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image,
                    })
                  }
                  className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/85 rounded-full flex items-center justify-center text-brand-text hover:text-red-500 transition-colors shadow-sm focus:outline-none"
                  aria-label="Add to Wishlist"
                >
                  <i
                    className={`${
                      isFav ? "fa-solid fa-heart text-red-500 animate-bounce" : "fa-regular fa-heart"
                    }`}
                  ></i>
                </button>

                <Link href={`/shop/${product.id}`} className="block overflow-hidden flex-grow">
                  <div className="aspect-square bg-gray-100 relative overflow-hidden">
                    <img
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      src={product.image}
                    />
                  </div>
                  <div className="p-4 pb-2">
                    <h3 className="font-medium text-brand-text mb-1 truncate group-hover:text-brand-green transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center mt-2 text-xs">
                      <div className="text-yellow-400 flex space-x-0.5">
                        {"★".repeat(Math.floor(product.rating))}
                        {product.rating % 1 !== 0 && (
                          <i className="fa-solid fa-star-half-stroke"></i>
                        )}
                      </div>
                      <span className="text-brand-text-light ml-1">
                        ({product.reviewsCount})
                      </span>
                    </div>
                  </div>
                </Link>

                <div className="p-4 pt-0">
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-semibold text-lg text-brand-text">
                      ₹{product.price}
                    </span>
                    <button
                      onClick={() =>
                        addToCart(
                          {
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            image: product.image,
                            size: product.sizes[0] || "Standard Size",
                          },
                          1
                        )
                      }
                      className="w-8 h-8 rounded-full border border-brand-border flex items-center justify-center text-brand-text hover:bg-brand-green hover:text-white hover:border-brand-green transition-colors focus:outline-none"
                      title="Add to Cart"
                    >
                      <i className="fa-solid fa-cart-plus text-sm"></i>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className="text-center">
          <Link
            href="/shop"
            className="inline-block border border-brand-border bg-white hover:bg-brand-bg text-brand-text px-6 py-2 rounded-md font-medium text-sm transition-colors shadow-sm"
          >
            View All Products
          </Link>
        </div>
      </section>

      {/* Custom Order Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="custom-order-bg rounded-2xl p-8 flex flex-col lg:flex-row items-center border border-brand-border shadow-sm relative overflow-hidden min-h-[350px] lg:min-h-[280px]">
          
          {/* Absolute Background Image fading to the right */}
          <div className="absolute inset-y-0 left-0 w-full lg:w-[28%] z-0 pointer-events-none">
            <img
              alt="Custom Order Deity"
              className="w-full h-full object-cover object-left"
              src="/custom order.JPG"
            />
            {/* Horizontal gradient for desktop */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent/20 to-[#F7F3E9] hidden lg:block"></div>
            {/* Vertical gradient for mobile */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent/40 to-[#F7F3E9] lg:hidden"></div>
          </div>

          {/* Left spacer to push text over the faded area */}
          <div className="hidden lg:block lg:w-[28%] z-10 pointer-events-none"></div>

          {/* Content */}
          <div className="w-full lg:w-[42%] z-10 text-center lg:text-left lg:pl-8 mb-8 lg:mb-0">
            <h2 className="font-serif text-3xl text-brand-text mb-3">
              Custom Order for Your Kanha
            </h2>
            <p className="text-brand-text-light text-sm mb-6">
              Upload photos, provide measurements
              <br />
              and get the perfect fit for your Laddu Gopal Ji.
            </p>
            <Link
              href="/custom-order"
              className="inline-block bg-brand-green hover:bg-brand-green-hover text-white px-6 py-2.5 rounded-md font-medium text-sm transition-colors shadow-sm"
            >
              Create Custom Order
            </Link>
          </div>

          {/* Steps */}
          <div className="w-full lg:w-[30%] z-10 flex justify-center lg:justify-end items-center space-x-2 md:space-x-4">
            <div className="text-center">
              <i className="fa-regular fa-image text-2xl text-brand-text mb-2 block mx-auto"></i>
              <p className="text-[10px] sm:text-xs font-medium">1 Upload Photos</p>
            </div>
            <i className="fa-solid fa-arrow-right text-brand-border text-xs sm:text-sm"></i>
            <div className="text-center">
              <i className="fa-solid fa-ruler text-2xl text-brand-text mb-2 block mx-auto"></i>
              <p className="text-[10px] sm:text-xs font-medium">2 Measurements</p>
            </div>
            <i className="fa-solid fa-arrow-right text-brand-border text-xs sm:text-sm"></i>
            <div className="text-center">
              <i className="fa-solid fa-shirt text-2xl text-brand-text mb-2 block mx-auto"></i>
              <p className="text-[10px] sm:text-xs font-medium">3 Choose Style</p>
            </div>
            <i className="fa-solid fa-arrow-right text-brand-border text-xs sm:text-sm"></i>
            <div className="text-center">
              <i className="fa-solid fa-cart-shopping text-2xl text-brand-text mb-2 block mx-auto"></i>
              <p className="text-[10px] sm:text-xs font-medium">4 Place Order</p>
            </div>
          </div>
        </div>
      </section>

      {/* Artisan Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="artisan-bg rounded-2xl flex flex-col md:flex-row items-center border border-brand-border shadow-sm overflow-hidden">
          <div className="w-full md:w-1/3 h-64 md:h-80 relative">
            <img
              alt="Knitting hands"
              className="w-full h-full object-cover absolute inset-0"
              src="/artisan_hands_pink.png"
            />
          </div>
          <div className="w-full md:w-1/3 p-8 md:p-12 text-center md:text-left">
            <h2 className="font-serif text-3xl text-brand-text mb-3">
              Become a Nikunj Artisan
            </h2>
            <p className="text-brand-text-light text-sm mb-6">
              Join our community of talented homemakers and earn with your skills.
            </p>
            <Link
              href="/become-artisan"
              className="inline-block bg-brand-green hover:bg-brand-green-hover text-white px-8 py-2.5 rounded-md font-medium text-sm transition-colors shadow-sm"
            >
              Apply Now
            </Link>
          </div>
          <div className="w-full md:w-1/3 p-8 bg-brand-card/50 flex flex-col justify-center space-y-4">
            <div className="flex items-center space-x-3">
              <i className="fa-solid fa-house text-brand-green w-5 text-center"></i>
              <span className="text-sm font-medium text-brand-text">Work from Home</span>
            </div>
            <div className="flex items-center space-x-3">
              <i className="fa-regular fa-clock text-brand-green w-5 text-center"></i>
              <span className="text-sm font-medium text-brand-text">Flexible Working Hours</span>
            </div>
            <div className="flex items-center space-x-3">
              <i className="fa-solid fa-indian-rupee-sign text-brand-green w-5 text-center"></i>
              <span className="text-sm font-medium text-brand-text">Timely Payments</span>
            </div>
            <div className="flex items-center space-x-3">
              <i className="fa-solid fa-seedling text-brand-green w-5 text-center"></i>
              <span className="text-sm font-medium text-brand-text">Support &amp; Growth</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
