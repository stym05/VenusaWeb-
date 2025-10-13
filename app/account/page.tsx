"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import AccountNav from "@/components/account/AccountNav"
import Stat from "@/components/account/Stat"
import AddressCard from "@/components/account/AddressCard"
import {
  Settings,
  ShoppingBag,
  Package,
  Heart,
  Star,
  CreditCard,
  User,
} from "lucide-react"

export default function AccountViewPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("accessToken")

    if (!token) {
      router.push("/login?next=/account")
      return
    }

    async function fetchUser() {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/login/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (res.status === 401) {
          localStorage.removeItem("accessToken")
          router.push("/login?next=/account")
          return
        }
        const data = await res.json()
        setUser(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [router])

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading your account...</p>
      </section>
    )
  }

  if (!user) return null

  return (
    <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
      {/* Sidebar */}
      <aside className="hidden lg:block">
        <AccountNav active="overview" />
      </aside>

      {/* Main Content */}
      <div className="space-y-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
              Welcome back{user.first_name ? `, ${user.first_name}` : ""}.
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Manage your profile, orders, and addresses from one place.
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              asChild
              variant="outline"
              className="rounded-lg shadow-sm hover:shadow-md transition"
            >
              <Link href="/account/settings">
                <Settings className="w-4 h-4 mr-2" /> Settings
              </Link>
            </Button>
            <Button
              asChild
              className="rounded-lg shadow-sm hover:shadow-md transition"
            >
              <Link href="/shop">
                <ShoppingBag className="w-4 h-4 mr-2" /> Shop Now
              </Link>
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Stat
            label="Orders"
            value={user.order_count ?? 0}
            subtle="Lifetime"
            icon={<Package className="w-5 h-5 text-gray-500" />}
          />
          <Stat
            label="Wishlist"
            value={user.wishlist_count ?? 0}
            subtle="Items"
            icon={<Heart className="w-5 h-5 text-gray-500" />}
          />
          <Stat
            label="Tier"
            value={
              <Badge
                variant="secondary"
                className="rounded-full px-3 py-1 text-gray-800 dark:text-gray-200"
              >
                {user.tier ?? "Member"}
              </Badge>
            }
            subtle="VENUSA Club"
            icon={<Star className="w-5 h-5 text-gray-500" />}
          />
          <Stat
            label="Spent"
            value={`₹${user.total_spent ?? 0}`}
            subtle="All-time"
            icon={<CreditCard className="w-5 h-5 text-gray-500" />}
          />
        </div>

        {/* Profile Snapshot */}
        <Card className="rounded-2xl border border-border/70 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-md transition">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <User className="w-5 h-5 text-gray-500" /> Profile
            </CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">
                Full name
              </div>
              <div className="font-medium">{user.name ?? "—"}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">
                Email
              </div>
              <div className="font-medium">{user.email}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">
                Phone
              </div>
              <div className="font-medium">{user.phone ?? "—"}</div>
            </div>
            <div>
              <div className="text-xs text-gray-500 uppercase tracking-wide">
                Member since
              </div>
              <div className="font-medium">
                {user.created_at
                  ? new Date(user.created_at).toLocaleDateString()
                  : "—"}
              </div>
            </div>
            <Separator className="md:col-span-2" />
            <div className="md:col-span-2">
              <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                Default address
              </div>
              {user.addresses?.length ? (
                <AddressCard address={user.addresses[0]} compact />
              ) : (
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  No address saved.{" "}
                  <Link
                    href="/account/settings"
                    className="underline text-primary hover:text-primary/80 transition"
                  >
                    Add one
                  </Link>
                  .
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card className="rounded-2xl border border-border/70 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-md transition">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Package className="w-5 h-5 text-gray-500" /> Recent orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            {user.orders?.length ? (
              <div className="divide-y divide-border/50">
                {user.orders.slice(0, 5).map((o: any) => (
                  <div
                    key={o.id}
                    className="py-4 flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center gap-3">
                      <Badge
                        variant="outline"
                        className="rounded-full capitalize"
                      >
                        {o.status}
                      </Badge>
                      <span className="font-medium">Order #{o.number}</span>
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">
                      {new Date(o.created_at).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-gray-700 dark:text-gray-300">
                You don’t have any orders yet.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
