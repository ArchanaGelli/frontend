import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, TrendingUp, Clock, ArrowRight } from 'lucide-react';
import { useSearch } from '../../context/SearchContext';
import { formatPrice } from '../../utils/helpers';

export default function SearchModal() {
  const { isSearchOpen, closeSearch, query, results, searchProducts, recentSearches, addRecentSearch, trendingSearches } = useSearch();
  const inputRef = useRef();

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    const handler = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        isSearchOpen ? closeSearch() : searchProducts('');
      }
      if (e.key === 'Escape') closeSearch();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isSearchOpen]);

  useEffect(() => {
    document.body.style.overflow = isSearchOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isSearchOpen]);

  const handleSearch = (term) => {
    searchProducts(term);
    addRecentSearch(term);
  };

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ position: 'fixed', inset: 0, zIndex: 'var(--z-modal)', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
          onClick={closeSearch}
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            onClick={e => e.stopPropagation()}
            style={{
              background: 'var(--color-surface)', maxWidth: '640px', margin: '80px auto',
              borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xl)', overflow: 'hidden',
              maxHeight: '80vh', display: 'flex', flexDirection: 'column',
            }}
          >
            {/* Search Input */}
            <div style={{ display: 'flex', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid var(--color-border)', gap: '12px' }}>
              <Search size={20} style={{ color: 'var(--color-text-muted)', flexShrink: 0 }} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => searchProducts(e.target.value)}
                placeholder="Search for sarees, jewellery, dresses..."
                style={{ flex: 1, border: 'none', outline: 'none', fontSize: '16px', background: 'transparent', color: 'var(--color-text)' }}
              />
              <span style={{ fontSize: '11px', color: 'var(--color-text-muted)', background: 'var(--color-bg)', padding: '4px 8px', borderRadius: '4px', whiteSpace: 'nowrap' }}>ESC</span>
              <button onClick={closeSearch} style={{ padding: '4px' }}><X size={20} /></button>
            </div>

            {/* Results Area */}
            <div style={{ overflowY: 'auto', padding: '16px 20px', flex: 1 }}>
              {query.trim() ? (
                results.length > 0 ? (
                  <div>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--color-text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '12px' }}>
                      {results.length} Results
                    </div>
                    {results.slice(0, 8).map(product => (
                      <Link key={product.id} to={`/product/${product.id}`} onClick={() => { addRecentSearch(query); closeSearch(); }}
                        style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: '1px solid var(--color-border)', transition: 'background 0.15s' }}>
                        <img src={product.images[0]} alt={product.name} style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div className="line-clamp-1" style={{ fontSize: '14px', fontWeight: 500 }}>{product.name}</div>
                          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>{product.category}</div>
                        </div>
                        <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-secondary)' }}>{formatPrice(product.price)}</div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--color-text-muted)' }}>
                    <p style={{ fontSize: '15px' }}>No results found for "{query}"</p>
                    <p style={{ fontSize: '13px', marginTop: '4px' }}>Try different keywords</p>
                  </div>
                )
              ) : (
                <>
                  {recentSearches.length > 0 && (
                    <div style={{ marginBottom: '24px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 600, color: 'var(--color-text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '10px' }}>
                        <Clock size={13} /> Recent Searches
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {recentSearches.map((term, i) => (
                          <button key={i} onClick={() => handleSearch(term)}
                            style={{ padding: '6px 14px', background: 'var(--color-bg)', borderRadius: 'var(--radius-full)', fontSize: '13px', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)', cursor: 'pointer' }}>
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 600, color: 'var(--color-text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '10px' }}>
                      <TrendingUp size={13} /> Trending
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      {trendingSearches.map((term, i) => (
                        <button key={i} onClick={() => handleSearch(term)}
                          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 4px', fontSize: '14px', color: 'var(--color-text-secondary)', cursor: 'pointer', textAlign: 'left', width: '100%' }}>
                          <span>{term}</span>
                          <ArrowRight size={14} style={{ color: 'var(--color-text-muted)' }} />
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
