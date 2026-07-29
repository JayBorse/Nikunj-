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
      
      let matchPrice = true;
      if (priceRange === 500) {
        matchPrice = prod.price <= 500;
      } else if (priceRange === 1000) {
        matchPrice = prod.price <= 1000;
      } else if (priceRange === 2000) {
        matchPrice = prod.price <= 2000;
      }

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
      return b.reviewsCount - a.reviewsCount; // Default: popular
    });

  return (
    <div className="flex-1 flex max-w-[1600px] mx-auto w-full font-sans">
      
      {/* SIDEBAR FILTERS (Desktop) */}
      <aside className="hidden lg:block w-64 border-r border-[#e8e0d5] p-6 flex-shrink-0 bg-[#fcf8f2] overflow-y-auto h-[calc(100vh-85px)] sticky top-[85px]">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-bold text-lg text-gray-900">Filters</h2>
          <button
            onClick={handleClearFilters}
            className="text-xs text-gray-500 hover:text-[#385623] underline cursor-pointer"
          >
            Clear All
          </button>
        </div>

        {/* Search filter in Sidebar */}
        <div className="mb-6 border-b border-[#e8e0d5] pb-6">
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
            Search Products
          </label>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search attire..."
              className="w-full text-sm border border-[#e8e0d5] rounded-md py-2 pl-3 pr-8 focus:outline-none focus:border-[#385623] bg-white text-gray-800"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-600"
              >
                <i className="fa-solid fa-xmark text-xs"></i>
              </button>
            )}
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-6 border-b border-[#e8e0d5] pb-6">
          <button className="flex items-center justify-between w-full font-semibold mb-4 text-sm text-gray-800">
            Category
            <i className="fa-solid fa-chevron-up text-xs text-gray-400"></i>
          </button>
          <div className="space-y-3 text-sm">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCategory === "all"}
                onChange={() => {
                  setSelectedCategory("all");
                  router.push("/shop");
                }}
                className="rounded border-[#e8e0d5] text-[#385623] focus:ring-[#385623] w-4 h-4 cursor-pointer"
              />
              <span className={selectedCategory === "all" ? "text-[#385623] font-semibold" : "text-gray-700"}>
                All Categories <span className="text-gray-400 text-xs">({products.length})</span>
              </span>
            </label>
            {categories.map((cat) => {
              const isChecked = selectedCategory === cat.slug;
              const count = products.filter((p) => p.categorySlug === cat.slug).length;
              return (
                <label key={cat.slug} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {
                      if (isChecked) {
                        setSelectedCategory("all");
                        router.push("/shop");
                      } else {
                        setSelectedCategory(cat.slug);
                        router.push(`/shop?category=${cat.slug}`);
                      }
                    }}
                    className="rounded border-[#e8e0d5] text-[#385623] focus:ring-[#385623] w-4 h-4 cursor-pointer"
                  />
                  <span className={isChecked ? "text-[#385623] font-semibold" : "text-gray-700"}>
                    {cat.name} <span className="text-gray-400 text-xs">({count})</span>
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* Price Range Filter */}
        <div className="mb-6 border-b border-[#e8e0d5] pb-6">
          <button className="flex items-center justify-between w-full font-semibold mb-4 text-sm text-gray-800">
            Price Range
            <i className="fa-solid fa-chevron-up text-xs text-gray-400"></i>
          </button>
          <div className="space-y-3 text-sm">
            {[
              { label: "All Prices", value: 2000 },
              { label: "Under ₹500", value: 500 },
              { label: "Under ₹1000", value: 1000 },
              { label: "Under ₹2000", value: 2000 },
            ].map((range) => (
              <label key={range.label} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="price-range"
                  checked={priceRange === range.value}
                  onChange={() => setPriceRange(range.value)}
                  className="border-[#e8e0d5] text-[#385623] focus:ring-[#385623] w-4 h-4 cursor-pointer"
                />
                <span className={priceRange === range.value ? "text-[#385623] font-semibold" : "text-gray-700"}>
                  {range.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Materials filter (Static badge count) */}
        <div className="mb-6 border-b border-[#e8e0d5] pb-6">
          <button className="flex items-center justify-between w-full font-semibold mb-4 text-sm text-gray-800">
            Material
            <i className="fa-solid fa-chevron-up text-xs text-gray-400"></i>
          </button>
          <div className="space-y-3 text-sm text-gray-700">
            {["Cotton", "Silk", "Velvet", "Crochet"].map((mat, i) => (
              <div key={mat} className="flex items-center gap-3">
                <input type="checkbox" className="rounded border-[#e8e0d5] text-[#385623] focus:ring-[#385623] w-4 h-4" />
                <span>{mat} <span className="text-gray-400 text-xs">({i * 12 + 15})</span></span>
              </div>
            ))}
          </div>
        </div>

        {/* Color filters (Static palettes) */}
        <div className="mb-6">
          <button className="flex items-center justify-between w-full font-semibold mb-4 text-sm text-gray-800">
            Color
            <i className="fa-solid fa-chevron-up text-xs text-gray-400"></i>
          </button>
          <div className="flex flex-wrap items-center gap-2">
            {["bg-blue-500", "bg-pink-500", "bg-yellow-400", "bg-green-700", "bg-red-800", "bg-white border-gray-300"].map((col, idx) => (
              <button
                key={idx}
                className={`w-5 h-5 rounded-full border border-transparent focus:ring-1 focus:ring-offset-1 focus:ring-[#385623] cursor-pointer ${col}`}
              />
            ))}
            <button className="text-[10px] text-gray-500 hover:underline font-semibold ml-1">+ More</button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-6 lg:p-10 w-full min-w-0">
        
        {/* Breadcrumbs & Header */}
        <div className="mb-8">
          <nav className="flex items-center gap-2 text-xs text-gray-500 mb-4 font-semibold">
            <Link href="/" className="hover:text-[#385623]">Home</Link>
            <i className="fa-solid fa-chevron-right text-[8px] text-gray-400"></i>
            <span className="text-gray-800">Shop</span>
          </nav>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-serif text-4xl lg:text-5xl text-gray-900 mb-2">Shop All</h1>
              <div className="flex items-center gap-2 text-[#c9a25b] mb-4">
                <div className="h-[1px] w-12 bg-[#c9a25b]"></div>
                <i className="fa-brands fa-pagelines"></i>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed max-w-lg">
                Handcrafted dresses, premium mukut crown sheets, stone necklaces, and accessories for Laddu Gopal Ji.
              </p>
            </div>
            
            <div className="flex items-center gap-3 self-start md:self-auto mt-4 md:mt-0">
              <span className="text-xs text-gray-500 font-semibold uppercase whitespace-nowrap">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border-[#e8e0d5] rounded bg-white text-xs py-2 pl-3 pr-8 focus:ring-[#385623] focus:border-[#385623] text-gray-800 font-medium"
              >
                <option value="popular">Popularity</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Average Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active Filters list */}
        <div className="flex flex-wrap items-center gap-2.5 mb-10">
          {selectedCategory !== "all" && (
            <span className="inline-flex items-center gap-2 bg-[#f5efe6] border border-[#e8e0d5] px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#385623]">
              Category: {selectedCategory}
              <button onClick={() => setSelectedCategory("all")} className="text-gray-400 hover:text-red-500 cursor-pointer">
                <i className="fa-solid fa-xmark text-xs"></i>
              </button>
            </span>
          )}
          {priceRange < 2000 && (
            <span className="inline-flex items-center gap-2 bg-[#f5efe6] border border-[#e8e0d5] px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#385623]">
              Max Price: ₹{priceRange}
              <button onClick={() => setPriceRange(2000)} className="text-gray-400 hover:text-red-500 cursor-pointer">
                <i className="fa-solid fa-xmark text-xs"></i>
              </button>
            </span>
          )}
          {searchQuery && (
            <span className="inline-flex items-center gap-2 bg-[#f5efe6] border border-[#e8e0d5] px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#385623]">
              Keyword: &quot;{searchQuery}&quot;
              <button onClick={() => setSearchQuery("")} className="text-gray-400 hover:text-red-500 cursor-pointer">
                <i className="fa-solid fa-xmark text-xs"></i>
              </button>
            </span>
          )}
          
          <button 
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden text-xs bg-white hover:bg-gray-50 text-gray-800 font-semibold py-1.5 px-3.5 border border-[#e8e0d5] rounded-full shadow-xs flex items-center gap-1 cursor-pointer focus:outline-none"
          >
            <i className="fa-solid fa-sliders text-[10px] text-[#385623]"></i> Mobile Filters
          </button>
          
          {(selectedCategory !== "all" || priceRange < 2000 || searchQuery) && (
            <button
              onClick={handleClearFilters}
              className="text-xs text-gray-500 hover:text-[#385623] hover:underline ml-2 cursor-pointer font-semibold"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Hero Product Section: Best Seller */}
        <section className="bg-[#f5efe6] rounded-[30px] overflow-hidden flex flex-col lg:flex-row relative shadow-xs border border-[#e8e0d5]/50 mb-16 h-auto lg:h-[500px]">
          
          {/* Left Content */}
          <div className="w-full lg:w-[45%] p-8 lg:p-12 flex flex-col justify-center relative z-10">
            <span className="inline-flex items-center gap-2 bg-[#fcf8f2] border border-[#c9a25b]/30 text-[#385623] text-xs font-semibold px-3 py-1 rounded-full w-max mb-6 shadow-xs">
              <i className="fa-solid fa-star text-[#c9a25b] text-[10px]"></i> Best Seller
            </span>
            <h2 className="font-serif text-4xl leading-tight mb-4 text-gray-900">Royal Peacock<br/>Dress</h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-6 max-w-sm">A royal blend of peacock colors, crafted with premium fabrics and detailed zari work for your deity.</p>
            
            <div className="mb-4">
              <span className="text-3xl font-bold font-serif text-[#385623]">₹499</span>
            </div>
            
            <div className="flex items-center gap-2 mb-6">
              <div className="flex text-[#c9a25b] text-sm">
                <i className="fa-solid fa-star text-xs"></i>
                <i className="fa-solid fa-star text-xs"></i>
                <i className="fa-solid fa-star text-xs"></i>
                <i className="fa-solid fa-star text-xs"></i>
                <i className="fa-solid fa-star-half-stroke text-xs"></i>
              </div>
              <span className="text-gray-500 text-xs font-medium">(128 reviews)</span>
            </div>

            {/* Features */}
            <div className="flex items-center gap-5 mb-8 text-xs text-gray-700">
              <div className="flex items-center gap-2">
                <i className="fa-regular fa-gem text-[#385623] text-lg"></i>
                <span className="leading-tight">Premium<br/>Quality</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-hands-holding-circle text-[#385623] text-lg"></i>
                <span className="leading-tight">Handcrafted<br/>with Love</span>
              </div>
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-box text-[#385623] text-lg"></i>
                <span className="leading-tight">Secure<br/>Packaging</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/shop/1"
                className="bg-[#385623] hover:bg-green-800 text-white font-semibold py-3 px-8 rounded-lg flex items-center justify-between gap-4 text-xs transition-colors shadow-md shadow-brand-olive/20 text-center"
              >
                View Details <i className="fa-solid fa-arrow-right"></i>
              </Link>
              <button
                onClick={() =>
                  toggleWishlist({
                    id: 1,
                    name: "Royal Peacock Dress",
                    price: 499,
                    image: "/royal peacock dress.PNG",
                  })
                }
                className="w-12 h-12 rounded-full border border-[#e8e0d5] flex items-center justify-center text-gray-500 hover:text-red-500 hover:border-red-500 transition-colors bg-white cursor-pointer"
              >
                <i className={isWishlisted(1) ? "fa-solid fa-heart text-red-500" : "fa-regular fa-heart"}></i>
              </button>
            </div>
          </div>

          {/* Right Image Container */}
          <div className="w-full lg:w-[55%] relative h-[320px] lg:h-full lg:absolute lg:right-0 lg:top-0">
            {/* Curved overlay vector */}
            <svg className="hidden lg:block absolute left-0 top-0 h-full text-[#f5efe6] z-10 w-[80px]" fill="currentColor" preserveAspectRatio="none" viewBox="0 0 100 100">
              <path d="M0,0 C50,0 100,50 100,100 L0,100 Z"></path>
            </svg>
            <img
              alt="Royal Peacock Dress for Laddu Gopal"
              className="w-full h-full object-cover rounded-b-[30px] lg:rounded-l-none lg:rounded-r-[30px]"
              src="/royal peacock dress.PNG"
            />
          </div>

        </section>

        {/* Recommended Grid Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div className="decorative-line text-brand-text font-serif text-2xl w-full max-w-[400px]">
              <span className="whitespace-nowrap pr-4 font-serif text-xl text-gray-900">Explore Collection</span>
            </div>
            <div className="h-px bg-gray-200 flex-grow hidden sm:block"></div>
          </div>

          {/* Catalog Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {filteredProducts.map((product) => {
                const isFav = isWishlisted(product.id);
                return (
                  <div
                    key={product.id}
                    className="group bg-white rounded-xl border border-[#e8e0d5] overflow-hidden hover:shadow-lg transition-shadow relative flex flex-col justify-between"
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
                      className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-gray-500 hover:text-red-500 hover:bg-white transition-colors cursor-pointer"
                    >
                      <i className={isFav ? "fa-solid fa-heart text-red-500" : "fa-regular fa-heart"}></i>
                    </button>

                    <Link href={`/shop/${product.id}`} className="block overflow-hidden flex-grow">
                      <div className="aspect-[4/5] overflow-hidden bg-gray-50">
                        <img
                          alt={product.name}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                          src={product.image}
                        />
                      </div>
                      <div className="p-4 pb-2 text-xs">
                        <span className="text-[10px] text-[#385623] font-semibold uppercase tracking-wider block mb-1">
                          {product.category}
                        </span>
                        <h3 className="font-semibold text-gray-900 truncate group-hover:text-[#385623] transition-colors text-sm mb-1.5">
                          {product.name}
                        </h3>
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-[#385623] text-base font-serif">₹{product.price}</span>
                        </div>
                      </div>
                    </Link>

                    <div className="p-4 pt-0">
                      <div className="flex items-center justify-between mt-1 pt-3 border-t border-gray-100">
                        <div className="flex items-center text-xs">
                          <div className="text-[#c9a25b] flex space-x-0.5">
                            {"★".repeat(Math.floor(product.rating))}
                            {product.rating % 1 !== 0 && (
                              <i className="fa-solid fa-star-half-stroke text-[10px]"></i>
                            )}
                          </div>
                          <span className="text-gray-400 ml-1 text-[10px]">
                            ({product.reviewsCount})
                          </span>
                        </div>
                        
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
                          className="w-8 h-8 rounded-full border border-[#e8e0d5] flex items-center justify-center text-gray-700 hover:bg-[#385623] hover:text-white hover:border-[#385623] transition-colors focus:outline-none cursor-pointer"
                          title="Add to Cart"
                        >
                          <i className="fa-solid fa-cart-plus text-xs"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-xl border border-[#e8e0d5]">
              <i className="fa-solid fa-folder-open text-[#c9a25b] text-5xl mb-4 block"></i>
              <h3 className="font-serif text-xl text-gray-900 mb-2">No Products Found</h3>
              <p className="text-gray-500 text-xs mb-6">
                Try widening your price range or adjusting your keywords.
              </p>
              <button
                onClick={handleClearFilters}
                className="bg-[#385623] hover:bg-green-800 text-white px-6 py-2.5 rounded-md font-semibold text-xs transition-colors shadow-xs cursor-pointer"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </section>

        {/* Trust Indicators row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-8 border-t border-[#e8e0d5] text-xs leading-relaxed">
          <div className="flex items-center gap-4">
            <div className="text-[#385623] text-2xl"><i className="fa-solid fa-hand-holding-heart"></i></div>
            <div>
              <h4 className="font-bold text-gray-900">Handmade with Love</h4>
              <p className="text-gray-500 mt-0.5">By skilled homemakers</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-[#385623] text-2xl"><i className="fa-solid fa-truck-fast"></i></div>
            <div>
              <h4 className="font-bold text-gray-900">Pan India Delivery</h4>
              <p className="text-gray-500 mt-0.5">Safe &amp; on-time delivery</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-[#385623] text-2xl"><i className="fa-solid fa-lock"></i></div>
            <div>
              <h4 className="font-bold text-gray-900">Secure Payments</h4>
              <p className="text-gray-500 mt-0.5">100% secure &amp; trusted</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-[#385623] text-2xl"><i className="fa-solid fa-headset"></i></div>
            <div>
              <h4 className="font-bold text-gray-900">Customer Support</h4>
              <p className="text-gray-500 mt-0.5">We are here to help you</p>
            </div>
          </div>
        </div>

      </main>

      {/* Mobile Filter Drawer Overlay */}
      {isMobileFilterOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs lg:hidden flex justify-end animate-fade-in"
          onClick={() => setIsMobileFilterOpen(false)}
        >
          <div 
            className="bg-white w-80 h-full p-6 shadow-2xl flex flex-col justify-between border-l border-[#e8e0d5] animate-slide-in-right overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              {/* Drawer Header */}
              <div className="flex justify-between items-center pb-4 mb-6 border-b border-[#e8e0d5]">
                <h3 className="font-serif text-lg font-bold text-gray-900">Filters</h3>
                <button 
                  onClick={() => setIsMobileFilterOpen(false)} 
                  className="text-gray-500 hover:text-[#385623] focus:outline-none p-1 cursor-pointer"
                >
                  <i className="fa-solid fa-xmark text-lg"></i>
                </button>
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                  Search Products
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Type name..."
                    className="w-full text-sm border border-[#e8e0d5] rounded-md py-2 pl-3 pr-8 focus:outline-none focus:border-[#385623] bg-gray-50"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-600"
                    >
                      <i className="fa-solid fa-xmark text-xs"></i>
                    </button>
                  )}
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                  Categories
                </label>
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  <button
                    onClick={() => {
                      setSelectedCategory("all");
                      router.push("/shop");
                    }}
                    className={`w-full text-left text-sm py-1.5 px-2 rounded transition-colors flex items-center justify-between cursor-pointer ${
                      selectedCategory === "all"
                        ? "bg-[#f5efe6] text-[#385623] font-semibold"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span>All Categories</span>
                    <span className="text-[10px] bg-gray-200 px-1.5 py-0.5 rounded-full text-gray-500">
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
                        className={`w-full text-left text-sm py-1.5 px-2 rounded transition-colors flex items-center justify-between cursor-pointer ${
                          selectedCategory === cat.slug
                            ? "bg-[#f5efe6] text-[#385623] font-semibold"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <span>{cat.name}</span>
                        <span className="text-[10px] bg-gray-200 px-1.5 py-0.5 rounded-full text-gray-500">
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
                  Price Range
                </label>
                <div className="space-y-2 text-sm text-gray-700">
                  {[
                    { label: "All Prices", value: 2000 },
                    { label: "Under ₹500", value: 500 },
                    { label: "Under ₹1000", value: 1000 },
                    { label: "Under ₹2000", value: 2000 },
                  ].map((range) => (
                    <label key={range.label} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="price-range-mobile"
                        checked={priceRange === range.value}
                        onChange={() => setPriceRange(range.value)}
                        className="border-[#e8e0d5] text-[#385623] focus:ring-[#385623] w-4 h-4 cursor-pointer"
                      />
                      <span>{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div className="pt-4 border-t border-[#e8e0d5] flex gap-3">
              <button
                onClick={() => {
                  handleClearFilters();
                  setIsMobileFilterOpen(false);
                }}
                className="flex-grow border border-[#e8e0d5] bg-white text-gray-700 hover:bg-gray-50 py-2.5 rounded-md font-semibold text-xs transition-colors shadow-sm focus:outline-none cursor-pointer"
              >
                Clear
              </button>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="flex-grow bg-[#385623] hover:bg-green-800 text-white py-2.5 rounded-md font-semibold text-xs transition-colors shadow-sm focus:outline-none cursor-pointer text-center"
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
