// middleware.ts (optional)
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(req: NextRequest) {
  // example: do nothing for now; we verify JWT in the page
  return NextResponse.next()
}
