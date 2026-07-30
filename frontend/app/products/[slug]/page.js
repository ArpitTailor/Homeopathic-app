'use client';
import { useState, useEffect, use } from 'react';
import Link from 'next/link';

export default function ProductDetailPage({ params }) {
  const unwrappedParams = use(params);
  const slug = unwrappedParams.slug;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    async function fetchProduct() {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const res = await fetch(`${API_URL}/api/products/${slug}`);
        if (!res.ok) throw new Error('Failed to fetch product');
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
        setError('Could not load product details.');
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <h2 className="text-2xl font-bold text-red-500 mb-4">{error || 'Product not found'}</h2>
        <Link href="/products" className="text-primary hover:underline">Return to Shop</Link>
      </div>
    );
  }

  // Calculate dummy reviews based on rating if not present
  const reviewsCount = Math.floor((product.rating || 4.5) * 20 + Math.random() * 50);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="flex text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground font-medium">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="w-full h-[500px] bg-secondary/20 rounded-3xl border border-border flex items-center justify-center p-0 relative overflow-hidden">
             <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
             
             {/* Prescription badge placeholder */}
             {product.name.includes('200CH') || product.name.includes('1M') ? (
               <div className="absolute top-6 left-6 bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full flex items-center shadow-sm z-10">
                 <span className="mr-1">Rx</span> Higher Potency
               </div>
             ) : null}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="mb-2 text-sm font-medium text-primary uppercase tracking-wider">{product.category}</div>
          <h1 className="text-4xl font-extrabold text-foreground mb-4">{product.name}</h1>
          
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className={`text-xl ${star <= Math.round(product.rating) ? 'text-accent' : 'text-muted'}`}>★</span>
              ))}
            </div>
            <span className="text-muted-foreground text-sm underline cursor-pointer">{reviewsCount} reviews</span>
          </div>

          <div className="text-4xl font-extrabold text-foreground mb-6">₹{product.price}</div>

          <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
            {product.description}
          </p>

          <div className="flex items-center space-x-4 mb-8">
            <div className="flex items-center border border-border rounded-full bg-card">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 flex items-center justify-center text-foreground hover:text-primary transition-colors"
              >-</button>
              <span className="w-12 text-center font-medium text-foreground">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 flex items-center justify-center text-foreground hover:text-primary transition-colors"
              >+</button>
            </div>
            <button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 py-4 px-8 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Add to Cart
            </button>
          </div>

          <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-12">
            <div className={`w-3 h-3 rounded-full ${product.stock > 0 ? 'bg-primary' : 'bg-red-500'}`}></div>
            <span>{product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}</span>
          </div>

          {/* Details Tabs */}
          <div className="border-t border-border pt-8">
            <div className="flex space-x-8 mb-6">
              <button 
                onClick={() => setActiveTab('description')}
                className={`font-semibold pb-2 border-b-2 transition-colors ${activeTab === 'description' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
              >
                Description
              </button>
              <button 
                onClick={() => setActiveTab('ingredients')}
                className={`font-semibold pb-2 border-b-2 transition-colors ${activeTab === 'ingredients' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
              >
                Ingredients
              </button>
              <button 
                onClick={() => setActiveTab('dosage')}
                className={`font-semibold pb-2 border-b-2 transition-colors ${activeTab === 'dosage' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
              >
                Dosage
              </button>
            </div>

            <div className="text-muted-foreground leading-relaxed">
              {activeTab === 'description' && <p>{product.description}</p>}
              {activeTab === 'ingredients' && <p>Base material: {product.name.split(' ')[0]} {product.name.split(' ')[1]}. Organic lactose base.</p>}
              {activeTab === 'dosage' && <p>Adults and children: Take as directed. Usually 4-5 drops/pills 3 times a day or as prescribed by a physician.</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
