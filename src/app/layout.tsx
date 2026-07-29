import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Nikunj - Handcrafted with Devotion",
  description: "Beautiful handcrafted dresses & accessories for Laddu Gopal Ji, made with love by skilled homemakers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} h-full antialiased`}>
      <head>
        {/* Load FontAwesome Icons */}
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          rel="stylesheet"
          precedence="default"
        />
      </head>
      <body className="font-sans antialiased text-brand-text min-h-screen flex flex-col bg-brand-bg">
        <CartProvider>
          <WishlistProvider>
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            {/* WhatsApp Floating Chat Button */}
            <a
              href="https://wa.me/919999999999?text=Hare%20Krishna!%20I%20inquired%20from%20Nikunj%20about%20dresses%20for%20my%20deity."
              target="_blank"
              rel="noopener noreferrer"
              className="fixed bottom-20 right-4 md:bottom-8 md:right-8 z-40 bg-green-500 hover:bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform cursor-pointer group"
              aria-label="Contact on WhatsApp"
            >
              <span className="absolute -left-28 bg-brand-text text-white text-[11px] font-medium py-1.5 px-3 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-md hidden md:inline">
                Chat with Us
              </span>
              <i className="fa-brands fa-whatsapp text-2xl"></i>
              {/* Pulsing ring animation */}
              <span className="absolute inset-0 rounded-full border-2 border-green-500 animate-ping opacity-75 pointer-events-none"></span>
            </a>
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
