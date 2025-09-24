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
  {
    id: "p-hoodie-black-gold",
    slug: "signature-hoodie-black-gold",
    title: "Signature Hoodie",
    subtitle: "Black | Gold Accents",
    price: 2499,
    currency: "INR",
    images: ["/images/hoodie-black-1.jpg", "/images/hoodie-black-2.jpg"],
    colors: ["Black", "Off White"],
    sizes: ["S","M","L","XL","2XL"],
    badges: ["New", "Mid‑Luxe"],
    description: "Ultra‑soft fleece, minimal branding, gold tipped drawcords. Built for winter drops."
  },
  {
    id: "p-sweatshirt-offwhite",
    slug: "minimal-sweatshirt-offwhite",
    title: "Minimal Sweatshirt",
    subtitle: "Off‑White | Clean",
    price: 1999,
    currency: "INR",
    images: ["/images/sweatshirt-offwhite-1.jpg", "/images/sweatshirt-offwhite-2.jpg"],
    colors: ["Off White", "Ash Grey"],
    sizes: ["S","M","L","XL"],
    badges: ["Bestseller"],
    description: "Mid‑weight terry. Crisp silhouette with premium rib and subtle chest mark."
  },
  {
    id: "p-cargo-cream",
    slug: "straight-cargo-cream",
    title: "Straight Cargo",
    subtitle: "Cream | Black Accents",
    price: 2299,
    currency: "INR",
    images: ["/images/cargo-cream-1.jpg", "/images/cargo-cream-2.jpg"],
    colors: ["Cream", "Black"],
    sizes: ["28","30","32","34","36"],
    badges: ["Utility"],
    description: "Durable twill with articulated knees and stealth pockets. Street‑ready."
  }
]
