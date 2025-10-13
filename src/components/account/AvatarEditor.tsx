"use client"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export default function AvatarEditor({ user }: { user: any }) {
  const [preview, setPreview] = useState<string | null>(null)

  function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setPreview(url)
    // TODO: upload to your storage; update avatarUrl via server action.
  }

  const letter = (user?.name ?? user?.email ?? "").slice(0, 1).toUpperCase()

  return (
    <div className="flex items-center gap-4">
      <Avatar className="h-16 w-16">
        <AvatarImage src={preview ?? user?.avatarUrl ?? undefined} alt="avatar" />
        <AvatarFallback>{letter || "U"}</AvatarFallback>
      </Avatar>
      <div className="space-x-2">
        <Button asChild variant="outline"><label htmlFor="avatarFile" className="cursor-pointer">Change</label></Button>
        <input id="avatarFile" type="file" accept="image/*" className="hidden" onChange={onPick} />
      </div>
    </div>
  )
}