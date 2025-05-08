import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { translations } from '../translations/translations';

function validateEmail(email) {
  // Oddiy email validatsiyasi
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const ContactPage = ({ language }) => {
  const [form, setForm] = useState({
    name: '',
    contact: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  
  // Telegram bot sozlamalari
  const TELEGRAM_BOT_TOKEN = '7532088606:AAHTUo3KRfQbF4WHfF5pdhQKnAovKZCM4gU'; // Bot tokeningizni qo'ying
  const TELEGRAM_CHAT_ID = '6429299277'; // Chat ID raqamini qo'ying
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
    
    // Xatolarni tozalash
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    // Ism tekshirish
    if (!form.name.trim()) {
      newErrors.name = translations[language].nameRequired;
    } else if (form.name.trim().length < 2) {
      newErrors.name = translations[language].nameMinLength;
    }
    
    // Kontakt tekshirish
    if (!form.contact) {
      newErrors.contact = translations[language].contactRequired;
    } else if (form.contact.includes('@')) {
      // Email tekshirish
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.contact)) {
        newErrors.contact = translations[language].invalidEmail;
      }
    } else {
      // Telefon raqam tekshirish
      const phoneRegex = /^[+]?[0-9]{10,13}$/;
      if (!phoneRegex.test(form.contact.replace(/\s/g, ''))) {
        newErrors.contact = translations[language].invalidPhone;
      }
    }
    
    // Xabar tekshirish
    if (!form.message.trim()) {
      newErrors.message = translations[language].messageRequired;
    } else if (form.message.trim().length < 5) {
      newErrors.message = translations[language].messageMinLength;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const sendToTelegram = async () => {
    // Xabar matnini tayyorlash
    const text = `
🔔 ${translations[language].newMessage}:

👤 ${translations[language].name}: ${form.name}
📞 ${translations[language].contact}: ${form.contact}
💬 ${translations[language].message}: ${form.message}
📅 ${translations[language].time}: ${new Date().toLocaleString()}
    `;
    
    try {
      const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: text,
          parse_mode: 'HTML',
        }),
      });
      
      const data = await response.json();
      return data.ok;
    } catch (error) {
      console.error(translations[language].telegramError, error);
      return false;
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Formani tekshirish
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // Telegram botga xabarni yuborish
      const success = await sendToTelegram();
      
      if (success) {
        // Muvaffaqiyatli yuborildi
        setSent(true);
        // Formani tozalash
        setForm({
          name: '',
          contact: '',
          message: ''
        });
        
        // 5 sekunddan keyin muvaffaqiyatli yuborildi xabarini yashirish
        setTimeout(() => {
          setSent(false);
        }, 5000);
      } else {
        alert(translations[language].sendError);
      }
    } catch (error) {
      console.error(translations[language].error, error);
      alert(translations[language].sendError);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page-hero">
      

      {/* About block with smoke effect */}
      <div className="contact-smoke">
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
            <h2 className="home-about-title">{translations[language].phoneNumbers}</h2>
            <p className="home-about-desc">{translations[language].phoneNumbersDesc}</p>
          </div>
          <div className="home-about-button">
            <a href="tel:+998942582789" className="home-about-btn">
              {translations[language].callUs}
            </a>
          </div>
        </div>
      </div>

      <div className="lacation-smoke">
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
            <h2 className="home-about-title">{translations[language].ourAddress}</h2>
            <p className="home-about-desc">{translations[language].address}</p>
          </div>
          <div className="home-about-button">
            <a 
              href="https://www.google.com/maps/place/39%C2%B026'15.7%22N+67%C2%B019'47.7%22E/@39.437699,67.3273471,767m/data=!3m1!1e3!4m4!3m3!8m2!3d39.437699!4d67.329922?entry=ttu&g_ep=EgoyMDI1MDUwNS4wIKXMDSoASAFQAw%3D%3D" 
              className="home-about-btn" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              {translations[language].viewOnMap}
            </a>
          </div>
        </div>
      </div>

      
      {/* Contact Cards */}
      <div className="contact-container">
        {/* Telegram Contact Card */}
        <a href="https://t.me/AZB710" className="contact-card" target="_blank" rel="noopener noreferrer">
          <h3 className="contact-title">{translations[language].telegram}</h3>
          <p className="contact-desc">{translations[language].telegramDesc}</p>
          <div className="contact-action">
            <span className="action-arrow">›</span>
          </div>
        </a>

        {/* Email Contact Card */}
        <a href="mailto:your_email@example.com" className="contact-card" target="_blank" rel="noopener noreferrer">
          <h3 className="contact-title">{translations[language].email}</h3>
          <p className="contact-desc">{translations[language].emailDesc}</p>
          <div className="contact-action">
            <span className="action-arrow">›</span>
          </div>
        </a>
      </div>

      {/* Map blok 
      <div className="contact-map-block">
        <iframe
          title="Manzil"
          src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d3338.1829156660096!2d67.3273471!3d39.437699!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMznCsDI2JzE1LjciTiA2N8KwMTknNDcuNyJF!5e1!3m2!1sen!2s!4v1746720446507!5m2!1sen!2s"
          width="100%"
          height="220"
          style={{ border: 0, borderRadius: '1rem' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      */}

      {/* Xabar yuborish formasi */}
      <div className="contact-form-section">
        <form className="contact-form-2" onSubmit={handleSubmit} autoComplete="off">
          <h2 className="contact-form-title">{translations[language].sendMessage}</h2>
          <input
            type="text"
            name="name"
            placeholder={translations[language].namePlaceholder}
            value={form.name}
            onChange={handleChange}
            className={errors.name ? 'error' : ''}
            required
          />
          {errors.name && <div className="contact-error">{errors.name}</div>}
          <input
            type={form.contact.includes('@') ? 'email' : 'tel'}
            name="contact"
            placeholder={translations[language].contactPlaceholder}
            value={form.contact}
            onChange={handleChange}
            className={errors.contact ? 'error' : ''}
            required
            inputMode={form.contact.includes('@') ? undefined : 'tel'}
          />
          {errors.contact && <div className="contact-error">{errors.contact}</div>}
          <textarea
            name="message"
            placeholder={translations[language].messagePlaceholder}
            value={form.message}
            onChange={handleChange}
            rows={4}
            className={errors.message ? 'error' : ''}
            required
          />
          {errors.message && <div className="contact-error">{errors.message}</div>}
          <button type="submit" className="contact-form-btn-2" disabled={loading}>
            {loading ? <span className="contact-spinner"></span> : translations[language].send}
          </button>
          {sent && (
            <div className="contact-form-sent-2">
              <span className="contact-check"></span> {translations[language].messageSent}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactPage;