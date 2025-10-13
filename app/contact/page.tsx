import type { Metadata } from "next"
import ContactForm from "./ContactForm"

export const metadata: Metadata = {
  title: "Contact | VENUSA",
  description: "Questions, collaborations, or wholesale inquiries? Drop us a line.",
}

export default function ContactPage() {
  return (
    <section className="bg-white text-neutral-900 min-h-screen">
      <div className="container max-w-xl mx-auto px-6 md:px-8 py-16">
        <h1 className="font-body text-3xl font-Regular tracking-tight text-center md:text-left">
          Contact
        </h1>
        <p className="mt-2 text-neutral-600 text-center md:text-left">
          Questions, collaborations or wholesale? Drop us a line.
        </p>

        <div className="mt-10 border border-neutral-200 bg-white p-8 shadow-sm">
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
