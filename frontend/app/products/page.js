'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('popularity');
  
  const categories = ['All', 'Cold & Cough', 'Digestive Health', 'Skin Care', 'Beauty Serums', 'Pain Relief', 'General Wellness'];

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('http://localhost:5000/api/products');
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError('Could not load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // Filter and sort logic
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    if (sortBy === 'price_asc') return a.price - b.price;
    if (sortBy === 'price_desc') return b.price - a.price;
    return b.rating - a.rating; // default popularity
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">All Products</h1>
          <p className="text-muted-foreground mt-1">Discover our full range of natural remedies.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-64 pl-10 pr-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="popularity">Sort by Popularity</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="w-full lg:w-1/4">
          <div className="bg-muted/30 p-6 rounded-2xl border border-border sticky top-24">
            <h3 className="font-bold text-lg mb-4 text-foreground">Categories</h3>
            <div className="space-y-3">
              {categories.map(category => (
                <label key={category} className="flex items-center space-x-3 cursor-pointer group">
                  <input 
                    type="radio" 
                    name="category"
                    value={category}
                    checked={selectedCategory === category}
                    onChange={() => setSelectedCategory(category)}
                    className="form-radio text-primary focus:ring-primary h-4 w-4"
                  />
                  <span className={`text-sm ${selectedCategory === category ? 'text-primary font-medium' : 'text-muted-foreground group-hover:text-foreground'}`}>
                    {category}
                  </span>
                </label>
              ))}
            </div>
            
            <div className="mt-8">
              <h3 className="font-bold text-lg mb-4 text-foreground">Total Products</h3>
              <p className="text-muted-foreground text-sm">{filteredProducts.length} items found</p>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="w-full lg:w-3/4">
          {loading ? (
            <div className="flex justify-center items-center py-32">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="text-center py-20 bg-muted/20 rounded-2xl border border-border">
              <h3 className="text-xl font-medium text-red-500">{error}</h3>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-muted/20 rounded-2xl border border-border">
              <h3 className="text-xl font-medium text-foreground">No products found</h3>
              <p className="text-muted-foreground mt-2">Try adjusting your search or filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Link href={`/products/${product.slug}`} key={product.id} className="bg-card border border-border rounded-2xl overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                  <div className="w-full h-64 bg-secondary/30 relative flex items-center justify-center p-0 overflow-hidden">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="text-xs text-muted-foreground font-medium mb-1">{product.category}</div>
                    <h3 className="text-lg font-bold text-foreground mb-1 line-clamp-2">{product.name}</h3>
                    <div className="flex items-center space-x-1 mb-3">
                      <span className="text-accent text-sm">★</span>
                      <span className="text-sm font-medium text-foreground">{product.rating}</span>
                    </div>
                    <div className="flex justify-between items-end mt-auto pt-4 border-t border-border">
                      <span className="text-xl font-extrabold text-foreground">₹{product.price}</span>
                      <button className="bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground p-2 rounded-full transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
