// prisma/seed.ts
import 'dotenv/config'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const products = [
  {
    slug: 'core-hoodie-black',
    title: 'Core Hoodie — Black',
    subtitle: 'Heavyweight 500 GSM',
    description: 'Minimal, structured silhouette with double-lined hood. Pre-shrunk, soft hand-feel.',
    price: 2999, // rupees; we’ll store paise
    images: [
      '/images/shop/core-hoodie-black-1.jpg',
      '/images/shop/core-hoodie-black-2.jpg',
      '/images/shop/core-hoodie-black-3.jpg',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    slug: 'signature-tee-white',
    title: 'Signature Tee — White',
    subtitle: '240 GSM Boxy',
    description: 'Boxy cut, dropped shoulder, tight neck rib. Garment-dyed for depth.',
    price: 1499,
    images: [
      '/images/shop/signature-tee-white-1.jpg',
      '/images/shop/signature-tee-white-2.jpg',
    ],
    sizes: ['S', 'M', 'L', 'XL'],
  },
]

async function main() {
  // Ensure sizes exist
  const sizeLabels = Array.from(new Set(products.flatMap(p => p.sizes)))
  const sizeRecords = await Promise.all(
    sizeLabels.map(label =>
      prisma.size.upsert({ where: { label }, update: {}, create: { label } })
    )
  )
  const sizeMap = new Map(sizeRecords.map(s => [s.label, s.id]))

  for (const p of products) {
    const created = await prisma.product.upsert({
      where: { slug: p.slug },
      update: {
        title: p.title,
        subtitle: p.subtitle,
        description: p.description,
        pricePaise: p.price * 100,
      },
      create: {
        slug: p.slug,
        title: p.title,
        subtitle: p.subtitle,
        description: p.description,
        pricePaise: p.price * 100,
      },
      include: { images: true, sizes: true },
    })

    // Reset images
    await prisma.productImage.deleteMany({ where: { productId: created.id } })
    await prisma.$transaction(
      p.images.map((url, i) =>
        prisma.productImage.create({ data: { url, order: i, productId: created.id } })
      )
    )

    // Reset sizes (ordered)
    await prisma.productSize.deleteMany({ where: { productId: created.id } })
    await prisma.$transaction(
      p.sizes.map((label, i) =>
        prisma.productSize.create({
          data: { productId: created.id, sizeId: sizeMap.get(label)!, order: i },
        })
      )
    )
  }

  console.log('Seeded products:', products.map(p => p.slug).join(', '))
}

main()
  .then(async () => { await prisma.$disconnect() })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1) })
