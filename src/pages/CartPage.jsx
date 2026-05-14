import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/helpers';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, subtotal, totalMrp, totalDiscount, cartCount } = useCart();

  if (cart.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 16px', background: 'var(--color-bg)', minHeight: '60vh' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>🛍️</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 600, marginBottom: '8px' }}>Your Bag is Empty</h2>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '28px', fontSize: '15px' }}>Looks like you haven't added anything yet.</p>
          <Link to="/" className="btn btn-primary">Start Shopping <ArrowRight size={16} /></Link>
        </motion.div>
      </div>
    );
  }

  const shipping = subtotal >= 999 ? 0 : 99;
  const total = subtotal + shipping;

  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '60vh' }}>
      <div className="container" style={{ padding: '32px 16px 64px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 600, marginBottom: '8px' }}>Shopping Bag</h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '14px', marginBottom: '32px' }}>{cartCount} item{cartCount > 1 ? 's' : ''} in your bag</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '32px', alignItems: 'start' }} className="cart-grid">
          {/* Cart Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {cart.map((item, index) => (
              <motion.div key={`${item.id}-${item.selectedSize}-${item.selectedColor}-${index}`}
                layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -50 }}
                style={{
                  display: 'flex', gap: '16px', padding: '20px',
                  background: 'var(--color-surface)', borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                }}>
                <Link to={`/product/${item.id}`}>
                  <img src={item.images[0]} alt={item.name}
                    style={{ width: '100px', height: '130px', objectFit: 'cover', borderRadius: 'var(--radius-sm)', flexShrink: 0 }} />
                </Link>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: 0 }}>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.brand}</div>
                    <Link to={`/product/${item.id}`} className="line-clamp-1" style={{ fontSize: '15px', fontWeight: 500, marginBottom: '4px', display: 'block' }}>{item.name}</Link>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
                      {item.selectedSize && `Size: ${item.selectedSize}`}
                      {item.selectedColor && ` | Color: ${item.selectedColor}`}
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)' }}>
                      <button onClick={() => updateQuantity(index, item.quantity - 1)} style={{ padding: '6px 10px', display: 'flex', cursor: 'pointer' }}><Minus size={14} /></button>
                      <span style={{ padding: '0 14px', fontSize: '14px', fontWeight: 600, borderLeft: '1px solid var(--color-border)', borderRight: '1px solid var(--color-border)' }}>{item.quantity}</span>
                      <button onClick={() => updateQuantity(index, item.quantity + 1)} style={{ padding: '6px 10px', display: 'flex', cursor: 'pointer' }}><Plus size={14} /></button>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '16px', fontWeight: 700 }}>{formatPrice(item.price * item.quantity)}</div>
                      {item.mrp > item.price && (
                        <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', textDecoration: 'line-through' }}>{formatPrice(item.mrp * item.quantity)}</div>
                      )}
                    </div>
                  </div>
                </div>
                <button onClick={() => removeFromCart(index)} style={{ padding: '4px', color: 'var(--color-text-muted)', cursor: 'pointer', alignSelf: 'flex-start' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--color-error)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-muted)'}>
                  <Trash2 size={16} />
                </button>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div style={{ position: 'sticky', top: '100px' }}>
            <div style={{ background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', padding: '28px', border: '1px solid var(--color-border)' }}>
              <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Order Summary</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingBottom: '16px', borderBottom: '1px solid var(--color-border)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
                  <span>Total MRP</span><span>{formatPrice(totalMrp)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: 'var(--color-success)' }}>
                  <span>Discount</span><span>-{formatPrice(totalDiscount)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
                  <span>Shipping</span><span>{shipping === 0 ? <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>FREE</span> : formatPrice(shipping)}</span>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '16px 0', fontSize: '17px', fontWeight: 700 }}>
                <span>Total</span><span>{formatPrice(total)}</span>
              </div>
              {totalDiscount > 0 && (
                <div style={{ background: '#e8f5e9', padding: '10px 14px', borderRadius: 'var(--radius-sm)', fontSize: '13px', color: 'var(--color-success)', fontWeight: 500, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Tag size={14} /> You're saving {formatPrice(totalDiscount)} on this order!
                </div>
              )}

              {shipping > 0 && (
                <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '16px', textAlign: 'center' }}>
                  Add {formatPrice(999 - subtotal)} more for free shipping
                </div>
              )}

              <Link to="/checkout" className="btn btn-gold btn-lg" style={{ display: 'flex', justifyContent: 'center', width: '100%', marginBottom: '10px' }}>
                Proceed to Checkout <ArrowRight size={16} />
              </Link>
              <Link to="/" style={{ display: 'block', textAlign: 'center', fontSize: '13px', color: 'var(--color-text-secondary)', padding: '8px' }}>
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .cart-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
