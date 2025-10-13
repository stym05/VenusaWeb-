"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import AccountNav from "@/components/account/AccountNav"
import AvatarEditor from "@/components/account/AvatarEditor"

//export const metadata = { title: "Account settings — VENUSA" }

export default function AccountSettingsPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // ✅ Fetch user details using JWT token
  useEffect(() => {
    const token = localStorage.getItem("accessToken")
    if (!token) {
      router.push("/login?next=/account/settings")
      return
    }

    async function fetchUser() {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/user/", {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!res.ok) throw new Error("Failed to fetch user data")
        const data = await res.json()
        setUser(data)
      } catch (e: any) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [router])

  // ✅ Handle Profile Update
  async function onProfileSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const token = localStorage.getItem("accessToken")
    const formData = new FormData(e.currentTarget)
    const body = Object.fromEntries(formData.entries())

    const res = await fetch("http://127.0.0.1:8000/api/update-profile/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    })
    if (res.ok) alert("Profile updated successfully")
    else alert("Failed to update profile")
  }

  // ✅ Handle Address Update
  async function onAddressSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const token = localStorage.getItem("accessToken")
    const formData = new FormData(e.currentTarget)
    const body = Object.fromEntries(formData.entries())

    const res = await fetch("http://127.0.0.1:8000/api/update-address/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    })
    if (res.ok) alert("Address updated successfully")
    else alert("Failed to update address")
  }

  // ✅ Handle Password Change
  async function onPasswordSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const token = localStorage.getItem("accessToken")
    const formData = new FormData(e.currentTarget)
    const body = Object.fromEntries(formData.entries())

    const res = await fetch("http://127.0.0.1:8000/api/change-password/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    })
    if (res.ok) alert("Password changed successfully")
    else alert("Failed to change password")
  }

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-gray-500">
        Loading account settings...
      </div>
    )

  if (error)
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        {error}
      </div>
    )

  if (!user) return null

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      <aside className="hidden lg:block">
        <AccountNav active="settings" />
      </aside>

      <div className="space-y-8">
        <h1 className="text-2xl font-semibold">Account settings</h1>

        {/* PROFILE */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={onProfileSubmit} className="grid gap-6 md:grid-cols-2">
              <div className="md:col-span-2">
                <AvatarEditor user={user} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Full name</Label>
                <Input id="name" name="name" defaultValue={user.name || ""} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" defaultValue={user.phone || ""} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="bio">Bio (public)</Label>
                <Textarea id="bio" name="bio" defaultValue={user.bio || ""} rows={3} />
              </div>
              <div className="md:col-span-2 flex justify-end gap-2">
                <Button type="submit">Save changes</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* ADDRESS */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Default shipping address</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={onAddressSubmit} className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="line1">Address line 1</Label>
                <Input id="line1" name="line1" defaultValue={user.address?.line1 || ""} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="line2">Address line 2</Label>
                <Input id="line2" name="line2" defaultValue={user.address?.line2 || ""} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" name="city" defaultValue={user.address?.city || ""} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input id="state" name="state" defaultValue={user.address?.state || ""} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postalCode">Postal code</Label>
                <Input id="postalCode" name="postalCode" defaultValue={user.address?.postalCode || ""} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input id="country" name="country" defaultValue={user.address?.country || "India"} />
              </div>
              <div className="md:col-span-2 flex justify-end gap-2">
                <Button type="submit">Save address</Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* PASSWORD */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Security</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={onPasswordSubmit} className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current password</Label>
                <Input id="currentPassword" type="password" name="currentPassword" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New password</Label>
                <Input id="newPassword" type="password" name="newPassword" />
              </div>
              <div className="md:col-span-2 flex justify-end gap-2">
                <Button type="submit" variant="outline">
                  Update password
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
