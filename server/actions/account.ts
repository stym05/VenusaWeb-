"use server"
import { prisma } from "@/lib/db"
import { z } from "zod"
import bcrypt from "bcryptjs"
import { getCurrentUser } from "@/lib/auth"

const profileSchema = z.object({ name: z.string().min(1).max(120), phone: z.string().optional(), bio: z.string().max(500).optional() })
const addrSchema = z.object({
  id: z.string().optional(),
  line1: z.string().min(1),
  line2: z.string().optional(),
  city: z.string().min(1),
  state: z.string().min(1),
  postalCode: z.string().min(3),
  country: z.string().default("India"),
  isDefault: z.boolean().default(true),
})
const passSchema = z.object({ currentPassword: z.string().min(6), newPassword: z.string().min(8) })

export async function updateProfileAction(input: z.infer<typeof profileSchema>) {
  const user = await getCurrentUser()
  if (!user) throw new Error("Unauthorized")
  const data = profileSchema.parse(input)
  await prisma.user.update({ where: { id: user.id }, data })
}

export async function upsertAddressAction(input: z.infer<typeof addrSchema>) {
  const user = await getCurrentUser()
  if (!user) throw new Error("Unauthorized")
  const data = addrSchema.parse(input)

  // clear previous default if needed
  if (data.isDefault) {
    await prisma.address.updateMany({ where: { userId: user.id, isDefault: true }, data: { isDefault: false } })
  }

  if (data.id) {
    await prisma.address.update({ where: { id: data.id }, data: { ...data, userId: user.id } })
  } else {
    await prisma.address.create({ data: { ...data, userId: user.id } })
  }
}

export async function changePasswordAction(input: z.infer<typeof passSchema>) {
  const user = await getCurrentUser()
  if (!user) throw new Error("Unauthorized")
  const data = passSchema.parse(input)

  // In real setup, verify current password with your auth provider
  if (!user.passwordHash) throw new Error("Password change not supported for OAuth accounts")
  const ok = await bcrypt.compare(data.currentPassword, user.passwordHash)
  if (!ok) throw new Error("Current password is incorrect")

  const hash = await bcrypt.hash(data.newPassword, 10)
  await prisma.user.update({ where: { id: user.id }, data: { passwordHash: hash } })
}
