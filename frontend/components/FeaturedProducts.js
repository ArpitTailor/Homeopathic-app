'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCartStore } from '../store/cartStore';

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const res = await fetch(`${API_URL}/api/products`);
        if (res.ok) {
          const data = await res.json();
          // Sort by rating to get top 4 products
          setProducts(data.sort((a, b) => b.rating - a.rating).slice(0, 4));
        }
      } catch (err) {
        console.error("Failed to fetch featured products:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="bg-card border border-border rounded-2xl overflow-hidden animate-pulse">
            <div className="w-full h-64 bg-secondary/30"></div>
            <div className="p-6">
              <div className="w-1/3 h-4 bg-secondary mb-2 rounded"></div>
              <div className="w-3/4 h-6 bg-secondary mb-4 rounded"></div>
              <div className="w-1/2 h-4 bg-secondary mt-4 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product, idx) => (
        <Link href={`/products/${product.slug}`} key={product.id} className="bg-card border border-border rounded-2xl overflow-hidden group hover:shadow-xl transition-all duration-300 flex flex-col h-full">
          <div className="w-full h-64 bg-secondary/30 relative flex items-center justify-center p-0 overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            {idx === 0 && (
              <span className="absolute top-4 left-4 bg-accent text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Best Seller</span>
            )}
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
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  addToCart(product);
                  alert(`${product.name} added to cart!`);
                }}
                className="bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground p-2 rounded-full transition-colors z-10 relative"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
