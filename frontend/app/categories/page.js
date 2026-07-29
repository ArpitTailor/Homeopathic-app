import Link from 'next/link';

export default function CategoriesPage() {
  const categories = [
    { name: 'Cold & Cough', icon: '🤧', color: 'bg-blue-100 text-blue-700', description: 'Relief from seasonal colds, coughs, and flu symptoms.' },
    { name: 'Digestive Health', icon: '🍃', color: 'bg-green-100 text-green-700', description: 'Natural remedies for acidity, indigestion, and gut health.' },
    { name: 'Skin Care', icon: '✨', color: 'bg-pink-100 text-pink-700', description: 'Homeopathic creams and lotions for acne, eczema, and glowing skin.' },
    { name: 'Beauty Serums', icon: '💧', color: 'bg-purple-100 text-purple-700', description: 'Advanced serums infused with natural extracts for anti-aging.' },
    { name: 'Pain Relief', icon: '🦴', color: 'bg-orange-100 text-orange-700', description: 'Ointments and drops for joint pain, muscle aches, and arthritis.' },
    { name: 'Hair Care', icon: '🌿', color: 'bg-teal-100 text-teal-700', description: 'Anti-hairfall drops and natural oils for strong, healthy hair.' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">Shop by Category</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore our expertly formulated homeopathic and natural wellness solutions, carefully categorized to help you find exactly what you need.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category, idx) => (
          <Link href={`/products`} key={idx} className="group block">
            <div className="bg-card border border-border p-8 rounded-3xl hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2 h-full flex flex-col">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 ${category.color} group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                {category.icon}
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">{category.name}</h2>
              <p className="text-muted-foreground leading-relaxed flex-grow">{category.description}</p>
              <div className="mt-6 flex items-center text-primary font-medium">
                View Products
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
