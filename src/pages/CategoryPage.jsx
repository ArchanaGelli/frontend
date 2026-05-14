import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ChevronRight, SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import ProductCard from '../components/product/ProductCard';
import { categories } from '../data/categories';
import { getProducts } from '../services/productService';

const sortOptions = [
  { value: 'popular', label: 'Popularity' },
  { value: 'newest', label: 'New Arrivals' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'discount', label: 'Discount' },
  { value: 'rating', label: 'Rating' },
];

export default function CategoryPage() {
  const { slug } = useParams();
  const category = categories.find(c => c.slug === slug) || categories[0];
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [selectedSubs, setSelectedSubs] = useState([]);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      setLoading(true);
      const { data } = await getProducts({ category: category.id });
      if (data) setProducts(data);
      setLoading(false);
    };
    fetchCategoryProducts();
    
    // Reset filters on category change
    setSelectedSubs([]);
    setPriceRange([0, 20000]);
  }, [category.id]);

  const categoryProducts = useMemo(() => {
    let filtered = [...products];
    if (selectedSubs.length > 0) {
      filtered = filtered.filter(p => selectedSubs.includes(p.subcategory));
    }
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sortBy) {
      case 'price-low': return [...filtered].sort((a, b) => a.price - b.price);
      case 'price-high': return [...filtered].sort((a, b) => b.price - a.price);
      case 'discount': return [...filtered].sort((a, b) => b.discount - a.discount);
      case 'rating': return [...filtered].sort((a, b) => b.rating - a.rating);
      case 'newest': return [...filtered].sort((a, b) => (b.badges?.includes('new') ? 1 : 0) - (a.badges?.includes('new') ? 1 : 0));
      default: return [...filtered].sort((a, b) => b.reviewCount - a.reviewCount);
    }
  }, [products, sortBy, selectedSubs, priceRange]);

  const toggleSub = (sub) => {
    setSelectedSubs(prev => prev.includes(sub) ? prev.filter(s => s !== sub) : [...prev, sub]);
  };

  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '80vh' }}>
      <Helmet>
        <title>{category.name} | ARCHANA Collections</title>
        <meta name="description" content={category.description} />
      </Helmet>
      {/* Hero */}
      <div style={{
        position: 'relative', height: '240px', overflow: 'hidden',
        background: `linear-gradient(135deg, rgba(26,26,26,0.75), rgba(139,34,82,0.5)), url(${category.image})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        display: 'flex', alignItems: 'center',
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {/* Breadcrumb */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px', fontSize: '13px', color: 'rgba(255,255,255,0.7)' }}>
              <Link to="/" style={{ color: 'rgba(255,255,255,0.7)' }}>Home</Link>
              <ChevronRight size={13} />
              <span style={{ color: '#fff', fontWeight: 500 }}>{category.name}</span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, color: '#fff', marginBottom: '8px' }}>
              {category.name}
            </h1>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', maxWidth: '500px' }}>{category.description}</p>
          </motion.div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="container" style={{ padding: '16px' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '12px', padding: '16px 0', borderBottom: '1px solid var(--color-border)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button onClick={() => setShowFilters(!showFilters)}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 16px',
                border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)',
                fontSize: '13px', fontWeight: 500, background: showFilters ? 'var(--color-primary)' : 'var(--color-surface)',
                color: showFilters ? '#fff' : 'var(--color-text)', cursor: 'pointer', transition: 'all 0.2s',
              }}>
              <SlidersHorizontal size={15} /> Filters
              {selectedSubs.length > 0 && (
                <span style={{ background: 'var(--color-secondary)', color: 'var(--color-primary)', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 700 }}>
                  {selectedSubs.length}
                </span>
              )}
            </button>
            <span style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>{categoryProducts.length} Products</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>Sort by:</span>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}
              style={{
                padding: '8px 12px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)',
                fontSize: '13px', background: 'var(--color-surface)', cursor: 'pointer', outline: 'none',
              }}>
              {sortOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '24px', paddingTop: '24px' }}>
          {/* Filter Sidebar */}
          <AnimatePresence>
            {showFilters && (
              <motion.aside
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: '240px', opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{ flexShrink: 0, overflow: 'hidden' }}
              >
                <div style={{ width: '240px' }}>
                  <div style={{ marginBottom: '28px' }}>
                    <h4 style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '14px', color: 'var(--color-text)' }}>Subcategory</h4>
                    {category.subcategories.map(sub => (
                      <label key={sub} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 0', cursor: 'pointer', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
                        <input type="checkbox" checked={selectedSubs.includes(sub)} onChange={() => toggleSub(sub)}
                          style={{ accentColor: 'var(--color-secondary)', width: '16px', height: '16px' }} />
                        {sub}
                      </label>
                    ))}
                  </div>

                  <div style={{ marginBottom: '28px' }}>
                    <h4 style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '14px', color: 'var(--color-text)' }}>Price Range</h4>
                    <input type="range" min={0} max={20000} step={500} value={priceRange[1]}
                      onChange={e => setPriceRange([0, Number(e.target.value)])}
                      style={{ width: '100%', accentColor: 'var(--color-secondary)' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                      <span>₹0</span>
                      <span>₹{priceRange[1].toLocaleString('en-IN')}</span>
                    </div>
                  </div>

                  {selectedSubs.length > 0 && (
                    <button onClick={() => setSelectedSubs([])}
                      style={{ fontSize: '13px', color: 'var(--color-error)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none' }}>
                      <X size={14} /> Clear Filters
                    </button>
                  )}
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Products Grid */}
          <div style={{ flex: 1 }}>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '64px 0', color: 'var(--color-text-muted)' }}>
                <div style={{ width: '40px', height: '40px', border: '3px solid #eee', borderTopColor: 'var(--color-primary)', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }} />
                <p>Loading collection...</p>
              </div>
            ) : categoryProducts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '64px 0', color: 'var(--color-text-muted)' }}>
                <p style={{ fontSize: '18px', marginBottom: '8px' }}>No products found</p>
                <p style={{ fontSize: '14px' }}>Try adjusting your filters</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
                {categoryProducts.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
