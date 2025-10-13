"use client"

import Link from "next/link"
import { motion } from "framer-motion"

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.5, ease: "easeOut" as const },
}

const stagger = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
  viewport: { once: true, amount: 0.3 },
}

// refined color palette for dark mode harmony
const card =
  "rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8 shadow-[0_0_20px_rgba(255,255,255,0.03)]"

const subcard =
  "rounded-xl border border-white/10 bg-white/[0.03] p-4 hover:bg-white/[0.05] transition"

const heading =
  "text-[17px] md:text-[19px] font-semibold text-white tracking-tight"

const subheading =
  "text-[14px] font-medium text-white/90 mb-1"

const text =
  "text-[13px] leading-relaxed text-white/70"

export default function ShippingClient() {
  return (
    <motion.div
      {...stagger}
      className="space-y-8 animate-fadeInUp"
    >
      {/* Overview */}
      <motion.section {...fadeUp} className={card}>
        <h2 className={heading}>Shipping Overview</h2>
        <ul className="mt-3 space-y-2">
          {[
            "Orders are processed within 1–2 business days (excluding weekends and holidays).",
            "Orders confirmed before our daily cut-off may be dispatched the same day.",
            "Standard delivery typically takes 4–7 working days depending on your location and courier availability.",
            "Timelines can vary during peak seasons or due to unforeseen logistical delays.",
          ].map(t => (
            <li key={t} className={text}>• {t}</li>
          ))}
        </ul>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className={subcard}>
            <h3 className={subheading}>Shipping Charges</h3>
            <p className={text}>
              Calculated at checkout based on address and order value. Any applicable
              costs are shown clearly before payment.
            </p>
          </div>
          <div className={subcard}>
            <h3 className={subheading}>Order Confirmation</h3>
            <p className={text}>
              A team member may contact you for confirmation before dispatching
              your order.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Payment & COD */}
      <motion.section {...fadeUp} className={card}>
        <h2 className={heading}>Payment & COD</h2>
        <p className={`${text} mt-3`}>
          Cash on Delivery (COD) is available on select pin codes. Please keep
          the exact amount ready at delivery.
        </p>
      </motion.section>

      {/* Tracking & Support */}
      <motion.section {...fadeUp} className={card}>
        <h2 className={heading}>Tracking & Support</h2>
        <ul className="mt-3 space-y-2">
          <li className={text}>
            • A tracking number will be shared via SMS or email once your order
            is shipped.
          </li>
          <li className={text}>
            • Track your orders anytime from your{" "}
            <Link
              href="/account"
              className="underline text-white hover:text-white/90 transition"
            >
              Account
            </Link>{" "}
            page.
          </li>
          <li className={text}>
            • Need help? Email{" "}
            <a
              href="mailto:support@venusa.in"
              className="underline text-white hover:text-white/90 transition"
            >
              support@venusa.in
            </a>
            .
          </li>
        </ul>
        <p className="mt-4 text-[12px] text-white/50">
          Courier systems may take a few hours to reflect live status after
          dispatch.
        </p>
      </motion.section>

      {/* Returns & Exchanges */}
      <motion.section {...fadeUp} className={card}>
        <h2 className={heading}>Returns & Exchanges</h2>
        <p className={`${text} mt-3`}>
          Returns or exchanges are accepted within{" "}
          <span className="font-medium text-white">7 days</span> of delivery for
          unworn, unwashed items with original tags and packaging.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className={subcard}>
            <h3 className={subheading}>Quick checklist</h3>
            <ul className="mt-2 space-y-1.5">
              {["Item is unused & unwashed", "Tags & packaging intact", "Proof of purchase available"].map(
                t => (
                  <li key={t} className={text}>
                    • {t}
                  </li>
                )
              )}
            </ul>
          </div>
          <div className={subcard}>
            <h3 className={subheading}>Non-returnable</h3>
            <ul className="mt-2 space-y-1.5">
              {[
                "Final sale items",
                "Worn/washed or damaged items",
                "Accessories marked non-returnable",
              ].map(t => (
                <li key={t} className={text}>
                  • {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={`${subcard} mt-5 bg-white/[0.05]`}>
          <h3 className={subheading}>Start a return</h3>
          <ol className="mt-2 list-decimal pl-5 space-y-1.5">
            <li className={text}>
              Go to{" "}
              <Link
                href="/account"
                className="underline text-white hover:text-white/90"
              >
                Account → Orders
              </Link>
              .
            </li>
            <li className={text}>
              Select the order and choose{" "}
              <span className="font-medium text-white">Return/Exchange</span>.
            </li>
            <li className={text}>
              Choose a reason and confirm pickup details.
            </li>
          </ol>
          <p className="mt-3 text-[12px] text-white/50">
            No account? Contact us at{" "}
            <a
              href="mailto:support@venusa.in"
              className="underline text-white hover:text-white/90"
            >
              support@venusa.in
            </a>
            .
          </p>
        </div>
      </motion.section>

      {/* FAQs */}
      <motion.section {...fadeUp} className={card}>
        <h2 className={heading}>FAQs</h2>
        <div className="mt-4 divide-y divide-white/10">
          {[
            {
              q: "How long will delivery take?",
              a: "Standard delivery is usually 4–7 working days after dispatch, depending on pin code and courier availability.",
            },
            {
              q: "Can I change my address after placing the order?",
              a: "If your order isn’t shipped yet, email support@venusa.in and our team will assist you.",
            },
            {
              q: "Do you ship internationally?",
              a: "Not yet — VENUSA currently ships within India.",
            },
          ].map(({ q, a }) => (
            <details
              key={q}
              className="group py-3 transition hover:bg-white/[0.03] px-1 rounded-md"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between text-[13px] font-medium text-white/90">
                {q}
                <span className="text-white/50 group-open:rotate-180 transition">▾</span>
              </summary>
              <p className="mt-2 text-[13px] text-white/70">{a}</p>
            </details>
          ))}
        </div>
      </motion.section>

      {/* Footer Note */}
      <motion.p {...fadeUp} className="text-[12px] text-white/50">
        This policy may be updated periodically. Last updated on{" "}
        {new Date().toLocaleDateString()}.
      </motion.p>
    </motion.div>
  )
}
