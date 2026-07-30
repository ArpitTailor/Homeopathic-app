import Link from 'next/link';

export default function ShippingReturnsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">Shipping & Returns</h1>
        <p className="text-lg text-muted-foreground">
          Everything you need to know about how we deliver our remedies and our 30-day return policy.
        </p>
      </div>

      <div className="space-y-12">
        <section className="bg-card p-8 md:p-10 rounded-3xl border border-border shadow-sm">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary text-2xl">
              🚚
            </div>
            <h2 className="text-2xl font-bold text-foreground">Shipping Policy</h2>
          </div>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              We strive to deliver your homeopathic medicines and wellness products as quickly and safely as possible. We partner with top-tier courier services across India to ensure timely delivery.
            </p>
            <h3 className="text-foreground font-semibold mt-6 mb-2">Processing Time</h3>
            <p>
              All orders are processed within 1-2 business days. Orders are not shipped or delivered on weekends or holidays. If we are experiencing a high volume of orders, shipments may be delayed by a few days.
            </p>
            <h3 className="text-foreground font-semibold mt-6 mb-2">Shipping Rates & Delivery Estimates</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Standard Shipping:</strong> Free for orders above ₹499. (Delivery in 3-5 business days)</li>
              <li><strong>Standard Shipping (Below ₹499):</strong> Flat rate of ₹50.</li>
              <li><strong>Express Shipping:</strong> ₹100 flat rate. (Delivery in 1-2 business days in metro cities)</li>
            </ul>
            <p className="text-muted-foreground mt-4 leading-relaxed">
              You will receive an email confirmation containing your tracking number once your order has shipped. 
              You can also <Link href="/orders" className="text-primary hover:underline font-medium">view your orders here</Link> directly.
            </p>
          </div>
        </section>

        <section className="bg-card p-8 md:p-10 rounded-3xl border border-border shadow-sm">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary text-2xl">
              📦
            </div>
            <h2 className="text-2xl font-bold text-foreground">Returns & Refunds</h2>
          </div>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              We stand behind the quality of our products. If you are not completely satisfied with your purchase, you may return it within 30 days of receipt for a full refund or exchange.
            </p>
            <h3 className="text-foreground font-semibold mt-6 mb-2">Return Conditions</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Items must be unused and in the same condition that you received them.</li>
              <li>Items must be in their original packaging with all safety seals intact. (Medicines with broken seals cannot be returned for safety reasons).</li>
              <li>Prescription medicines cannot be returned or refunded.</li>
            </ul>
            <h3 className="text-foreground font-semibold mt-6 mb-2">How to Initiate a Return</h3>
            <p>
              To initiate a return, please contact our support team at <strong className="text-foreground">support@rootsandremedies.com</strong> with your Order ID. Our team will arrange a reverse pickup from your delivery address.
            </p>
            <h3 className="text-foreground font-semibold mt-6 mb-2">Refunds</h3>
            <p>
              Once your return is received and inspected, we will notify you of the approval or rejection of your refund. If approved, your refund will be processed to your original method of payment within 5-7 business days.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
