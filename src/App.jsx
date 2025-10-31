import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './App.css';
import logo from './assets/images/eixo-logo-white.png';
import icon from './assets/images/eixo-icon-white.png';
import { content, offerings } from './content';
import Footer from './components/Footer';

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

function App({ lang = 'en', setLang }) {
  const location = useLocation();
  const t = content[lang];
  const navItems = t.navItems || [];
  const navigationCopy = t.navigation || {};
  const navigationLabels = {
    languageLabel: navigationCopy.languageLabel || (lang === 'en' ? 'Language' : 'Idioma'),
    openMenu: navigationCopy.openMenu || (lang === 'en' ? 'Open navigation' : 'Abrir navegação'),
    closeMenu: navigationCopy.closeMenu || (lang === 'en' ? 'Close navigation' : 'Fechar navegação'),
    menuLabel: navigationCopy.menuLabel || (lang === 'en' ? 'Main navigation' : 'Navegação principal'),
    backToTop: navigationCopy.backToTop || (lang === 'en' ? 'Back to top' : 'Voltar ao topo')
  };
  const [openIndex, setOpenIndex] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBio, setShowBio] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const scrollListenerSetup = useRef(false);
  const lastTap = useRef(0);
  const cardRef = useRef(null);
  const sectionRefs = {
    hero: useRef(null),
    about: useRef(null),
    methodology: useRef(null),
    offerings: useRef(null),
    contact: useRef(null)
  };

  // Handle hash navigation on mount
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, []);

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Mobile detection and touch handling
  const detectMobile = useCallback(() => {
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                          window.innerWidth <= 768;
    setIsMobile(isMobileDevice);
  }, []);

  // Enhanced mobile menu handling
  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  const handleNavClick = useCallback((event, targetId) => {
    event.preventDefault();
    closeMenu();
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', `#${targetId}`);
    }
  }, [closeMenu]);

  const handleMenuToggle = useCallback((e) => {
    e.preventDefault();
    setMenuOpen(!menuOpen);
  }, [menuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen && isMobile) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [menuOpen, isMobile]);

  // Touch gesture handling for mobile flip card
  const handleTouchStart = useCallback((e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  }, []);

  const handleTouchMove = useCallback((e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe || isRightSwipe) {
      setShowBio(!showBio);
    }
  }, [touchStart, touchEnd, showBio]);

  // Double tap to flip card on mobile
  const handleDoubleTap = useCallback((e) => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;

    if (now - lastTap.current < DOUBLE_TAP_DELAY) {
      e.preventDefault();
      setShowBio(!showBio);
    }

    lastTap.current = now;
  }, [showBio]);

  useEffect(() => {
    document.documentElement.lang = lang;
    detectMobile();

    // Simulate initial loading
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    const handleResize = () => {
      detectMobile();
    };

    // Add subtle page entrance animation
    document.body.classList.add('page-loaded');

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(loadingTimer);
    };
  }, [lang, detectMobile]);

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
    // Performance-optimized intersection observer for mobile
    const observerOptions = {
      threshold: isMobile ? [0.1, 0.3] : 0.3,
      rootMargin: isMobile ? '-30px 0px' : '-50px 0px'
    };

    const observerCallback = (entries) => {
      requestAnimationFrame(() => {
        entries.forEach((entry) => {
          const minThreshold = isMobile ? 0.1 : 0.3;
          if (entry.isIntersecting && entry.intersectionRatio > minThreshold) {
            setActiveSection(entry.target.id);
          }
          // Use hero section to detect scroll state
          if (entry.target.id === 'hero') {
            setIsScrolled(!entry.isIntersecting);
          }
        });
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => observer.disconnect();
  }, [isMobile]);

  useEffect(() => {
    // Mobile performance optimizations
    if (isMobile) {
      // Reduce motion for better mobile performance
      document.querySelectorAll('.fade-up').forEach((el) => el.classList.add('visible'));

      // Add mobile-specific meta tags
      const viewport = document.querySelector('meta[name="viewport"]');
      if (viewport) {
        viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes';
      }

      // Preload critical mobile assets
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';

      // Enable passive event listeners for better scroll performance
      const enablePassiveListeners = () => {
        let supportsPassive = false;
        try {
          const opts = Object.defineProperty({}, 'passive', {
            get: () => { supportsPassive = true; }
          });
          window.addEventListener('test', null, opts);
        } catch (e) {}
        return supportsPassive;
      };

      if (enablePassiveListeners()) {
        document.addEventListener('touchstart', () => {}, { passive: true });
        document.addEventListener('touchmove', () => {}, { passive: true });
      }
    } else {
      document.querySelectorAll('.fade-up').forEach((el) => el.classList.add('visible'));
    }
  }, [isMobile]);

  return (
    <div className="app">
      <div className="bg-noise"></div>

      <header className={isScrolled ? 'active' : ''} data-scrolled={isScrolled}>
        <a href="#hero" onClick={(e) => handleNavClick(e, 'hero')}>
          <img src={logo} alt="Eixo Logo" className="logo" />
        </a>
        <button
          className={`menu-toggle ${menuOpen ? 'menu-open' : ''}`}
          aria-label={menuOpen ? navigationLabels.closeMenu : navigationLabels.openMenu}
          aria-expanded={menuOpen}
          onClick={handleMenuToggle}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
        <nav
          className={`nav-menu ${menuOpen ? 'open' : ''}`}
          aria-label={navigationLabels.menuLabel}
        >
          <div className="nav-menu-content">
            <ul>
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className={activeSection === item.id ? 'active' : ''}
                    onClick={(e) => handleNavClick(e, item.id)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mobile-lang-switcher">
              <span className="lang-label">{navigationLabels.languageLabel}</span>
              <div className="lang-buttons">
                <button
                  className={lang === 'en' ? 'active' : ''}
                  onClick={() => {setLang('en'); closeMenu();}}
                >
                  EN
                </button>
                <button
                  className={lang === 'pt' ? 'active' : ''}
                  onClick={() => {setLang('pt'); closeMenu();}}
                >
                  PT
                </button>
              </div>
            </div>
          </div>
        </nav>
        <div className="desktop-lang-switcher">
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
            {t.pronunciation && (
              <p className="pronunciation">{t.pronunciation}</p>
            )}
          </div>
        </section>

        <section className="about fade-up" id="about" ref={sectionRefs.about}>
          <div
            className="flip-card"
            onClick={() => setShowBio(!showBio)}
            onTouchStart={isMobile ? handleTouchStart : undefined}
            onTouchMove={isMobile ? handleTouchMove : undefined}
            onTouchEnd={isMobile ? handleTouchEnd : undefined}
            onTouchCancel={isMobile ? handleDoubleTap : undefined}
          >
            <div className={`flip-card-inner ${showBio ? 'flipped' : ''}`}>
              <div className="flip-card-front">
                <div className="card-content">
                  <h3>{t.aboutTitle}</h3>
                  <p>{t.aboutText1}</p>
                  <p>{t.aboutText2}</p>
                  <p className="strong">{t.aboutText3}</p>
                  <div className="flip-hint">
                    <span className="flip-icon">↻</span>
                    {lang === 'en'
                      ? (isMobile ? 'Tap or swipe to see who\'s behind it' : 'Click to see who\'s behind it')
                      : (isMobile ? 'Toque ou deslize para ver quem está por trás' : 'Clique para ver quem está por trás')
                    }
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
                    <span className="flip-icon">↻</span>
                    {lang === 'en'
                      ? (isMobile ? 'Tap or swipe to return to studio info' : 'Click to return to studio info')
                      : (isMobile ? 'Toque ou deslize para voltar ao estúdio' : 'Clique para voltar ao estúdio')
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="about-cta">
            <a href="mailto:hello@eixo.design" className="cta-button secondary">
              {lang === 'en' ? 'Work with us' : 'Trabalhe conosco'}
            </a>
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
              <Link to={`/offerings/${item.key}`} className="offering-card" key={i}>
                <img src={item.image} alt={`${item.title[lang]} icon`} className="offering-icon" />
                <h4>{item.title[lang]}</h4>
                <p className="offering-sub">{item.subtitle[lang]}</p>
                <ul>
                  {item.bullets[lang].map((b, j) => <li key={j}>{b}</li>)}
                </ul>
                <span className="offering-link-arrow">→</span>
              </Link>
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
              {t.socialProof && (
                <div className="social-proof">
                  <p className="testimonial-preview">{t.socialProof.testimonialPreview}</p>
                  <div className="trust-signals">
                    <span className="response-time">{t.socialProof.responseTime}</span>
                    <span className="availability">{t.socialProof.availability}</span>
                  </div>
                </div>
              )}
              <div className="contact-details">
                <a href="mailto:hello@eixo.design" className="contact-email">hello@eixo.design</a>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
      <button
        className={`scroll-top ${showScrollTop ? 'visible' : ''}`}
        onClick={() => {
          // Use native scrollTo with fallback for better mobile performance
          if (isMobile && 'scrollBehavior' in document.documentElement.style) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'auto' });
          }
        }}
        aria-label={navigationLabels.backToTop}
      >
        ↑
      </button>
    </div>
  );
}

export default App;
