"use client"

import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import { ReactNode } from "react"

interface StatProps {
  label: string
  value: ReactNode
  subtle?: string
  icon?: ReactNode
}

export default function Stat({ label, value, subtle, icon }: StatProps) {
  return (
    <Card
      className={cn(
        "flex flex-col justify-between rounded-2xl border border-border/70",
        "p-4 shadow-sm hover:shadow-md transition bg-white dark:bg-zinc-900"
      )}
    >
      <div className="flex items-center gap-3">
        {icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            {icon}
          </div>
        )}
        <div>
          <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {value}
          </div>
          <div className="text-sm text-gray-500">{label}</div>
        </div>
      </div>
      {subtle && (
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 italic">
          {subtle}
        </div>
      )}
    </Card>
  )
}
