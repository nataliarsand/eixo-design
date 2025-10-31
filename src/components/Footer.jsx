import React from 'react';
import logoMark from '../assets/images/eixo-logo-white.png';
import StatusBadge from './StatusBadge';

const defaultCopy = {
  description: '',
  location: '',
  availability: '',
  email: 'hello@eixo.design'
};

const Footer = ({ footerCopy = {} }) => {
  const year = new Date().getFullYear();
  const { description, location, availability, email } = { ...defaultCopy, ...footerCopy };
  const emailAddress = email || defaultCopy.email;

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-main">
          <div className="footer-info">
            <div className="footer-branding">
              <img className="footer-logo" src={logoMark} alt="Eixo.design logo" />
              {availability && <StatusBadge>{availability}</StatusBadge>}
            </div>
            {location && <span className="footer-location">{location}</span>}
            <a href={`mailto:${emailAddress}`} className="footer-contact">{emailAddress}</a>
          </div>

          <div className="footer-brand">
            <span className="footer-name">&copy; {year} eixo.design</span>
            {description && (
              <p className="footer-description">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
