import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { translations } from './translations/translations';
import './index.css';

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
          <div className="container">
            <Routes>
              <Route path="/" element={<Home language={language} />} />
              <Route path="/products" element={<Products language={language} />} />
              <Route path="/about" element={<About language={language} />} />
              <Route path="/contact" element={<Contact language={language} />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

function Home({ language }) {
  return (
    <div className="page-content">
      <h1 className="page-title">{translations[language].welcome}</h1>
      <p className="page-text">{translations[language].homeText}</p>
    </div>
  );
}

function Products({ language }) {
  return (
    <div className="page-content">
      <h1 className="page-title">{translations[language].products}</h1>
      <p className="page-text">{translations[language].productsText}</p>
    </div>
  );
}

function About({ language }) {
  return (
    <div className="page-content">
      <h1 className="page-title">{translations[language].about}</h1>
      <p className="page-text">{translations[language].aboutText}</p>
    </div>
  );
}

function Contact({ language }) {
  return (
    <div className="page-content">
      <h1 className="page-title">{translations[language].contact}</h1>
      <p className="page-text">{translations[language].contactText}</p>
    </div>
  );
}

export default App;
