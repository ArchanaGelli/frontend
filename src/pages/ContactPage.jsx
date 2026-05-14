import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react';

const SocialIcon = ({ name, size = 18 }) => {
  const icons = {
    instagram: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="m16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
    facebook: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
    twitter: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16H20L8.267 4z"/><path d="m4 20 6.768-6.768M15.232 10.768 20 4"/></svg>,
  };
  return icons[name] || null;
};

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const contactInfo = [
    { icon: MapPin, title: 'Visit Us', lines: ['123 Fashion Street', 'Linking Road, Bandra West', 'Mumbai 400050, India'] },
    { icon: Phone, title: 'Call Us', lines: ['+91 98765 43210', '+91 12345 67890'] },
    { icon: Mail, title: 'Email Us', lines: ['hello@archanacollections.in', 'support@archanacollections.in'] },
    { icon: Clock, title: 'Working Hours', lines: ['Mon-Sat: 10:00 AM - 8:00 PM', 'Sunday: Closed'] },
  ];

  return (
    <div style={{ background: 'var(--color-bg)' }}>
      {/* Hero */}
      <section style={{
        background: 'var(--color-primary)', padding: '64px 0', textAlign: 'center', color: '#fff',
      }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="container">
          <div style={{ fontSize: '12px', letterSpacing: '0.2em', color: 'var(--color-secondary)', marginBottom: '12px', textTransform: 'uppercase' }}>Get in Touch</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, marginBottom: '8px' }}>Contact Us</h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px' }}>We'd love to hear from you</p>
        </motion.div>
      </section>

      <div className="container" style={{ padding: '48px 16px 64px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', maxWidth: '1000px', margin: '0 auto' }} className="contact-grid">
          {/* Contact Info */}
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 600, marginBottom: '28px' }}>Get In Touch</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {contactInfo.map(({ icon: Icon, title, lines }) => (
                <motion.div key={title} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  style={{ display: 'flex', gap: '16px' }}>
                  <div style={{
                    width: '44px', height: '44px', borderRadius: '50%', background: 'var(--color-gold-light)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <Icon size={20} style={{ color: 'var(--color-secondary)' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>{title}</div>
                    {lines.map(line => (
                      <div key={line} style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>{line}</div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <div style={{ marginTop: '32px' }}>
              <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px' }}>Follow Us</div>
              <div style={{ display: 'flex', gap: '10px' }}>
                {['instagram', 'facebook', 'twitter'].map((name) => (
                  <a key={name} href="#" style={{
                    width: '40px', height: '40px', borderRadius: '50%', border: '1px solid var(--color-border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-secondary)',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-secondary)'; e.currentTarget.style.color = 'var(--color-secondary)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.color = 'var(--color-text-secondary)'; }}>
                    <SocialIcon name={name} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            <div style={{ background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', padding: '32px', border: '1px solid var(--color-border)' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 600, marginBottom: '24px' }}>Send a Message</h2>
              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center', padding: '32px 0' }}>
                  <div style={{ fontSize: '48px', marginBottom: '12px' }}>✨</div>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '20px', fontWeight: 600, marginBottom: '8px' }}>Thank You!</h3>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>We'll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '6px' }}>Name</label>
                    <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="input-field" placeholder="Your name" />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '6px' }}>Email</label>
                    <input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="input-field" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '6px' }}>Subject</label>
                    <input type="text" required value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} className="input-field" placeholder="How can we help?" />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '6px' }}>Message</label>
                    <textarea required value={form.message} onChange={e => setForm({...form, message: e.target.value})} className="input-field" placeholder="Tell us more..." rows={5} style={{ resize: 'vertical' }} />
                  </div>
                  <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                    <Send size={16} /> Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
