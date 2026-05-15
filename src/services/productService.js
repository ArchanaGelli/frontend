import api from '../utils/api';
import mockProducts from '../data/products';

/**
 * Product Service
 * Abstracts the data fetching layer. Uses MERN API if available, otherwise falls back to local mock data.
 */

export const getProducts = async (filters = {}) => {
  try {
    const { data } = await api.get('/products', { params: filters });
    return { data, error: null };
  } catch (error) {
    console.warn('API fetch failed, falling back to mock data:', error.message);
    
    // Fallback to mock data
    let results = [...mockProducts];
    
    if (filters.category) {
      results = results.filter(p => p.category === filters.category);
    }
    if (filters.subcategory) {
      results = results.filter(p => p.subcategory === filters.subcategory);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      results = results.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
    }
    
    return { data: results, error: null };
  }
};

export const getProductById = async (id) => {
  try {
    const { data } = await api.get(`/products/${id}`);
    return { data, error: null };
  } catch (error) {
    console.warn(`API fetch for product ${id} failed, falling back to mock data:`, error.message);
    const product = mockProducts.find(p => p.id === parseInt(id));
    return { data: product || null, error: null };
  }
};

export const getFeaturedProducts = async () => {
  try {
    const { data } = await api.get('/products', { params: { badges: 'Bestseller' } });
    return { data: data.slice(0, 8), error: null };
  } catch (error) {
    console.warn('API fetch for featured products failed, falling back to mock data:', error.message);
    return { data: mockProducts.filter(p => p.badges.includes('Bestseller')).slice(0, 8), error: null };
  }
};
