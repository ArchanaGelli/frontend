import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const SocialIcon = ({ name, size = 16 }) => {
  const icons = {
    instagram: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="m16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
    facebook: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
    twitter: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16H20L8.267 4z"/><path d="m4 20 6.768-6.768M15.232 10.768 20 4"/></svg>,
    youtube: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>,
  };
  return icons[name] || null;
};

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(''); }
  };

  return (
    <footer style={{ background: 'var(--color-primary)', color: '#fff' }}>
      {/* Newsletter */}
      <div style={{ background: 'linear-gradient(135deg, #C9A96E 0%, #E8D5A3 50%, #C9A96E 100%)', padding: '48px 0' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '8px' }}>
            Stay in Style
          </h3>
          <p style={{ color: 'rgba(26,26,26,0.7)', fontSize: '14px', marginBottom: '24px' }}>
            Subscribe to get exclusive offers, new arrivals, and styling tips.
          </p>
          {subscribed ? (
            <p style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '15px' }}>✨ Thank you for subscribing!</p>
          ) : (
            <form onSubmit={handleSubscribe} style={{ display: 'flex', maxWidth: '440px', margin: '0 auto', gap: '0' }}>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                style={{
                  flex: 1, padding: '14px 20px', border: 'none', borderRadius: '4px 0 0 4px',
                  fontSize: '14px', outline: 'none', background: '#fff', color: 'var(--color-text)',
                }}
              />
              <button type="submit" style={{
                padding: '14px 24px', background: 'var(--color-primary)', color: '#fff', border: 'none',
                borderRadius: '0 4px 4px 0', fontSize: '14px', fontWeight: 600, letterSpacing: '0.05em',
                display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer',
              }}>
                <Send size={16} /> Subscribe
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Main Footer */}
      <div className="container" style={{ padding: '56px 16px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
          {/* Brand */}
          <div>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 700, letterSpacing: '0.25em' }}>ARCHANA</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '9px', letterSpacing: '0.35em', color: 'rgba(255,255,255,0.5)' }}>COLLECTIONS</div>
            </div>
            <p style={{ fontSize: '13px', lineHeight: 1.7, color: 'rgba(255,255,255,0.6)', marginBottom: '20px' }}>
              Premium Indian women's fashion — where tradition meets modernity. Curated with love for the modern Indian woman.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              {['instagram', 'facebook', 'twitter', 'youtube'].map((name) => (
                <a key={name} href="#" style={{
                  width: '36px', height: '36px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(255,255,255,0.6)', transition: 'all 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-secondary)'; e.currentTarget.style.color = 'var(--color-secondary)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
                >
                  <SocialIcon name={name} size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '20px', color: 'var(--color-secondary)' }}>Quick Links</h4>
            {['Sarees', 'Dresses', 'Jewellery', 'Hair Accessories', 'Ethnic Accessories'].map(item => (
              <Link key={item} to={`/category/${item.toLowerCase().replace(/ /g, '-')}`}
                style={{ display: 'block', fontSize: '13px', color: 'rgba(255,255,255,0.6)', padding: '6px 0', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#fff'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.6)'}
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Customer Service */}
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '20px', color: 'var(--color-secondary)' }}>Help</h4>
            {['About Us', 'Contact Us', 'Shipping Policy', 'Return & Exchange', 'Privacy Policy', 'Terms & Conditions'].map(item => (
              <Link key={item} to={item === 'About Us' ? '/about' : item === 'Contact Us' ? '/contact' : '#'}
                style={{ display: 'block', fontSize: '13px', color: 'rgba(255,255,255,0.6)', padding: '6px 0', transition: 'color 0.2s' }}
                onMouseEnter={e => e.target.style.color = '#fff'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.6)'}
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '20px', color: 'var(--color-secondary)' }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', gap: '10px', fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>
                <MapPin size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>123 Fashion Street, Linking Road, Mumbai 400050, India</span>
              </div>
              <div style={{ display: 'flex', gap: '10px', fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>
                <Phone size={16} style={{ flexShrink: 0 }} />
                <span>+91 98765 43210</span>
              </div>
              <div style={{ display: 'flex', gap: '10px', fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>
                <Mail size={16} style={{ flexShrink: 0 }} />
                <span>hello@archanacollections.in</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment & Copyright */}
        <div style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            {['UPI', 'Visa', 'Mastercard', 'RuPay', 'COD'].map(method => (
              <span key={method} style={{
                padding: '4px 12px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px',
                fontSize: '11px', fontWeight: 500, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.05em',
              }}>
                {method}
              </span>
            ))}
          </div>
          <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', textAlign: 'right' }}>
            <p>© 2026 ARCHANA Collections. All rights reserved.</p>
            <p style={{ marginTop: '4px' }}>Made with ❤️ in India</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
