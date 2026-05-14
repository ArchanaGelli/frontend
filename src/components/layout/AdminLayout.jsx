import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, Package, ShoppingCart, Users, Settings, 
  TrendingUp, IndianRupee, Bell, Search, Menu
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingCart },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Customers', path: '/admin/customers', icon: Users },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#f8fafc', overflow: 'hidden' }}>
      
      {/* Sidebar */}
      <motion.aside 
        animate={{ width: sidebarOpen ? '260px' : '80px' }}
        style={{ 
          background: 'var(--color-primary)', color: '#fff', flexShrink: 0,
          display: 'flex', flexDirection: 'column', transition: 'width 0.3s'
        }}
      >
        <div style={{ height: '72px', display: 'flex', alignItems: 'center', padding: '0 24px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          {sidebarOpen ? (
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, letterSpacing: '0.1em' }}>ARCHANA</div>
          ) : (
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 700, margin: '0 auto' }}>A</div>
          )}
        </div>
        
        <nav style={{ padding: '24px 12px', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <Link key={item.name} to={item.path} style={{
                display: 'flex', alignItems: 'center', gap: '16px', padding: '12px',
                borderRadius: '8px', color: isActive ? 'var(--color-secondary)' : 'rgba(255,255,255,0.7)',
                background: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
                transition: 'all 0.2s', textDecoration: 'none'
              }}>
                <item.icon size={20} style={{ flexShrink: 0 }} />
                {sidebarOpen && <span style={{ fontSize: '14px', fontWeight: 500 }}>{item.name}</span>}
              </Link>
            )
          })}
        </nav>
      </motion.aside>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        
        {/* Top Header */}
        <header style={{ height: '72px', background: '#fff', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-secondary)' }}>
              <Menu size={20} />
            </button>
            <div style={{ position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} />
              <input type="text" placeholder="Search admin..." style={{ padding: '8px 16px 8px 36px', borderRadius: '20px', border: '1px solid var(--color-border)', fontSize: '13px', width: '300px', outline: 'none', background: '#f8fafc' }} />
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <button style={{ position: 'relative', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-secondary)' }}>
              <Bell size={20} />
              <span style={{ position: 'absolute', top: '-4px', right: '-4px', width: '8px', height: '8px', background: 'var(--color-error)', borderRadius: '50%' }} />
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '13px', fontWeight: 600 }}>Store Admin</div>
                <div style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>admin@archana.com</div>
              </div>
              <div style={{ width: '36px', height: '36px', background: 'var(--color-primary)', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>
                SA
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
