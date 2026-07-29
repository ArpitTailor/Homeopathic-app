import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-block bg-primary/10 text-primary font-semibold px-4 py-1 rounded-full mb-6 text-sm">
            Our Story
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-6 leading-tight">
            Healing the World,<br/> Naturally.
          </h1>
          <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
            At Roots & Remedies, we believe in the power of nature to restore balance to the human body. Founded by a team of expert homeopaths and natural wellness enthusiasts, our mission is to provide safe, effective, and 100% natural healthcare solutions to everyone.
          </p>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Unlike conventional medicine that often merely suppresses symptoms, homeopathy works with your body's immune system to trigger natural healing from within. We carefully source the purest organic ingredients to create remedies you can trust.
          </p>
          
          <div className="flex space-x-6">
            <div>
              <div className="text-3xl font-extrabold text-primary mb-1">10K+</div>
              <div className="text-sm font-medium text-muted-foreground">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-primary mb-1">100%</div>
              <div className="text-sm font-medium text-muted-foreground">Natural Actives</div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-primary mb-1">50+</div>
              <div className="text-sm font-medium text-muted-foreground">Tested Remedies</div>
            </div>
          </div>
        </div>
        
        <div className="relative h-[600px] w-full rounded-3xl overflow-hidden glass-panel border border-border flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/10">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
          <div className="relative z-10 text-center p-8 bg-card/60 backdrop-blur-md rounded-2xl shadow-xl max-w-sm border border-white/50">
            <div className="text-5xl mb-4">🌿</div>
            <h3 className="text-2xl font-bold text-foreground mb-2">Our Promise</h3>
            <p className="text-muted-foreground">No side effects. No harsh chemicals. Just pure, targeted, homeopathic healing.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
