import React, { useState, useEffect, useRef } from 'react';
import { translations } from '../translations/translations';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaSearch, FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import '../styles/products.css';

// Demo uchun mahsulotlar va kategoriyalar
const categories = [
  { id: 'all', name: 'Barchasi' },
  { id: 'fruits', name: 'Mevalar' },
  { id: 'vegetables', name: 'Sabzavotlar' },
  { id: 'berries', name: 'Mevalar' },
  { id: 'nuts', name: 'Yong\'oqlar' }
];

const allProducts = [
  { 
    id: 1, 
    name: 'Olma', 
    category: 'fruits', 
    image: 'https://images.unsplash.com/photo-1746469471553-afa9f34157fd?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8', 
    desc: 'Yangi uzilgan olma.',
    stock: 100,
    unit: 'kg'
  },
  { 
    id: 2, 
    name: 'Banan', 
    category: 'fruits', 
    image: 'https://images.unsplash.com/photo-1746469471553-afa9f34157fd?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8', 
    desc: 'Toza va shirin banan.',
    stock: 50,
    unit: 'kg'
  },
  { 
    id: 3, 
    name: 'Sabzi', 
    category: 'vegetables', 
    image: 'https://images.unsplash.com/photo-1746469471553-afa9f34157fd?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8', 
    desc: 'Vitaminlarga boy sabzi.',
    stock: 75,
    unit: 'kg'
  },
  { 
    id: 4, 
    name: 'Pomidor', 
    category: 'vegetables', 
    image: 'https://images.unsplash.com/photo-1746469471553-afa9f34157fd?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8', 
    desc: 'Yangi pomidor.',
    stock: 60,
    unit: 'kg'
  },
  { 
    id: 5, 
    name: 'Sharbat', 
    category: 'berries', 
    image: 'https://images.unsplash.com/photo-1746469471553-afa9f34157fd?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8', 
    desc: 'Tabiiy sharbat.',
    stock: 30,
    unit: 'litr'
  },
];

const ProductsPage = ({ language }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [showSheet, setShowSheet] = useState(false);
  const [sheetProduct, setSheetProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({ name: '', phone: '', address: '' });
  const [orderSuccess, setOrderSuccess] = useState(false);
  const sheetRef = useRef(null);

  // Filter mahsulotlar
  const filteredProducts = allProducts.filter(p =>
    (selectedCategory === 'all' || p.category === selectedCategory) &&
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Savatga mahsulot qo'shish yoki sonini oshirish
  const addToCart = (product) => {
    setCart(prev => {
      const found = prev.find(item => item.id === product.id);
      if (found) {
        if (found.count >= product.stock) {
          alert(translations[language].outOfStock);
          return prev;
        }
        return prev.map(item => item.id === product.id ? { ...item, count: item.count + 1 } : item);
      }
      return [...prev, { ...product, count: 1 }];
    });
  };

  // Savatdan o'chirish
  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  // Savatda sonini kamaytirish
  const decreaseCount = (id) => {
    setCart(prev => prev.map(item => 
      item.id === id ? { ...item, count: Math.max(1, item.count - 1) } : item
    ));
  };

  // Savatda sonini oshirish
  const increaseCount = (id) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const product = allProducts.find(p => p.id === id);
        if (item.count >= product.stock) {
          alert(translations[language].outOfStock);
          return item;
        }
        return { ...item, count: item.count + 1 };
      }
      return item;
    }));
  };

  // Mahsulotga bosganda bottom sheet ochish
  const openSheet = (product) => {
    setSheetProduct(product);
    setShowSheet(true);
  };

  const closeSheet = () => {
    setShowSheet(false);
    setSheetProduct(null);
  };

  // ESC tugmasi va fon bosilganda bottom sheet/modal yopish
  useEffect(() => {
    if (!showSheet) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') closeSheet();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [showSheet]);

  useEffect(() => {
    if (!isCartOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') setIsCartOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isCartOpen]);

  // Savat modalining klassi: mobilda bottom sheet, desktopda yon panel
  const cartModalClass = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 700) return 'cart-bottom-sheet';
    return 'cart-side-sheet';
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    if (!checkoutForm.name.trim() || !checkoutForm.phone.trim() || !checkoutForm.address.trim()) {
      alert(translations[language].orderError);
      return;
    }
    
    // Bu yerda buyurtmani serverga yuborish mumkin
    setOrderSuccess(true);
    setTimeout(() => {
      setCart([]);
      setIsCartOpen(false);
      setShowCheckout(false);
      setCheckoutForm({ name: '', phone: '', address: '' });
      setOrderSuccess(false);
    }, 2000);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.count, 0);
  };

  return (
    <div className="products-page">
      <div className="products-header">
        <div className="products-header-content">
          <h1>{translations[language].products}</h1>
          <div className="products-controls">
            <div className="search-box">
              <input
                type="text"
                placeholder={translations[language].search}
                value={searchQuery}
                onChange={handleSearch}
              />
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
            <button className="cart-icon-btn" onClick={() => setIsCartOpen(!isCartOpen)}>
              Savat
              {cart.length > 0 && <span className="cart-badge">{cart.reduce((s, i) => s + i.count, 0)}</span>}
            </button>
          </div>
        </div>
      </div>

      <div className="products-grid">
        {filteredProducts.length === 0 ? (
          <div className="products-page-empty">
            <span className="empty-icon">🔍</span>
            <p>{translations[language].nothingFound}</p>
          </div>
        ) : filteredProducts.map(product => (
          <div key={product.id} className="product-card" onClick={() => openSheet(product)}>
            <div className="product-image-container">
              <img src={product.image} alt={product.name} />
              <div className="product-overlay">
                <span className="view-details">{translations[language].viewDetails}</span>
              </div>
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p className="product-desc">{product.desc}</p>
              <div className="product-meta">
                <span className="product-stock">{product.stock} {product.unit}</span>
              </div>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product);
                }} 
                className="add-to-cart-btn"
                disabled={product.stock === 0}
              >
                {product.stock === 0 ? translations[language].outOfStock : translations[language].addToCart}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom sheet */}
      {showSheet && sheetProduct && (
        <div className="products-page-sheet" onClick={closeSheet}>
          <div className="products-page-sheet-inner" ref={sheetRef} onClick={e => e.stopPropagation()}>
            <div className="sheet-header">
              <h2>{sheetProduct.name}</h2>
              <button onClick={closeSheet} className="close-btn">
                <span>×</span>
              </button>
            </div>
            <div className="sheet-content">
              <img src={sheetProduct.image} alt={sheetProduct.name} />
              <div className="sheet-info">
                <p className="sheet-desc">{sheetProduct.desc}</p>
                <div className="sheet-meta">
                  <span className="sheet-stock">{sheetProduct.stock} {sheetProduct.unit}</span>
                </div>
                <button 
                  onClick={() => {
                    addToCart(sheetProduct);
                    closeSheet();
                  }} 
                  className="add-to-cart-btn"
                  disabled={sheetProduct.stock === 0}
                >
                  {sheetProduct.stock === 0 ? translations[language].outOfStock : translations[language].addToCart}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Savat modal */}
      {isCartOpen && (
        <div className={`products-page-cart-modal ${cartModalClass()} active`} onClick={() => setIsCartOpen(false)}>
          <div className="cart-modal-inner" onClick={e => e.stopPropagation()}>
            <div className="cart-header">
              <h3>{translations[language].cart}</h3>
              <button onClick={() => setIsCartOpen(false)} className="close-btn">
                <span>×</span>
              </button>
            </div>
            
            {cart.length === 0 ? (
              <div className="empty-cart">
                <span className="empty-cart-icon">🛒</span>
                <p>{translations[language].emptyCart}</p>
                <Link to="/products" className="continue-shopping-btn">
                  {translations[language].continueShopping}
                </Link>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map(item => (
                    <div key={item.id} className="cart-item">
                      <img src={item.image} alt={item.name} className="cart-item-image" />
                      <div className="cart-item-info">
                        <h4 className="cart-item-name">{item.name}</h4>
                        <div className="cart-item-controls">
                          <button onClick={() => decreaseCount(item.id)} className="quantity-btn">
                            <FaMinus />
                          </button>
                          <span className="quantity">{item.count}</span>
                          <button onClick={() => increaseCount(item.id)} className="quantity-btn">
                            <FaPlus />
                          </button>
                          <button onClick={() => removeFromCart(item.id)} className="remove-btn">
                            <FaTrash className="remove-icon" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cart-summary">
                  <div className="cart-total">
                    <span>{translations[language].total}:</span>
                    <span className="total-price">{getTotalPrice()} {translations[language].items}</span>
                  </div>

                  {!showCheckout ? (
                    <button onClick={() => setShowCheckout(true)} className="checkout-btn">
                      {translations[language].checkout}
                    </button>
                  ) : (
                    <form onSubmit={handleCheckout} className="checkout-form">
                      <h4>{translations[language].checkoutTitle}</h4>
                      <div className="form-group">
                        <input
                          type="text"
                          placeholder={translations[language].name}
                          value={checkoutForm.name}
                          onChange={e => setCheckoutForm({...checkoutForm, name: e.target.value})}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="tel"
                          placeholder={translations[language].phone}
                          value={checkoutForm.phone}
                          onChange={e => setCheckoutForm({...checkoutForm, phone: e.target.value})}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <textarea
                          placeholder={translations[language].address}
                          value={checkoutForm.address}
                          onChange={e => setCheckoutForm({...checkoutForm, address: e.target.value})}
                          required
                        />
                      </div>
                      <div className="checkout-buttons">
                        <button type="submit" className="confirm-btn" disabled={orderSuccess}>
                          {orderSuccess ? translations[language].orderSuccess : translations[language].confirmOrder}
                        </button>
                        <button 
                          type="button" 
                          onClick={() => setShowCheckout(false)} 
                          className="cancel-btn"
                          disabled={orderSuccess}
                        >
                          {translations[language].cancel}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage; 