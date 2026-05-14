import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ChevronRight, ChevronLeft, Star, ArrowRight, Sparkles, Award, Truck, RotateCcw } from 'lucide-react';
import ProductCard from '../components/product/ProductCard';
import { categories, occasions } from '../data/categories';
import { testimonials } from '../data/products';
import { getProducts } from '../services/productService';

const heroSlides = [
  {
    title: 'Wedding\nCollection 2026',
    subtitle: 'Timeless elegance for your special day',
    cta: 'Shop Wedding',
    link: '/category/sarees',
    image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=1200&q=80',
    gradient: 'linear-gradient(135deg, rgba(139,34,82,0.85) 0%, rgba(26,26,26,0.6) 100%)',
  },
  {
    title: 'The Art of\nIndian Jewellery',
    subtitle: 'Handcrafted pieces that tell your story',
    cta: 'Explore Jewellery',
    link: '/category/jewellery',
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1200&q=80',
    gradient: 'linear-gradient(135deg, rgba(201,169,110,0.8) 0%, rgba(26,26,26,0.6) 100%)',
  },
  {
    title: 'New Season\nDresses',
    subtitle: 'Fusion fashion for the modern Indian woman',
    cta: 'Shop Now',
    link: '/category/dresses',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=1200&q=80',
    gradient: 'linear-gradient(135deg, rgba(26,26,26,0.8) 0%, rgba(26,26,26,0.4) 100%)',
  },
];

export default function HomePage() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => setHeroIndex(i => (i + 1) % heroSlides.length), 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchHomeProducts = async () => {
      const { data } = await getProducts();
      if (data) setProducts(data);
      setLoading(false);
    };
    fetchHomeProducts();
  }, []);

  const trendingProducts = products.filter(p => p.badges?.includes('trending') || p.badges?.includes('bestseller')).slice(0, 8);
  const newArrivals = products.filter(p => p.badges?.includes('new')).slice(0, 8);
  const bestSellers = products.filter(p => p.badges?.includes('bestseller')).slice(0, 6);

  return (
    <div>
      <Helmet>
        <title>ARCHANA Collections | Premium Indian Women's Fashion</title>
        <meta name="description" content="Discover premium Indian ethnic wear, sarees, lehengas, and handcrafted jewellery. Shop the latest wedding collection and modern fusion dresses at ARCHANA Collections." />
      </Helmet>
      {/* ===== HERO BANNER ===== */}
      <section style={{ position: 'relative', height: '85vh', minHeight: '500px', maxHeight: '800px', overflow: 'hidden' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={heroIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              position: 'absolute', inset: 0,
              backgroundImage: `${heroSlides[heroIndex].gradient}, url(${heroSlides[heroIndex].image})`,
              backgroundSize: 'cover', backgroundPosition: 'center',
            }}
          />
        </AnimatePresence>

        <div className="container" style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', alignItems: 'center' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={heroIndex}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ maxWidth: '560px' }}
            >
              <h1 style={{
                fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 6vw, 64px)',
                fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: '16px',
                whiteSpace: 'pre-line',
              }}>
                {heroSlides[heroIndex].title}
              </h1>
              <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.8)', marginBottom: '32px', lineHeight: 1.6 }}>
                {heroSlides[heroIndex].subtitle}
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <Link to={heroSlides[heroIndex].link} className="btn btn-gold btn-lg">
                  {heroSlides[heroIndex].cta} <ArrowRight size={18} />
                </Link>
                <Link to="/category/sarees" className="btn btn-outline btn-lg" style={{ borderColor: 'rgba(255,255,255,0.4)', color: '#fff' }}>
                  View All
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Hero Controls */}
        <div style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '10px', zIndex: 3 }}>
          {heroSlides.map((_, i) => (
            <button key={i} onClick={() => setHeroIndex(i)}
              style={{
                width: heroIndex === i ? '32px' : '10px', height: '10px',
                borderRadius: 'var(--radius-full)', border: 'none', cursor: 'pointer',
                background: heroIndex === i ? 'var(--color-secondary)' : 'rgba(255,255,255,0.4)',
                transition: 'all 0.3s',
              }}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Arrows */}
        <button onClick={() => setHeroIndex(i => (i - 1 + heroSlides.length) % heroSlides.length)}
          style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)', border: 'none', borderRadius: '50%', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', cursor: 'pointer', zIndex: 3 }}
          aria-label="Previous slide">
          <ChevronLeft size={22} />
        </button>
        <button onClick={() => setHeroIndex(i => (i + 1) % heroSlides.length)}
          style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)', border: 'none', borderRadius: '50%', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', cursor: 'pointer', zIndex: 3 }}
          aria-label="Next slide">
          <ChevronRight size={22} />
        </button>
      </section>

      {/* ===== USP BAR ===== */}
      <section style={{ background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)', padding: '20px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', textAlign: 'center' }}>
            {[
              { icon: Truck, text: 'Free Shipping ₹999+' },
              { icon: RotateCcw, text: '7-Day Easy Returns' },
              { icon: Award, text: 'Authentic Products' },
              { icon: Sparkles, text: 'Handcrafted Quality' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '8px' }}>
                <Icon size={18} style={{ color: 'var(--color-secondary)' }} />
                <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-text-secondary)', letterSpacing: '0.02em' }}>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SHOP BY CATEGORY ===== */}
      <section style={{ padding: '64px 0' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 600, marginBottom: '8px' }}>
                Shop by Category
              </h2>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '15px' }}>Curated collections for every style</p>
            </div>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '20px' }}>
            {categories.map((cat, i) => (
              <motion.div key={cat.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}>
                <Link to={`/category/${cat.slug}`} style={{ textDecoration: 'none', textAlign: 'center', display: 'block' }}>
                  <div style={{
                    width: '130px', height: '130px', borderRadius: '50%', overflow: 'hidden',
                    margin: '0 auto 14px', border: '3px solid var(--color-border)',
                    transition: 'all 0.3s', position: 'relative',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-secondary)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = 'var(--shadow-glow)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
                  >
                    <img src={cat.image} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                      onMouseEnter={e => e.target.style.transform = 'scale(1.1)'}
                      onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                    />
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 600, letterSpacing: '0.03em' }}>{cat.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '2px' }}>{cat.productCount} Products</div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TRENDING NOW ===== */}
      <section style={{ padding: '48px 0 64px', background: 'var(--color-surface)' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: 600, marginBottom: '4px' }}>Trending Now 🔥</h2>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>Most loved by our customers</p>
            </div>
            <Link to="/category/sarees" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px', fontWeight: 600, color: 'var(--color-secondary)' }}>
              View All <ChevronRight size={16} />
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
            {trendingProducts.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED COLLECTION BANNER ===== */}
      <section style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '450px',
        }} className="featured-grid">
          <div style={{
            background: 'var(--color-primary)', display: 'flex', alignItems: 'center',
            padding: '48px', color: '#fff',
          }}>
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div style={{ fontSize: '12px', letterSpacing: '0.2em', color: 'var(--color-secondary)', marginBottom: '12px', textTransform: 'uppercase', fontWeight: 500 }}>Featured Collection</div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, lineHeight: 1.15, marginBottom: '16px' }}>
                The Bridal<br />
                <span className="text-gradient-gold" style={{ WebkitTextFillColor: 'var(--color-secondary)' }}>Edit</span>
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', lineHeight: 1.7, marginBottom: '28px', maxWidth: '380px' }}>
                Discover our handpicked bridal collection — from stunning lehengas to exquisite jewellery, everything for your perfect day.
              </p>
              <Link to="/category/dresses" className="btn btn-gold">
                Shop the Collection <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
          <div style={{ position: 'relative' }}>
            <img src="https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=800&q=80" alt="Bridal Collection"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, var(--color-primary) 0%, transparent 30%)' }} />
          </div>
        </div>
      </section>

      {/* ===== NEW ARRIVALS ===== */}
      <section style={{ padding: '64px 0', background: 'var(--color-bg)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: 600, marginBottom: '4px' }}>New Arrivals ✨</h2>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>Fresh off the loom, just for you</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
            {newArrivals.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== SHOP BY OCCASION ===== */}
      <section style={{ padding: '64px 0', background: 'var(--color-surface)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: 600, marginBottom: '4px' }}>Shop by Occasion</h2>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>Find the perfect outfit for every moment</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px' }}>
            {occasions.map((occ, i) => (
              <motion.div key={occ.id} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Link to="/category/sarees" style={{ textDecoration: 'none' }}>
                  <div style={{
                    position: 'relative', borderRadius: 'var(--radius-lg)', overflow: 'hidden',
                    aspectRatio: '4/5', cursor: 'pointer',
                  }}
                  onMouseEnter={e => e.currentTarget.querySelector('img').style.transform = 'scale(1.08)'}
                  onMouseLeave={e => e.currentTarget.querySelector('img').style.transform = 'scale(1)'}
                  >
                    <img src={occ.image} alt={occ.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)' }} />
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: `linear-gradient(transparent 40%, ${occ.color}DD 100%)`,
                    }} />
                    <div style={{ position: 'absolute', bottom: '20px', left: '20px', color: '#fff' }}>
                      <div style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 600 }}>{occ.name}</div>
                      <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                        Shop Now <ArrowRight size={12} />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== BESTSELLERS ===== */}
      <section style={{ padding: '64px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: 600, marginBottom: '4px' }}>Bestsellers</h2>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>Customer favorites you'll love</p>
            </div>
            <Link to="/category/sarees" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px', fontWeight: 600, color: 'var(--color-secondary)' }}>
              View All <ChevronRight size={16} />
            </Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
            {bestSellers.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== BRAND STORY ===== */}
      <section style={{ position: 'relative', padding: '80px 0', background: 'var(--color-primary)', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, right: 0, width: '40%', height: '100%', opacity: 0.1 }}>
          <img src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&q=80" alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            style={{ maxWidth: '560px', margin: '0 auto', textAlign: 'center', color: '#fff' }}>
            <div style={{ fontSize: '12px', letterSpacing: '0.2em', color: 'var(--color-secondary)', marginBottom: '16px', textTransform: 'uppercase' }}>Our Story</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 600, lineHeight: 1.2, marginBottom: '20px' }}>
              Where Tradition Meets<br />
              <span style={{ color: 'var(--color-secondary)' }}>Modern Elegance</span>
            </h2>
            <p style={{ fontSize: '15px', lineHeight: 1.8, color: 'rgba(255,255,255,0.7)', marginBottom: '28px' }}>
              At ARCHANA Collections, we believe every Indian woman deserves to feel extraordinary. Our carefully curated collection celebrates the rich heritage of Indian craftsmanship while embracing contemporary style — from handwoven Banarasi silks to statement kundan jewellery.
            </p>
            <Link to="/about" className="btn btn-outline" style={{ borderColor: 'var(--color-secondary)', color: 'var(--color-secondary)' }}>
              Discover Our Journey <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section style={{ padding: '64px 0', background: 'var(--color-bg)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: 600, marginBottom: '4px' }}>What Our Customers Say</h2>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>Real stories from real customers</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
            {testimonials.slice(0, 3).map((t, i) => (
              <motion.div key={t.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                style={{
                  background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', padding: '28px',
                  boxShadow: 'var(--shadow-sm)', border: '1px solid var(--color-border)',
                }}>
                <div style={{ display: 'flex', gap: '3px', marginBottom: '14px' }}>
                  {Array.from({ length: 5 }, (_, j) => (
                    <Star key={j} size={14} fill={j < t.rating ? '#C9A96E' : 'none'} color={j < t.rating ? '#C9A96E' : '#ddd'} />
                  ))}
                </div>
                <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--color-text-secondary)', marginBottom: '18px', fontStyle: 'italic' }}>
                  "{t.text}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '50%',
                    background: 'var(--color-secondary)', color: 'var(--color-primary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '14px', fontWeight: 700,
                  }}>
                    {t.avatar}
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 600 }}>{t.name}</div>
                    <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>{t.location}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Responsive CSS */}
      <style>{`
        @media (max-width: 768px) {
          .featured-grid { grid-template-columns: 1fr !important; }
          .featured-grid > div:first-child { padding: 32px 20px !important; }
          .featured-grid > div:last-child { height: 280px; }
        }
      `}</style>
    </div>
  );
}
