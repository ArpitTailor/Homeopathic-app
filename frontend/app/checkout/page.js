'use client';
import { useState, useEffect } from 'react';
import { useCartStore } from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, getCartTotal, hasPrescriptionItems, clearCart } = useCartStore();
  const { user, token, hydrate } = useAuthStore();
  const [step, setStep] = useState(1);
  const [isClient, setIsClient] = useState(false);

  // Hydration fix for zustand
  useEffect(() => {
    hydrate();
    setIsClient(true);
  }, [hydrate]);

  const [shippingAddress, setShippingAddress] = useState({
    fullName: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('RAZORPAY');
  const [prescriptionFile, setPrescriptionFile] = useState(null);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  if (!isClient) return null;

  if (!user) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">Please Sign In</h2>
        <p className="text-muted-foreground mb-8">You must be logged in to proceed to checkout.</p>
        <Link href="/login" className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all">
          Sign In
        </Link>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 text-green-500 rounded-full mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-4">Order Placed Successfully!</h2>
        <p className="text-muted-foreground mb-8">Thank you for your purchase. We will process your order soon.</p>
        <Link href="/products" className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all">
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">Your Cart is Empty</h2>
        <p className="text-muted-foreground mb-8">Looks like you haven't added any remedies yet.</p>
        <Link href="/products" className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all">
          Start Shopping
        </Link>
      </div>
    );
  }

  const subtotal = getCartTotal();
  const total = subtotal - discount;
  const requiresRx = hasPrescriptionItems();

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step === 1 && requiresRx && !prescriptionFile) {
      alert('Please upload a prescription for the required medicines.');
      return;
    }
    setStep(step + 1);
  };

  const handleApplyCoupon = () => {
    if (couponCode.toLowerCase() === 'welcome10') {
      setDiscount(subtotal * 0.10);
      alert('Coupon Applied!');
    } else {
      alert('Invalid Coupon Code');
    }
  };

  const handlePlaceOrder = async () => {
    setIsSubmitting(true);
    setError(null);

    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    
    // Prepare items
    const items = cart.map(item => ({
      productId: item.id,
      quantity: item.quantity
    }));

    try {
      const res = await fetch(`${API_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          items,
          paymentMethod,
          shippingAddress,
          couponCode: discount > 0 ? couponCode : undefined
        })
      });

      const contentType = res.headers.get("content-type");
      let data;
      if (contentType && contentType.indexOf("application/json") !== -1) {
        data = await res.json();
      } else {
        data = { message: 'Server returned an unexpected response' };
      }

      if (!res.ok) {
        if (data.message && data.message.includes('old items in your cart')) {
          clearCart();
          throw new Error(data.message + ' We have cleared it for you. Please refresh and add products again.');
        }
        throw new Error(data.message || 'Failed to place order');
      }

      clearCart();
      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold text-foreground tracking-tight">Checkout</h1>
      </div>

      {/* Progress Steps */}
      <div className="flex justify-center mb-12">
        <div className="flex items-center space-x-4">
          <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${step >= 1 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>1</div>
          <div className={`w-16 h-1 ${step >= 2 ? 'bg-primary' : 'bg-muted'}`}></div>
          <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${step >= 2 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>2</div>
          <div className={`w-16 h-1 ${step >= 3 ? 'bg-primary' : 'bg-muted'}`}></div>
          <div className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${step >= 3 ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}`}>3</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Checkout Form */}
        <div className="lg:col-span-2">
          
          {/* STEP 1: Shipping Address */}
          {step === 1 && (
            <div className="bg-card p-8 rounded-3xl border border-border shadow-sm">
              <h2 className="text-2xl font-bold text-foreground mb-6">Shipping Address</h2>
              <form onSubmit={handleNextStep} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                    <input required type="text" value={shippingAddress.fullName} onChange={(e) => setShippingAddress({...shippingAddress, fullName: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-primary/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                    <input required type="tel" value={shippingAddress.phone} onChange={(e) => setShippingAddress({...shippingAddress, phone: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-primary/50" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Address Line 1</label>
                  <input required type="text" value={shippingAddress.addressLine1} onChange={(e) => setShippingAddress({...shippingAddress, addressLine1: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-primary/50" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-sm font-medium text-foreground mb-2">City</label>
                    <input required type="text" value={shippingAddress.city} onChange={(e) => setShippingAddress({...shippingAddress, city: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-primary/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">State</label>
                    <input required type="text" value={shippingAddress.state} onChange={(e) => setShippingAddress({...shippingAddress, state: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-primary/50" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">ZIP Code</label>
                    <input required type="text" value={shippingAddress.zipCode} onChange={(e) => setShippingAddress({...shippingAddress, zipCode: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-border focus:ring-2 focus:ring-primary/50" />
                  </div>
                </div>

                {/* Prescription Upload (Conditional) */}
                {requiresRx && (
                  <div className="mt-8 p-6 bg-red-50 border border-red-200 rounded-2xl">
                    <h3 className="text-lg font-bold text-red-800 mb-2 flex items-center">
                      <span className="mr-2">Rx</span> Prescription Required
                    </h3>
                    <p className="text-sm text-red-600 mb-4">One or more items in your cart require a valid doctor's prescription. Please upload it securely below.</p>
                    <input 
                      type="file" 
                      accept=".pdf,image/*"
                      onChange={(e) => setPrescriptionFile(e.target.files[0])}
                      className="block w-full text-sm text-foreground file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-100 file:text-red-700 hover:file:bg-red-200"
                    />
                  </div>
                )}

                <button type="submit" className="w-full bg-primary text-primary-foreground py-4 rounded-full font-bold text-lg hover:bg-primary/90 transition-all mt-8">
                  Continue to Payment
                </button>
              </form>
            </div>
          )}

          {/* STEP 2: Payment Method */}
          {step === 2 && (
            <div className="bg-card p-8 rounded-3xl border border-border shadow-sm">
              <h2 className="text-2xl font-bold text-foreground mb-6">Payment Method</h2>
              <div className="space-y-4">
                <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'RAZORPAY' ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted/30'}`}>
                  <input type="radio" name="payment" value="RAZORPAY" checked={paymentMethod === 'RAZORPAY'} onChange={(e) => setPaymentMethod(e.target.value)} className="h-5 w-5 text-primary focus:ring-primary" />
                  <span className="ml-4 flex flex-col">
                    <span className="font-bold text-foreground">Pay with Razorpay (UPI, Cards, NetBanking)</span>
                    <span className="text-sm text-muted-foreground mt-1">Secure payment gateway</span>
                  </span>
                </label>
                
                <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'COD' ? 'border-primary bg-primary/5' : 'border-border hover:bg-muted/30'}`}>
                  <input type="radio" name="payment" value="COD" checked={paymentMethod === 'COD'} onChange={(e) => setPaymentMethod(e.target.value)} className="h-5 w-5 text-primary focus:ring-primary" />
                  <span className="ml-4 flex flex-col">
                    <span className="font-bold text-foreground">Cash on Delivery (COD)</span>
                    <span className="text-sm text-muted-foreground mt-1">Pay when your order arrives</span>
                  </span>
                </label>
              </div>

              <div className="flex justify-between mt-8">
                <button onClick={() => setStep(1)} className="px-6 py-3 border border-border text-foreground rounded-full hover:bg-muted transition-colors font-medium">Back</button>
                <button onClick={() => setStep(3)} className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-bold hover:bg-primary/90 transition-all">Review Order</button>
              </div>
            </div>
          )}

          {/* STEP 3: Review Order */}
          {step === 3 && (
            <div className="bg-card p-8 rounded-3xl border border-border shadow-sm">
              <h2 className="text-2xl font-bold text-foreground mb-6">Review Your Order</h2>
              
              <div className="space-y-6 mb-8">
                {cart.map(item => (
                  <div key={item.id} className="flex justify-between items-center border-b border-border pb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-secondary/30 rounded-md"></div>
                      <div>
                        <h4 className="font-semibold text-foreground">{item.name}</h4>
                        <span className="text-sm text-muted-foreground">Qty: {item.quantity}</span>
                      </div>
                    </div>
                    <span className="font-bold">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="bg-muted/30 p-6 rounded-2xl mb-8">
                <h3 className="font-bold text-foreground mb-2">Selected Payment Method</h3>
                <p className="text-muted-foreground">{paymentMethod === 'RAZORPAY' ? 'Online Payment (Razorpay)' : 'Cash on Delivery (COD)'}</p>
              </div>

              {error && (
                <div className="mb-8 p-4 bg-red-500/10 border border-red-500/50 rounded-xl text-red-500 font-medium">
                  {error}
                </div>
              )}

              <div className="flex justify-between mt-8">
                <button onClick={() => setStep(2)} className="px-6 py-3 border border-border text-foreground rounded-full hover:bg-muted transition-colors font-medium">Back</button>
                <button disabled={isSubmitting} onClick={handlePlaceOrder} className="bg-primary text-primary-foreground px-12 py-3 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all disabled:opacity-50">
                  {isSubmitting ? 'Processing...' : 'Place Order'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-muted/20 p-6 rounded-3xl border border-border sticky top-24">
            <h3 className="text-xl font-bold text-foreground mb-6">Order Summary</h3>
            
            <div className="space-y-4 text-sm text-muted-foreground mb-6 pb-6 border-b border-border">
              <div className="flex justify-between">
                <span>Subtotal ({cart.length} items)</span>
                <span className="text-foreground font-medium">₹{subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-accent font-medium">
                  <span>Discount</span>
                  <span>-₹{discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-foreground font-medium">Free</span>
              </div>
            </div>
            
            <div className="flex justify-between text-lg font-bold text-foreground mb-8">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>

            {step < 3 && (
              <div className="space-y-4">
                <label className="block text-sm font-medium text-foreground">Have a coupon code?</label>
                <div className="flex space-x-2">
                  <input 
                    type="text" 
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="e.g. WELCOME10" 
                    className="flex-1 px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-primary/50 uppercase" 
                  />
                  <button onClick={handleApplyCoupon} className="bg-secondary text-secondary-foreground px-4 py-2 rounded-lg font-medium hover:bg-secondary/80 transition-colors">Apply</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
