"use client";

import React, { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { products, categories } from "@/data/products";

function ShopContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // State filters
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<number>(2000);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("popular");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  // Read URL params
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    } else {
      setSelectedCategory("all");
    }

    const searchParam = searchParams.get("q");
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [searchParams]);

  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  // Clear all filters
  const handleClearFilters = () => {
    setSelectedCategory("all");
    setPriceRange(2000);
    setSearchQuery("");
    setSortBy("popular");
    router.push("/shop");
  };

  // Filter & Sort logic
  const filteredProducts = products
    .filter((prod) => {
      const matchCategory =
        selectedCategory === "all" || prod.categorySlug === selectedCategory;
      const matchPrice = prod.price <= priceRange;
      const matchSearch =
        searchQuery === "" ||
        prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchPrice && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      // Default: popular (by review count)
      return b.reviewsCount - a.reviewsCount;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Breadcrumbs */}
      <div className="text-xs text-brand-text-light mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-brand-green">Home</Link>
        <i className="fa-solid fa-chevron-right text-[8px]"></i>
        <span className="text-brand-text font-medium">Shop</span>
      </div>

      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl text-brand-text mb-2">Devotional Collection</h1>
        <p className="text-brand-text-light text-sm italic font-serif">
          Perfect attire and accessories to adorn your Laddu Gopal Ji
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* SIDEBAR FILTERS (Desktop) */}
        <aside className="hidden lg:block lg:w-1/4 bg-white border border-brand-border rounded-xl p-6 shadow-sm h-fit">
          <div className="flex justify-between items-center pb-4 mb-4 border-b border-brand-border">
            <h3 className="font-serif text-lg font-medium text-brand-text">Filters</h3>
            <button
              onClick={handleClearFilters}
              className="text-xs text-brand-green hover:underline cursor-pointer font-medium"
            >
              Clear All
            </button>
          </div>

          {/* Search Input */}
          <div className="mb-6">
            <label className="block text-xs font-semibold uppercase tracking-wider text-brand-text-light mb-2">
              Search Products
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type name..."
                className="w-full text-sm border border-brand-border rounded-md py-2 pl-3 pr-8 focus:outline-none focus:border-brand-green bg-brand-bg/20"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-2.5 text-brand-text-light hover:text-brand-text"
                >
                  <i className="fa-solid fa-xmark text-xs"></i>
                </button>
              )}
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-6">
            <label className="block text-xs font-semibold uppercase tracking-wider text-brand-text-light mb-2">
              Categories
            </label>
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  router.push("/shop");
                }}
                className={`w-full text-left text-sm py-1 px-2 rounded transition-colors flex items-center justify-between ${
                  selectedCategory === "all"
                    ? "bg-brand-card text-brand-green font-semibold"
                    : "text-brand-text hover:bg-brand-bg"
                }`}
              >
                <span>All Categories</span>
                <span className="text-[10px] bg-brand-border/40 px-1.5 py-0.5 rounded-full text-brand-text-light">
                  {products.length}
                </span>
              </button>
              {categories.map((cat) => {
                const count = products.filter((p) => p.categorySlug === cat.slug).length;
                return (
                  <button
                    key={cat.slug}
                    onClick={() => {
                      setSelectedCategory(cat.slug);
                      router.push(`/shop?category=${cat.slug}`);
                    }}
                    className={`w-full text-left text-sm py-1 px-2 rounded transition-colors flex items-center justify-between ${
                      selectedCategory === cat.slug
                        ? "bg-brand-card text-brand-green font-semibold"
                        : "text-brand-text hover:bg-brand-bg"
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] bg-brand-border/40 px-1.5 py-0.5 rounded-full text-brand-text-light">
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-brand-text-light">
                Max Price
              </label>
              <span className="text-sm font-semibold text-brand-green">₹{priceRange}</span>
            </div>
            <input
              type="range"
              min="0"
              max="2000"
              step="50"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-brand-green cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-brand-text-light mt-1">
              <span>₹0</span>
              <span>₹1000</span>
              <span>₹2000+</span>
            </div>
          </div>
        </aside>

        {/* PRODUCTS GRID AREA */}
        <main className="w-full lg:w-3/4">
          
          {/* Top Bar (Results count & Sorting) */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 bg-brand-card/30 p-4 border border-brand-border rounded-xl">
            <div className="text-sm text-brand-text-light flex justify-between items-center w-full sm:w-auto">
              <span>Showing <span className="font-semibold text-brand-text">{filteredProducts.length}</span> results</span>
              {/* Mobile Filter Toggle Button */}
              <button 
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden text-xs bg-white hover:bg-brand-bg text-brand-text font-semibold py-1.5 px-3 border border-brand-border rounded-md shadow-sm flex items-center gap-1 cursor-pointer focus:outline-none"
              >
                <i className="fa-solid fa-sliders text-[10px]"></i> Filters
              </button>
            </div>
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <span className="text-xs text-brand-text-light font-medium uppercase whitespace-nowrap">
                Sort By:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs font-medium border border-brand-border rounded bg-white p-2 text-brand-text focus:outline-none focus:border-brand-green"
              >
                <option value="popular">Popularity</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Average Rating</option>
              </select>
            </div>
          </div>

          {/* Catalog Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {filteredProducts.map((product) => {
                const isFav = isWishlisted(product.id);
                return (
                  <div
                    key={product.id}
                    className="bg-white rounded-xl overflow-hidden border border-brand-border shadow-sm group flex flex-col justify-between hover:shadow-md transition-shadow relative"
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
                      className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center text-brand-text hover:text-red-500 transition-colors shadow-sm focus:outline-none"
                    >
                      <i
                        className={`${
                          isFav ? "fa-solid fa-heart text-red-500" : "fa-regular fa-heart"
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
                        <span className="text-[10px] text-brand-green font-semibold uppercase tracking-wider">
                          {product.category}
                        </span>
                        <h3 className="font-medium text-brand-text mt-1 mb-1 truncate group-hover:text-brand-green transition-colors">
                          {product.name}
                        </h3>
                        <div className="flex items-center text-xs mt-1">
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
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-brand-bg">
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
          ) : (
            <div className="text-center py-20 bg-white rounded-xl border border-brand-border">
              <i className="fa-solid fa-folder-open text-brand-border text-5xl mb-4 block"></i>
              <h3 className="font-serif text-xl text-brand-text mb-2">No Products Found</h3>
              <p className="text-brand-text-light text-sm mb-6">
                Try widening your price range or adjusting your keywords.
              </p>
              <button
                onClick={handleClearFilters}
                className="bg-brand-green hover:bg-brand-green-hover text-white px-6 py-2 rounded-md font-medium text-sm transition-colors shadow-sm"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filter Drawer Overlay */}
      {isMobileFilterOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs lg:hidden flex justify-end animate-fade-in"
          onClick={() => setIsMobileFilterOpen(false)}
        >
          <div 
            className="bg-white w-80 h-full p-6 shadow-2xl flex flex-col justify-between border-l border-brand-border animate-slide-in-right overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              {/* Drawer Header */}
              <div className="flex justify-between items-center pb-4 mb-6 border-b border-brand-border">
                <h3 className="font-serif text-lg font-medium text-brand-text">Filters</h3>
                <button 
                  onClick={() => setIsMobileFilterOpen(false)} 
                  className="text-brand-text-light hover:text-brand-text focus:outline-none p-1"
                >
                  <i className="fa-solid fa-xmark text-lg"></i>
                </button>
              </div>

              {/* Drawer Body - Replicated Sidebar Controls */}
              {/* Search */}
              <div className="mb-6">
                <label className="block text-xs font-semibold uppercase tracking-wider text-brand-text-light mb-2">
                  Search Products
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Type name..."
                    className="w-full text-sm border border-brand-border rounded-md py-2 pl-3 pr-8 focus:outline-none focus:border-brand-green bg-brand-bg/20"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2.5 top-2.5 text-brand-text-light hover:text-brand-text"
                    >
                      <i className="fa-solid fa-xmark text-xs"></i>
                    </button>
                  )}
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <label className="block text-xs font-semibold uppercase tracking-wider text-brand-text-light mb-2">
                  Categories
                </label>
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  <button
                    onClick={() => {
                      setSelectedCategory("all");
                      router.push("/shop");
                    }}
                    className={`w-full text-left text-sm py-1.5 px-2 rounded transition-colors flex items-center justify-between ${
                      selectedCategory === "all"
                        ? "bg-brand-card text-brand-green font-semibold"
                        : "text-brand-text hover:bg-brand-bg"
                    }`}
                  >
                    <span>All Categories</span>
                    <span className="text-[10px] bg-brand-border/40 px-1.5 py-0.5 rounded-full text-brand-text-light">
                      {products.length}
                    </span>
                  </button>
                  {categories.map((cat) => {
                    const count = products.filter((p) => p.categorySlug === cat.slug).length;
                    return (
                      <button
                        key={cat.slug}
                        onClick={() => {
                          setSelectedCategory(cat.slug);
                          router.push(`/shop?category=${cat.slug}`);
                        }}
                        className={`w-full text-left text-sm py-1.5 px-2 rounded transition-colors flex items-center justify-between ${
                          selectedCategory === cat.slug
                            ? "bg-brand-card text-brand-green font-semibold"
                            : "text-brand-text hover:bg-brand-bg"
                        }`}
                      >
                        <span>{cat.name}</span>
                        <span className="text-[10px] bg-brand-border/40 px-1.5 py-0.5 rounded-full text-brand-text-light">
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-brand-text-light">
                    Max Price
                  </label>
                  <span className="text-sm font-semibold text-brand-green">₹{priceRange}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="2000"
                  step="50"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-brand-green cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-brand-text-light mt-1">
                  <span>₹0</span>
                  <span>₹1000</span>
                  <span>₹2000+</span>
                </div>
              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div className="pt-4 border-t border-brand-border flex gap-3">
              <button
                onClick={handleClearFilters}
                className="flex-grow border border-brand-border bg-white text-brand-text hover:bg-brand-bg py-2.5 rounded-md font-semibold text-xs transition-colors shadow-sm focus:outline-none cursor-pointer"
              >
                Clear
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-grow bg-brand-green hover:bg-brand-green-hover text-white py-2.5 rounded-md font-semibold text-xs transition-colors shadow-sm focus:outline-none cursor-pointer text-center"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading Collection...</div>}>
      <ShopContent />
    </Suspense>
  );
}
