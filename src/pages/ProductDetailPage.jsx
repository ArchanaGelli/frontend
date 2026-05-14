import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Heart, ShoppingBag, Star, ChevronRight, ChevronDown, ChevronUp, Truck, RotateCcw, Shield, Minus, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/product/ProductCard';
import { formatPrice } from '../utils/helpers';
import { getProductById, getProducts } from '../services/productService';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Form states
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [openAccordion, setOpenAccordion] = useState('description');
  const [pincode, setPincode] = useState('');
  const [pincodeChecked, setPincodeChecked] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      const { data } = await getProductById(id);
      
      if (data) {
        setProduct(data);
        setSelectedSize(data.sizes?.[0] || '');
        setSelectedColor(data.colors?.[0]?.name || '');
        
        // Fetch related products
        const { data: relatedData } = await getProducts({ category: data.category });
        if (relatedData) {
          setRelatedProducts(relatedData.filter(p => p.id !== data.id).slice(0, 4));
        }
      }
      setLoading(false);
    };
    
    fetchProductDetails();
    window.scrollTo(0, 0); // Scroll to top on id change
    
    // Reset states
    setActiveImage(0);
    setQuantity(1);
    setShowCheckout(false);
  }, [id]);

  if (loading) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '120px 16px', minHeight: '60vh' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid #eee', borderTopColor: 'var(--color-primary)', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 16px' }} />
        <p>Loading product details...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container" style={{ textAlign: 'center', padding: '120px 16px' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', marginBottom: '12px' }}>Product Not Found</h2>
        <p style={{ color: 'var(--color-text-muted)', marginBottom: '24px' }}>The product you're looking for doesn't exist.</p>
        <Link to="/" className="btn btn-primary">Back to Home</Link>
      </div>
    );
  }

  const wishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor);
    setAddedToCart(true);
    setShowCheckout(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const checkPincode = () => {
    if (pincode.length === 6) setPincodeChecked(true);
  };

  const accordions = [
    { key: 'description', title: 'Product Description', content: product.description },
    { key: 'material', title: 'Material & Care', content: `Material: ${product.material}\nCare: ${product.care}` },
    { key: 'shipping', title: 'Shipping & Returns', content: 'Free shipping on orders above ₹999. Standard delivery in 5-7 business days. Easy 7-day return policy for unused items in original packaging.' },
  ];

  return (
    <div style={{ background: 'var(--color-bg)' }}>
      <Helmet>
        <title>{product.name} | ARCHANA Collections</title>
        <meta name="description" content={product.description?.substring(0, 160) || `Buy ${product.name} online at ARCHANA Collections.`} />
      </Helmet>
      <div className="container" style={{ padding: '16px' }}>
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '16px 0', fontSize: '13px', color: 'var(--color-text-muted)', flexWrap: 'wrap' }}>
          <Link to="/" style={{ color: 'var(--color-text-muted)' }}>Home</Link>
          <ChevronRight size={13} />
          <Link to={`/category/${product.category}`} style={{ color: 'var(--color-text-muted)', textTransform: 'capitalize' }}>{product.category}</Link>
          <ChevronRight size={13} />
          <span style={{ color: 'var(--color-text)' }} className="line-clamp-1">{product.name}</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', paddingBottom: '48px' }} className="pdp-grid">
          {/* Image Gallery */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <div style={{ position: 'relative', borderRadius: 'var(--radius-lg)', overflow: 'hidden', aspectRatio: '3/4', background: '#f5f5f0', marginBottom: '12px' }}>
              <img src={product.images[activeImage]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              {product.badges.length > 0 && (
                <div style={{ position: 'absolute', top: '16px', left: '16px', display: 'flex', gap: '6px' }}>
                  {product.badges.map(b => <span key={b} className={`badge badge-${b}`}>{b}</span>)}
                </div>
              )}
            </div>
            {product.images.length > 1 && (
              <div style={{ display: 'flex', gap: '8px' }}>
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImage(i)}
                    style={{
                      width: '72px', height: '90px', borderRadius: 'var(--radius-sm)', overflow: 'hidden',
                      border: activeImage === i ? '2px solid var(--color-secondary)' : '2px solid transparent',
                      cursor: 'pointer', opacity: activeImage === i ? 1 : 0.6, transition: 'all 0.2s',
                    }}>
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500, marginBottom: '6px' }}>
              {product.brand}
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 600, marginBottom: '12px', lineHeight: 1.3 }}>
              {product.name}
            </h1>

            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', gap: '2px' }}>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} size={16} fill={i < Math.round(product.rating) ? '#C9A96E' : 'none'} color={i < Math.round(product.rating) ? '#C9A96E' : '#ddd'} />
                ))}
              </div>
              <span style={{ fontSize: '14px', fontWeight: 500 }}>{product.rating}</span>
              <span style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>({product.reviewCount} reviews)</span>
            </div>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
              <span style={{ fontSize: '28px', fontWeight: 700 }}>{formatPrice(product.price)}</span>
              {product.mrp > product.price && (
                <>
                  <span style={{ fontSize: '16px', color: 'var(--color-text-muted)', textDecoration: 'line-through' }}>MRP {formatPrice(product.mrp)}</span>
                  <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-success)', background: '#e8f5e9', padding: '4px 10px', borderRadius: 'var(--radius-sm)' }}>
                    {product.discount}% OFF
                  </span>
                </>
              )}
            </div>
            <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '24px' }}>Inclusive of all taxes</div>

            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '20px' }}>
              {/* Color Selector */}
              {product.colors.length > 0 && (
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '10px' }}>
                    Color: <span style={{ fontWeight: 400, color: 'var(--color-text-secondary)' }}>{selectedColor}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    {product.colors.map(c => (
                      <button key={c.name} onClick={() => setSelectedColor(c.name)}
                        style={{
                          width: '36px', height: '36px', borderRadius: '50%', background: c.hex,
                          border: selectedColor === c.name ? '3px solid var(--color-secondary)' : '2px solid var(--color-border)',
                          cursor: 'pointer', outline: selectedColor === c.name ? '2px solid var(--color-bg)' : 'none',
                          outlineOffset: '-4px', transition: 'all 0.2s',
                        }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              {product.sizes.length > 1 && (
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '10px' }}>
                    Size: <span style={{ fontWeight: 400, color: 'var(--color-text-secondary)' }}>{selectedSize}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {product.sizes.map(s => (
                      <button key={s} onClick={() => setSelectedSize(s)}
                        style={{
                          padding: '10px 20px', borderRadius: 'var(--radius-sm)',
                          border: selectedSize === s ? '2px solid var(--color-primary)' : '1.5px solid var(--color-border)',
                          background: selectedSize === s ? 'var(--color-primary)' : 'var(--color-surface)',
                          color: selectedSize === s ? '#fff' : 'var(--color-text)',
                          fontSize: '13px', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s',
                        }}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '10px' }}>Quantity</div>
                <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius-sm)', width: 'fit-content' }}>
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ padding: '10px 14px', cursor: 'pointer', display: 'flex' }}><Minus size={16} /></button>
                  <span style={{ padding: '0 20px', fontSize: '15px', fontWeight: 600, borderLeft: '1px solid var(--color-border)', borderRight: '1px solid var(--color-border)' }}>{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} style={{ padding: '10px 14px', cursor: 'pointer', display: 'flex' }}><Plus size={16} /></button>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={handleAddToCart}
                    className="btn btn-primary btn-lg"
                    style={{ flex: 1, background: addedToCart ? 'var(--color-success)' : 'var(--color-primary)' }}
                  >
                    <ShoppingBag size={18} />
                    {addedToCart ? 'Added to Bag! ✓' : 'Add to Bag'}
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleWishlist(product)}
                    style={{
                      padding: '16px', border: '1.5px solid var(--color-border)', borderRadius: 'var(--radius-sm)',
                      background: wishlisted ? '#fce4ec' : 'var(--color-surface)', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s',
                    }}
                  >
                    <Heart size={20} fill={wishlisted ? '#C62828' : 'none'} color={wishlisted ? '#C62828' : '#666'} />
                  </motion.button>
                </div>
                {showCheckout && (
                  <motion.div initial={{ opacity: 0, height: 0, y: -10 }} animate={{ opacity: 1, height: 'auto', y: 0 }}>
                    <Link to="/checkout" className="btn btn-gold btn-lg" style={{ display: 'flex', justifyContent: 'center', width: '100%', alignItems: 'center', gap: '8px' }}>
                      Proceed to Checkout <ChevronRight size={16} />
                    </Link>
                  </motion.div>
                )}
              </div>

              {/* Delivery Check */}
              <div style={{ padding: '16px', background: 'var(--color-surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', marginBottom: '20px' }}>
                <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '8px' }}>Check Delivery</div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input type="text" value={pincode} onChange={e => { setPincode(e.target.value.replace(/\D/g, '').slice(0, 6)); setPincodeChecked(false); }}
                    placeholder="Enter pincode" maxLength={6}
                    style={{ flex: 1, padding: '10px 14px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', fontSize: '14px', outline: 'none' }} />
                  <button onClick={checkPincode} className="btn btn-outline btn-sm" style={{ borderWidth: '1px' }}>Check</button>
                </div>
                {pincodeChecked && (
                  <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '10px', fontSize: '13px', color: 'var(--color-success)' }}>
                    ✓ Delivery available to {pincode} — Est. 5-7 business days
                  </motion.div>
                )}
              </div>

              {/* USP Icons */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
                {[
                  { icon: Truck, text: 'Free Shipping' },
                  { icon: RotateCcw, text: '7-Day Returns' },
                  { icon: Shield, text: '100% Authentic' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} style={{ textAlign: 'center', padding: '12px 8px', background: 'var(--color-surface)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
                    <Icon size={18} style={{ color: 'var(--color-secondary)', marginBottom: '6px' }} />
                    <div style={{ fontSize: '11px', fontWeight: 500, color: 'var(--color-text-secondary)' }}>{text}</div>
                  </div>
                ))}
              </div>

              {/* Accordions */}
              <div>
                {accordions.map(acc => (
                  <div key={acc.key} style={{ borderBottom: '1px solid var(--color-border)' }}>
                    <button onClick={() => setOpenAccordion(openAccordion === acc.key ? null : acc.key)}
                      style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', fontSize: '14px', fontWeight: 600, cursor: 'pointer', textAlign: 'left', color: 'var(--color-text)' }}>
                      {acc.title}
                      {openAccordion === acc.key ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    {openAccordion === acc.key && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                        style={{ paddingBottom: '16px', fontSize: '14px', lineHeight: 1.7, color: 'var(--color-text-secondary)', whiteSpace: 'pre-line' }}>
                        {acc.content}
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div style={{ padding: '48px 0', borderTop: '1px solid var(--color-border)' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 600, marginBottom: '28px' }}>You May Also Like</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .pdp-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
      `}</style>
    </div>
  );
}
