import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, Award, Gem, Users, ArrowRight } from 'lucide-react';

const values = [
  { icon: Gem, title: 'Authentic Craftsmanship', text: 'Every product is sourced directly from skilled artisans across India, ensuring genuineness and quality.' },
  { icon: Heart, title: 'Made with Love', text: 'We curate each piece with care, selecting only the finest designs that celebrate Indian heritage.' },
  { icon: Award, title: 'Premium Quality', text: 'From fabric to finish, we maintain the highest standards of quality in every single product.' },
  { icon: Users, title: 'Empowering Women', text: 'We support women artisans and weavers, helping preserve traditional crafts for future generations.' },
];

const timeline = [
  { year: '2020', title: 'The Beginning', text: 'Started with a passion for making premium Indian fashion accessible to every woman.' },
  { year: '2021', title: 'Growing Together', text: 'Expanded our collection to include jewellery and accessories, reaching 10,000+ happy customers.' },
  { year: '2023', title: 'Going National', text: 'Launched nationwide delivery and partnered with 200+ artisan communities across India.' },
  { year: '2026', title: 'The Future', text: 'Continuing our mission to blend tradition with modernity, now serving 100,000+ customers.' },
];

export default function AboutPage() {
  return (
    <div style={{ background: 'var(--color-bg)' }}>
      {/* Hero */}
      <section style={{
        position: 'relative', height: '360px',
        background: 'linear-gradient(135deg, rgba(26,26,26,0.85), rgba(139,34,82,0.6)), url(https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=1200&q=80)',
        backgroundSize: 'cover', backgroundPosition: 'center',
        display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center',
      }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ color: '#fff' }}>
          <div style={{ fontSize: '12px', letterSpacing: '0.2em', color: 'var(--color-secondary)', marginBottom: '12px', textTransform: 'uppercase' }}>Our Story</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700, marginBottom: '12px' }}>About ARCHANA</h1>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.8)', maxWidth: '480px', margin: '0 auto' }}>Where tradition meets modern elegance</p>
        </motion.div>
      </section>

      {/* Mission */}
      <section className="container" style={{ padding: '64px 16px', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 600, marginBottom: '16px' }}>Our Mission</h2>
          <p style={{ fontSize: '16px', lineHeight: 1.8, color: 'var(--color-text-secondary)', maxWidth: '680px', margin: '0 auto' }}>
            At ARCHANA Collections, we believe every Indian woman deserves to feel extraordinary. We bridge the gap between India's rich textile heritage and contemporary fashion sensibilities — bringing you curated collections of sarees, dresses, jewellery, and accessories that celebrate your unique style.
          </p>
        </motion.div>
      </section>

      {/* Values */}
      <section style={{ background: 'var(--color-surface)', padding: '64px 0' }}>
        <div className="container">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 600, textAlign: 'center', marginBottom: '40px' }}>What We Stand For</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '28px' }}>
            {values.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                style={{ padding: '32px 24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', textAlign: 'center', transition: 'all 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--shadow-md)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; }}>
                <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'var(--color-gold-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <v.icon size={24} style={{ color: 'var(--color-secondary)' }} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>{v.title}</h3>
                <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--color-text-secondary)' }}>{v.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="container" style={{ padding: '64px 16px' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 600, textAlign: 'center', marginBottom: '48px' }}>Our Journey</h2>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          {timeline.map((item, i) => (
            <motion.div key={item.year} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
              style={{ display: 'flex', gap: '24px', marginBottom: '36px', position: 'relative' }}>
              <div style={{ flexShrink: 0, width: '60px', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '18px', fontWeight: 700, color: 'var(--color-secondary)' }}>{item.year}</div>
                {i < timeline.length - 1 && <div style={{ width: '2px', height: 'calc(100% + 20px)', background: 'var(--color-border)', margin: '8px auto 0' }} />}
              </div>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '4px' }}>{item.title}</h3>
                <p style={{ fontSize: '14px', lineHeight: 1.7, color: 'var(--color-text-secondary)' }}>{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--color-primary)', padding: '56px 0', textAlign: 'center', color: '#fff' }}>
        <div className="container">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 600, marginBottom: '12px' }}>Ready to Explore?</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '24px', fontSize: '15px' }}>Discover our curated collections today.</p>
          <Link to="/" className="btn btn-gold">Shop Now <ArrowRight size={16} /></Link>
        </div>
      </section>
    </div>
  );
}
