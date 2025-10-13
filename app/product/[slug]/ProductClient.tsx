"use client"

import AddToCartRow from "@/components/AddToCartRow"

type ProductClientProps = {
  slug: string
  title: string
  pricePaise: number
  image: string
  sizes: string[]
}

export default function ProductClient({
  slug,
  title,
  pricePaise,
  image,
  sizes,
}: ProductClientProps) {
  return (
    <AddToCartRow
      id={slug}
      title={title}
      price={Math.round(pricePaise / 100)}
      image={image}
      sizes={sizes}
    />
  )
}
