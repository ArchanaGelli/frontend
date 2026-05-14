import { motion } from 'framer-motion';
import { IndianRupee, ShoppingCart, Users, Package, TrendingUp } from 'lucide-react';
import { formatPrice } from '../../utils/helpers';

export default function AdminDashboard() {
  const stats = [
    { title: 'Total Revenue', value: formatPrice(124500), trend: '+12.5%', icon: IndianRupee, color: '#10b981' },
    { title: 'Total Orders', value: '156', trend: '+5.2%', icon: ShoppingCart, color: '#3b82f6' },
    { title: 'Active Customers', value: '2,405', trend: '+18.1%', icon: Users, color: '#8b5cf6' },
    { title: 'Products in Stock', value: '124', trend: '-2.4%', icon: Package, color: '#f59e0b' },
  ];

  const recentOrders = [
    { id: 'ORD-1056', customer: 'Riya Sharma', date: 'Today, 10:45 AM', amount: 4500, status: 'Processing' },
    { id: 'ORD-1055', customer: 'Anita Desai', date: 'Today, 09:12 AM', amount: 12999, status: 'Shipped' },
    { id: 'ORD-1054', customer: 'Meera Patel', date: 'Yesterday', amount: 2450, status: 'Delivered' },
    { id: 'ORD-1053', customer: 'Priya Singh', date: 'Yesterday', amount: 8900, status: 'Delivered' },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--color-text)' }}>Dashboard Overview</h1>
          <p style={{ fontSize: '14px', color: 'var(--color-text-muted)' }}>Welcome back! Here's what's happening with your store today.</p>
        </div>
        <button className="btn btn-primary btn-sm" style={{ display: 'flex', gap: '8px' }}>
          <TrendingUp size={16} /> View Reports
        </button>
      </div>

      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '32px' }}>
        {stats.map((stat, i) => (
          <motion.div key={stat.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            style={{ background: '#fff', borderRadius: '12px', padding: '24px', border: '1px solid var(--color-border)', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>{stat.title}</div>
                <div style={{ fontSize: '28px', fontWeight: 700, color: 'var(--color-text)' }}>{stat.value}</div>
              </div>
              <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: `${stat.color}15`, color: stat.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <stat.icon size={20} />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
              <span style={{ color: stat.trend.startsWith('+') ? 'var(--color-success)' : 'var(--color-error)', fontWeight: 600 }}>{stat.trend}</span>
              <span style={{ color: 'var(--color-text-muted)' }}>vs last month</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        {/* Recent Orders */}
        <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid var(--color-border)', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
          <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600 }}>Recent Orders</h2>
            <button style={{ fontSize: '13px', color: 'var(--color-primary)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500 }}>View All</button>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc', fontSize: '12px', color: 'var(--color-text-muted)', textAlign: 'left', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>Order ID</th>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>Customer</th>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>Date</th>
                <th style={{ padding: '16px 24px', fontWeight: 600 }}>Status</th>
                <th style={{ padding: '16px 24px', fontWeight: 600, textAlign: 'right' }}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(order => (
                <tr key={order.id} style={{ borderBottom: '1px solid var(--color-border)', fontSize: '14px' }}>
                  <td style={{ padding: '16px 24px', fontWeight: 500 }}>{order.id}</td>
                  <td style={{ padding: '16px 24px' }}>{order.customer}</td>
                  <td style={{ padding: '16px 24px', color: 'var(--color-text-secondary)' }}>{order.date}</td>
                  <td style={{ padding: '16px 24px' }}>
                    <span style={{ 
                      padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 600,
                      background: order.status === 'Delivered' ? '#e8f5e9' : order.status === 'Shipped' ? '#e3f2fd' : '#fff3cd',
                      color: order.status === 'Delivered' ? '#2e7d32' : order.status === 'Shipped' ? '#1565c0' : '#856404'
                    }}>
                      {order.status}
                    </span>
                  </td>
                  <td style={{ padding: '16px 24px', fontWeight: 600, textAlign: 'right' }}>{formatPrice(order.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Quick Actions & Low Stock */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid var(--color-border)', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', padding: '24px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>Low Stock Alerts</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { name: 'Banarasi Silk Saree', stock: 2 },
                { name: 'Kundan Choker Set', stock: 1 },
                { name: 'Embroidered Anarkali', stock: 3 },
              ].map(item => (
                <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '14px', fontWeight: 500 }}>{item.name}</div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--color-error)', background: 'rgba(211,47,47,0.1)', padding: '4px 8px', borderRadius: '4px' }}>
                    {item.stock} left
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
