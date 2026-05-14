import { supabase, hasSupabaseConfig } from '../utils/supabase';
import mockProducts from '../data/products';

/**
 * Product Service
 * Abstracts the data fetching layer. Uses Supabase if configured, otherwise falls back to local mock data.
 */

// Format product from Supabase to match the frontend expected structure
const formatProduct = (p) => ({
  id: p.id,
  name: p.name,
  brand: p.brand,
  price: p.price,
  mrp: p.mrp,
  discount: p.discount,
  category: p.category,
  subcategory: p.subcategory,
  description: p.description,
  material: p.material,
  care: p.care,
  images: p.images || [],
  colors: p.colors || [],
  sizes: p.sizes || [],
  badges: p.badges || [],
  stock: p.stock,
  rating: parseFloat(p.rating) || 0,
  reviewCount: p.review_count || 0,
  is_active: p.is_active
});

export const getProducts = async (filters = {}) => {
  if (!hasSupabaseConfig) {
    // Return mock data
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

  // Fetch from Supabase
  try {
    let query = supabase.from('products').select('*').eq('is_active', true);
    
    if (filters.category) {
      query = query.eq('category', filters.category);
    }
    if (filters.subcategory) {
      query = query.eq('subcategory', filters.subcategory);
    }
    if (filters.search) {
      query = query.or(`name.ilike.%${filters.search}%,brand.ilike.%${filters.search}%`);
    }

    const { data, error } = await query;
    if (error) throw error;
    
    return { data: data.map(formatProduct), error: null };
  } catch (error) {
    console.error('Error fetching products:', error);
    return { data: null, error };
  }
};

export const getProductById = async (id) => {
  if (!hasSupabaseConfig) {
    const product = mockProducts.find(p => p.id === parseInt(id));
    return { data: product || null, error: null };
  }

  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
      
    if (error) throw error;
    return { data: formatProduct(data), error: null };
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return { data: null, error };
  }
};

export const getFeaturedProducts = async () => {
  if (!hasSupabaseConfig) {
    return { data: mockProducts.filter(p => p.badges.includes('Bestseller')), error: null };
  }

  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .contains('badges', ['Bestseller'])
      .limit(8);
      
    if (error) throw error;
    return { data: data.map(formatProduct), error: null };
  } catch (error) {
    console.error('Error fetching featured products:', error);
    return { data: null, error };
  }
};
