import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { SearchProvider } from './context/SearchContext';
import { AuthProvider } from './context/AuthContext';
import { HelmetProvider } from 'react-helmet-async';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HelmetProvider>
      <CartProvider>
        <WishlistProvider>
          <SearchProvider>
            <AuthProvider>
              <App />
            </AuthProvider>
          </SearchProvider>
        </WishlistProvider>
      </CartProvider>
    </HelmetProvider>
  </StrictMode>
);
