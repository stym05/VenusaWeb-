import { NextResponse } from "next/server"

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  try {
    const res = await fetch(`${BACKEND_URL}/api/products/${params.slug}/`, { cache: "no-store" })
    if (!res.ok) throw new Error("Failed to fetch product")

    const p = await res.json()
    
    return NextResponse.json({
      slug: p.slug,
      title: p.name,
      subtitle: p.subtitle,
      description: p.description,
      composition: p.composition,
      delivery_returns: p.delivery_returns,
      pricePaise: Math.round(Number(p.price) * 100),
      images: p.images
        ? p.images.map((url: string) => ({ url }))
        : p.image
        ? [{ url: p.image }]
        : [],
      sizes: p.sizes || [],
    })
  } catch (err) {
    console.error("Error fetching product:", err)
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 })
  }
}