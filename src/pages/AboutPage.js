import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations/translations';
import '../styles/about.css';

const AboutPage = () => {
  const { language } = useLanguage();

  return (
    <div className="about-page">
      <div className="about-header">
        <h1>{translations[language].aboutUs}</h1>
      </div>

      <div className="about-content">
        <div className="about-section">
          <div className="about-image">
            <img src="https://images.unsplash.com/photo-1746102268391-a17760aff398?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8" alt="Our Store" />
          </div>
          <div className="about-text">
            <h2>{translations[language].ourStory}</h2>
            <p>{translations[language].aboutDescription}</p>
          </div>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🌱</div>
            <h3>{translations[language].qualityTitle}</h3>
            <p>{translations[language].qualityDescription}</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🚚</div>
            <h3>{translations[language].deliveryTitle}</h3>
            <p>{translations[language].deliveryDescription}</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💚</div>
            <h3>{translations[language].ecoTitle}</h3>
            <p>{translations[language].ecoDescription}</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🤝</div>
            <h3>{translations[language].supportTitle}</h3>
            <p>{translations[language].supportDescription}</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutPage; 