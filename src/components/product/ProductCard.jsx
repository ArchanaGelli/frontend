import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { formatPrice } from '../../utils/helpers';

export default function ProductCard({ product, index = 0 }) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const wishlisted = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, product.sizes[0], product.colors[0]?.name);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="product-card">
          {/* Image */}
          <div className="image-wrapper">
            <img src={product.images[0]} alt={product.name} loading="lazy" />

            {/* Badges */}
            <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', flexDirection: 'column', gap: '6px', zIndex: 2 }}>
              {product.badges.map(badge => (
                <span key={badge} className={`badge badge-${badge}`}>{badge}</span>
              ))}
            </div>

            {/* Wishlist Button */}
            <motion.button
              onClick={handleToggleWishlist}
              whileTap={{ scale: 0.85 }}
              style={{
                position: 'absolute', top: '10px', right: '10px', zIndex: 2,
                width: '36px', height: '36px', borderRadius: '50%',
                background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(4px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)', cursor: 'pointer', border: 'none',
                transition: 'all 0.2s',
              }}
            >
              <Heart
                size={16}
                fill={wishlisted ? '#C62828' : 'none'}
                color={wishlisted ? '#C62828' : '#666'}
                style={{ transition: 'all 0.2s' }}
              />
            </motion.button>

            {/* Add to Cart Overlay */}
            <div className="overlay" style={{ display: 'flex', justifyContent: 'center' }}>
              <motion.button
                onClick={handleAddToCart}
                whileTap={{ scale: 0.95 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '10px 24px', background: 'rgba(255,255,255,0.95)',
                  borderRadius: 'var(--radius-full)', fontSize: '12px', fontWeight: 600,
                  letterSpacing: '0.05em', textTransform: 'uppercase', cursor: 'pointer',
                  border: 'none', color: 'var(--color-primary)', boxShadow: 'var(--shadow-md)',
                }}
              >
                <ShoppingBag size={14} /> Add to Bag
              </motion.button>
            </div>

            {/* Discount Tag */}
            {product.discount > 0 && (
              <div style={{
                position: 'absolute', bottom: '10px', left: '10px',
                background: 'var(--color-success)', color: '#fff',
                padding: '3px 8px', borderRadius: '3px',
                fontSize: '11px', fontWeight: 600, zIndex: 2,
              }}>
                {product.discount}% OFF
              </div>
            )}
          </div>

          {/* Info */}
          <div style={{ padding: '14px 12px 16px' }}>
            <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', fontWeight: 500, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: '4px' }}>
              {product.brand}
            </div>
            <div className="line-clamp-1" style={{ fontSize: '14px', fontWeight: 500, marginBottom: '6px', color: 'var(--color-text)' }}>
              {product.name}
            </div>

            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '3px',
                background: 'var(--color-success)', color: '#fff',
                padding: '2px 6px', borderRadius: '3px', fontSize: '11px', fontWeight: 600,
              }}>
                {product.rating} <Star size={10} fill="#fff" />
              </div>
              <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>({product.reviewCount})</span>
            </div>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-text)' }}>{formatPrice(product.price)}</span>
              {product.mrp > product.price && (
                <>
                  <span style={{ fontSize: '13px', color: 'var(--color-text-muted)', textDecoration: 'line-through' }}>{formatPrice(product.mrp)}</span>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-success)' }}>({product.discount}% off)</span>
                </>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
