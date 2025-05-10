import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { translations } from './translations/translations';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './index.css';
import ProductsPage from './pages/ProductsPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import { LanguageProvider } from './contexts/LanguageContext';

function App() {
  const [language, setLanguage] = useState('uz');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    setIsLanguageDropdownOpen(false);
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isLanguageDropdownOpen) {
      setIsLanguageDropdownOpen(false);
    }
  };

  const toggleLanguageDropdown = (e) => {
    e.stopPropagation();
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = () => {
      if (isLanguageDropdownOpen) {
        setIsLanguageDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isLanguageDropdownOpen]);

  return (
    <LanguageProvider>
      <Router>
        <div className="app">
          {/* Header */}
          <header>
            <div className="container">
              <div className="header-content">
                <Link to="/" className="logo">
                  {translations[language].siteName}
                </Link>

                {/* Desktop Navigation */}
                <div className="nav-container">
                  <nav>
                    <Link to="/" className="nav-link">
                      {translations[language].home}
                    </Link>
                    <Link to="/products" className="nav-link">
                      {translations[language].products}
                    </Link>
                    <Link to="/about" className="nav-link">
                      {translations[language].about}
                    </Link>
                    <Link to="/contact" className="nav-link">
                      {translations[language].contact}
                    </Link>
                  </nav>

                  {/* Language Selector */}
                  <div className="language-selector">
                    <button 
                      className={`language-button ${isLanguageDropdownOpen ? 'active' : ''}`}
                      onClick={toggleLanguageDropdown}
                    >
                      <span>{language.toUpperCase()}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <div className={`language-dropdown ${isLanguageDropdownOpen ? 'active' : ''}`}>
                      <div 
                        className={`language-option ${language === 'uz' ? 'active' : ''}`}
                        onClick={() => changeLanguage('uz')}
                      >
                        UZ
                      </div>
                      <div 
                        className={`language-option ${language === 'en' ? 'active' : ''}`}
                        onClick={() => changeLanguage('en')}
                      >
                        EN
                      </div>
                      <div 
                        className={`language-option ${language === 'zh' ? 'active' : ''}`}
                        onClick={() => changeLanguage('zh')}
                      >
                        ZH
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile Controls */}
                <div className="mobile-controls">
                  {/* Language Selector */}
                  <div className="language-selector">
                    <button 
                      className={`language-button ${isLanguageDropdownOpen ? 'active' : ''}`}
                      onClick={toggleLanguageDropdown}
                    >
                      <span>{language.toUpperCase()}</span>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <div className={`language-dropdown ${isLanguageDropdownOpen ? 'active' : ''}`}>
                      <div 
                        className={`language-option ${language === 'uz' ? 'active' : ''}`}
                        onClick={() => changeLanguage('uz')}
                      >
                        UZ
                      </div>
                      <div 
                        className={`language-option ${language === 'en' ? 'active' : ''}`}
                        onClick={() => changeLanguage('en')}
                      >
                        EN
                      </div>
                      <div 
                        className={`language-option ${language === 'zh' ? 'active' : ''}`}
                        onClick={() => changeLanguage('zh')}
                      >
                        ZH
                      </div>
                    </div>
                  </div>

                  {/* Mobile Menu Button */}
                  <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </button>
                </div>
              </div>

              {/* Mobile Menu */}
              <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
                <nav className="mobile-nav">
                  <Link to="/" className="nav-link" onClick={toggleMobileMenu}>
                    {translations[language].home}
                  </Link>
                  <Link to="/products" className="nav-link" onClick={toggleMobileMenu}>
                    {translations[language].products}
                  </Link>
                  <Link to="/about" className="nav-link" onClick={toggleMobileMenu}>
                    {translations[language].about}
                  </Link>
                  <Link to="/contact" className="nav-link" onClick={toggleMobileMenu}>
                    {translations[language].contact}
                  </Link>
                </nav>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main>
            <Routes>
              <Route path="/" element={<Home language={language} />} />
              <Route path="/products" element={<ProductsPage language={language} />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage language={language} />} />
            </Routes>
          </main>
          <footer className="footer">
            <div className="footer-content">
              <span className="footer-title">{translations[language].siteName}</span>
              <span className="footer-copy">{translations[language].copyright}</span>
            </div>
          </footer>
        </div>
      </Router>
    </LanguageProvider>
  );
}

function Home({ language }) {
  const products = [
    {
      id: 1,
      name: 'Bodom',
      image: 'https://media.istockphoto.com/id/1360789044/photo/almonds-isolated-on-wooden-background-flat-lay.jpg?s=612x612&w=0&k=20&c=m3JUwL1ru0rHGQwdtkHpl7PjWjvdGzbMKcTnkyJmzFw=',
      desc: 'Yuqori sifatli bodom, foydali va mazali.'
    },
    {
      id: 2,
      name: 'Pista',
      image: 'https://media.istockphoto.com/id/2160545676/photo/pistachios-kernels-roasted-and-salted-nuts-in-a-wooden-bowl-on-linen.jpg?s=612x612&w=0&k=20&c=LzXR9Vali-YZQbsDpFIa14qtFlEh6tYPiFBp8b0IA28=',
      desc: 'Tabiiy pista, energiya va vitaminlarga boy.'
    },
    {
      id: 3,
      name: "Mayiz",
      image: 'https://media.istockphoto.com/id/974877012/photo/a-sweet-dried-fruit-golden-raisins-or-vitis-vinifera-l-var-apyrena-kishmish-or-zante-currant.jpg?s=612x612&w=0&k=20&c=GXsf2GohOelfEev00W1wxurB247YCHagcHEdq269WzA=',
      desc: "Shirin va tabiiy mayiz."
    },
    {
      id: 4,
      name: "O'rik quritilgan",
      image: 'https://media.istockphoto.com/id/542330328/photo/organic-raw-dry-apricots.jpg?s=612x612&w=0&k=20&c=_hXZ6EDk4h0fcbEj-bequdeN_YtWpPOJLqYMw_Ipz5s=',
      desc: "Vitaminlarga boy quritilgan o'rik."
    },
    {
      id: 5,
      name: "Anjir",
      image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
      desc: "Tabiiy quritilgan anjir."
    },
    {
      id: 6,
      name: "Anjir",
      image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
      desc: "Tabiiy quritilgan anjir."
    },
    {
      id: 7,
      name: "Anjir",
      image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
      desc: "Tabiiy quritilgan anjir."
    }
  ];

  const slides = [
    {
      title: translations[language].slide1Title,
      text: translations[language].slide1Text,
      linkText: translations[language].viewProducts,
      linkTo: '/products',
      image: 'https://media.istockphoto.com/id/523458571/photo/organic-healthy-assorted-dried-fruit.jpg?s=612x612&w=0&k=20&c=PuuQap2lSgZNoZO0OPyiEQr0Qy9hvX12m8xHlNJ54FU='
    },
    {
      title: translations[language].slide2Title,
      text: translations[language].slide2Text,
      linkText: translations[language].learnMore,
      linkTo: '/about',
      image: 'https://media.istockphoto.com/id/175384554/photo/dried-apricots.jpg?s=612x612&w=0&k=20&c=gwC_nVRm_zWQET3krFqHppWkwvvc0D3GyCxCq0RBR0U='
    },
    {
      title: translations[language].slide3Title,
      text: translations[language].slide3Text,
      linkText: translations[language].contactUs,
      linkTo: '/contact',
      image: 'https://media.istockphoto.com/id/2176735154/photo/dried-tropical-fruits-nuts-and-raisins-on-a-beige-background.jpg?s=612x612&w=0&k=20&c=jcW8JfrgVuWyDfaqdNEn1AwBDjXnGatHVNBYYufhRAQ='
    }
  ];

  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop={true}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} style={{ backgroundImage: `url(${slide.image})` }}>
            <div className="swiper-slide-content">
              <h2 className="swiper-slide-title">{slide.title}</h2>
              <p className="swiper-slide-text">{slide.text}</p>
              <Link to={slide.linkTo} className="swiper-slide-link relative pr-6 pt-4 text-white">
                {slide.linkText}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  className="absolute top-1 right-1"
                >
                  <path
                    fill="none"
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="m6.5 17.5l11-11m0 0h-9m9 0v9"
                  />
                </svg>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* About block with smoke effect */}
      <div className="home-about-smoke">
        <div className="smoke-effect"></div>
        <div className="smoke-effect smoke-effect-2"></div>
        <div className="smoke-effect smoke-effect-3"></div>
        <div className="stars-container">
          <div className="star star-1"></div>
          <div className="star star-2"></div>
          <div className="star star-3"></div>
          <div className="star star-4"></div>
          <div className="star star-5"></div>
          <div className="star star-6"></div>
          <div className="star star-7"></div>
          <div className="star star-8"></div>
          <div className="star star-9"></div>
          <div className="star star-10"></div>
          <div className="star star-11"></div>
          <div className="star star-12"></div>
          <div className="star star-13"></div>
          <div className="star star-14"></div>
          <div className="star star-15"></div>
        </div>
        <div className="home-about-content">
          <div className="home-about-text">
            <h2 className="home-about-title">{translations[language].about}</h2>
            <p className="home-about-desc">{translations[language].aboutText}</p>
          </div>
          <div className="home-about-button">
            <Link to="/about" className="home-about-btn">
              {translations[language].learnMore}
            </Link>
          </div>
        </div>
      </div>
      {/* Mahsulotlar sectioni */}
      <div className="products-blackbox">
        {/* Emoji backgrounds - ko'p sonli mevalar */}
        <span className="emoji-bg emoji-1">🍉</span>
        <span className="emoji-bg emoji-2">🍇</span>
        <span className="emoji-bg emoji-3">🥭</span>
        <span className="emoji-bg emoji-4">🍊</span>
        <span className="emoji-bg emoji-5">🍓</span>
        <span className="emoji-bg emoji-6">🍌</span>
        <span className="emoji-bg emoji-7">🍎</span>
        <span className="emoji-bg emoji-8">🍐</span>
        <span className="emoji-bg emoji-9">🍍</span>
        <span className="emoji-bg emoji-10">🥝</span>
        <span className="emoji-bg emoji-11">🍑</span>
        <span className="emoji-bg emoji-12">🍒</span>
        <span className="emoji-bg emoji-13">🥥</span>
        <span className="emoji-bg emoji-14">🍋</span>
        <span className="emoji-bg emoji-15">🍏</span>
        <span className="emoji-bg emoji-16">🫐</span>
        <span className="emoji-bg emoji-17">🥑</span>
        <span className="emoji-bg emoji-18">🥭</span>
        <span className="emoji-bg emoji-19">🍇</span>
        <span className="emoji-bg emoji-20">🍉</span>
        <span className="emoji-bg emoji-21">🍓</span>
        <span className="emoji-bg emoji-22">🍊</span>
        <span className="emoji-bg emoji-23">🍌</span>
        <span className="emoji-bg emoji-24">🍎</span>
        <span className="emoji-bg emoji-25">🍐</span>
        <span className="emoji-bg emoji-26">🍍</span>
        <span className="emoji-bg emoji-27">🥝</span>
        <span className="emoji-bg emoji-28">🍑</span>
        <span className="emoji-bg emoji-29">🍒</span>
        <span className="emoji-bg emoji-30">🥥</span>
        <span className="emoji-bg emoji-31">🍋</span>
        <span className="emoji-bg emoji-32">🍏</span>
        <span className="emoji-bg emoji-33">🫐</span>
        <span className="emoji-bg emoji-34">🥑</span>
        <span className="emoji-bg emoji-35">🍈</span>
        <span className="emoji-bg emoji-36">🍅</span>
        <span className="emoji-bg emoji-37">🥭</span>
        <span className="emoji-bg emoji-38">🍇</span>
        <span className="emoji-bg emoji-39">🍓</span>
        <span className="emoji-bg emoji-40">🍌</span>
        
        <h2 className="section-title">Bizning Mahsulotlar</h2>
        
        <div className="products-container">
          <div className="products-flex-row">
            {products.map(product => (
              <div key={product.id} className="product-card">
                <img src={product.image} alt={product.name} className="product-image" />
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p>{product.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* To'liq ko'rish tugmasi pastga o'tkazildi */}
        <a href="/products" className="view-more-btn">
          To'liq ko'rish
        </a>
      </div>

      <div className="contact-about-smoke">
        <div className="smoke-effect"></div>
        <div className="smoke-effect smoke-effect-2"></div>
        <div className="smoke-effect smoke-effect-3"></div>
        <div className="stars-container">
          <div className="star star-1"></div>
          <div className="star star-2"></div>
          <div className="star star-3"></div>
          <div className="star star-4"></div>
          <div className="star star-5"></div>
          <div className="star star-6"></div>
          <div className="star star-7"></div>
          <div className="star star-8"></div>
          <div className="star star-9"></div>
          <div className="star star-10"></div>
          <div className="star star-11"></div>
          <div className="star star-12"></div>
          <div className="star star-13"></div>
          <div className="star star-14"></div>
          <div className="star star-15"></div>
        </div>
        <div className="home-about-content">
          <div className="home-about-text">
            <h2 className="home-about-title">{translations[language].about}</h2>
            <p className="home-about-desc">{translations[language].aboutText}</p>
          </div>
          <div className="home-about-button">
            <Link to="/contact" className="home-about-btn">
              {translations[language].learnMore}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

function About({ language }) {
  return (
    <div className="about-page">
      <h1>{translations[language].about}</h1>
      <p>{translations[language].aboutText}</p>
    </div>
  );
}

export default App;