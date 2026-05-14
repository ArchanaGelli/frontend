import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, ShoppingBag, User, Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useSearch } from '../../context/SearchContext';
import categories from '../../data/categories';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeMega, setActiveMega] = useState(null);
  const [expandedMobile, setExpandedMobile] = useState(null);
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { openSearch } = useSearch();
  const location = useLocation();

  useEffect(() => {
    setIsMobileOpen(false);
    setActiveMega(null);
  }, [location]);

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  const promos = [
    'Free Shipping on Orders Above ₹999 ✨',
    'New Arrivals — Wedding Collection 2026 💍',
    'Use Code ARCHANA15 for 15% Off Your First Order 🎉',
  ];
  const [promoIndex, setPromoIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setPromoIndex(i => (i + 1) % promos.length), 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Announcement Bar */}
      <div style={{
        background: 'var(--color-primary)',
        color: '#fff',
        fontSize: '12px',
        letterSpacing: '0.05em',
        overflow: 'hidden',
        height: isScrolled ? '0px' : '36px',
        transition: 'height 0.3s ease',
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '36px' }}>
          <AnimatePresence mode="wait">
            <motion.span
              key={promoIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ textAlign: 'center', fontWeight: 400 }}
            >
              {promos[promoIndex]}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={isScrolled ? 'glass' : ''}
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 'var(--z-sticky)',
          background: isScrolled ? 'rgba(255,255,255,0.92)' : 'var(--color-surface)',
          backdropFilter: isScrolled ? 'blur(20px)' : 'none',
          borderBottom: '1px solid var(--color-border)',
          transition: 'all 0.3s ease',
        }}
      >
        <div className="container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: isScrolled ? '60px' : '72px',
          transition: 'height 0.3s ease',
        }}>
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileOpen(true)}
            style={{ display: 'none', padding: '8px' }}
            className="mobile-menu-btn"
            aria-label="Open menu"
          >
            <Menu size={22} />
          </button>

          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
            <div style={{ textAlign: 'center', lineHeight: 1 }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: isScrolled ? '22px' : '26px',
                fontWeight: 700,
                letterSpacing: '0.25em',
                color: 'var(--color-primary)',
                textTransform: 'uppercase',
                transition: 'font-size 0.3s ease',
              }}>
                ARCHANA
              </div>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '10px',
                letterSpacing: '0.35em',
                color: 'var(--color-text-secondary)',
                textTransform: 'uppercase',
                fontWeight: 400,
                marginTop: '2px',
              }}>
                Collections
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="desktop-nav" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
          }}>
            {categories.map(cat => (
              <div
                key={cat.id}
                onMouseEnter={() => setActiveMega(cat.id)}
                onMouseLeave={() => setActiveMega(null)}
                style={{ position: 'relative' }}
              >
                <Link
                  to={`/category/${cat.slug}`}
                  style={{
                    fontSize: '13px',
                    fontWeight: 500,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: activeMega === cat.id ? 'var(--color-secondary)' : 'var(--color-text)',
                    transition: 'color 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '8px 0',
                  }}
                >
                  {cat.name}
                  <ChevronDown size={12} style={{
                    transform: activeMega === cat.id ? 'rotate(180deg)' : 'rotate(0)',
                    transition: 'transform 0.2s',
                  }} />
                </Link>

                {/* Mega Menu */}
                <AnimatePresence>
                  {activeMega === cat.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: '-20px',
                        background: 'var(--color-surface)',
                        borderRadius: 'var(--radius-lg)',
                        boxShadow: 'var(--shadow-xl)',
                        padding: '24px',
                        minWidth: '280px',
                        zIndex: 'var(--z-dropdown)',
                        border: '1px solid var(--color-border)',
                      }}
                    >
                      <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>
                        {cat.name}
                      </div>
                      {cat.subcategories.map(sub => (
                        <Link
                          key={sub}
                          to={`/category/${cat.slug}`}
                          style={{
                            display: 'block',
                            padding: '8px 0',
                            fontSize: '14px',
                            color: 'var(--color-text-secondary)',
                            transition: 'all 0.15s',
                          }}
                          onMouseEnter={e => {
                            e.target.style.color = 'var(--color-secondary)';
                            e.target.style.paddingLeft = '8px';
                          }}
                          onMouseLeave={e => {
                            e.target.style.color = 'var(--color-text-secondary)';
                            e.target.style.paddingLeft = '0';
                          }}
                        >
                          {sub}
                        </Link>
                      ))}
                      <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--color-border)' }}>
                        <Link
                          to={`/category/${cat.slug}`}
                          style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}
                        >
                          View All {cat.name} <ChevronRight size={14} />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Right Icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <button onClick={openSearch} style={{ padding: '10px', borderRadius: 'var(--radius-full)', transition: 'background 0.2s' }} onMouseEnter={e => e.target.style.background = 'var(--color-bg)'} onMouseLeave={e => e.target.style.background = 'transparent'} aria-label="Search">
              <Search size={20} />
            </button>
            <Link to="/profile" style={{ padding: '10px', borderRadius: 'var(--radius-full)', transition: 'background 0.2s' }} onMouseEnter={e => e.target.style.background = 'var(--color-bg)'} onMouseLeave={e => e.target.style.background = 'transparent'} aria-label="Account">
              <User size={20} />
            </Link>
            <Link to="/wishlist" style={{ padding: '10px', borderRadius: 'var(--radius-full)', position: 'relative', display: 'flex' }} aria-label="Wishlist">
              <Heart size={20} />
              {wishlistCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  style={{
                    position: 'absolute', top: '4px', right: '4px',
                    background: 'var(--color-accent)', color: '#fff',
                    fontSize: '9px', fontWeight: 700, width: '16px', height: '16px',
                    borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  {wishlistCount}
                </motion.span>
              )}
            </Link>
            <Link to="/cart" style={{ padding: '10px', borderRadius: 'var(--radius-full)', position: 'relative', display: 'flex' }} aria-label="Cart">
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  key={cartCount}
                  style={{
                    position: 'absolute', top: '4px', right: '4px',
                    background: 'var(--color-secondary)', color: 'var(--color-primary)',
                    fontSize: '9px', fontWeight: 700, width: '16px', height: '16px',
                    borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  {cartCount}
                </motion.span>
              )}
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 'var(--z-overlay)' }}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              style={{
                position: 'fixed', top: 0, left: 0, bottom: 0,
                width: '320px', maxWidth: '85vw',
                background: 'var(--color-surface)',
                zIndex: 'var(--z-modal)',
                overflowY: 'auto',
                boxShadow: 'var(--shadow-xl)',
              }}
            >
              <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--color-border)' }}>
                <div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, letterSpacing: '0.2em' }}>ARCHANA</div>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '9px', letterSpacing: '0.3em', color: 'var(--color-text-muted)' }}>COLLECTIONS</div>
                </div>
                <button onClick={() => setIsMobileOpen(false)} style={{ padding: '8px' }} aria-label="Close menu">
                  <X size={22} />
                </button>
              </div>
              <div style={{ padding: '12px 0' }}>
                {categories.map(cat => (
                  <div key={cat.id}>
                    <button
                      onClick={() => setExpandedMobile(expandedMobile === cat.id ? null : cat.id)}
                      style={{
                        width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        padding: '14px 20px', fontSize: '14px', fontWeight: 500, letterSpacing: '0.04em',
                        textTransform: 'uppercase', color: 'var(--color-text)',
                      }}
                    >
                      {cat.name}
                      <ChevronDown size={16} style={{ transform: expandedMobile === cat.id ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                    </button>
                    <AnimatePresence>
                      {expandedMobile === cat.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          style={{ overflow: 'hidden', background: 'var(--color-bg)' }}
                        >
                          {cat.subcategories.map(sub => (
                            <Link key={sub} to={`/category/${cat.slug}`} onClick={() => setIsMobileOpen(false)}
                              style={{ display: 'block', padding: '10px 32px', fontSize: '13px', color: 'var(--color-text-secondary)' }}>
                              {sub}
                            </Link>
                          ))}
                          <Link to={`/category/${cat.slug}`} onClick={() => setIsMobileOpen(false)}
                            style={{ display: 'block', padding: '10px 32px', fontSize: '13px', fontWeight: 600, color: 'var(--color-secondary)' }}>
                            View All →
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: '1px solid var(--color-border)', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <Link to="/about" onClick={() => setIsMobileOpen(false)} style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>About Us</Link>
                <Link to="/contact" onClick={() => setIsMobileOpen(false)} style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Contact</Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        .mobile-menu-btn { display: none !important; }
        @media (max-width: 1023px) {
          .mobile-menu-btn { display: flex !important; }
          .desktop-nav { display: none !important; }
        }
      `}</style>
    </>
  );
}
