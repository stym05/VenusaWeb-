// components/account/AddressCard.tsx
import type { Address as PrismaAddress } from "@prisma/client";

type AddressLike = Partial<
  Pick<PrismaAddress, "line1" | "line2" | "city" | "state" | "postalCode" | "country">
>;

export default function AddressCard({ address, compact = false }: { address: AddressLike; compact?: boolean }) {
  const line1      = address?.line1 ?? "";
  const line2      = address?.line2 ?? "";
  const city       = address?.city ?? "";
  const state      = address?.state ?? "";
  const postalCode = address?.postalCode ?? "";
  const country    = address?.country ?? "";

  return (
    <div className={"rounded-xl border bg-muted/40 p-4 " + (compact ? "text-sm" : "")}>
      <div>{line1}</div>
      {line2 && <div>{line2}</div>}
      <div>
        {[city, state].filter(Boolean).join(", ")}
        {postalCode ? ` - ${postalCode}` : ""}
      </div>
      <div>{country}</div>
    </div>
  );
}
