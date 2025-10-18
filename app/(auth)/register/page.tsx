import RegistrationForm from "./registration-form"

export const metadata = {
  title: "Create Account — VENUSA",
  description:
    "Join VENUSA to access your account, track orders, and explore exclusive collections.",
}

export default function RegisterPage() {
  return (
    <div className="w-full min-h-[100dvh] bg-[#0a0a0b] flex items-center justify-center px-4 sm:px-6">
      <section className="w-full max-w-2xl md:max-w-xl py-16 md:py-20 text-white">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <h1 className="font-heading text-3xl md:text-4xl font-medium tracking-tight">
            Create your account
          </h1>
          <p className="mt-3 text-sm md:text-base text-white/70 leading-relaxed">
            Join {process.env.NEXT_PUBLIC_APP_NAME || "VENUSA"} to shop, track orders,
            and explore exclusive collections.
          </p>
        </div>

        {/* Form Section */}
        <div className="relative bg-white text-black rounded-3xl shadow-[0_8px_40px_rgba(255,255,255,0.05)] ring-1 ring-white/10 p-8 sm:p-10 md:p-12">
          <div
            aria-hidden
            className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-white/5 to-transparent blur-lg"
          />
          <div className="relative z-10">
            <RegistrationForm />
          </div>
        </div>

        {/* Footer Note */}
        <p className="mt-10 text-center text-xs sm:text-sm text-white/60 max-w-md mx-auto leading-relaxed">
          By creating an account, you agree to our{" "}
          <a
            href="/terms"
            className="underline underline-offset-4 hover:text-white transition"
          >
            Terms & Conditions
          </a>{" "}
          and{" "}
          <a
            href="/privacy"
            className="underline underline-offset-4 hover:text-white transition"
          >
            Privacy Policy
          </a>.
        </p>
      </section>
    </div>
  )
}
