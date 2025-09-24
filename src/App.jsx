import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import logo from './assets/images/eixo-logo-white.png';
import icon from './assets/images/eixo-icon-white.png';
import { content, offerings } from './content';

const navItems = [
  { id: 'about', label: { en: 'Who we are', pt: 'Quem somos' } },
  { id: 'methodology', label: { en: 'How we work', pt: 'Como trabalhamos' } },
  { id: 'offerings', label: { en: 'Offerings', pt: 'O que oferecemos' } },
  { id: 'contact', label: { en: 'Contact', pt: 'Contato' } }
];

const AccordionItem = ({ id, title, content, isOpen, onClick }) => {
  const buttonId = `accordion-header-${id}`;
  const panelId = `accordion-panel-${id}`;
  const handleKeyDown = (e) => {
    const accordionButtons = document.querySelectorAll('.accordion-title');
    const currentIndex = Array.from(accordionButtons).indexOf(e.currentTarget);
    let targetIndex;

    switch (e.key) {
      case 'ArrowDown':
        targetIndex = (currentIndex + 1) % accordionButtons.length;
        accordionButtons[targetIndex].focus();
        e.preventDefault();
        break;
      case 'ArrowUp':
        targetIndex = (currentIndex - 1 + accordionButtons.length) % accordionButtons.length;
        accordionButtons[targetIndex].focus();
        e.preventDefault();
        break;
      case 'Home':
        accordionButtons[0].focus();
        e.preventDefault();
        break;
      case 'End':
        accordionButtons[accordionButtons.length - 1].focus();
        e.preventDefault();
        break;
      case 'Escape':
        if (isOpen) {
          e.preventDefault();
          onClick();
        }
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        onClick();
        break;
      default:
        break;
    }
  };

  return (
    <div className={`accordion-item ${isOpen ? 'open' : ''}`}>
      <button
        id={buttonId}
        className="accordion-title"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onClick}
        onKeyDown={handleKeyDown}
        type="button"
      >
        <span>{title}</span>
        <span className="accordion-icon">{isOpen ? '−' : '+'}</span>
      </button>
      <div
        id={panelId}
        className={`accordion-content ${isOpen ? 'visible' : 'hidden'}`}
        role="region"
        aria-labelledby={buttonId}
      >
        <p>{content}</p>
      </div>
    </div>
  );
};

function App() {
  const [lang, setLang] = useState('en');
  const t = content[lang];
  const [openIndex, setOpenIndex] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBio, setShowBio] = useState(false);
  const scrollListenerSetup = useRef(false);
  const sectionRefs = {
    hero: useRef(null),
    about: useRef(null),
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

  // Mouse trail effect disabled to improve scroll performance
  // useEffect(() => {
  //   const motionMediaQuery = window.matchMedia(
  //     '(prefers-reduced-motion: no-preference)'
  //   );
  //   const smallScreenQuery = window.matchMedia('(max-width: 768px)');
  //   if (!motionMediaQuery.matches || smallScreenQuery.matches) return;
  //   // Mouse trail logic removed for performance
  // }, []);

  // Removed scroll listener - now using intersection observer only

  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '-50px 0px'
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
          setActiveSection(entry.target.id);
        }
        // Use hero section to detect scroll state
        if (entry.target.id === 'hero') {
          setIsScrolled(!entry.isIntersecting);
          console.log('Hero section intersecting:', entry.isIntersecting, 'isScrolled now:', !entry.isIntersecting);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Disable fade-up animations to improve scroll performance
    document.querySelectorAll('.fade-up').forEach((el) => el.classList.add('visible'));
  }, []);

  return (
    <div className="app">
      <div className="bg-noise"></div>

      <header className={isScrolled ? 'active' : ''} data-scrolled={isScrolled}>
        <a href="#hero">
          <img src={logo} alt="Eixo Logo" className="logo" />
        </a>
        <button
          className="menu-toggle"
          aria-label={
            lang === 'en'
              ? menuOpen
                ? 'Close navigation'
                : 'Open navigation'
              : menuOpen
                ? 'Fechar navegação'
                : 'Abrir navegação'
          }
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '✕' : '☰'}
        </button>
        <nav
          className={`nav-menu ${menuOpen ? 'open' : ''}`}
          aria-label={lang === 'en' ? 'Main navigation' : 'Navegação principal'}
        >
          <ul>
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={activeSection === item.id ? 'active' : ''}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label[lang]}
                </a>
              </li>
            ))}
          </ul>
        </nav>
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

        <section className="about fade-up" id="about" ref={sectionRefs.about}>
          <div className="flip-card" onClick={() => setShowBio(!showBio)}>
            <div className={`flip-card-inner ${showBio ? 'flipped' : ''}`}>
              <div className="flip-card-front">
                <div className="card-content">
                  <h3>{t.aboutTitle}</h3>
                  <p>{t.aboutText1}</p>
                  <p>{t.aboutText2}</p>
                  <p className="strong">{t.aboutText3}</p>
                  <div className="flip-hint">
                    {lang === 'en' ? 'Click to learn about studio owner' : 'Clique para saber sobre a dona do estúdio'}
                  </div>
                </div>
              </div>
              <div className="flip-card-back">
                <div className="card-content">
                  <h3>{t.bioTitle}</h3>
                  <p>{t.bioText1}</p>
                  <p>{t.bioText2}</p>
                  <p className="strong">{t.bioText3}</p>
                  <div className="flip-hint">
                    {lang === 'en' ? 'Click to return to studio info' : 'Clique para voltar ao estúdio'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="methodology fade-up" id="methodology" ref={sectionRefs.methodology}>
          <h3>{t.aboutPrinciplesTitle}</h3>
          <div className="methodology-content accordion-layout">
            <div className="accordion">
              {t.aboutPrinciples.map((item, i) => (
                <AccordionItem
                  key={i}
                  id={i}
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

        <section className="contact fade-up" id="contact" ref={sectionRefs.contact}>
          <h3>{t.contactTitle || 'Contact'}</h3>
          <div className="contact-content">
            <div className="contact-text">
              <p className="contact-intro">{t.contactText || 'Ready to align your vision with intentional design?'}</p>
              <div className="contact-details">
                <a href="mailto:hello@eixo.design" className="contact-email">hello@eixo.design</a>
              </div>
            </div>
          </div>
        </section>

        <footer className="footer">
          <p>&copy; {new Date().getFullYear()} eixo.design</p>
        </footer>
      </main>
      <button
        className={`scroll-top ${showScrollTop ? 'visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label={lang === 'en' ? 'Back to top' : 'Voltar ao topo'}
      >
        ↑
      </button>
    </div>
  );
}

export default App;
