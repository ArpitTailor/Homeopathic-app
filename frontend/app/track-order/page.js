'use client';
import { useState } from 'react';

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrack = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTrackingData(null);

    // Mock an API call
    setTimeout(() => {
      setLoading(false);
      if (orderId === 'ORD-7832' || orderId.startsWith('ORD-')) {
        setTrackingData({
          id: orderId,
          date: 'Oct 24, 2023',
          status: 'SHIPPED',
          carrier: 'Delhivery',
          trackingNumber: 'AWB123456789',
          estimatedDelivery: 'Oct 28, 2023',
          steps: [
            { title: 'Order Placed', date: 'Oct 24, 2023, 10:30 AM', completed: true },
            { title: 'Processing', date: 'Oct 24, 2023, 02:15 PM', completed: true },
            { title: 'Shipped', date: 'Oct 25, 2023, 09:00 AM', completed: true },
            { title: 'Out for Delivery', date: 'Pending', completed: false },
            { title: 'Delivered', date: 'Pending', completed: false },
          ]
        });
      } else {
        setError('Order not found. Please check your Order ID and Email.');
      }
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 min-h-[70vh]">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-foreground tracking-tight mb-4">Track Your Order</h1>
        <p className="text-lg text-muted-foreground">
          Enter your Order ID and Email address below to see the real-time status of your shipment.
        </p>
      </div>

      <div className="bg-card p-8 md:p-10 rounded-3xl border border-border shadow-md mb-12">
        <form onSubmit={handleTrack} className="flex flex-col md:flex-row gap-6 items-end">
          <div className="w-full">
            <label className="block text-sm font-medium text-foreground mb-2">Order ID</label>
            <input 
              type="text" 
              required
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary/50" 
              placeholder="e.g. ORD-12345" 
            />
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary/50" 
              placeholder="john@example.com" 
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full md:w-auto bg-primary text-primary-foreground px-8 py-3 rounded-xl font-bold hover:bg-primary/90 transition-all whitespace-nowrap disabled:opacity-50 h-[50px]"
          >
            {loading ? 'Tracking...' : 'Track Order'}
          </button>
        </form>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-6 rounded-2xl text-center border border-red-200">
          <span className="font-medium">{error}</span>
        </div>
      )}

      {trackingData && (
        <div className="bg-card p-8 md:p-10 rounded-3xl border border-border shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 pb-6 border-b border-border">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Order {trackingData.id}</h2>
              <p className="text-muted-foreground mt-1">Placed on {trackingData.date}</p>
            </div>
            <div className="mt-4 md:mt-0 text-right">
              <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Estimated Delivery</p>
              <p className="text-xl font-extrabold text-primary">{trackingData.estimatedDelivery}</p>
            </div>
          </div>

          <div className="mb-10">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-foreground">Carrier: {trackingData.carrier}</span>
              <span className="text-sm font-medium text-muted-foreground text-right">Tracking #: <span className="text-foreground">{trackingData.trackingNumber}</span></span>
            </div>
          </div>

          {/* Stepper */}
          <div className="relative border-l-2 border-primary/20 ml-4 space-y-8">
            {trackingData.steps.map((step, idx) => (
              <div key={idx} className="relative pl-8">
                <div className={`absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-white ${step.completed ? 'bg-primary' : 'bg-muted-foreground'}`}></div>
                <h3 className={`font-bold ${step.completed ? 'text-foreground' : 'text-muted-foreground'}`}>{step.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{step.date}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
