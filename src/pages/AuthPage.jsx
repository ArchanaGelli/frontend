import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { hasSupabaseConfig } from '../utils/supabase';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  
  const { user, signIn, signUp } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  if (user) {
    return <Navigate to="/profile" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!hasSupabaseConfig) {
      toast.error('Supabase is not configured yet. Set up your environment variables.');
      return;
    }

    setLoading(true);
    
    if (isLogin) {
      const { error } = await signIn(formData.email, formData.password);
      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Welcome back to ARCHANA!');
        navigate('/');
      }
    } else {
      const { error } = await signUp(formData.email, formData.password, formData.name);
      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Account created successfully! Please verify your email.');
        setIsLogin(true); // Switch to login view
      }
    }
    
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-bg)', padding: '40px 16px' }}>
      <div style={{ maxWidth: '440px', width: '100%', background: 'var(--color-surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border)', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
        
        {/* Header Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid var(--color-border)' }}>
          <button 
            onClick={() => setIsLogin(true)}
            style={{ flex: 1, padding: '20px', fontSize: '15px', fontWeight: 600, background: isLogin ? 'transparent' : '#f9f9f9', borderBottom: isLogin ? '2px solid var(--color-primary)' : '2px solid transparent', cursor: 'pointer', transition: 'all 0.2s' }}
          >
            Sign In
          </button>
          <button 
            onClick={() => setIsLogin(false)}
            style={{ flex: 1, padding: '20px', fontSize: '15px', fontWeight: 600, background: !isLogin ? 'transparent' : '#f9f9f9', borderBottom: !isLogin ? '2px solid var(--color-primary)' : '2px solid transparent', cursor: 'pointer', transition: 'all 0.2s' }}
          >
            Create Account
          </button>
        </div>

        {/* Form Area */}
        <div style={{ padding: '32px' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? 'login' : 'register'}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 600, marginBottom: '8px' }}>
                  {isLogin ? 'Welcome Back' : 'Join ARCHANA'}
                </h2>
                <p style={{ color: 'var(--color-text-secondary)', fontSize: '14px' }}>
                  {isLogin ? 'Enter your details to access your account' : 'Create an account for a premium shopping experience'}
                </p>
              </div>

              {!hasSupabaseConfig && (
                <div style={{ background: '#fff3cd', color: '#856404', padding: '12px', borderRadius: '4px', fontSize: '13px', marginBottom: '20px', border: '1px solid #ffeeba' }}>
                  <strong>Demo Mode:</strong> Database is not connected yet. Authentication is disabled.
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {!isLogin && (
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '6px' }}>Full Name</label>
                    <input 
                      type="text" required={!isLogin} 
                      value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} 
                      style={{ width: '100%', padding: '12px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', fontSize: '14px', outlineColor: 'var(--color-secondary)' }} 
                      placeholder="Jane Doe" 
                    />
                  </div>
                )}
                
                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, marginBottom: '6px' }}>Email Address</label>
                  <input 
                    type="email" required 
                    value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} 
                    style={{ width: '100%', padding: '12px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', fontSize: '14px', outlineColor: 'var(--color-secondary)' }} 
                    placeholder="you@example.com" 
                  />
                </div>
                
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 500 }}>Password</label>
                    {isLogin && <a href="#" style={{ fontSize: '12px', color: 'var(--color-secondary)' }}>Forgot Password?</a>}
                  </div>
                  <input 
                    type="password" required minLength={6}
                    value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} 
                    style={{ width: '100%', padding: '12px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', fontSize: '14px', outlineColor: 'var(--color-secondary)' }} 
                    placeholder="••••••••" 
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={loading || !hasSupabaseConfig}
                  className="btn btn-primary btn-lg" 
                  style={{ width: '100%', marginTop: '8px', opacity: (loading || !hasSupabaseConfig) ? 0.7 : 1 }}
                >
                  {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
                </button>
              </form>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
