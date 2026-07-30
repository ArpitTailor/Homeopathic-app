'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    // Dummy frontend auth simulation to show the concept
    if (email && password) {
      // In a real app, you would make an API call to /api/auth/login
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const res = await fetch(`${API_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      // Simulate success
      localStorage.setItem('adminToken', 'mock_admin_token_123');
      router.push('/admin');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/20">
      <div className="bg-card p-10 rounded-3xl shadow-xl w-full max-w-md border border-border">
        <div className="text-center mb-8">
          <div className="text-4xl mb-4">🍃</div>
          <h1 className="text-3xl font-extrabold text-foreground">Admin Portal</h1>
          <p className="text-muted-foreground mt-2">Sign in to manage Roots & Remedies</p>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Admin Email</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary/50" 
              placeholder="admin@roots.com" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary/50" 
              placeholder="••••••••" 
            />
          </div>
          <button type="submit" className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-all shadow-md">
            Login to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
}
