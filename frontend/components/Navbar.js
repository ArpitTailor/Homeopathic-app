'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const { user, logout, hydrate: hydrateAuth } = useAuthStore();
  const cart = useCartStore((state) => state.cart);
  const router = useRouter();
  
  useEffect(() => {
    hydrateAuth();
    // useCartStore is persisted automatically but we need to ensure it's hydrated on client
    useCartStore.persist.rehydrate();
  }, [hydrateAuth]);

  // Calculate total items in cart
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <nav className="static w-full bg-[#081c15] border-b border-[#1b4332]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-white tracking-tight">
              Roots & Remedies
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/products" className="text-gray-300 hover:text-white transition-colors">Shop</Link>
            <Link href="/categories" className="text-gray-300 hover:text-white transition-colors">Categories</Link>
            <Link href="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link>
            <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            
            {/* Search */}
            <div className="relative flex items-center">
              {isSearchOpen && (
                <form onSubmit={handleSearchSubmit} className="absolute right-10 top-1/2 -translate-y-1/2">
                  <input
                    type="text"
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-48 px-3 py-1 bg-[#122a1f] border border-[#1b4332] rounded-full text-white text-sm focus:outline-none focus:border-primary transition-all"
                    onBlur={() => {
                      if (!searchQuery) setIsSearchOpen(false);
                    }}
                  />
                </form>
              )}
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-gray-300 hover:text-white transition-colors z-10 bg-[#081c15]" 
                aria-label="Search"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>

            {/* Cart */}
            <Link href="/cart" className="p-2 text-gray-300 hover:text-white transition-colors relative" aria-label="Cart">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-primary-foreground transform translate-x-1/4 -translate-y-1/4 bg-primary rounded-full">
                  {cartItemCount}
                </span>
              )}
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-300">Hi, {user.name.split(' ')[0]}</span>
                <Link href="/orders" className="text-gray-300 hover:text-white transition-colors font-medium">My Orders</Link>
                <button onClick={logout} className="bg-muted text-white px-4 py-2 rounded-full font-medium hover:bg-card transition-all shadow-md border border-border">
                  Logout
                </button>
              </div>
            ) : (
              <Link href="/login" className="bg-primary text-primary-foreground px-4 py-2 rounded-full font-medium hover:bg-primary/90 transition-all shadow-md hover:shadow-lg border border-primary/20">
                Sign In
              </Link>
            )}
          </div>

          <div className="flex items-center md:hidden space-x-4">
            <Link href="/cart" className="text-gray-300 hover:text-white relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-primary-foreground transform translate-x-1/3 -translate-y-1/3 bg-primary rounded-full">
                  {cartItemCount}
                </span>
              )}
            </Link>
            
            <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#081c15] border-t border-[#1b4332]">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <form onSubmit={handleSearchSubmit} className="mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full px-3 py-2 bg-[#122a1f] border border-[#1b4332] rounded-md text-white text-sm focus:outline-none focus:border-primary transition-all"
              />
            </form>
            
            <Link href="/products" className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-card/10 rounded-md">Shop</Link>
            <Link href="/categories" className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-card/10 rounded-md">Categories</Link>
            <Link href="/about" className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-card/10 rounded-md">About Us</Link>
            
            {user ? (
              <>
                <Link href="/orders" className="block px-3 py-2 mt-4 text-center font-medium text-white hover:bg-card/10 rounded-md border border-border">My Orders</Link>
                <button onClick={logout} className="block w-full px-3 py-2 mt-2 text-center font-medium bg-muted text-white rounded-md">
                  Logout ({user.name.split(' ')[0]})
                </button>
              </>
            ) : (
              <Link href="/login" className="block px-3 py-2 mt-4 text-center font-medium bg-primary text-primary-foreground rounded-md">Sign In</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
