import React, { useState, useEffect } from 'react';
import './App.css';
import logo from './assets/images/eixo-logo-white.png';
import icon from './assets/images/eixo-icon-white.png'

  const content = {
    en: {
      title: 'eixo.design',
      subtitle1: 'Design from',
      subtitle2: ' the core out.',
      description: 'We align systems, people, and purpose through intentional UX.',
      offeringsLabel: 'How we do it',
      cta: "Let's talk",
      aboutTitle: "Who we are",
      aboutText1: "Eixo is a UX design studio that brings clarity to complexity. We help teams cut through noise, align on purpose, and design systems that scale.",
      aboutText2: "We design from the inside out — working from intent to interface. Our work connects product thinking, service design, and UX craft to shape meaningful, repeatable experiences.",
      aboutText3: "We’re not here to make things pretty. We’re here to make things work — with intention, coherence, and a structure that lasts.",

      aboutPrinciplesTitle: 'How we work',
      aboutPrinciples: [
        '→ We ask hard questions early',
        '→ We frame problems before solving them',
        '→ We favour clarity over trend',
        '→ We collaborate with care',
        '→ We design for continuity'
      ]
    },
    pt: {
      title: 'eixo.design',
      subtitle1: 'Design do',
      subtitle2: 'eixo pra fora.',
      description: 'Alinhamos sistemas, pessoas e propósito através de UX intencional.',
      offeringsLabel: 'O que oferecemos',
      cta: 'Vamos conversar',
      aboutTitle: "Quem somos",
      aboutText1: "A Eixo é um estúdio de UX que traz clareza à complexidade. Ajudamos times a cortar o ruído, alinhar propósito e desenhar sistemas que escalam.",
      aboutText2: "Projetamos de dentro pra fora — do propósito à interface. Nosso trabalho conecta pensamento de produto, design de serviços e prática de UX para criar experiências com significado e estrutura.",
      aboutText3: "Não estamos aqui pra deixar as coisas bonitas. Estamos aqui pra fazê-las funcionar — com intenção, coerência e consistência.",
      aboutPrinciplesTitle: 'Como trabalhamos',
      aboutPrinciples: [
        '→ Fazemos as perguntas difíceis desde o início',
        '→ Enquadramos o problema antes de propor soluções',
        '→ Priorizamos clareza acima de tendências',
        '→ Colaboramos com cuidado',
        '→ Projetamos com visão de continuidade'
      ]
    }
  };
  

  const offerings = [
    {
      key: 'consultancy',
      image: '/assets/images/consultancy-white.png',
      title: { en: 'Consultancy', pt: 'Consultoria' },
      subtitle: {
        en: 'Targeted design support at any stage.',
        pt: 'Apoio estratégico em qualquer etapa.'
      },
      bullets: {
        en: [
          'Discovery workshops & team alignment',
          'Problem framing & opportunity mapping',
          'UX strategy & service design reviews',
          'Co-creation & structured ideation sessions'
        ],
        pt: [
          'Workshops de descoberta e alinhamento',
          'Definição de problemas e mapeamento de oportunidades',
          'Revisões estratégicas de UX e design de serviços',
          'Sessões de ideação e co-criação com estrutura'
        ]
      }
    },
    {
      key: 'delivery',
      image: '/assets/images/delivery-white.png',
      title: { en: 'Delivery', pt: 'Entrega' },
      subtitle: {
        en: 'End-to-end product and system design.',
        pt: 'Design completo de produtos e sistemas digitais.'
      },
      bullets: {
        en: [
          'UX/UI design for apps and web',
          'Design system foundations & scale',
          'Flow mapping, wireframes, and prototypes',
          'Dev collaboration & implementation support'
        ],
        pt: [
          'UX/UI para web e aplicativos',
          'Fundação e escalabilidade de design systems',
          'Mapeamento de fluxos, wireframes e protótipos',
          'Colaboração com times de desenvolvimento'
        ]
      }
    },
    {
      key: 'courses',
      image: '/assets/images/courses-white.png',
      title: { en: 'Courses', pt: 'Cursos' },
      subtitle: {
        en: 'Intentional design education for modern teams.',
        pt: 'Educação em design com clareza e propósito.'
      },
      bullets: {
        en: [
          'UX foundations course (coming soon)',
          'Problem to prototype: full design flow',
          'Design & code for designers (with Daniel)',
          'Brand & typography strategy (with Tássia)'
        ],
        pt: [
          'Curso de fundamentos de UX (em breve)',
          'Do problema ao protótipo: fluxo completo de design',
          'Design & código para designers (com Daniel)',
          'Estratégia de marca e tipografia (com Tássia)'
        ]
      }
    },
    {
      key: 'mentoring',
      image: '/assets/images/mentoring-white.png',
      title: { en: 'Mentoring', pt: 'Mentorias' },
      subtitle: {
        en: 'Guidance for designers, teams, and transitions.',
        pt: 'Acompanhamento individual e para times.'
      },
      bullets: {
        en: [
          '1:1 design growth paths',
          'Career shifts into UX',
          'Team mentoring & system coaching',
          'Workshops tailored to your context'
        ],
        pt: [
          'Caminhos de crescimento para designers',
          'Transições de carreira para UX',
          'Mentorias sobre design systems',
          'Workshops personalizados para seu contexto'
        ]
      }
    }
  ];  

function App() {
  const [lang, setLang] = useState('en');
  const t = content[lang];
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // Section scroll effect
  useEffect(() => {
    let isScrolling = false;
    const sections = Array.from(document.querySelectorAll("section"));
    let currentIndex = 0;

    const scrollToSection = (index) => {
      if (index >= 0 && index < sections.length) {
        isScrolling = true;
        sections[index].scrollIntoView({ behavior: "smooth" });
        currentIndex = index;
        setTimeout(() => { isScrolling = false }, 1000);
      }
    };

    const handleWheel = (e) => {
      if (isScrolling) return;
      if (e.deltaY > 50) scrollToSection(currentIndex + 1);
      else if (e.deltaY < -50) scrollToSection(currentIndex - 1);
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  // Cursor glow effect
  useEffect(() => {
    const trailLayer = document.getElementById('trail-layer');
  
    const createTrailSpot = (x, y) => {
      const spot = document.createElement('div');
      spot.className = 'trail-spot';
      spot.style.left = `${x}px`;
      spot.style.top = `${y}px`;
      trailLayer.appendChild(spot);
  
      // Remove after animation
      setTimeout(() => {
        trailLayer.removeChild(spot);
      }, 1800);
    };
  
    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      document.documentElement.style.setProperty('--cursor-x', `${x}px`);
      document.documentElement.style.setProperty('--cursor-y', `${y}px`);
      createTrailSpot(x, y);
    };
  
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  

  return (
    <div className="app">
      <div className="bg-noise"></div>
      <div className="trail-layer" id="trail-layer"></div>
      <header>
        <img src={logo} alt="Eixo Logo" className="logo" />
        <div className="lang-switcher">
          <button
            className={lang === 'en' ? 'active' : ''}
            onClick={() => setLang('en')}
          >
            EN
          </button>
          <button
            className={lang === 'pt' ? 'active' : ''}
            onClick={() => setLang('pt')}
          >
            PT
          </button>
        </div>

      </header>



      <main>
        <section className="hero" id="hero">
          <div className="hero-brand">
            <img src={icon} alt="Eixo Icon" className="hero-x" />
            <h1>
              <span className="line1">{t.subtitle1}</span>
              <span className="line2">{t.subtitle2}</span>
            </h1>
            <p>{t.description}</p>
          </div>
        </section>

        <section className="about" id="about">
          <h3>{t.aboutTitle}</h3>
          <p>{t.aboutText1}</p>
          <p>{t.aboutText2}</p>
          <p className="strong">{t.aboutText3}</p>
          <div className="cta">
            <a href="mailto:hello@eixo.design" className="cta-button">
              {t.cta}
            </a>
          </div>
        </section>

        <section className="methodology" id="methodology">
          <h3>{t.aboutPrinciplesTitle}</h3>
          <div className="methodology-content">
            <p className="methodology-intro">
              Our process brings structure to complexity and clarity to collaboration.
              Here’s how we work:
            </p>
            <ul className="principles-list">
              {t.aboutPrinciples.map((item, i) => (
                <li key={i}>{item.replace('→ ', '')}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="offerings" id="offerings">
          <h3>{t.offeringsLabel}</h3>
          <div className="offerings-grid">
            {offerings.map((item, i) => (
              <div className="offering-card">
                <img src={item.image} alt={`${item.title[lang]} icon`} className="offering-icon" />
                <h4>{item.title[lang]}</h4>
                <p className="offering-sub">{item.subtitle[lang]}</p>
                <ul>
                  {item.bullets[lang].map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              </div>
            
            ))}
          </div>
          <div className="cta">
            <a href="mailto:hello@eixo.design" className="cta-button">
              {t.cta}
            </a>
          </div>
        </section>

        <footer className="footer">
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
