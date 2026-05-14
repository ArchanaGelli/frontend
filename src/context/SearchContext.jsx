import { createContext, useContext, useState, useCallback } from 'react';
import products from '../data/products';

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('archana_recent_searches') || '[]');
    } catch {
      return [];
    }
  });

  const trendingSearches = ['Banarasi Saree', 'Kundan Jewellery', 'Anarkali', 'Wedding Lehenga', 'Cotton Kurta', 'Jhumka Earrings'];

  const searchProducts = useCallback((searchQuery) => {
    setQuery(searchQuery);
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }
    const q = searchQuery.toLowerCase();
    const filtered = products.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.subcategory.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
    setResults(filtered);
  }, []);

  const addRecentSearch = useCallback((term) => {
    setRecentSearches(prev => {
      const updated = [term, ...prev.filter(s => s !== term)].slice(0, 5);
      localStorage.setItem('archana_recent_searches', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => { setIsSearchOpen(false); setQuery(''); setResults([]); };

  return (
    <SearchContext.Provider value={{ isSearchOpen, openSearch, closeSearch, query, results, searchProducts, recentSearches, addRecentSearch, trendingSearches }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) throw new Error('useSearch must be used within SearchProvider');
  return context;
}
