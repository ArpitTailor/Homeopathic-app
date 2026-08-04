import Image from 'next/image';
import Link from 'next/link';
import FeaturedProducts from '../components/FeaturedProducts';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full min-h-[90vh] py-12 md:py-20 flex items-center justify-center overflow-hidden bg-primary/5">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-accent/20 blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-secondary/40 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between w-full h-full gap-12 md:gap-0">
          {/* Left Content */}
          <div className="w-full md:w-1/2 flex flex-col space-y-6 pt-20 md:pt-0">
            <div className="inline-flex items-center space-x-2 bg-card/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 w-max shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-accent"></span>
              <span className="text-sm font-medium text-primary">100% Natural Ingredients</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-foreground tracking-tight leading-tight">
              Nature's Touch for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Holistic Healing</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed">
              Discover our premium range of homeopathic remedies, organic skincare, and wellness solutions designed to restore your natural balance.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
              <Link href="/products" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg text-center transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Shop Now
              </Link>
              <Link href="/categories" className="glass-panel text-foreground hover:bg-card/40 px-8 py-4 rounded-full font-semibold text-lg text-center transition-all shadow-sm">
                Explore Categories
              </Link>
            </div>
            
            {/* Quick Search inside Hero */}
            <div className="mt-8 relative max-w-md">
              <input 
                type="text" 
                placeholder="Search for remedies, serums, body wash..." 
                className="w-full pl-6 pr-12 py-4 rounded-full border border-border bg-card/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-sm transition-all"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right Content / Visual Showcase */}
          <div className="w-full md:w-1/2 min-h-[40vh] md:h-full flex items-center justify-center relative mt-8 md:mt-0 pb-12 md:pb-0">
            {/* Main Visual Glass Card */}
            <div className="glass-panel w-full max-w-sm md:max-w-md h-[350px] md:h-[500px] rounded-[2rem] relative z-20 shadow-2xl overflow-hidden flex items-center justify-center border border-white/40">
              <div className="absolute inset-0 bg-gradient-to-tr from-secondary/50 to-transparent mix-blend-overlay"></div>
              
              {/* Central Bottle/Product Placeholder (Since no Three.js, we use a sleek UI presentation) */}
              <div className="relative z-30 flex flex-col items-center">
                <div className="w-40 h-56 bg-card/80 backdrop-blur-md rounded-2xl shadow-xl flex flex-col items-center justify-between p-4 border border-white/50 transform rotate-[-5deg] hover:rotate-0 transition-transform duration-500 cursor-pointer">
                  <div className="w-12 h-4 bg-primary/20 rounded-t-sm"></div>
                  <div className="w-full h-full flex-grow mt-2 border-2 border-primary/10 rounded-xl bg-gradient-to-b from-transparent to-primary/5 flex items-center justify-center">
                    <span className="text-primary font-bold text-center leading-tight">Roots<br/>&<br/>Remedies</span>
                  </div>
                </div>
                
                {/* Floating Elements */}
                <div className="absolute -right-16 top-10 glass-panel px-4 py-2 rounded-xl shadow-lg flex items-center space-x-2 animate-bounce" style={{ animationDuration: '3s' }}>
                  <span className="text-2xl">🌿</span>
                  <span className="font-semibold text-sm text-foreground">Organic</span>
                </div>
                
                <div className="absolute -left-12 bottom-20 glass-panel px-4 py-2 rounded-xl shadow-lg flex items-center space-x-2 animate-bounce" style={{ animationDuration: '4s' }}>
                  <span className="text-2xl">✨</span>
                  <span className="font-semibold text-sm text-foreground">Glowing Skin</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Grid Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">Shop by Category</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">Explore our diverse range of homeopathic solutions for your everyday wellness needs.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Cold & Cough', icon: '🤧', color: 'bg-blue-100 text-blue-700' },
              { name: 'Digestive Health', icon: '🍃', color: 'bg-green-100 text-green-700' },
              { name: 'Skin Care', icon: '✨', color: 'bg-pink-100 text-pink-700' },
              { name: 'Beauty Serums', icon: '💧', color: 'bg-purple-100 text-purple-700' }
            ].map((category, idx) => (
              <Link href={`/categories/${category.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`} key={idx} className="group cursor-pointer">
                <div className="flex flex-col items-center p-8 rounded-3xl border border-border bg-card hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center text-4xl mb-6 ${category.color} group-hover:scale-110 transition-transform duration-300`}>
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">{category.name}</h3>
                  <span className="mt-2 text-sm text-muted-foreground font-medium flex items-center">
                    Explore 
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section (Placeholder) */}
      <section className="py-24 bg-muted/30 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">Best Sellers</h2>
              <p className="mt-4 text-lg text-muted-foreground">Our most loved remedies and wellness products.</p>
            </div>
            <Link href="/products" className="hidden md:flex items-center text-primary font-semibold hover:underline">
              View All Products
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          
          <FeaturedProducts />
        </div>
      </section>
    </div>
  );
}
