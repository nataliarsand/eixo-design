import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import logo from './assets/images/eixo-logo-white.png';
import icon from './assets/images/eixo-icon-white.png';
import { content, offerings } from './content';

const AccordionItem = ({ title, content, isOpen, onClick }) => (
  <div className={`accordion-item ${isOpen ? 'open' : ''}`}>
    <button className="accordion-title" onClick={onClick}>
      <span>{title}</span>
      <span className="accordion-icon">{isOpen ? '−' : '+'}</span>
    </button>
    <div className={`accordion-content ${isOpen ? 'visible' : 'hidden'}`}>
      <p>{content}</p>
    </div>
  </div>
);

function App() {
  const [lang, setLang] = useState('en');
  const t = content[lang];
  const [openIndex, setOpenIndex] = useState(null);
  const sectionRefs = {
    hero: useRef(null),
    methodology: useRef(null),
    offerings: useRef(null),
    contact: useRef(null)
  };

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: no-preference)');
    if (!mediaQuery.matches) return;

    const trailLayer = document.getElementById('trail-layer');
    const createTrailSpot = (x, y) => {
      const spot = document.createElement('div');
      spot.className = 'trail-spot';
      spot.style.left = `${x}px`;
      spot.style.top = `${y}px`;
      trailLayer.appendChild(spot);
      setTimeout(() => {
        trailLayer.removeChild(spot);
      }, 1800);
    };
    const handleMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;
      document.documentElement.style.setProperty('--cursor-x', `${x}px`);
      document.documentElement.style.setProperty('--cursor-y', `${y}px`);
      createTrailSpot(x, y);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: no-preference)');
    if (!mediaQuery.matches) {
      document.querySelectorAll('.fade-up').forEach((el) => el.classList.add('visible'));
      return;
    }

    const observerOptions = {
      threshold: 0.1
    };
    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    };
    const observer = new IntersectionObserver(callback, observerOptions);
    document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="app">
      <div className="bg-noise"></div>
      <div className="trail-layer" id="trail-layer"></div>

      <header>
        <img src={logo} alt="Eixo Logo" className="logo" />
        <div className="lang-switcher">
          <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</button>
          <button className={lang === 'pt' ? 'active' : ''} onClick={() => setLang('pt')}>PT</button>
        </div>
      </header>

      <main>
        <section className="hero fade-up" id="hero" ref={sectionRefs.hero}>
          <div className="hero-brand">
            <img src={icon} alt="Eixo Icon" className="hero-x" />
            <h1>
              <span className="line1">{t.subtitle1}</span>
              <span className="line2">{t.subtitle2}</span>
            </h1>
            <p>{t.description}</p>
          </div>
        </section>

        <section className="about fade-up" id="about">
          <h3>{t.aboutTitle}</h3>
          <p>{t.aboutText1}</p>
          <p>{t.aboutText2}</p>
          <p className="strong">{t.aboutText3}</p>
          <div className="cta">
            <a href="mailto:hello@eixo.design" className="cta-button">{t.cta}</a>
          </div>
        </section>

        <section className="methodology fade-up" id="methodology" ref={sectionRefs.methodology}>
          <h3>{t.aboutPrinciplesTitle}</h3>
          <div className="methodology-content accordion-layout">
            <div className="accordion">
              {t.aboutPrinciples.map((item, i) => (
                <AccordionItem
                  key={i}
                  title={item.title}
                  content={item.description}
                  isOpen={openIndex === i}
                  onClick={() => toggleIndex(i)}
                />
              ))}
            </div>
            <div className="accordion-image">
              <img src="./assets/images/work2.png" alt="Design wall" />
            </div>
          </div>
        </section>

        <section className="offerings fade-up" id="offerings" ref={sectionRefs.offerings}>
          <h3>{t.offeringsLabel}</h3>
          <div className="offerings-grid">
            {offerings.map((item, i) => (
              <div className="offering-card" key={i}>
                <img src={item.image} alt={`${item.title[lang]} icon`} className="offering-icon" />
                <h4>{item.title[lang]}</h4>
                <p className="offering-sub">{item.subtitle[lang]}</p>
                <ul>
                  {item.bullets[lang].map((b, j) => <li key={j}>{b}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <div className="cta">
            <a href="mailto:hello@eixo.design" className="cta-button">{t.cta}</a>
          </div>
        </section>

        <footer className="footer fade-up" ref={sectionRefs.contact}>
          <p>&copy; {new Date().getFullYear()} eixo.design — All rights reserved.</p>
          <p>
            Crafted with clarity · <a href="mailto:hello@eixo.design">hello@eixo.design</a>
          </p>
        </footer>
      </main>
    </div>
  );
}

export default App;