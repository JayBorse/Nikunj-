"use client";

import React, { useState } from "react";
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
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<"specifications" | "care" | "reviews">("specifications");
  const [showSizeGuide, setShowSizeGuide] = useState<boolean>(false);
  const [addedMessage, setAddedMessage] = useState<string>("");

  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <i className="fa-solid fa-triangle-exclamation text-brand-green text-5xl mb-4"></i>
        <h1 className="font-serif text-3xl text-brand-text mb-4">Product Not Found</h1>
        <p className="text-brand-text-light mb-8">
          The product you are looking for does not exist or has been removed.
        </p>
        <Link
          href="/shop"
          className="bg-brand-green hover:bg-brand-green-hover text-white px-6 py-2.5 rounded-md font-medium text-sm transition-colors"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  // Set default size
  if (!selectedSize && product.sizes && product.sizes.length > 0) {
    setSelectedSize(product.sizes[0]);
  }

  const isFav = isWishlisted(product.id);

  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size: selectedSize,
      },
      quantity
    );
    setAddedMessage("Added to cart successfully!");
    setTimeout(() => setAddedMessage(""), 3000);
  };

  const handleBuyNow = () => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size: selectedSize,
      },
      quantity
    );
    router.push("/cart");
  };

  // Get related products (same category, excluding current product)
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Breadcrumbs */}
      <div className="text-xs text-brand-text-light mb-8 flex items-center gap-2">
        <Link href="/" className="hover:text-brand-green">Home</Link>
        <i className="fa-solid fa-chevron-right text-[8px]"></i>
        <Link href="/shop" className="hover:text-brand-green">Shop</Link>
        <i className="fa-solid fa-chevron-right text-[8px]"></i>
        <Link href={`/shop?category=${product.categorySlug}`} className="hover:text-brand-green">
          {product.category}
        </Link>
        <i className="fa-solid fa-chevron-right text-[8px]"></i>
        <span className="text-brand-text font-medium truncate max-w-[200px] sm:max-w-none">
          {product.name}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 mb-20 bg-white border border-brand-border rounded-2xl p-6 sm:p-8 shadow-sm">
        
        {/* Product Image Column */}
        <div className="aspect-square w-full max-h-[500px] overflow-hidden rounded-xl bg-brand-bg border border-brand-border flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Product Info Column */}
        <div className="flex flex-col justify-between">
          <div>
            <span className="text-xs font-semibold text-brand-green uppercase tracking-wider bg-brand-card py-1 px-3 rounded-full border border-brand-border/40 w-fit block mb-3">
              {product.category}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-medium text-brand-text mb-2">
              {product.name}
            </h1>
            
            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="text-yellow-400 text-sm flex gap-0.5">
                {"★".repeat(Math.floor(product.rating))}
                {product.rating % 1 !== 0 && <i className="fa-solid fa-star-half-stroke"></i>}
              </div>
              <span className="text-xs text-brand-text-light font-medium">
                ({product.reviewsCount} verified customer reviews)
              </span>
            </div>

            {/* Price */}
            <div className="text-3xl font-semibold text-brand-text mb-6">
              ₹{product.price}
              <span className="text-xs text-brand-text-light font-normal ml-2">
                (Inclusive of all taxes)
              </span>
            </div>

            {/* Description */}
            <p className="text-brand-text-light text-sm leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Sizes */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-brand-text-light">
                  Select Gopal Ji Size
                </label>
                <button
                  onClick={() => setShowSizeGuide(true)}
                  className="text-xs text-brand-green hover:underline font-medium cursor-pointer"
                >
                  <i className="fa-solid fa-ruler-horizontal mr-1 text-[10px]"></i> Size Chart Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 px-3 border text-xs rounded-md transition-all font-medium ${
                      selectedSize === size
                        ? "border-brand-green bg-brand-green text-white shadow-sm"
                        : "border-brand-border bg-white text-brand-text hover:bg-brand-bg"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <label className="block text-xs font-semibold uppercase tracking-wider text-brand-text-light mb-2">
                Quantity
              </label>
              <div className="flex items-center border border-brand-border w-24 rounded-md overflow-hidden bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 py-1.5 text-brand-text hover:bg-brand-bg transition-colors font-semibold"
                >
                  -
                </button>
                <span className="flex-grow text-center text-sm font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 py-1.5 text-brand-text hover:bg-brand-bg transition-colors font-semibold"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div>
            {addedMessage && (
              <div className="mb-3 text-xs bg-green-50 text-green-700 p-2 rounded border border-green-200 flex items-center gap-1.5 animate-fade-in-down">
                <i className="fa-solid fa-circle-check"></i> {addedMessage}
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-grow bg-white hover:bg-brand-bg text-brand-green border-2 border-brand-green py-3 rounded-md font-medium text-sm transition-colors shadow-sm focus:outline-none flex items-center justify-center gap-2"
              >
                <i className="fa-solid fa-cart-shopping"></i> Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-grow bg-brand-green hover:bg-brand-green-hover text-white py-3 rounded-md font-medium text-sm transition-colors shadow-md focus:outline-none flex items-center justify-center gap-2"
              >
                Buy It Now
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
                className={`p-3 border rounded-md transition-colors focus:outline-none flex items-center justify-center ${
                  isFav
                    ? "border-red-200 bg-red-50 text-red-500"
                    : "border-brand-border bg-white text-brand-text hover:bg-brand-bg"
                }`}
                title="Add to Wishlist"
              >
                <i className={`${isFav ? "fa-solid fa-heart" : "fa-regular fa-heart"} text-lg`}></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mb-20 bg-white border border-brand-border rounded-xl p-6 sm:p-8 shadow-sm">
        <div className="flex gap-4 border-b border-brand-border pb-3 mb-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab("specifications")}
            className={`text-sm font-semibold whitespace-nowrap pb-2 border-b-2 transition-colors focus:outline-none ${
              activeTab === "specifications"
                ? "border-brand-green text-brand-green"
                : "border-transparent text-brand-text-light hover:text-brand-text"
            }`}
          >
            Specifications
          </button>
          <button
            onClick={() => setActiveTab("care")}
            className={`text-sm font-semibold whitespace-nowrap pb-2 border-b-2 transition-colors focus:outline-none ${
              activeTab === "care"
                ? "border-brand-green text-brand-green"
                : "border-transparent text-brand-text-light hover:text-brand-text"
            }`}
          >
            Care Instructions
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`text-sm font-semibold whitespace-nowrap pb-2 border-b-2 transition-colors focus:outline-none ${
              activeTab === "reviews"
                ? "border-brand-green text-brand-green"
                : "border-transparent text-brand-text-light hover:text-brand-text"
            }`}
          >
            Reviews ({product.reviewsCount})
          </button>
        </div>

        {activeTab === "specifications" && (
          <ul className="space-y-3.5 text-sm text-brand-text-light list-disc pl-5">
            {product.details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
            <li>Deity Suitability: Ideal for Laddu Gopal / Kanha Ji / Bal Gopal Ji models</li>
            <li>Artisanal touch: Handcrafted by skilled homemakers under clean, prayerful conditions</li>
          </ul>
        )}

        {activeTab === "care" && (
          <div className="text-sm text-brand-text-light space-y-3 leading-relaxed">
            <p><strong>Devotional Cleanliness:</strong> We recommend placing and unpacking the attire in a clean space inside your puja room.</p>
            <p><strong>Washing:</strong> For heavy velvet, silk, or zari border dresses, dry clean is strictly recommended to keep the colors and shine intact.</p>
            <p><strong>Ironing:</strong> Iron on extremely low heat from the reverse side using a protective cloth layer. Do not iron directly on stones or embroidery.</p>
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-brand-bg gap-4">
              <div>
                <span className="text-3xl font-bold text-brand-text">{product.rating}</span>
                <span className="text-brand-text-light text-sm ml-2">out of 5 stars</span>
                <div className="text-yellow-400 text-sm flex gap-0.5 mt-1">
                  {"★".repeat(Math.floor(product.rating))}
                  {product.rating % 1 !== 0 && <i className="fa-solid fa-star-half-stroke"></i>}
                </div>
              </div>
              <button className="bg-white hover:bg-brand-bg border border-brand-border text-brand-text font-medium text-xs py-2 px-4 rounded-md transition-colors shadow-sm">
                Write a Review
              </button>
            </div>
            
            <div className="divide-y divide-brand-bg">
              <div className="py-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-semibold text-brand-text">Radhika Sharma</span>
                  <span className="text-[10px] text-brand-text-light">2 weeks ago</span>
                </div>
                <div className="text-yellow-400 text-xs flex gap-0.5 mb-2">
                  {"★".repeat(5)}
                </div>
                <p className="text-sm text-brand-text-light leading-relaxed">
                  Beautiful work! The fitting of the {product.name} is absolutely perfect for my Size 2 Ladoo Gopal. The quality of fabric and the embroidery work is outstanding. Jay Shree Krishna!
                </p>
              </div>
              <div className="py-4">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-semibold text-brand-text">Aman Gupta</span>
                  <span className="text-[10px] text-brand-text-light">1 month ago</span>
                </div>
                <div className="text-yellow-400 text-xs flex gap-0.5 mb-2">
                  {"★".repeat(4)}<i className="fa-regular fa-star"></i>
                </div>
                <p className="text-sm text-brand-text-light leading-relaxed">
                  Good product. Fabric feels premium and stitching is neat. The packing was beautiful, and delivery was fast. Recommended for Janmashtami.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mb-10">
          <div className="text-center mb-10 flex items-center justify-center">
            <div className="h-px bg-brand-border w-12 mr-4"></div>
            <h2 className="font-serif text-2xl text-brand-text">You May Also Like</h2>
            <div className="h-px bg-brand-border w-12 ml-4"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => {
              const isPfav = isWishlisted(p.id);
              return (
                <div
                  key={p.id}
                  className="bg-white rounded-xl overflow-hidden border border-brand-border shadow-sm group flex flex-col justify-between relative"
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
                    className="absolute top-3 right-3 z-10 w-8 h-8 bg-white/80 rounded-full flex items-center justify-center text-brand-text hover:text-red-500 transition-colors shadow-sm focus:outline-none"
                  >
                    <i className={`${isPfav ? "fa-solid fa-heart text-red-500" : "fa-regular fa-heart"}`}></i>
                  </button>
                  <Link href={`/shop/${p.id}`} className="block overflow-hidden flex-grow">
                    <div className="aspect-square bg-gray-100 relative overflow-hidden">
                      <img
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        src={p.image}
                      />
                    </div>
                    <div className="p-4 pb-2">
                      <h3 className="font-medium text-brand-text mb-1 truncate group-hover:text-brand-green transition-colors">
                        {p.name}
                      </h3>
                      <span className="text-xs text-brand-text-light">₹{p.price}</span>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Size Guide Modal Overlay */}
      {showSizeGuide && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-xl shadow-2xl border border-brand-border overflow-hidden">
            <div className="p-4 border-b border-brand-border flex justify-between items-center bg-brand-card">
              <h3 className="font-serif text-lg font-medium text-brand-text flex items-center gap-1.5">
                <i className="fa-solid fa-ruler-combined text-brand-green"></i> Ladoo Gopal Size Chart
              </h3>
              <button
                onClick={() => setShowSizeGuide(false)}
                className="text-brand-text-light hover:text-brand-text focus:outline-none p-1"
              >
                <i className="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>
            
            <div className="p-6">
              <p className="text-xs text-brand-text-light mb-4">
                Measure the height of your Laddu Gopal Ji (from head to toe) or from shoulder to floor to select the best dress size:
              </p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left text-brand-text border-collapse">
                  <thead>
                    <tr className="bg-brand-bg text-brand-text-light border-b border-brand-border">
                      <th className="p-2 font-semibold">Gopal Ji Size</th>
                      <th className="p-2 font-semibold">Height (Head to Toe)</th>
                      <th className="p-2 font-semibold">Standard Dress Diameter</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border/60">
                    <tr>
                      <td className="p-2 font-semibold text-brand-green">Size 0</td>
                      <td className="p-2">Up to 2 inches</td>
                      <td className="p-2">4 inches (10 cm)</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-semibold text-brand-green">Size 1</td>
                      <td className="p-2">2 to 2.5 inches</td>
                      <td className="p-2">5 inches (12.5 cm)</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-semibold text-brand-green">Size 2</td>
                      <td className="p-2">2.5 to 3 inches</td>
                      <td className="p-2">6 inches (15 cm)</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-semibold text-brand-green">Size 3</td>
                      <td className="p-2">3 to 3.5 inches</td>
                      <td className="p-2">7 inches (18 cm)</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-semibold text-brand-green">Size 4</td>
                      <td className="p-2">3.5 to 4.5 inches</td>
                      <td className="p-2">8 inches (20 cm)</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-semibold text-brand-green">Size 5</td>
                      <td className="p-2">4.5 to 5.5 inches</td>
                      <td className="p-2">9 inches (23 cm)</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-semibold text-brand-green">Size 6</td>
                      <td className="p-2">5.5 to 6.5 inches</td>
                      <td className="p-2">10 inches (25 cm)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="mt-4 bg-brand-card p-3 rounded-lg border border-brand-border/40 text-[11px] text-brand-text-light italic leading-relaxed">
                <strong>Tip:</strong> If your Gopal Ji is healthy (wider shoulders), we suggest ordering one size up for a comfortable drape.
              </div>
            </div>
            
            <div className="p-4 bg-brand-bg/50 border-t border-brand-border text-right">
              <button
                onClick={() => setShowSizeGuide(false)}
                className="bg-brand-green hover:bg-brand-green-hover text-white text-xs font-semibold py-2 px-4 rounded transition-colors shadow-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
