// app/contact/page.tsx
import type { Metadata } from "next"
import ContactForm from "./ContactForm"

export const metadata: Metadata = {
  title: "Contact | VENUSA",
  description: "Questions, collaborations or wholesale? Drop us a line.",
}

export default function ContactPage() {
  return (
    <section className="container max-w-xl px-6 md:px-8 py-12">
      <h1 className="font-body text-3xl font-semibold tracking-tight">Contact</h1>
      <p className="mt-2 text-white/70">
        Questions, collaborations or wholesale? Drop us a line.
      </p>

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
        <ContactForm />
      </div>
    </section>
  )
}
