import { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, MoreVertical } from 'lucide-react';
import { getProducts } from '../../services/productService';
import { formatPrice } from '../../utils/helpers';
import toast from 'react-hot-toast';

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await getProducts();
    if (error) {
      toast.error('Failed to load products');
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-text)' }}>Products</h1>
          <p style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>Manage your inventory and product details.</p>
        </div>
        <button className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Plus size={18} /> Add Product
        </button>
      </div>

      <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid var(--color-border)', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        
        {/* Toolbar */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ position: 'relative', width: '300px' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', padding: '10px 16px 10px 36px', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '14px', outlineColor: 'var(--color-primary)' }} 
            />
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <select style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '14px', background: '#fff', cursor: 'pointer' }}>
              <option value="all">All Categories</option>
              <option value="clothing">Clothing</option>
              <option value="jewelry">Jewelry</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', fontSize: '12px', color: 'var(--color-text-muted)', textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>Product</th>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>Category</th>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>Price</th>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>Stock</th>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>Status</th>
                <th style={{ padding: '16px 24px', fontWeight: 600, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" style={{ padding: '40px', textAlign: 'center', color: 'var(--color-text-muted)' }}>Loading products...</td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ padding: '40px', textAlign: 'center', color: 'var(--color-text-muted)' }}>No products found.</td>
                </tr>
              ) : (
                filteredProducts.map(product => (
                  <tr key={product.id} style={{ borderBottom: '1px solid var(--color-border)', transition: 'background 0.2s' }} className="table-row-hover">
                    <td style={{ padding: '16px 24px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ width: '48px', height: '60px', borderRadius: '4px', overflow: 'hidden', background: '#f5f5f0', flexShrink: 0 }}>
                          <img src={product.images[0]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-text)', marginBottom: '4px' }} className="line-clamp-1">{product.name}</div>
                          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>{product.brand}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '16px 24px', fontSize: '14px', color: 'var(--color-text-secondary)', textTransform: 'capitalize' }}>
                      {product.category}
                    </td>
                    <td style={{ padding: '16px 24px', fontSize: '14px', fontWeight: 600 }}>
                      {formatPrice(product.price)}
                    </td>
                    <td style={{ padding: '16px 24px', fontSize: '14px' }}>
                      <span style={{ color: product.stock < 5 ? 'var(--color-error)' : 'var(--color-text)', fontWeight: product.stock < 5 ? 600 : 400 }}>
                        {product.stock} in stock
                      </span>
                    </td>
                    <td style={{ padding: '16px 24px' }}>
                      <span style={{ 
                        padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 600,
                        background: product.is_active !== false ? '#e8f5e9' : '#fee2e2',
                        color: product.is_active !== false ? 'var(--color-success)' : 'var(--color-error)'
                      }}>
                        {product.is_active !== false ? 'Active' : 'Draft'}
                      </span>
                    </td>
                    <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                        <button style={{ padding: '8px', color: 'var(--color-text-muted)', background: 'none', border: 'none', cursor: 'pointer', borderRadius: '4px' }} title="Edit">
                          <Edit2 size={16} />
                        </button>
                        <button style={{ padding: '8px', color: 'var(--color-text-muted)', background: 'none', border: 'none', cursor: 'pointer', borderRadius: '4px' }} title="Delete">
                          <Trash2 size={16} />
                        </button>
                        <button style={{ padding: '8px', color: 'var(--color-text-muted)', background: 'none', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div style={{ padding: '16px 24px', borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
          <div>Showing 1 to {filteredProducts.length} of {filteredProducts.length} entries</div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button disabled style={{ padding: '6px 12px', border: '1px solid var(--color-border)', borderRadius: '6px', background: '#fff', cursor: 'not-allowed', opacity: 0.5 }}>Previous</button>
            <button disabled style={{ padding: '6px 12px', border: '1px solid var(--color-border)', borderRadius: '6px', background: '#fff', cursor: 'not-allowed', opacity: 0.5 }}>Next</button>
          </div>
        </div>
      </div>
      <style>{`
        .table-row-hover:hover { background: #f8fafc; }
      `}</style>
    </div>
  );
}
