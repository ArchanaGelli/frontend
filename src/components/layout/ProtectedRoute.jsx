import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { hasSupabaseConfig } from '../../utils/supabase';

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user, loading } = useAuth();

  if (!hasSupabaseConfig) {
    // If Supabase isn't configured, bypass protection for development/demo purposes
    // Alternatively, you could block access entirely, but we want the UI to be testable
    return children;
  }

  if (loading) {
    return (
      <div style={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid var(--color-border)', borderTopColor: 'var(--color-primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Basic admin check - in a real app, query the database for user roles
  if (adminOnly && user.email !== 'admin@archanacollections.in') {
    return <Navigate to="/" replace />;
  }

  return children;
}
