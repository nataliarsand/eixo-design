import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import logo from './assets/images/eixo-logo-white.png';
import icon from './assets/images/eixo-icon-white.png';
import { content, offerings } from './content';
import Footer from './components/Footer';
import Button from './components/Button';
import Accordion from './components/Accordion';
import FlipCard from './components/FlipCard';
import OfferingCard from './components/OfferingCard';
import StatusBadge from './components/StatusBadge';

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
  const [menuOpen, setMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const scrollListenerSetup = useRef(false);
  const scrollPosition = useRef(0);
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

  // Mobile detection
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

    // Clear the saved scroll position before closing menu to prevent jump
    scrollPosition.current = 0;

    closeMenu();

    // Small delay to let menu close animation start
    setTimeout(() => {
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.replaceState(null, '', `#${targetId}`);
      }
    }, 50);
  }, [closeMenu]);

  const handleMenuToggle = useCallback((e) => {
    e.preventDefault();
    setMenuOpen(!menuOpen);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen || !isMobile) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen, isMobile, closeMenu]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen && isMobile) {
      scrollPosition.current = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${scrollPosition.current}px`;

      return () => {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.top = '';
        window.scrollTo({ top: scrollPosition.current });
        scrollPosition.current = 0;
      };
    }

    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.width = '';
    document.body.style.top = '';
    if (!menuOpen && scrollPosition.current !== 0) {
      window.scrollTo({ top: scrollPosition.current });
      scrollPosition.current = 0;
    }
  }, [menuOpen, isMobile]);


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
            setShowScrollTop(!entry.isIntersecting);
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
        {isMobile && (
          <div
            className={`nav-backdrop ${menuOpen ? 'visible' : ''}`}
            onClick={closeMenu}
            aria-hidden="true"
          ></div>
        )}
        <nav
          className={`nav-menu ${menuOpen ? 'open' : ''}`}
          aria-label={navigationLabels.menuLabel}
          aria-hidden={isMobile ? !menuOpen : false}
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
                <Button
                  variant="ghost"
                  size="sm"
                  className={lang === 'en' ? 'active' : ''}
                  onClick={() => {setLang('en'); closeMenu();}}
                >
                  EN
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={lang === 'pt' ? 'active' : ''}
                  onClick={() => {setLang('pt'); closeMenu();}}
                >
                  PT
                </Button>
              </div>
            </div>
          </div>
        </nav>
        <div className="desktop-lang-switcher">
          <Button variant="ghost" size="sm" className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN</Button>
          <Button variant="ghost" size="sm" className={lang === 'pt' ? 'active' : ''} onClick={() => setLang('pt')}>PT</Button>
        </div>
      </header>

      <main>
        <section className="section section--left fade-up" id="hero" ref={sectionRefs.hero}>
          <div className="section__inner">
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
          </div>
        </section>

        <section className="section section--left fade-up" id="about" ref={sectionRefs.about}>
          <div className="section__inner">
            <FlipCard
              isMobile={isMobile}
              frontContent={
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
              }
              backContent={
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
              }
            />
            <div className="cta-container">
              <Button
                as="a"
                href="mailto:hello@eixo.design"
                variant="secondary"
              >
                {lang === 'en' ? 'Work with us' : 'Trabalhe conosco'}
              </Button>
            </div>
          </div>
        </section>

        <section className="section section--left fade-up" id="methodology" ref={sectionRefs.methodology}>
          <div className="section__inner">
            <h3>{t.aboutPrinciplesTitle}</h3>
            <div className="section__split">
              <Accordion items={t.aboutPrinciples} />
              <div className="accordion-image">
                <img src="./assets/images/work2.png" alt="Design wall" />
              </div>
            </div>
          </div>
        </section>

        <section className="section section--left fade-up" id="offerings" ref={sectionRefs.offerings}>
          <div className="section__inner">
            <h3>{t.offeringsLabel}</h3>
            <div className="cards-grid">
              {offerings.map((offering, i) => (
                <OfferingCard key={i} offering={offering} lang={lang} />
              ))}
            </div>
            <div className="cta-container">
              <Button as="a" href="mailto:hello@eixo.design" variant="primary">
                {t.cta}
              </Button>
            </div>
          </div>
        </section>

        <section className="section section--left fade-up" id="contact" ref={sectionRefs.contact}>
          <div className="section__inner">
            <h3>{t.contactTitle || 'Contact'}</h3>
            <div className="contact-content">
              <div className="contact-text">
                <p className="contact-intro">{t.contactText || 'Ready to align your vision with intentional design?'}</p>
                {t.socialProof && (
                  <div className="social-proof">
                    <p className="testimonial-preview">{t.socialProof.testimonialPreview}</p>
                    <div className="trust-signals">
                      <span className="response-time">{t.socialProof.responseTime}</span>
                      <StatusBadge variant="online">{t.socialProof.availability}</StatusBadge>
                    </div>
                  </div>
                )}
                <div className="contact-details">
                  <a href="mailto:hello@eixo.design" className="contact-email">hello@eixo.design</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer footerCopy={t.footer} />
      </main>
      <button
        className={`scroll-top ${showScrollTop ? 'visible' : ''}`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          const heroSection = document.getElementById('hero');
          if (heroSection) {
            heroSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        aria-label={navigationLabels.backToTop}
        type="button"
      >
        ↑
      </button>
    </div>
  );
}

export default App;
