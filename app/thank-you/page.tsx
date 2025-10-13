// app/thank-you/page.tsx
export const metadata = { title: "Thank you | VENUSA" }
export default function ThankYou() {
  return (
    <section className="container max-w-xl px-6 md:px-8 py-16">
      <h1 className="font-heading text-3xl font-semibold">Thank you</h1>
      <p className="mt-2 text-white/75">Your payment was received. A confirmation has been sent to your email.</p>
      <a href="/shop" className="btn-outline mt-6 inline-flex">Back to shop</a>
    </section>
  )
}
