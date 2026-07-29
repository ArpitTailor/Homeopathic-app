export default function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">Get in Touch</h1>
        <p className="text-lg text-muted-foreground">
          Have a question about a remedy or need consultation? Our expert team is here to help you on your wellness journey.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
        {/* Contact Info */}
        <div className="space-y-8">
          <div className="bg-card p-8 rounded-3xl border border-border shadow-sm flex items-start space-x-6">
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary text-2xl flex-shrink-0">
              📍
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">Our Clinic</h3>
              <p className="text-muted-foreground">
                Roots & Remedies Care Center<br/>
                123 Healing Avenue, Wellness Park<br/>
                New Delhi, India 110001
              </p>
            </div>
          </div>

          <div className="bg-card p-8 rounded-3xl border border-border shadow-sm flex items-start space-x-6">
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary text-2xl flex-shrink-0">
              📞
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">Contact Details</h3>
              <p className="text-muted-foreground mb-1">Support: +91 98765 43210</p>
              <p className="text-muted-foreground mb-1">Consultation: +91 98765 43211</p>
              <p className="text-primary font-medium mt-2">support@rootsandremedies.com</p>
            </div>
          </div>

          <div className="bg-card p-8 rounded-3xl border border-border shadow-sm flex items-start space-x-6">
            <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center text-primary text-2xl flex-shrink-0">
              ⏰
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground mb-2">Operating Hours</h3>
              <p className="text-muted-foreground">Monday - Saturday: 9:00 AM - 8:00 PM</p>
              <p className="text-muted-foreground">Sunday: 10:00 AM - 2:00 PM</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-card p-8 md:p-10 rounded-3xl border border-border shadow-lg">
          <h2 className="text-2xl font-bold text-foreground mb-6">Send us a Message</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">First Name</label>
                <input type="text" className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary/50 bg-background" placeholder="John" />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Last Name</label>
                <input type="text" className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary/50 bg-background" placeholder="Doe" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
              <input type="email" className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary/50 bg-background" placeholder="john@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Message / Question</label>
              <textarea rows="5" className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary/50 bg-background resize-none" placeholder="How can we help you today?"></textarea>
            </div>
            <button type="button" className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all shadow-md">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
