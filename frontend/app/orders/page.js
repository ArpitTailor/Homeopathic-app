'use client';
import { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function MyOrdersPage() {
  const router = useRouter();
  const { user, token, hydrate, logout } = useAuthStore();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    hydrate();
    setIsClient(true);
  }, [hydrate]);

  useEffect(() => {
    if (isClient && user && token) {
      fetchOrders();
    } else if (isClient && !user) {
      setLoading(false);
    }
  }, [isClient, user, token]);

  const fetchOrders = async () => {
    setLoading(true);
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    try {
      const res = await fetch(`${API_URL}/api/orders/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (!res.ok) {
        if (res.status === 401 || data.message === 'Token is not valid') {
          logout();
          router.push('/login');
          throw new Error('Your session has expired. Please log in again.');
        }
        throw new Error(data.message || 'Failed to fetch orders');
      }
      setOrders(data.orders);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isClient) return null;

  if (!user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">Please Sign In</h2>
        <p className="text-muted-foreground mb-8">You must be logged in to view your orders.</p>
        <Link href="/login" className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all">
          Sign In
        </Link>
      </div>
    );
  }

  const statusMap = {
    PENDING: 0,
    PROCESSING: 1,
    SHIPPED: 2,
    DELIVERED: 4,
    CANCELLED: -1,
    PAYMENT_FAILED: -1
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-[70vh]">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold text-foreground tracking-tight">My Orders</h1>
        <p className="text-lg text-muted-foreground mt-2">Track and manage your recent purchases.</p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-700 p-6 rounded-2xl border border-red-200">
          <span className="font-medium">{error}</span>
        </div>
      ) : orders.length === 0 ? (
        <div className="bg-card p-12 text-center rounded-3xl border border-border shadow-sm">
          <h2 className="text-2xl font-bold mb-4">No Orders Yet</h2>
          <p className="text-muted-foreground mb-8">You haven't placed any orders. Start shopping to see them here.</p>
          <Link href="/products" className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => {
            const currentStepIdx = statusMap[order.status] ?? 0;
            const steps = [
              { title: 'Order Placed', completed: currentStepIdx >= 0 },
              { title: 'Processing', completed: currentStepIdx >= 1 },
              { title: 'Shipped', completed: currentStepIdx >= 2 },
              { title: 'Out for Delivery', completed: currentStepIdx >= 3 },
              { title: 'Delivered', completed: currentStepIdx >= 4 },
            ];

            return (
              <div key={order.id} className="bg-card rounded-3xl border border-border shadow-sm overflow-hidden">
                <div className="bg-muted/30 px-6 py-4 border-b border-border flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Order ID</p>
                    <p className="font-mono font-bold text-foreground">{order.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Date Placed</p>
                    <p className="font-bold text-foreground">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Total Amount</p>
                    <p className="font-bold text-primary text-lg">₹{order.totalAmount.toFixed(2)}</p>
                  </div>
                  <div className="md:text-right">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide ${
                      order.status === 'DELIVERED' ? 'bg-green-100 text-green-800 border border-green-200' :
                      order.status === 'CANCELLED' ? 'bg-red-100 text-red-800 border border-red-200' :
                      'bg-blue-100 text-blue-800 border border-blue-200'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  {/* Visual Tracker */}
                  <div className="mb-10 pb-10 border-b border-border hidden md:block">
                    <div className="relative flex justify-between">
                      {/* Connecting Line */}
                      <div className="absolute top-1/2 left-0 w-full h-1 bg-muted -translate-y-1/2 z-0"></div>
                      <div 
                        className="absolute top-1/2 left-0 h-1 bg-primary -translate-y-1/2 z-0 transition-all duration-500"
                        style={{ width: `${(Math.max(0, currentStepIdx) / (steps.length - 1)) * 100}%` }}
                      ></div>
                      
                      {/* Steps */}
                      {steps.map((step, idx) => (
                        <div key={idx} className="relative z-10 flex flex-col items-center bg-card px-2">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 mb-2 transition-colors ${
                            step.completed ? 'bg-primary border-primary text-primary-foreground' : 'bg-card border-border text-muted-foreground'
                          }`}>
                            {step.completed ? (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            ) : (
                              <span className="text-sm font-bold">{idx + 1}</span>
                            )}
                          </div>
                          <span className={`text-sm font-semibold ${step.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {step.title}
                          </span>
                        </div>
                      ))}
                    </div>
                    {order.status === 'CANCELLED' && (
                      <div className="mt-6 text-center text-red-500 font-bold">This order has been cancelled.</div>
                    )}
                  </div>

                  {/* Items List */}
                  <div>
                    <h3 className="font-bold text-foreground mb-4">Order Items</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {order.orderItems.map((item) => (
                        <div key={item.id} className="flex items-center gap-4 p-4 border border-border rounded-2xl">
                          <div className="w-16 h-16 bg-muted/30 rounded-xl flex items-center justify-center overflow-hidden shrink-0">
                            {item.product.image ? (
                              <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                            ) : (
                              <span className="text-2xl">💊</span>
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-foreground">{item.product.name}</p>
                            <div className="flex gap-4 mt-1 text-sm text-muted-foreground">
                              <span>Qty: {item.quantity}</span>
                              <span className="font-semibold text-foreground">₹{(item.priceAtPurchase * item.quantity).toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
