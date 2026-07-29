"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { products } from "@/data/products";

export default function ProductDetailPage({ params }: { params: React.Usable<{ id: string }> }) {
  const { id } = React.use(params);
  const router = useRouter();

  // Find product
  const product = products.find((p) => p.id === id);

  // States
  const [activeImage, setActiveImage] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<"specifications" | "care" | "reviews">("specifications");
  const [showSizeGuide, setShowSizeGuide] = useState<boolean>(false);
  const [sizeMode, setSizeMode] = useState<"kanha" | "manual">("manual");
  const [savedDeity, setSavedDeity] = useState<{ deityName: string; height: string } | null>(null);
  const [addedMessage, setAddedMessage] = useState<string>("");

  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  // Load saved deity measurements on load
  useEffect(() => {
    try {
      const saved = localStorage.getItem("nikunj_deity_measurements");
      if (saved) {
        const list = JSON.parse(saved);
        if (list && list.length > 0) {
          setSavedDeity(list[0]);
          setSizeMode("kanha"); // Default to saved Kanha suggestion if present
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Initialize default active image and size
  useEffect(() => {
    if (product) {
      setActiveImage(product.image);
      if (product.sizes && product.sizes.length > 0) {
        setSelectedSize(product.sizes[0]);
      }
    }
  }, [product]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center font-sans">
        <i className="fa-solid fa-triangle-exclamation text-[#2C5530] text-5xl mb-4"></i>
        <h1 className="font-serif text-3xl text-gray-900 mb-4">Product Not Found</h1>
        <p className="text-gray-500 mb-8">
          The product you are looking for does not exist or has been removed.
        </p>
        <Link
          href="/shop"
          className="bg-[#2C5530] hover:bg-green-800 text-white px-6 py-2.5 rounded-md font-medium text-sm transition-colors"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  const isFav = isWishlisted(product.id);

  // Dynamic pricing
  const originalPrice = product.price + 100;
  const savePercent = Math.round((100 / originalPrice) * 100);

  // Suggested size algorithm based on saved height
  const getSuggestedSize = (heightStr: string) => {
    const h = parseFloat(heightStr) || 3;
    if (h <= 2) return "Size 0";
    if (h <= 2.5) return "Size 1";
    if (h <= 3) return "Size 2";
    if (h <= 3.5) return "Size 3";
    if (h <= 4.5) return "Size 4";
    if (h <= 5.5) return "Size 5";
    return "Size 6";
  };

  const suggestedSize = savedDeity ? getSuggestedSize(savedDeity.height) : "Size 3";
  const suggestedDeityName = savedDeity ? savedDeity.deityName : "Shyam Sundar Ji";

  // Thumbnails images list
  const thumbnails = [
    product.image,
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBp5KyLycJx8v0e6GYrgMlETjqFgHI2eJoHRqQ6d6ANat5-t4JBW0n6IbiMzE7xHbmGUr5YZYzVhjUO7MxALoPyNQ3w5bEc7wlQ_V67ub4doNFGt_wjL8YwMRNRe4vNQeN2MeYtLTrStwv7pgnlphZzNgulHMnVqjTRrsHgIXuDXeO06WVhKSxXd3I8reQZ7oYv_uP8TE1ZTHJ73na7hQeg3PEBUihtE1D5dEzLH2IzFwUfmo1ahFomHw",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBGfuwI5vYo3vH6a02X6kZvfj4eflAsDkntZxfiXlnTDLocql6m2GhdXIi98yeacT9PrFtJnE0uRRVsosKqzNVmNTLwPpBRtnVReirOOzrZyTmNlfOZDII_Nibtc2cEs37Yd9pFd9hhieraB_K5pYCNXMbWRoIzzT4u0A0UZGFCTsxWA72p4YRWh_dBVBprtE4PUJA73_QSXvj3GrJZ3esipdnWQvYWHq5_-hmLNOpnAE5vvpG3RexKUQ",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCAuTapPj0kj60yaI-s4C1ApYRDgJTnUrXYf4FmJOE-c1-AzTZpflKldaRGgogKCIze2tuNnPYBjVnWqOWXBOCjVovmmIVLcm69QbXA9A1a6qOBZEDrrdTh7Yj3F24hEUw7KXLrob2zVSb3SZngRGSgE2_sBHtEwAhWPgLP3sprcsHajfUEc-CjaCovz_nfh90ytV0IWeVwhOQkQsv4cH4WfTUREtlFfg54E4AeMa_AAm_ZZRpm98zu4A",
  ];

  const handleAddToCart = () => {
    const finalSize = sizeMode === "kanha" ? suggestedSize : selectedSize;
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size: finalSize || "Standard Size",
      },
      quantity
    );
    setAddedMessage(`Added ${quantity}x ${product.name} (${finalSize}) to cart successfully!`);
    setTimeout(() => setAddedMessage(""), 4000);
  };

  const handleBuyNow = () => {
    const finalSize = sizeMode === "kanha" ? suggestedSize : selectedSize;
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size: finalSize || "Standard Size",
      },
      quantity
    );
    router.push("/cart");
  };

  // Get related products (same category, excluding current product)
  const relatedProducts = products
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 4);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
      
      {/* Breadcrumbs */}
      <nav className="text-xs text-gray-500 mb-8 flex items-center gap-2 font-semibold">
        <Link href="/" className="hover:text-gray-800">Home</Link> &gt; 
        <Link href="/shop" className="hover:text-gray-800">Shop</Link> &gt; 
        <Link href={`/shop?category=${product.categorySlug}`} className="hover:text-gray-800">{product.category}</Link> &gt; 
        <span className="text-gray-900 truncate max-w-[200px] sm:max-w-none">{product.name}</span>
      </nav>

      {/* Product Top Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 mb-16">
        
        {/* Gallery Thumbnails (Left) */}
        <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
          
          {/* Thumbnails list */}
          <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-x-visible pb-2 sm:pb-0 w-full sm:w-20 shrink-0">
            {thumbnails.map((imgUrl, index) => {
              const isActive = activeImage === imgUrl;
              return (
                <button
                  key={index}
                  onClick={() => setActiveImage(imgUrl)}
                  className={`w-16 h-16 sm:w-full sm:h-20 rounded-md overflow-hidden bg-gray-50 shrink-0 border-2 transition-all focus:outline-none ${
                    isActive ? "border-[#D4AF37] scale-102" : "border-transparent opacity-75 hover:opacity-100"
                  }`}
                >
                  <img
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                    src={imgUrl}
                  />
                </button>
              );
            })}
          </div>

          {/* Main Display Image */}
          <div className="flex-grow aspect-square bg-[#F3F0EB] rounded-2xl overflow-hidden relative border border-[#EAE1D0]">
            <img
              alt={product.name}
              className="w-full h-full object-cover"
              src={activeImage}
            />
            <button
              onClick={() => {
                alert("Simulating full-screen zoom preview...");
              }}
              className="absolute bottom-4 right-4 bg-white/80 backdrop-blur p-2.5 rounded-full shadow-sm hover:bg-white text-gray-800 cursor-pointer focus:outline-none"
              title="Zoom Image"
            >
              <i className="fa-solid fa-magnifying-glass-plus text-sm"></i>
            </button>
          </div>
        </div>

        {/* Product Details Info (Right) */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            
            {product.rating >= 4.5 && (
              <div className="inline-flex items-center gap-1 bg-[#EAE1D0]/60 text-[#D4AF37] px-3 py-1 rounded-full text-xs font-semibold w-fit mb-4">
                <i className="fa-solid fa-star text-[10px]"></i>
                Best Seller
              </div>
            )}
            
            <h1 className="text-3xl md:text-4xl font-serif text-gray-900 mb-2 leading-tight">
              {product.name}
            </h1>
            <p className="text-xs text-gray-500 mb-4 font-semibold">Handcrafted with love for Laddu Gopal Ji</p>

            {/* Decorative Line divider */}
            <div className="flex items-center gap-2 mb-6 w-32">
              <div className="h-px bg-[#EAE1D0] flex-grow"></div>
              <i className="fa-solid fa-om text-[#D4AF37] text-xs"></i>
              <div className="h-px bg-[#EAE1D0] flex-grow"></div>
            </div>

            {/* Reviews summary */}
            <div className="flex items-center gap-4 mb-6 text-xs leading-none">
              <div className="flex text-[#D4AF37]">
                {"★".repeat(Math.floor(product.rating))}
                {product.rating % 1 !== 0 && <i className="fa-solid fa-star-half-stroke"></i>}
              </div>
              <span className="text-gray-900 font-semibold">
                {product.rating} <span className="text-gray-500 font-normal">({product.reviewsCount} reviews)</span>
              </span>
              <span className="text-gray-300">|</span>
              <span className="text-gray-500">50+ bought in last week</span>
            </div>

            {/* Price section */}
            <div className="flex items-end gap-3 mb-6">
              <span className="text-3xl font-bold font-serif text-[#2C5530]">₹{product.price}</span>
              <span className="bg-green-100 text-green-800 text-[10px] px-2 py-1 rounded-md font-semibold mb-0.5">
                You save ₹100 ({savePercent}%)
              </span>
              <span className="text-gray-400 line-through text-xs font-semibold mb-1">₹{originalPrice}</span>
            </div>

            {/* Features Row */}
            <div className="grid grid-cols-4 gap-2 border-y border-[#EAE1D0] py-4 mb-8 text-center text-[10px] text-gray-500 font-semibold leading-relaxed">
              <div className="flex flex-col items-center gap-1.5">
                <i className="fa-solid fa-hands-praying text-[#2C5530] text-lg"></i>
                <span>Handmade<br />with Love</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <i className="fa-solid fa-certificate text-[#2C5530] text-lg"></i>
                <span>Premium<br />Quality Fabric</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <i className="fa-solid fa-circle-check text-[#2C5530] text-lg"></i>
                <span>Ready to Ship<br />Immediately</span>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <i className="fa-solid fa-rotate-left text-[#2C5530] text-lg"></i>
                <span>Easy Returns<br />Within 7 Days</span>
              </div>
            </div>

            {/* Sizing Fit Section */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3.5 text-xs font-semibold text-gray-800">
                <span>Perfect Fit for Your Kanha</span>
                <button
                  onClick={() => setShowSizeGuide(true)}
                  className="text-[#2C5530] hover:underline cursor-pointer focus:outline-none"
                >
                  How it works? ⓘ
                </button>
              </div>

              {sizeMode === "kanha" ? (
                /* Saved Deity Suggestion Card */
                <div className="bg-[#F3F0EB] p-4 rounded-xl border border-[#EAE1D0] flex items-center justify-between mb-4 animate-fade-in">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white p-2 flex items-center justify-center text-[#2C5530]">
                      <i className="fa-solid fa-dharmachakra text-lg"></i>
                    </div>
                    <div className="text-xs">
                      <p className="font-semibold text-gray-900">Suggested Size: {suggestedSize}</p>
                      <p className="text-gray-500 mt-0.5">Based on saved measurements for {suggestedDeityName}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSizeMode("manual")}
                    className="text-[10px] border border-gray-300 px-3 py-1.5 rounded-lg bg-white hover:bg-gray-50 font-bold transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <i className="fa-solid fa-pen text-[8px]"></i> Manual Grid
                  </button>
                </div>
              ) : (
                /* Manual Grid selection */
                <div className="space-y-3.5 animate-fade-in">
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-2 px-3 border text-xs rounded-md transition-all font-semibold cursor-pointer ${
                          selectedSize === size
                            ? "border-[#2C5530] bg-[#2C5530] text-white shadow-xs"
                            : "border-gray-200 bg-white text-gray-700 hover:border-[#2C5530]"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Mode toggles */}
              <div className="grid grid-cols-2 gap-3 mt-4 text-xs font-semibold text-gray-700">
                <button
                  onClick={() => setSizeMode("kanha")}
                  className={`border p-3 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                    sizeMode === "kanha" ? "border-[#2C5530] bg-white text-[#2C5530]" : "border-[#EAE1D0] bg-transparent hover:border-[#2C5530]"
                  }`}
                >
                  <i className="fa-solid fa-circle-user text-sm"></i>
                  <span>Select Your Kanha</span>
                  <span className="text-[9px] text-gray-400 font-normal">Use saved details</span>
                </button>
                <button
                  onClick={() => setSizeMode("manual")}
                  className={`border p-3 rounded-xl flex flex-col items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                    sizeMode === "manual" ? "border-[#2C5530] bg-white text-[#2C5530]" : "border-[#EAE1D0] bg-transparent hover:border-[#2C5530]"
                  }`}
                >
                  <i className="fa-solid fa-ruler-combined text-sm"></i>
                  <span>Select Size Manually</span>
                  <span className="text-[9px] text-gray-400 font-normal">Pick specific diameter</span>
                </button>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                Quantity
              </label>
              <div className="flex items-center border border-gray-300 w-24 rounded-md overflow-hidden bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 py-1.5 text-gray-800 hover:bg-gray-50 font-bold focus:outline-none"
                >
                  -
                </button>
                <span className="flex-grow text-center text-xs font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 py-1.5 text-gray-800 hover:bg-gray-50 font-bold focus:outline-none"
                >
                  +
                </button>
              </div>
            </div>

          </div>

          {/* Action buttons */}
          <div className="space-y-4">
            {addedMessage && (
              <div className="text-xs bg-green-50 text-green-700 p-2.5 rounded-lg border border-green-200 flex items-center gap-1.5 animate-fade-in-down font-medium">
                <i className="fa-solid fa-circle-check"></i> {addedMessage}
              </div>
            )}

            <div className="flex gap-3 text-sm">
              <button
                onClick={handleAddToCart}
                className="flex-grow bg-[#2C5530] hover:bg-green-800 text-white py-3.5 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                <i className="fa-solid fa-cart-shopping"></i> Add To Cart
              </button>
              
              <button
                onClick={() =>
                  toggleWishlist({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                  })
                }
                className={`w-14 h-[48px] border rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
                  isFav
                    ? "border-red-200 bg-red-50 text-red-500"
                    : "border-[#EAE1D0] bg-white text-gray-500 hover:text-red-500 hover:border-red-500"
                }`}
                title="Add to Wishlist"
              >
                <i className={`${isFav ? "fa-solid fa-heart" : "fa-regular fa-heart"} text-lg`}></i>
              </button>
            </div>

            <button
              onClick={handleBuyNow}
              className="w-full bg-[#EAE1D0]/60 text-gray-900 py-3.5 rounded-lg font-semibold border border-[#EAE1D0] hover:bg-[#EAE1D0] transition-colors cursor-pointer"
            >
              Buy Now
            </button>

            {/* Micro Trust Badges */}
            <div className="flex justify-between border-t border-[#EAE1D0] pt-6 mt-6 text-[10px] text-gray-500 font-semibold">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-truck text-[#2C5530] text-sm shrink-0"></i>
                <div>
                  <p className="font-bold text-gray-800">Pan India Delivery</p>
                  <p className="font-normal text-gray-400">3-5 working days</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-lock text-[#2C5530] text-sm shrink-0"></i>
                <div>
                  <p className="font-bold text-gray-800">Secure Payments</p>
                  <p className="font-normal text-gray-400">100% secure &amp; trusted</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-box text-[#2C5530] text-sm shrink-0"></i>
                <div>
                  <p className="font-bold text-gray-800">Gift Packaging</p>
                  <p className="font-normal text-gray-400">Available at checkout</p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </section>

      {/* Tabs Specifications Section */}
      <div className="mb-20 bg-white border border-[#EAE1D0] rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex gap-4 border-b border-gray-100 pb-3 mb-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab("specifications")}
            className={`text-sm font-semibold whitespace-nowrap pb-2 border-b-2 transition-colors focus:outline-none cursor-pointer ${
              activeTab === "specifications"
                ? "border-[#2C5530] text-[#2C5530]"
                : "border-transparent text-gray-400 hover:text-gray-700"
            }`}
          >
            Specifications
          </button>
          <button
            onClick={() => setActiveTab("care")}
            className={`text-sm font-semibold whitespace-nowrap pb-2 border-b-2 transition-colors focus:outline-none cursor-pointer ${
              activeTab === "care"
                ? "border-[#2C5530] text-[#2C5530]"
                : "border-transparent text-gray-400 hover:text-gray-700"
            }`}
          >
            Care Instructions
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`text-sm font-semibold whitespace-nowrap pb-2 border-b-2 transition-colors focus:outline-none cursor-pointer ${
              activeTab === "reviews"
                ? "border-[#2C5530] text-[#2C5530]"
                : "border-transparent text-gray-400 hover:text-gray-700"
            }`}
          >
            Reviews ({product.reviewsCount})
          </button>
        </div>

        {activeTab === "specifications" && (
          <ul className="space-y-3.5 text-xs text-gray-600 list-disc pl-5 leading-relaxed">
            {product.details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
            <li>Deity Suitability: Ideal for Laddu Gopal / Kanha Ji / Bal Gopal Ji models</li>
            <li>Artisanal touch: Handcrafted by skilled homemakers under clean, prayerful conditions</li>
          </ul>
        )}

        {activeTab === "care" && (
          <div className="text-xs text-gray-600 space-y-3 leading-relaxed">
            <p><strong>Devotional Cleanliness:</strong> We recommend placing and unpacking the attire in a clean space inside your puja room.</p>
            <p><strong>Washing:</strong> For heavy velvet, silk, or zari border dresses, dry clean is strictly recommended to keep the colors and shine intact.</p>
            <p><strong>Ironing:</strong> Iron on extremely low heat from the reverse side using a protective cloth layer. Do not iron directly on stones or embroidery.</p>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 gap-4">
              <div>
                <span className="text-3xl font-bold text-gray-900">{product.rating}</span>
                <span className="text-gray-400 text-xs ml-2">out of 5 stars</span>
                <div className="text-[#D4AF37] text-xs flex gap-0.5 mt-1">
                  {"★".repeat(Math.floor(product.rating))}
                  {product.rating % 1 !== 0 && <i className="fa-solid fa-star-half-stroke"></i>}
                </div>
              </div>
              <button 
                onClick={() => alert("Simulating writing review...")}
                className="bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-semibold text-xs py-2 px-4 rounded-lg transition-colors shadow-xs cursor-pointer"
              >
                Write a Review
              </button>
            </div>
            
            <div className="divide-y divide-gray-100">
              <div className="py-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-semibold text-gray-800">Radhika Sharma</span>
                  <span className="text-[10px] text-gray-400 font-semibold">2 weeks ago</span>
                </div>
                <div className="text-[#D4AF37] text-[10px] flex gap-0.5 mb-2">
                  {"★".repeat(5)}
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Beautiful work! The fitting of the {product.name} is absolutely perfect for my Size 2 Ladoo Gopal. The quality of fabric and the embroidery work is outstanding. Jay Shree Krishna!
                </p>
              </div>
              <div className="py-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-semibold text-gray-800">Aman Gupta</span>
                  <span className="text-[10px] text-gray-400 font-semibold">1 month ago</span>
                </div>
                <div className="text-[#D4AF37] text-[10px] flex gap-0.5 mb-2">
                  {"★".repeat(4)}<i className="fa-regular fa-star"></i>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Good product. Fabric feels premium and stitching is neat. The packing was beautiful, and delivery was fast. Recommended for Janmashtami.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Related Products Grid */}
      {relatedProducts.length > 0 && (
        <section className="mb-10">
          <div className="text-center mb-10 flex items-center justify-center">
            <div className="h-px bg-[#EAE1D0] w-12 mr-4"></div>
            <h2 className="font-serif text-2xl text-gray-900">You May Also Like</h2>
            <div className="h-px bg-[#EAE1D0] w-12 ml-4"></div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {relatedProducts.map((p) => {
              const isPfav = isWishlisted(p.id);
              return (
                <div
                  key={p.id}
                  className="group bg-white rounded-xl border border-[#e8e0d5] overflow-hidden hover:shadow-lg transition-shadow relative flex flex-col justify-between"
                >
                  <button
                    onClick={() =>
                      toggleWishlist({
                        id: p.id,
                        name: p.name,
                        price: p.price,
                        image: p.image,
                      })
                    }
                    className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/80 backdrop-blur rounded-full flex items-center justify-center text-gray-500 hover:text-red-500 hover:bg-white transition-colors cursor-pointer"
                  >
                    <i className={isPfav ? "fa-solid fa-heart text-red-500" : "fa-regular fa-heart"}></i>
                  </button>

                  <Link href={`/shop/${p.id}`} className="block overflow-hidden flex-grow">
                    <div className="aspect-[4/5] overflow-hidden bg-gray-50">
                      <img
                        alt={p.name}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        src={p.image}
                      />
                    </div>
                    <div className="p-4 pb-2 text-xs">
                      <span className="text-[10px] text-[#385623] font-semibold uppercase tracking-wider block mb-1">
                        {p.category}
                      </span>
                      <h3 className="font-semibold text-gray-900 truncate group-hover:text-[#385623] transition-colors text-sm mb-1.5">
                        {p.name}
                      </h3>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-[#385623] text-base font-serif">₹{p.price}</span>
                      </div>
                    </div>
                  </Link>

                  <div className="p-4 pt-0">
                    <div className="flex items-center justify-between mt-1 pt-3 border-t border-gray-100">
                      <div className="flex items-center text-xs">
                        <div className="text-[#c9a25b] flex space-x-0.5">
                          {"★".repeat(Math.round(p.rating))}
                          {p.rating % 1 !== 0 && (
                            <i className="fa-solid fa-star-half-stroke text-[10px]"></i>
                          )}
                        </div>
                        <span className="text-gray-400 ml-1 text-[10px]">
                          ({p.reviewsCount})
                        </span>
                      </div>
                      
                      <button
                        onClick={() =>
                          addToCart(
                            {
                              id: p.id,
                              name: p.name,
                              price: p.price,
                              image: p.image,
                              size: p.sizes[0] || "Standard Size",
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
        </section>
      )}

      {/* Size Guide Modal Overlay */}
      {showSizeGuide && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-xl shadow-2xl border border-[#EAE1D0] overflow-hidden">
            <div className="p-4 border-b border-[#EAE1D0] flex justify-between items-center bg-[#F3F0EB]">
              <h3 className="font-serif text-lg font-bold text-gray-900 flex items-center gap-1.5">
                <i className="fa-solid fa-ruler-combined text-[#2C5530]"></i> Ladoo Gopal Size Chart
              </h3>
              <button
                onClick={() => setShowSizeGuide(false)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none p-1 cursor-pointer"
              >
                <i className="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>
            
            <div className="p-6">
              <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                Measure the height of your Laddu Gopal Ji (from head to toe) or from shoulder to floor to select the best dress size:
              </p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left text-gray-800 border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-gray-500 border-b border-gray-200">
                      <th className="p-2.5 font-semibold">Gopal Ji Size</th>
                      <th className="p-2.5 font-semibold">Height (Head to Toe)</th>
                      <th className="p-2.5 font-semibold">Standard Dress Diameter</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[
                      { s: "Size 0", h: "Up to 2 inches", d: "4 inches (10 cm)" },
                      { s: "Size 1", h: "2 to 2.5 inches", d: "5 inches (12.5 cm)" },
                      { s: "Size 2", h: "2.5 to 3 inches", d: "6 inches (15 cm)" },
                      { s: "Size 3", h: "3 to 3.5 inches", d: "7 inches (18 cm)" },
                      { s: "Size 4", h: "3.5 to 4.5 inches", d: "8 inches (20 cm)" },
                      { s: "Size 5", h: "4.5 to 5.5 inches", d: "9 inches (23 cm)" },
                      { s: "Size 6", h: "5.5 to 6.5 inches", d: "10 inches (25 cm)" },
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-gray-50/50">
                        <td className="p-2.5 font-bold text-[#2C5530]">{row.s}</td>
                        <td className="p-2.5 text-gray-600">{row.h}</td>
                        <td className="p-2.5 text-gray-600">{row.d}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4 bg-[#F3F0EB] p-3 rounded-lg border border-[#EAE1D0]/40 text-[11px] text-gray-500 italic leading-relaxed">
                <strong>Tip:</strong> If your Gopal Ji is healthy (wider shoulders), we suggest ordering one size up for a comfortable drape.
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 border-t border-gray-100 text-right">
              <button
                onClick={() => setShowSizeGuide(false)}
                className="bg-[#2C5530] hover:bg-green-800 text-white text-xs font-semibold py-2.5 px-6 rounded-lg transition-colors shadow-sm cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
