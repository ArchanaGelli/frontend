import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Truck, CreditCard, ChevronLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatPrice } from '../utils/helpers';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const { cart, subtotal, totalDiscount, totalMrp, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: user?.email || '', phone: '',
    address: '', city: '', state: '', pincode: ''
  });

  const shipping = subtotal >= 999 ? 0 : 99;
  const total = subtotal + shipping;

  // Ensure Razorpay script is loaded
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart', { replace: true });
    }
  }, [cart.length, navigate]);

  if (cart.length === 0) {
    return null;
  }

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePayment = async () => {
    setLoading(true);
    
    // Simulate API call to create order
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate Razorpay since we don't have real keys
    // In production, you would fetch the order_id from your backend here
    const options = {
      key: "rzp_test_dummy_key", // Dummy key
      amount: total * 100, // Amount in paise
      currency: "INR",
      name: "ARCHANA Collections",
      description: "Premium Fashion Order",
      image: "/favicon.svg",
      handler: function (response) {
        toast.success("Payment Successful! Order placed.");
        clearCart();
        navigate('/profile'); // Redirect to profile/orders page
      },
      prefill: {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        contact: formData.phone
      },
      theme: { color: "#8B2252" } // Our primary color
    };

    try {
      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response){
        toast.error("Payment failed. Please try again.");
      });
      rzp.open();
    } catch (err) {
      // Fallback if script fails to load
      toast.success("Demo Mode: Order placed successfully!");
      clearCart();
      navigate('/profile');
    }
    
    setLoading(false);
  };

  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '80vh', padding: '40px 16px' }}>
      <div className="container" style={{ maxWidth: '1100px' }}>
        <button onClick={() => navigate('/cart')} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 500, color: 'var(--color-text-muted)', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '24px' }}>
          <ChevronLeft size={16} /> Back to Bag
        </button>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '48px' }} className="checkout-grid">
          
          {/* Left Column - Forms */}
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 600, marginBottom: '32px' }}>Checkout</h1>
            
            {/* Steps Indicator */}
            <div style={{ display: 'flex', marginBottom: '32px', borderBottom: '2px solid var(--color-border)' }}>
              <div style={{ flex: 1, paddingBottom: '12px', borderBottom: step === 1 ? '2px solid var(--color-primary)' : '2px solid transparent', marginBottom: '-2px', color: step === 1 ? 'var(--color-primary)' : 'var(--color-text-muted)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: step === 1 ? 'var(--color-primary)' : 'var(--color-border)', color: step === 1 ? '#fff' : 'var(--color-text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>1</div>
                Shipping Address
              </div>
              <div style={{ flex: 1, paddingBottom: '12px', borderBottom: step === 2 ? '2px solid var(--color-primary)' : '2px solid transparent', marginBottom: '-2px', color: step === 2 ? 'var(--color-primary)' : 'var(--color-text-muted)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: step === 2 ? 'var(--color-primary)' : 'var(--color-border)', color: step === 2 ? '#fff' : 'var(--color-text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px' }}>2</div>
                Payment
              </div>
            </div>

            {/* Step 1: Shipping */}
            {step === 1 && (
              <motion.form initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} onSubmit={handleShippingSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <label className="form-label">First Name</label>
                    <input type="text" required value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} className="input-field" />
                  </div>
                  <div>
                    <label className="form-label">Last Name</label>
                    <input type="text" required value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} className="input-field" />
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label className="form-label">Email Address</label>
                    <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="input-field" />
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label className="form-label">Phone Number</label>
                    <input type="tel" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="input-field" placeholder="+91" />
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label className="form-label">Street Address</label>
                    <input type="text" required value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="input-field" />
                  </div>
                  <div>
                    <label className="form-label">City</label>
                    <input type="text" required value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="input-field" />
                  </div>
                  <div>
                    <label className="form-label">State</label>
                    <input type="text" required value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})} className="input-field" />
                  </div>
                  <div>
                    <label className="form-label">Pincode</label>
                    <input type="text" required value={formData.pincode} onChange={e => setFormData({...formData, pincode: e.target.value.replace(/\D/g, '')})} className="input-field" maxLength={6} />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>Continue to Payment</button>
              </motion.form>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <div style={{ padding: '24px', background: 'var(--color-surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', marginBottom: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div style={{ fontWeight: 600 }}>Deliver to:</div>
                    <button onClick={() => setStep(1)} style={{ fontSize: '13px', color: 'var(--color-secondary)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>Edit</button>
                  </div>
                  <div style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                    {formData.firstName} {formData.lastName}<br />
                    {formData.address}<br />
                    {formData.city}, {formData.state} {formData.pincode}<br />
                    {formData.phone}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px', border: '2px solid var(--color-primary)', borderRadius: 'var(--radius-md)', cursor: 'pointer', background: 'rgba(139,34,82,0.02)' }}>
                    <input type="radio" name="payment" defaultChecked style={{ accentColor: 'var(--color-primary)', width: '18px', height: '18px' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: '15px' }}>Razorpay Secure</div>
                      <div style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>UPI, Cards, NetBanking, Wallets</div>
                    </div>
                    <CreditCard size={24} style={{ color: 'var(--color-primary)' }} />
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', cursor: 'not-allowed', opacity: 0.5 }}>
                    <input type="radio" name="payment" disabled style={{ width: '18px', height: '18px' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: '15px' }}>Cash on Delivery</div>
                      <div style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>Not available for this order</div>
                    </div>
                    <Truck size={24} />
                  </label>
                </div>

                <button 
                  onClick={handlePayment} 
                  disabled={loading}
                  className="btn btn-gold btn-lg" 
                  style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '8px' }}
                >
                  {loading ? 'Processing...' : `Pay ${formatPrice(total)}`}
                  {!loading && <ShieldCheck size={18} />}
                </button>
                <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '12px', color: 'var(--color-text-muted)' }}>
                  Payments are 100% secured and encrypted.
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column - Order Summary */}
          <div>
            <div style={{ background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', padding: '28px', border: '1px solid var(--color-border)', position: 'sticky', top: '100px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Order Summary</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingBottom: '20px', borderBottom: '1px solid var(--color-border)', marginBottom: '20px', maxHeight: '300px', overflowY: 'auto' }}>
                {cart.map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: '12px' }}>
                    <img src={item.images[0]} alt={item.name} style={{ width: '60px', height: '80px', objectFit: 'cover', borderRadius: '4px' }} />
                    <div style={{ flex: 1, fontSize: '13px' }}>
                      <div className="line-clamp-2" style={{ fontWeight: 500, marginBottom: '4px' }}>{item.name}</div>
                      <div style={{ color: 'var(--color-text-muted)', marginBottom: '4px' }}>Qty: {item.quantity} | {item.selectedSize}</div>
                      <div style={{ fontWeight: 600 }}>{formatPrice(item.price * item.quantity)}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingBottom: '16px', borderBottom: '1px solid var(--color-border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
                  <span>Subtotal</span><span>{formatPrice(subtotal)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: 'var(--color-success)' }}>
                  <span>Discount</span><span>-{formatPrice(totalDiscount)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
                  <span>Shipping</span><span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
                </div>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '16px', fontSize: '18px', fontWeight: 700 }}>
                <span>Total</span><span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
      <style>{`
        .form-label { display: block; font-size: 13px; font-weight: 500; margin-bottom: 6px; }
        @media (max-width: 900px) { .checkout-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
