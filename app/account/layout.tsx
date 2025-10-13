import SignOutButton from "@/components/auth/SignOutButton"

export const metadata = {
  title: "My Account — VENUSA",
}

export default function AccountLayout({children,
}: {
    children: React.ReactNode
  }) {
  return (
    <section className="bg-white text-black">
      <div className="container pt-12 pb-6">
        <h1 className="text-4xl md:text-5xl font-body font-Medium tracking-tight">My Account</h1>
        <p className="mt-2 font-body text-black/60">
          Manage your profile, orders, and addresses — all in one place.
        </p>
      </div>

      <div className="container pb-12">
      <aside className="hidden lg:block space-y-6">
        {/* your AccountNav here */}
        <SignOutButton />
      </aside>
        {children}
      </div>
    </section>
  )
}
