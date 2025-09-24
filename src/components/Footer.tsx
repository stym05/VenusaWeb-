import Link from "next/link"
import { siteConfig } from "@/lib/siteConfig"
import { Logo } from "./Logo"

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-black/10">
      <div className="container py-12 grid grid-cols-1 md:grid-cols-4 gap-10 text-sm">
        <div className="space-y-4">
          <Logo />
          <p className="font-body text-black/60">{siteConfig.description}</p>
        </div>
        <div>
        <h4 className="font-body mb-3 text-black/80">Navigate</h4>
          <ul className="space-y-2">
            {siteConfig.nav.map(item => (
              <li key={item.href}><Link className="text-black/60 hover:text-black" href={item.href}>{item.label}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-body mb-3 text-black/80">Support</h4>
          <ul className="space-y-2">
            <li><Link href="/shipping" className="font-body text-black/60 hover:text-black">Shipping & Returns</Link></li>
            <li><Link href="/faq" className="font-body text-black/60 hover:text-black">FAQs</Link></li>
            <li><Link href="/contact" className="font-body text-black/60 hover:text-black">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-black/80">Social</h4>
          <ul className="space-y-2">
            <li><a href={siteConfig.socials.instagram} className="font-body text-black/60 hover:text-black">Instagram</a></li>
            <li><a href={siteConfig.socials.youtube} className="font-body text-black/60 hover:text-black">YouTube</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-black/10">
        <div className="font-body container py-6 text-xs text-black/60 flex items-center justify-between">
          <span>© {new Date().getFullYear()} VENUSA</span>
          <span>Made with precision • Mid‑Luxe</span>
        </div>
      </div>
    </footer>
  )
}
