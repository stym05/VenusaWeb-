"use client"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function AccountNav({ active }: { active: "overview" | "settings" }) {
  const items = [
    { href: "/account", label: "Overview", key: "overview" },
    { href: "/account/settings", label: "Settings", key: "settings" },
  ] as const

  return (
    <nav className="rounded-2xl border bg-card p-2 text-sm">
      {items.map((it) => (
        <Link
          key={it.href}
          href={it.href}
          className={cn(
            "block rounded-xl px-3 py-2 transition",
            active === it.key ? "bg-muted font-medium" : "hover:bg-muted/60"
          )}
        >
          {it.label}
        </Link>
      ))}
    </nav>
  )
}
