import React from 'react';
import { translations } from '../translations/translations';

function About({ language }) {
  return (
    <div className="about-page">
      <h1>{translations[language].about}</h1>
      <p>{translations[language].aboutText}</p>
    </div>
  );
}

export default About; 