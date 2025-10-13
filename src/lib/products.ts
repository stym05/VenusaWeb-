export type Product = {
  id: string
  slug: string
  title: string
  subtitle?: string
  price: number
  currency: "INR"
  images: string[]
  colors?: string[]
  sizes?: string[]
  badges?: string[]
  description?: string
}

export const products: Product[] = [
  // --- Existing 3 (now with 4 images) ---
  {
    id: "p-hoodie-black-gold",
    slug: "signature-hoodie-black-gold",
    title: "Signature Hoodie",
    subtitle: "Black | Gold Accents",
    price: 2499,
    currency: "INR",
    images: [
      "/images/hoodie-black-1.jpg",
      "/images/hoodie-black-2.jpg",
      "/images/hoodie-black-3.jpg",
      "/images/hoodie-black-4.jpg"
    ],
    colors: ["Black", "Off White"],
    sizes: ["S","M","L","XL","2XL"],
    badges: ["New", "Mid-Luxe"],
    description: "Ultra-soft fleece, minimal branding, gold tipped drawcords. Built for winter drops."
  },
  {
    id: "p-sweatshirt-offwhite",
    slug: "minimal-sweatshirt-offwhite",
    title: "Minimal Sweatshirt",
    subtitle: "Off-White | Clean",
    price: 1999,
    currency: "INR",
    images: [
      "/images/sweatshirt-offwhite-1.jpg",
      "/images/sweatshirt-offwhite-2.jpg",
      "/images/sweatshirt-offwhite-3.jpg",
      "/images/sweatshirt-offwhite-4.jpg"
    ],
    colors: ["Off White", "Ash Grey"],
    sizes: ["S","M","L","XL"],
    badges: ["Bestseller"],
    description: "Mid-weight terry. Crisp silhouette with premium rib and subtle chest mark."
  },
  {
    id: "p-cargo-cream",
    slug: "straight-cargo-cream",
    title: "Straight Cargo",
    subtitle: "Cream | Black Accents",
    price: 2299,
    currency: "INR",
    images: [
      "/images/cargo-cream-1.jpg",
      "/images/cargo-cream-2.jpg",
      "/images/cargo-cream-3.jpg",
      "/images/cargo-cream-4.jpg"
    ],
    colors: ["Cream", "Black"],
    sizes: ["28","30","32","34","36"],
    badges: ["Utility"],
    description: "Durable twill with articulated knees and stealth pockets. Street-ready."
  },

  // --- +20 new products (each with 4 images) ---
  // Hoodies (5)
  {
    id: "p-hoodie-offwhite-gold",
    slug: "signature-hoodie-offwhite-gold",
    title: "Signature Hoodie",
    subtitle: "Off-White | Gold Accents",
    price: 2499,
    currency: "INR",
    images: [
      "/images/hoodie-offwhite-gold-1.jpg",
      "/images/hoodie-offwhite-gold-2.jpg",
      "/images/hoodie-offwhite-gold-3.jpg",
      "/images/hoodie-offwhite-gold-4.jpg"
    ],
    colors: ["Off White", "Black"],
    sizes: ["S","M","L","XL","2XL"],
    badges: ["Mid-Luxe"],
    description: "Signature fleece with gold hardware and tonal chest mark."
  },
  {
    id: "p-hoodie-cloudfit-black",
    slug: "cloudfit-hoodie-black",
    title: "CloudFit Hoodie",
    subtitle: "Black | Ultra-Soft",
    price: 2599,
    currency: "INR",
    images: [
      "/images/hoodie-cloudfit-black-1.jpg",
      "/images/hoodie-cloudfit-black-2.jpg",
      "/images/hoodie-cloudfit-black-3.jpg",
      "/images/hoodie-cloudfit-black-4.jpg"
    ],
    colors: ["Black", "Ash Grey"],
    sizes: ["S","M","L","XL","2XL"],
    badges: ["New"],
    description: "Lofted brushed fleece for cloud-like comfort and clean drape."
  },
  {
    id: "p-hoodie-zip-black-creamfur",
    slug: "zip-hoodie-black-cream-fur",
    title: "Zip Hoodie",
    subtitle: "Black | Cream Fur Lined",
    price: 2799,
    currency: "INR",
    images: [
      "/images/hoodie-zip-black-creamfur-1.jpg",
      "/images/hoodie-zip-black-creamfur-2.jpg",
      "/images/hoodie-zip-black-creamfur-3.jpg",
      "/images/hoodie-zip-black-creamfur-4.jpg"
    ],
    colors: ["Black", "Off White"],
    sizes: ["S","M","L","XL","2XL"],
    badges: ["Limited"],
    description: "Full-zip silhouette with cozy cream faux-fur lining in hood."
  },
  {
    id: "p-hoodie-oversized-ash",
    slug: "oversized-hoodie-ash-grey",
    title: "Oversized Hoodie",
    subtitle: "Ash Grey | Drop Shoulder",
    price: 2399,
    currency: "INR",
    images: [
      "/images/hoodie-oversized-ash-1.jpg",
      "/images/hoodie-oversized-ash-2.jpg",
      "/images/hoodie-oversized-ash-3.jpg",
      "/images/hoodie-oversized-ash-4.jpg"
    ],
    colors: ["Ash Grey", "Black"],
    sizes: ["S","M","L","XL","2XL"],
    badges: ["Bestseller"],
    description: "Relaxed fit, heavyweight handfeel, tonal embroidery."
  },
  {
    id: "p-hoodie-techfleece-olive",
    slug: "tech-fleece-hoodie-olive",
    title: "Tech Fleece Hoodie",
    subtitle: "Olive | Streamlined",
    price: 2899,
    currency: "INR",
    images: [
      "/images/hoodie-tech-olive-1.jpg",
      "/images/hoodie-tech-olive-2.jpg",
      "/images/hoodie-tech-olive-3.jpg",
      "/images/hoodie-tech-olive-4.jpg"
    ],
    colors: ["Olive", "Charcoal"],
    sizes: ["S","M","L","XL","2XL"],
    badges: ["Utility", "Mid-Luxe"],
    description: "Double-knit tech fleece with clean lines and secure pockets."
  },


]
