import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/helpers';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (product) => {
    addToCart(product, product.sizes[0], product.colors[0]?.name);
    removeFromWishlist(product.id);
  };

  if (wishlist.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 16px', background: 'var(--color-bg)', minHeight: '60vh' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>💝</div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 600, marginBottom: '8px' }}>Your Wishlist is Empty</h2>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '28px', fontSize: '15px' }}>Save items you love to your wishlist.</p>
          <Link to="/" className="btn btn-primary">Explore Collections <ArrowRight size={16} /></Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '60vh' }}>
      <div className="container" style={{ padding: '32px 16px 64px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 600, marginBottom: '8px' }}>
          My Wishlist <Heart size={22} style={{ display: 'inline', verticalAlign: 'middle', color: 'var(--color-accent)' }} fill="var(--color-accent)" />
        </h1>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '14px', marginBottom: '32px' }}>{wishlist.length} item{wishlist.length > 1 ? 's' : ''} saved</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
          {wishlist.map((item, index) => (
            <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }}
              style={{ background: 'var(--color-surface)', borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--color-border)' }}>
              <Link to={`/product/${item.id}`}>
                <div style={{ aspectRatio: '3/4', overflow: 'hidden', position: 'relative' }}>
                  <img src={item.images[0]} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                    onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                    onMouseLeave={e => e.target.style.transform = 'scale(1)'} />
                  {item.discount > 0 && (
                    <span style={{ position: 'absolute', top: '10px', left: '10px', background: 'var(--color-success)', color: '#fff', padding: '3px 8px', borderRadius: '3px', fontSize: '11px', fontWeight: 600 }}>
                      {item.discount}% OFF
                    </span>
                  )}
                </div>
              </Link>
              <div style={{ padding: '14px' }}>
                <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>{item.brand}</div>
                <div className="line-clamp-1" style={{ fontSize: '14px', fontWeight: 500, margin: '4px 0 8px' }}>{item.name}</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '14px' }}>
                  <span style={{ fontSize: '16px', fontWeight: 700 }}>{formatPrice(item.price)}</span>
                  {item.mrp > item.price && <span style={{ fontSize: '13px', color: 'var(--color-text-muted)', textDecoration: 'line-through' }}>{formatPrice(item.mrp)}</span>}
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => handleMoveToCart(item)} className="btn btn-primary btn-sm" style={{ flex: 1 }}>
                    <ShoppingBag size={14} /> Move to Bag
                  </button>
                  <button onClick={() => removeFromWishlist(item.id)}
                    style={{ padding: '8px 12px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'var(--color-text-muted)' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--color-error)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--color-text-muted)'}>
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
