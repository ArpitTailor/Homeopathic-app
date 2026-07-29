'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

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
            <button className="p-2 text-gray-300 hover:text-white transition-colors" aria-label="Search">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="p-2 text-gray-300 hover:text-white transition-colors" aria-label="Cart">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </button>
            <Link href="/login" className="bg-primary text-primary-foreground px-4 py-2 rounded-full font-medium hover:bg-primary/90 transition-all shadow-md hover:shadow-lg border border-primary/20">
              Sign In
            </Link>
          </div>

          <div className="flex items-center md:hidden">
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
            <Link href="/products" className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-card/10 rounded-md">Shop</Link>
            <Link href="/categories" className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-card/10 rounded-md">Categories</Link>
            <Link href="/about" className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-card/10 rounded-md">About Us</Link>
            <Link href="/login" className="block px-3 py-2 mt-4 text-center font-medium bg-primary text-white rounded-md">Sign In</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
