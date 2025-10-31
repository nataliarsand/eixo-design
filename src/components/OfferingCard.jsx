import React from 'react';
import { Link } from 'react-router-dom';
import './OfferingCard.css';

const OfferingCard = ({ offering, lang = 'en' }) => {
  const { key, image, title, subtitle, bullets } = offering;

  return (
    <Link to={`/offerings/${key}`} className="offering-card">
      <img
        src={image}
        alt={`${title[lang]} icon`}
        className="offering-icon"
      />
      <h4>{title[lang]}</h4>
      <p className="offering-sub">{subtitle[lang]}</p>
      <ul>
        {bullets[lang].map((bullet, j) => (
          <li key={j}>{bullet}</li>
        ))}
      </ul>
      <span className="offering-link-arrow">→</span>
    </Link>
  );
};

export default OfferingCard;
