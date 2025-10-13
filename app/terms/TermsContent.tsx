"use client"

import { motion } from "framer-motion"

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeInOut" as const } },
}

const viewport = { once: true, amount: 0.25, margin: "-10% 0px -10% 0px" }

export default function TermsContent() {
  return (
    // NOTE: removed outer `.prose` wrapper to avoid color clashes
    <div className="mt-10">
      <Section id="Definitions" title="1. Definitions" >
        <ul>
          <li><strong>Company/We/Us</strong>: VENUSA, operator of this website and services.</li>
          <li><strong>Customer/You/User</strong>: Individual or entity using our services.</li>
          <li><strong>Website</strong>: venusa.co.in.</li>
          <li><strong>Products</strong>: Clothing and apparel sold by VENUSA.</li>
        </ul>
      </Section>

      <Section id="Company Information" title="2. Company Information">
        <ul>
          <li><strong>Legal Entity</strong>: VENUSA <em>[Insert registration details]</em></li>
          <li><strong>Office</strong>: <em>[Insert address]</em></li>
          <li><strong>Email</strong>: <a className="underline" href="mailto:info@venusa.co.in">info@venusa.co.in</a></li>
          <li><strong>Phone</strong>: +91-7892050422</li>
          <li><strong>Hours</strong>: Mon–Fri, 10:00–18:00 IST</li>
        </ul>
      </Section>

      <Section id="Eligibility" title="3. Eligibility">
        <p>By using our services, you confirm you are 18+ or using the site under a guardian’s supervision. All information provided must be true, accurate, and current.</p>
      </Section>

      <Section id="Product Availability & Accuracy" title="4. Product Availability & Accuracy">
        <p>We strive for accuracy in descriptions, images, pricing, and availability; however, availability can change and errors may occur. We may correct errors, update info, and refuse/cancel orders with obvious mistakes.</p>
      </Section>

      <Section id="Pricing & Payments" title="5. Pricing & Payments">
        <ul>
          <li>Prices are in INR and generally inclusive of GST unless stated.</li>
          <li>Prices may change without notice; the checkout price applies to that order.</li>
          <li>Accepted methods: Cards, UPI, Net Banking, and wallets (as available).</li>
          <li>Orders process after payment authorization. We don’t store card/bank details.</li>
        </ul>
      </Section>

      <Section id="Order Confirmation & Cancellation" title="6. Order Confirmation & Cancellation">
        <p>Order confirmations include details and ETA. Acceptance is subject to stock and verification.</p>
        <p><strong>We may cancel</strong> for stock issues, errors, suspected fraud/abuse, or unserviceable addresses. Paid amounts are refunded or issued as store credit per policy.</p>
        <p><strong>Customer cancellations</strong> can be requested within 2 hours via <a className="underline" href="mailto:info@venusa.co.in">email</a>. Post-dispatch, follow the Return/Exchange policy.</p>
      </Section>

      <Section id="Shipping & Delivery" title="7. Shipping & Delivery">
        <ul>
          <li>Shipping across most serviceable PIN codes in India.</li>
          <li>Typical delivery: <strong>3–7 business days</strong> (estimate).</li>
          <li>Tracking shared on dispatch; charges shown at checkout.</li>
          <li>Delays due to factors beyond control are not our liability.</li>
        </ul>
      </Section>

      <Section id="Returns & Exchanges (No Refunds)" title="8. Returns & Exchanges (Strictly No Refunds)">
        <ul>
          <li>Initiate within <strong>7 days</strong> of delivery.</li>
          <li>Items must be unused, unwashed, with original tags/packaging.</li>
          <li>Sale/promotional items are non-returnable.</li>
          <li>Return shipping borne by customer unless defective/incorrect.</li>
          <li>Exchanges processed after QC for size/replacement.</li>
        </ul>
      </Section>

      <Section id="Privacy Policy" title="9. Privacy Policy">
        <p>We collect personal and usage data to fulfill orders, provide support, process payments, enhance experience, and (with consent) send marketing. Data is shared only with delivery/payment partners as needed. Opt-out available anytime.</p>
      </Section>

      <Section id="Customer Accounts" title="10. Customer Accounts">
        <p>Accounts enable faster checkout and order tracking. Keep credentials confidential and notify us of unauthorized use. We may suspend/terminate accounts on policy violations or fraud.</p>
      </Section>

      <Section id="Intellectual Property" title="11. Intellectual Property">
        <p>All site content and product designs are owned by or licensed to VENUSA. No reproduction or commercial use without written consent.</p>
      </Section>

      <Section id="Legal Disclaimer" title="12. Legal Disclaimer">
        <ul>
          <li>Products are for personal, non-commercial use.</li>
          <li>Follow garment care instructions; we’re not liable for sensitivities or misuse.</li>
          <li>We may update content, pricing, availability, or policies at any time.</li>
        </ul>
      </Section>

      <Section id="Limitation of Liability" title="13. Limitation of Liability">
        <p>To the fullest extent permitted by law, VENUSA is not liable for indirect, incidental, special, punitive, or consequential damages. Our total liability shall not exceed the amount paid for the relevant product.</p>
      </Section>

      <Section id="Promotions & Discounts" title="14. Promotions & Discounts">
        <ul>
          <li>Promo codes/discounts generally cannot be combined unless stated.</li>
          <li>Offers are subject to availability and validity windows.</li>
          <li>We may modify, suspend, or cancel offers, especially in case of misuse.</li>
          <li>Promotions have no cash value unless required by law.</li>
        </ul>
      </Section>

      <Section id="Governing Law & Jurisdiction" title="15. Governing Law & Jurisdiction">
        <p>These Terms are governed by the laws of India. All disputes are subject to the exclusive jurisdiction of courts in New Delhi, India.</p>
      </Section>

      <Section id="Contact Information" title="16. Contact Information">
        <ul>
          <li><strong>Email</strong>: <a className="underline" href="mailto:info@venusa.co.in">info@venusa.co.in</a></li>
        </ul>
        <p className="mt-6 text-white/60 text-sm">We aim to respond within 2–3 business days.</p>
      </Section>
    </div>
  )
}

function Section({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: React.ReactNode
}) {
  const anchor = id.toLowerCase().replace(/[^a-z0-9]+/g, "-")
  return (
    <motion.section
      id={anchor}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={fadeUp}
      className="scroll-mt-28 mb-10"
    >
      <h2 className="font-body text-2xl font-semibold mb-3 text-white">{title}</h2>

      {/* apply inverted prose directly to the content to guarantee dark-theme colors */}
      <div className="prose prose-invert prose-headings:text-white prose-p:text-white/80 prose-li:text-white/80 prose-a:underline">
        {children}
      </div>
    </motion.section>
  )
}
