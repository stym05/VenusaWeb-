import RegistrationForm from "./registration-form"

export const metadata = {
  title: "Create Account — VENUSA",
  description: "Join VENUSA to access your account, track orders, and explore exclusive collections.",
}

export default function RegisterPage() {
  return (
    <div className="w-full bg-[#0a0a0b] min-h-[100dvh]">
      <section className="container max-w-xl px-6 md:px-8 py-12 text-white">
        {/* Header */}
        <h1 className="font-Body text-3xl md:text-4xl font-regular tracking-tight">
          Create your account
        </h1>
        <p className="mt-2 text-white/70">
          Join {process.env.NEXT_PUBLIC_APP_NAME || "VENUSA"} to shop, track orders, and more.
        </p>

        {/* Divider */}
        <div className="my-8 h-px w-full bg-white/10" />

        {/* Form Section */}
        <div className="bg-white text-black rounded-3xl shadow-xl ring-1 ring-white/10 p-8 md:p-10">
          <RegistrationForm />
        </div>

        {/* Footer Note */}
        <p className="mt-10 text-center text-xs text-white/60">
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
