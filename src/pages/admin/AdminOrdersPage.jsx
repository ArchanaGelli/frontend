import { useState, useEffect } from 'react';
import { Search, Eye, Filter, Download } from 'lucide-react';
import { getOrders, updateOrderStatus } from '../../services/orderService';
import { formatPrice } from '../../utils/helpers';
import toast from 'react-hot-toast';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await getOrders();
    if (error) {
      toast.error('Failed to load orders');
    } else {
      setOrders(data || []);
    }
    setLoading(false);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    const { error } = await updateOrderStatus(orderId, newStatus);
    if (error) {
      toast.error('Failed to update order status');
    } else {
      toast.success(`Order ${orderId} marked as ${newStatus}`);
      fetchOrders(); // Refresh list
    }
  };

  const filteredOrders = orders.filter(o => 
    o.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
    o.customer_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-text)' }}>Orders</h1>
          <p style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>Manage customer orders and fulfillments.</p>
        </div>
        <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Download size={18} /> Export CSV
        </button>
      </div>

      <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid var(--color-border)', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        
        {/* Toolbar */}
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ position: 'relative', width: '300px' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search by Order ID or Customer..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', padding: '10px 16px 10px 36px', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '14px', outlineColor: 'var(--color-primary)' }} 
            />
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '14px', background: '#fff', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <Filter size={16} /> Filter
            </button>
            <select style={{ padding: '10px 16px', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '14px', background: '#fff', cursor: 'pointer' }}>
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
            <thead>
              <tr style={{ background: '#f8fafc', fontSize: '12px', color: 'var(--color-text-muted)', textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>Order ID</th>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>Customer</th>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>Date</th>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>Status</th>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>Total</th>
                <th style={{ padding: '16px 24px', fontWeight: 600, textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" style={{ padding: '40px', textAlign: 'center', color: 'var(--color-text-muted)' }}>Loading orders...</td>
                </tr>
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ padding: '40px', textAlign: 'center', color: 'var(--color-text-muted)' }}>No orders found.</td>
                </tr>
              ) : (
                filteredOrders.map(order => {
                  const date = new Date(order.created_at).toLocaleDateString('en-IN', {
                    day: 'numeric', month: 'short', year: 'numeric'
                  });
                  return (
                    <tr key={order.id} style={{ borderBottom: '1px solid var(--color-border)', transition: 'background 0.2s' }} className="table-row-hover">
                      <td style={{ padding: '16px 24px', fontWeight: 600, fontSize: '14px' }}>
                        {order.id}
                      </td>
                      <td style={{ padding: '16px 24px' }}>
                        <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-text)' }}>{order.customer_name}</div>
                        <div style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>{order.email}</div>
                      </td>
                      <td style={{ padding: '16px 24px', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
                        {date}
                      </td>
                      <td style={{ padding: '16px 24px' }}>
                        <select 
                          value={order.status.toLowerCase()} 
                          onChange={(e) => handleStatusChange(order.id, e.target.value)}
                          style={{ 
                            padding: '6px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, border: 'none', cursor: 'pointer', outline: 'none',
                            background: order.status.toLowerCase() === 'delivered' ? '#e8f5e9' : order.status.toLowerCase() === 'shipped' ? '#e3f2fd' : '#fff3cd',
                            color: order.status.toLowerCase() === 'delivered' ? '#2e7d32' : order.status.toLowerCase() === 'shipped' ? '#1565c0' : '#856404'
                          }}
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td style={{ padding: '16px 24px', fontSize: '14px', fontWeight: 600 }}>
                        {formatPrice(order.total)}
                      </td>
                      <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                        <button style={{ padding: '8px 12px', color: 'var(--color-primary)', background: 'none', border: '1px solid var(--color-border)', borderRadius: '6px', fontSize: '13px', fontWeight: 500, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                          <Eye size={14} /> View
                        </button>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div style={{ padding: '16px 24px', borderTop: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px', color: 'var(--color-text-secondary)' }}>
          <div>Showing 1 to {filteredOrders.length} of {filteredOrders.length} entries</div>
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
