import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Package, Settings, LogOut, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function ProfilePage() {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('orders');

  const dummyOrders = [
    { id: 'ORD-1029', date: '2026-05-10', total: 12999, status: 'Delivered', items: 2 },
    { id: 'ORD-1045', date: '2026-05-13', total: 4500, status: 'Processing', items: 1 },
  ];

  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '80vh', padding: '40px 16px' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 600, marginBottom: '32px' }}>My Account</h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '32px' }} className="profile-grid">
          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ padding: '20px', background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', marginBottom: '16px', textAlign: 'center' }}>
              <div style={{ width: '64px', height: '64px', background: 'var(--color-primary)', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 600, margin: '0 auto 12px' }}>
                {user?.user_metadata?.full_name?.[0] || 'U'}
              </div>
              <div style={{ fontWeight: 600, fontSize: '15px' }}>{user?.user_metadata?.full_name || 'Valued Customer'}</div>
              <div style={{ fontSize: '13px', color: 'var(--color-text-muted)', marginTop: '4px' }}>{user?.email || 'demo@archana.com'}</div>
            </div>

            <button onClick={() => setActiveTab('orders')} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: 'var(--radius-sm)', background: activeTab === 'orders' ? 'var(--color-surface)' : 'transparent', border: activeTab === 'orders' ? '1px solid var(--color-border)' : '1px solid transparent', fontWeight: activeTab === 'orders' ? 600 : 500, color: 'var(--color-text)', cursor: 'pointer', textAlign: 'left' }}>
              <Package size={18} style={{ color: activeTab === 'orders' ? 'var(--color-secondary)' : 'var(--color-text-muted)' }} />
              My Orders
            </button>
            <button onClick={() => setActiveTab('details')} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: 'var(--radius-sm)', background: activeTab === 'details' ? 'var(--color-surface)' : 'transparent', border: activeTab === 'details' ? '1px solid var(--color-border)' : '1px solid transparent', fontWeight: activeTab === 'details' ? 600 : 500, color: 'var(--color-text)', cursor: 'pointer', textAlign: 'left' }}>
              <User size={18} style={{ color: activeTab === 'details' ? 'var(--color-secondary)' : 'var(--color-text-muted)' }} />
              Account Details
            </button>
            <button onClick={() => setActiveTab('settings')} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: 'var(--radius-sm)', background: activeTab === 'settings' ? 'var(--color-surface)' : 'transparent', border: activeTab === 'settings' ? '1px solid var(--color-border)' : '1px solid transparent', fontWeight: activeTab === 'settings' ? 600 : 500, color: 'var(--color-text)', cursor: 'pointer', textAlign: 'left' }}>
              <Settings size={18} style={{ color: activeTab === 'settings' ? 'var(--color-secondary)' : 'var(--color-text-muted)' }} />
              Settings
            </button>
            <button onClick={signOut} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', borderRadius: 'var(--radius-sm)', background: 'transparent', border: '1px solid transparent', fontWeight: 500, color: 'var(--color-error)', cursor: 'pointer', textAlign: 'left', marginTop: 'auto' }}>
              <LogOut size={18} />
              Sign Out
            </button>
          </div>

          {/* Main Content */}
          <div style={{ background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', padding: '32px' }}>
            {activeTab === 'orders' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '24px' }}>Order History</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {dummyOrders.map(order => (
                    <div key={order.id} style={{ padding: '20px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '15px', marginBottom: '4px' }}>{order.id}</div>
                        <div style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>{order.date} • {order.items} items</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                        <div>
                          <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '2px' }}>Total</div>
                          <div style={{ fontWeight: 600 }}>₹{order.total.toLocaleString()}</div>
                        </div>
                        <div>
                          <span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 600, background: order.status === 'Delivered' ? '#e8f5e9' : '#fff3cd', color: order.status === 'Delivered' ? 'var(--color-success)' : '#856404' }}>
                            {order.status}
                          </span>
                        </div>
                        <button style={{ padding: '8px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', background: 'transparent' }}>
                          <ChevronRight size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'details' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '24px' }}>Account Details</h2>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '6px' }}>Full Name</label>
                    <input type="text" defaultValue={user?.user_metadata?.full_name || ''} className="input-field" />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '6px' }}>Email Address</label>
                    <input type="email" disabled defaultValue={user?.email || ''} className="input-field" style={{ background: 'var(--color-bg)' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '6px' }}>Phone Number</label>
                    <input type="tel" placeholder="+91" className="input-field" />
                  </div>
                </div>
                <button className="btn btn-primary" style={{ marginTop: '24px' }}>Save Changes</button>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '24px' }}>Preferences</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                    <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px', accentColor: 'var(--color-secondary)' }} />
                    <span style={{ fontSize: '14px' }}>Receive promotional emails and offers</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
                    <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px', accentColor: 'var(--color-secondary)' }} />
                    <span style={{ fontSize: '14px' }}>Order delivery updates via SMS</span>
                  </label>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .profile-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
