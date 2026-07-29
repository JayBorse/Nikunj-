export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  categorySlug: string;
  image: string;
  rating: number;
  reviewsCount: number;
  description: string;
  details: string[];
  sizes: string[];
}

export const products: Product[] = [
  {
    id: "1",
    name: "Royal Peacock Dress",
    price: 499,
    category: "Dresses",
    categorySlug: "dresses",
    image: "/royal peacock dress.PNG",
    rating: 5,
    reviewsCount: 128,
    description: "An exquisite royal blue dress embroidered with stunning peacock feather motifs. Perfect for festive occasions and Janmashtami celebrations. Crafted with high-grade silk blend fabric, soft inner lining, and elegant zari border work.",
    details: [
      "Material: Silk Blend with soft cotton lining",
      "Embroidery: Zari and thread peacock design",
      "Included: Dress + matching Patka (scarf)",
      "Care: Dry clean recommended, or gentle handwash in cold water"
    ],
    sizes: ["Size 0 (4\")", "Size 1 (5\")", "Size 2 (6\")", "Size 3 (7\")", "Size 4 (8\")", "Size 5 (9\")", "Size 6 (10\")"]
  },
  {
    id: "2",
    name: "Summer Cotton Set",
    price: 399,
    category: "Dresses",
    categorySlug: "dresses",
    image: "/summer cotton set.PNG",
    rating: 4.5,
    reviewsCount: 96,
    description: "Keep your Laddu Gopal Ji cool and comfortable in this pure handblock printed cotton dress. Lightweight, breathable, and designed for daily summer wear with easy knot closure.",
    details: [
      "Material: 100% Pure Organic Cotton",
      "Pattern: Jaipur Handblock print",
      "Included: Flared dress + matching Pagdi band",
      "Care: Machine washable, easy maintenance"
    ],
    sizes: ["Size 0 (4\")", "Size 1 (5\")", "Size 2 (6\")", "Size 3 (7\")", "Size 4 (8\")"]
  },
  {
    id: "3",
    name: "Floral Yellow Dress",
    price: 549,
    category: "Dresses",
    categorySlug: "dresses",
    image: "/floral yellow dress.PNG",
    rating: 4,
    reviewsCount: 84,
    description: "A bright and festive yellow dress decorated with lovely hand-attached silk rose accents and lace borders. Gives a spring garden feel, ideal for Basant Panchami or daily Shringar.",
    details: [
      "Material: Organza and Satin",
      "Accents: Hand-applied ribbon flowers, pearl border",
      "Included: Heavy dress + floral necklace band",
      "Care: Spot clean only"
    ],
    sizes: ["Size 0 (4\")", "Size 1 (5\")", "Size 2 (6\")", "Size 3 (7\")", "Size 4 (8\")", "Size 5 (9\")"]
  },
  {
    id: "4",
    name: "Designer Velvet Dress",
    price: 799,
    category: "Dresses",
    categorySlug: "dresses",
    image: "/Designer yellow dress.PNG",
    rating: 5,
    reviewsCount: 66,
    description: "Warm, premium velvet dress adorned with intricate golden dabka and stone embroidery. Specially made for winters to keep your Gopal Ji cozy and stunning during evening aartis.",
    details: [
      "Material: Premium Micro-Velvet",
      "Work: Hand-done zardozi, stonework, and dabka",
      "Included: Velvet dress + matching crown cap",
      "Care: Dry clean only"
    ],
    sizes: ["Size 1 (5\")", "Size 2 (6\")", "Size 3 (7\")", "Size 4 (8\")", "Size 5 (9\")", "Size 6 (10\")"]
  },
  {
    id: "5",
    name: "Royal Peacock Mukut",
    price: 249,
    category: "Mukut",
    categorySlug: "mukut",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBGYI__IlQVew4qeFLBxDMQATKEWhpGc49CbtzvswM_htr9LabNJryavrDbz58M0A3pKGzjpHEGWrmQYMmlPweuA7jsTOuUEg8rh2XbxFhPSZaoMCUUJJDx1VKDvFgY-_0wZx0qUsZzq1nl9tSL3YJ6JpSgNBdZhWJR72YCk7jzZHZLU8wE-FjHfrZPJ-2Y63-7Bjb5pZu9SAoaVVgIPBYN1X5ElBZnpUU0UB__-g8yFmab3lRUBl9Kmg",
    rating: 4.8,
    reviewsCount: 42,
    description: "Stunning handcrafted crown decorated with peacock feathers, artificial pearls, and Kundan stones. Fits securely on various size wigs.",
    details: [
      "Material: Metal base, stones, real peacock feathers",
      "Style: Traditional Crown (Mukut)",
      "Care: Keep away from water and direct perfume"
    ],
    sizes: ["Size 0-2 (Small)", "Size 3-4 (Medium)", "Size 5-6 (Large)"]
  },
  {
    id: "6",
    name: "Pearl Haar Jewellery Set",
    price: 199,
    category: "Jewellery",
    categorySlug: "jewellery",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDlRrMpc3jMI_lbmK2honBHNJgYMHuRuf9GlTyCC5OvII2TEJUXL1-N-b_UACEdEa4l3ix9_Uo_2kl6s8hrsO_Jb3L6KjriPtdlnBK98sd6ORaNEtFXDhk_djej14_uGNQq31nPFaLJGnOk_pIrq46As0Briq8dI1-Ydn40rqhduLLGJc4R6NHJqU8EvnhV8RONzSGqdq-4flxcB61os5HBOt04yQQ0D3sFahfeLMvdVK2XqfL28j8zcA",
    rating: 4.7,
    reviewsCount: 51,
    description: "An elegant combination of multi-layered faux pearl necklaces, matching earrings (Kundals), and a waist belt (Kamarbandh) designed specifically for deity sizes.",
    details: [
      "Included: 1 Necklace, 2 Earrings, 1 Kamarbandh",
      "Colors: White pearl with gold accents",
      "Size: Flexible chain fits sizes 1 to 5"
    ],
    sizes: ["One Size Fits Most"]
  },
  {
    id: "7",
    name: "Royal Carved Wooden Jhula",
    price: 1299,
    category: "Jhula",
    categorySlug: "jhula",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAJ8ecWSMNETSYjI87ZSsG0BBQSeMfwc8Y1DxvtdQsopB188kvXQKrfSCXN8v5_Eh22hZ2IAvECUuX0kWTBy1cpnfF8FCVcXggrhou2CHxKbuy3n-HumnS_WsUuGiKoydDdbhbFqbtP0sYhxumAO6bVoIoo4lrfPzpemkqoyRP5G5dkcFe-gtmBkPGlSj4x8A7DKoy9Y8i2SgrPeVTz7CrqOu9Jfw9nmHZIWw7CYI1K_ftpsDQzZwkXkQ",
    rating: 4.9,
    reviewsCount: 35,
    description: "Beautifully hand-carved mango wood swing with velvet cushions. Designed with a smooth swinging mechanism and traditional Rajasthani painting style.",
    details: [
      "Material: Mango wood with metal joints",
      "Dimensions: Height: 10\", Width: 8\", Depth: 5\"",
      "Cushioning: Red velvet padded base"
    ],
    sizes: ["Deity Size 0-3", "Deity Size 4-6"]
  },
  {
    id: "8",
    name: "Golden Designer Baansuri",
    price: 149,
    category: "Baansuri",
    categorySlug: "baansuri",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCxNTvUB6k6CDexzvAPQM9FMuq32gdte5rVUDVdHOLMN0RX0Qn7wSo9hgxHzRLIu-hrBJJ137NDEnXnxZkOmBfuD_xg9luVvW2wblpvLH59ziS2fE3_6qsCXyVcWKDkLHsO_EY_OkJbeCnjom7ofZKAHAlTR7s55F-VWGnv5ZzTJfTDbxynDxc70tNWxiOkVz6oRBY0jcRqwyTrwmMSUiZ2L--Y96qWosuBamGU_IhOqCUfXGB_FZ_wgg",
    rating: 4.6,
    reviewsCount: 78,
    description: "Miniature brass flute embellished with colored stones, beads, and a tiny hanging tassel. Made to sit perfectly in Laddu Gopal Ji's hands.",
    details: [
      "Material: Gold-plated metal brass",
      "Length: 3 inches",
      "Colors: Red/Green/Blue beads (assorted)"
    ],
    sizes: ["Small (2\")", "Medium (3\")", "Large (4\")"]
  },
  {
    id: "9",
    name: "Premium Curly Hair Wig",
    price: 99,
    category: "Wig / Hair",
    categorySlug: "wig-hair",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBAhYT7sAH2J1eA8TJ9QhZ7TGCOI_WjmEWyYorDVBlGN3rKtuufSI5OFpHvhNckUxpYWZCVNZfK3rvXwjAYzX0veVzrs-05t6wtA2pC7JtE26iUBBprgwVQ4bC2DrtopoiIsITLsvbDn0ls1CYSgUgWh882HeWVWyOBCmZnTh5-DXy8pu_k-_YfsPIJLh2fB3ZMckhlWmTMDJg7QEdzNzqvSeZSeL-AkBFoa3NOHhwOmS2Qu-2euDjkgQ",
    rating: 4.3,
    reviewsCount: 112,
    description: "High-quality soft synthetic curly hair wig in deep black. Provides a beautiful natural look and adjusts easily onto the head of the deity.",
    details: [
      "Material: Heat-resistant synthetic fibers",
      "Color: Jet Black",
      "Fit: Elastic mesh base"
    ],
    sizes: ["Size 0-1", "Size 2-3", "Size 4-5", "Size 6"]
  },
  {
    id: "10",
    name: "Pure Ashtagandha Chandan",
    price: 120,
    category: "Chandan",
    categorySlug: "chandan",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC0FOKgboGPAA-H91Bx1K4Iau5UFUytjZcjJDu3wiasQSOWsvZZ6wmJD4RQwNMZZJYHBB2UN9eXelSlb2weUqHHbPS930qD2-bdwp6e7XgBUCRI7CFO-8WFK0-rN8C5IboLinnqq2UQUdYgpC4ny_1PK85SuM58VMQ7w_arwxKZXSQi6n1StB-_3wssTR-7CG65U6LQ8blP1UAk_uNd9ORw1z8BGZaIeCMtS4YtMDHo0bQFC2mDxen8eg",
    rating: 4.9,
    reviewsCount: 145,
    description: "Traditional pure Ashtagandha powder mixed with saffron and natural herbs. Ideal for daily tilak of Laddu Gopal Ji, releasing a calming divine fragrance.",
    details: [
      "Weight: 50g jar",
      "Fragrance: Rich traditional sandalwood & saffron",
      "100% natural, skin-safe for deity metals"
    ],
    sizes: ["50 Grams", "100 Grams"]
  },
  {
    id: "11",
    name: "Silk Embroidered Pagdi",
    price: 299,
    category: "Pagdi",
    categorySlug: "pagdi",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAoWbytz6BVzQSDIF8tHqt6r52u4Bkb1cNyS1kFdmkcKcTQ_Xd2FK1nLwtuNHdEkMCNLuc8tHJd88Kty08LkuaVVeBQcAYuunApxv5FUuZsYjdvMYVlNo6hWCkbbu1Ynaleycz3BoIzEFlftnhzaFnGuNSr0qs1mSNWUNu2OraAnQG-5TyPY_ZELiQYPLyrAkwdq-rycUsMY4SA2ctpux6hJ1yEvDVjWPU3OnHWqIS3KCYHOVqwDZlJBg",
    rating: 4.5,
    reviewsCount: 38,
    description: "Elegant silk-wrapped turban (Pagdi) featuring delicate sequin borders and a beautiful central gemstone crest. Adds an unmatched royal look to the deity.",
    details: [
      "Material: Silk fabric, cardboard frame base",
      "Decorations: Stonework, beads, gold laces",
      "Care: Keep in dry dust-free box"
    ],
    sizes: ["Size 1", "Size 2", "Size 3", "Size 4", "Size 5", "Size 6"]
  },
  {
    id: "12",
    name: "Handpainted Wooden Singhasan",
    price: 1499,
    category: "Singhasan",
    categorySlug: "singhasan",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCLo-BNndhYQPTti4kgvbUZN2I7EJ1ZvSGEBuLGU66TJdZn6NqQ7a6Z27WtrI8OOsxMsqU_SKLChymRiEP7h1gIodPUmxWao7vy6IqSzdgjeuNjiqJU6GyyI1f2BcmZrDjqEbUIjBhWW4f9pT065dRo-wG8uuq3S4wWi7OptnoIgBBMxFtyJA8q4iewoHn2Iq382P7fk8Ki3cvmUUSJ8fs8nZXm6K8Qq2m8D6zToKSdzYK0Nx3-i7YEeA",
    rating: 4.9,
    reviewsCount: 29,
    description: "Ornate wooden throne (Singhasan) decorated with vibrant paintwork and gold details. Represents traditional artwork, making your temple setup feel majestic.",
    details: [
      "Material: Engineered wood & paint layers",
      "Size: 12\" Height x 10\" Width",
      "Sturdy base with back support pillows"
    ],
    sizes: ["Medium", "Large"]
  },
  {
    id: "13",
    name: "Brass Pooja Decor Plate",
    price: 899,
    category: "Pooja Decor",
    categorySlug: "pooja-decor",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB_jKZrKHK4s2yslFDVYfUdvEEGb9geu_Q3x60dq5Yx0FbdxSxbqrrrFI_7vLa6ab1bxLwyS675Ydm5fBfgIPhHSeEQ4iCwpHQYyqlUafRXRn8XWLZCHT61Hmp-IORKdGEjcSOLgrebSkUJYRr7f4MklMOe63nw6L1T14FkH7OwkUFsQpufDnw9PUMWH-8T6ulWk0PkhENqJuQ6XYnoY4xqMElmdSYiFGCNoSpS06uqVaq64tXyX-eG_w",
    rating: 4.8,
    reviewsCount: 55,
    description: "A gorgeous brass thali engraved with divine symbols. It comes with small attached bowls for chandan, akshat, and a small ghee diya container.",
    details: [
      "Material: 100% Solid Brass",
      "Engraving: Lotus & Om central design",
      "Set includes: Thali, Diya cup, 2 Katori"
    ],
    sizes: ["8 inch diameter", "10 inch diameter"]
  }
];

export const categories = [
  { name: "Dresses", slug: "dresses", image: "/royal peacock dress.PNG" },
  { name: "Mukut", slug: "mukut", image: "/cat_mukut.png" },
  { name: "Jewellery", slug: "jewellery", image: "/cat_jewellery.png" },
  { name: "Jhula", slug: "jhula", image: "/cat_jhula.png" },
  { name: "Baansuri", slug: "baansuri", image: "/cat_baansuri.png" },
  { name: "Wig / Hair", slug: "wig-hair", image: "/cat_wig.png" },
  { name: "Chandan", slug: "chandan", image: "/cat_chandan.png" },
  { name: "Pagdi", slug: "pagdi", image: "/cat_pagdi.png" },
  { name: "Singhasan", slug: "singhasan", image: "/cat_singhasan.png" },
  { name: "Pooja Decor", slug: "pooja-decor", image: "/cat_pooja.png" }
];
