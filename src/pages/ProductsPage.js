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
    name: 'Bodom', 
    category: 'fruits', 
    image: 'https://media.istockphoto.com/id/1360789044/photo/almonds-isolated-on-wooden-background-flat-lay.jpg?s=612x612&w=0&k=20&c=m3JUwL1ru0rHGQwdtkHpl7PjWjvdGzbMKcTnkyJmzFw=', 
    desc: 'Yangi uzilgan olma.',
    stock: 100,
    unit: 'kg'
  },
  { 
    id: 2, 
    name: 'Pista', 
    category: 'fruits', 
    image: 'https://media.istockphoto.com/id/2160545676/photo/pistachios-kernels-roasted-and-salted-nuts-in-a-wooden-bowl-on-linen.jpg?s=612x612&w=0&k=20&c=LzXR9Vali-YZQbsDpFIa14qtFlEh6tYPiFBp8b0IA28=', 
    desc: 'Toza va shirin banan.',
    stock: 100,
    unit: 'kg'
  },
  { 
    id: 3, 
    name: 'Mayiz', 
    category: 'vegetables', 
    image: 'https://media.istockphoto.com/id/974877012/photo/a-sweet-dried-fruit-golden-raisins-or-vitis-vinifera-l-var-apyrena-kishmish-or-zante-currant.jpg?s=612x612&w=0&k=20&c=GXsf2GohOelfEev00W1wxurB247YCHagcHEdq269WzA=', 
    desc: 'Vitaminlarga boy sabzi.',
    stock: 100,
    unit: 'kg'
  },
  { 
    id: 4, 
    name: 'O`rik quritilgan', 
    category: 'vegetables', 
    image: 'https://media.istockphoto.com/id/542330328/photo/organic-raw-dry-apricots.jpg?s=612x612&w=0&k=20&c=_hXZ6EDk4h0fcbEj-bequdeN_YtWpPOJLqYMw_Ipz5s=', 
    desc: 'Yangi pomidor.',
    stock: 100,
    unit: 'kg'
  },
  { 
    id: 5, 
    name: 'Anjir', 
    category: 'berries', 
    image: 'https://media.istockphoto.com/id/909621368/photo/dried-figs-on-a-dark-rustic-background.jpg?s=612x612&w=0&k=20&c=63NpXEoHxoTNcG0T1Ei8-wJAsH8b6NnlWfTPwmdMEdo=', 
    desc: 'Tabiiy sharbat.',
    stock: 10,
    unit: 'kg'
  },
  { 
    id: 6, 
    name: 'Quritilgan olxo`ri', 
    category: 'berries', 
    image: 'https://media.istockphoto.com/id/1212585647/photo/prunes-in-white-ceramic-bowl-on-white-rustic-table.jpg?s=612x612&w=0&k=20&c=bruqgpyLW-IWln3Vm-S742zelFox3ywnDyVIJ5ROOH0=', 
    desc: 'Tabiiy sharbat.',
    stock: 10,
    unit: 'kg'
  },
  { 
    id: 7, 
    name: 'O`rik', 
    category: 'berries', 
    image: 'https://images.unsplash.com/photo-1595412017587-b7f3117dff54?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZHJ5JTIwQXByaWNvdHxlbnwwfHwwfHx8MA%3D%3D', 
    desc: 'Tabiiy sharbat.',
    stock: 100,
    unit: 'kg'
  },
];

// Telegram bot uchun token va chat ID (bularni o'zingizning bot tokeningiz va chat ID bilan almashtiring)
const TELEGRAM_BOT_TOKEN = "7532088606:AAHTUo3KRfQbF4WHfF5pdhQKnAovKZCM4gU"; // Bot tokenini kiriting
const TELEGRAM_CHAT_ID = "6429299277"; // Chat ID ni kiriting

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
  const [isLoading, setIsLoading] = useState(false);
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

  // Buyurtmani Telegram botga yuborish
  const sendOrderToTelegram = async (orderData) => {
    try {
      const { customerInfo, products } = orderData;
      
      // Mahsulotlar haqida matn tayyorlash
      let productsText = "🛒 *Mahsulotlar:*\n";
      products.forEach((item, index) => {
        productsText += `${index + 1}. ${item.name} - ${item.count} ${item.unit}\n`;
      });
      
      // Mijoz ma'lumotlari
      const customerText = `
👤 *Mijoz ma'lumotlari:*
Ismi: ${customerInfo.name}
Telefon: ${customerInfo.phone}
Manzil: ${customerInfo.address}
      `;
      
      // Jami mahsulotlar soni
      const totalItems = products.reduce((sum, item) => sum + item.count, 0);
      const totalText = `\n✅ *Jami:* ${totalItems} ta mahsulot`;
      
      // To'liq xabar
      const message = `🆕 *YANGI BUYURTMA*\n\n${productsText}\n${customerText}${totalText}`;
      
      // Telegram API ga so'rov yuborish
      const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
      const response = await fetch(telegramUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'Markdown'
        })
      });
      
      const data = await response.json();
      
      if (!data.ok) {
        throw new Error(data.description || 'Telegram botga yuborishda xatolik');
      }
      
      return true;
    } catch (error) {
      console.error('Telegram botga yuborishda xatolik:', error);
      throw error;
    }
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!checkoutForm.name.trim() || !checkoutForm.phone.trim() || !checkoutForm.address.trim()) {
      alert(translations[language].orderError);
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Buyurtma ma'lumotlarini tayyorlash
      const orderData = {
        customerInfo: {
          name: checkoutForm.name,
          phone: checkoutForm.phone,
          address: checkoutForm.address
        },
        products: cart.map(item => ({
          id: item.id,
          name: item.name,
          count: item.count,
          unit: item.unit
        }))
      };
      
      // Telegram botga yuborish
      await sendOrderToTelegram(orderData);
      
      // Muvaffaqiyatli buyurtma
      setOrderSuccess(true);
      setTimeout(() => {
        setCart([]);
        setIsCartOpen(false);
        setShowCheckout(false);
        setCheckoutForm({ name: '', phone: '', address: '' });
        setOrderSuccess(false);
      }, 2000);
    } catch (error) {
      alert(`Buyurtma yuborishda xatolik: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
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
            <span className="empty-icon">😭</span>
            <p>{translations[language].nothingFound}</p>
          </div>
        ) : filteredProducts.map(product => (
          <div key={product.id} className="product-card2" onClick={() => openSheet(product)}>
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
                        <button 
                          type="submit" 
                          className="confirm-btn" 
                          disabled={orderSuccess || isLoading}
                        >
                          {isLoading ? 'Yuborilmoqda...' : 
                            orderSuccess ? translations[language].orderSuccess : translations[language].confirmOrder}
                        </button>
                        <button 
                          type="button" 
                          onClick={() => setShowCheckout(false)} 
                          className="cancel-btn"
                          disabled={orderSuccess || isLoading}
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