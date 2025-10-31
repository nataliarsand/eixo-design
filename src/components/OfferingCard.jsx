import React from 'react';
// import { Link } from 'react-router-dom'; // Temporarily disabled - offering pages hidden
import './OfferingCard.css';

const OfferingCard = ({ offering, lang = 'en' }) => {
  const { key, image, title, subtitle, bullets } = offering;

  // Temporarily using div instead of Link - offering detail pages are hidden
  return (
    <div className="offering-card offering-card--disabled">
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
      {/* Temporarily hidden - offering detail pages disabled */}
      {/* <span className="offering-link-arrow">→</span> */}
    </div>
  );

  // To re-enable offering pages, uncomment this and comment out the div above:
  // return (
  //   <Link to={`/offerings/${key}`} className="offering-card">
  //     <img src={image} alt={`${title[lang]} icon`} className="offering-icon" />
  //     <h4>{title[lang]}</h4>
  //     <p className="offering-sub">{subtitle[lang]}</p>
  //     <ul>
  //       {bullets[lang].map((bullet, j) => (
  //         <li key={j}>{bullet}</li>
  //       ))}
  //     </ul>
  //     <span className="offering-link-arrow">→</span>
  //   </Link>
  // );
};

export default OfferingCard;
