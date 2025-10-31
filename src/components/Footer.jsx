import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-main">
          <p className="copyright">&copy; {new Date().getFullYear()} eixo.design</p>
          <div className="footer-links">
            <span className="location">Netherlands</span>
            <span className="separator">|</span>
            <span className="status">Available for new projects</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
