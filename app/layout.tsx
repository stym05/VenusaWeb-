import type { Metadata } from "next"
import "./globals.css"
import { lexendZetta, poppins } from "./fonts"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { siteConfig } from "@/lib/siteConfig"
import SiteNotice from "@/components/SiteNotice"
import Providers from "@/components/Providers"

export const metadata: Metadata = {
  title: `${siteConfig.name} — Mid‑Luxe Apparel`,
  description: siteConfig.description,
  openGraph: {
    title: `${siteConfig.name} — Mid‑Luxe Apparel`,
    description: siteConfig.description,
    url: siteConfig.url,
    images: [{ url: siteConfig.ogImage }]
  },
  metadataBase: new URL("https://venusa.example.com")
}

// app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${lexendZetta.variable} ${poppins.variable}`}>
      <body className="font-body bg-[#fcfcfc] text-[#0a0a0b]">
        <Navbar />
        <main className="pt-14">{/* ⬅️ space for fixed navbar height */}
        {/*<SiteNotice />*/}
        <Providers>
          {children}
        </Providers>
        </main>
        <Footer />
      </body>
    </html>
  )
}
