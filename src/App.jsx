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
      aboutTitle: 'Who we are',
      aboutText1: 'Eixo is an independent UX design studio helping teams bring clarity, coherence, and purpose to digital products and services.',
      aboutText2: 'We design from the inside out — aligning systems, teams, and strategy before shaping flows, interfaces, and scale. Our work sits at the intersection of UX, product thinking, and design systems.',
      aboutText3: 'We cut through noise, surface what matters, and build structures that support it. Whether you’re creating something new or improving what exists, we bring the clarity to move forward.',
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
      aboutTitle: 'Quem somos',
      aboutText1: 'A Eixo é um estúdio independente de UX que ajuda times a trazer clareza, coerência e propósito para produtos e serviços digitais.',
      aboutText2: 'Projetamos de dentro para fora — alinhando sistemas, times e estratégia antes de moldar fluxos, interfaces e escala. Nosso trabalho vive na interseção entre UX, pensamento de produto e design de sistemas.',
      aboutText3: 'Cortamos o ruído, revelamos o que importa e estruturamos para que isso floresça. Seja para criar algo novo ou refinar o que já existe, trazemos clareza para avançar.',
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
    title: {
      en: 'Foundations',
      pt: 'Fundamentos'
    },
    subtitle: {
      en: 'Seeing clearly before building anything.',
      pt: 'Enxergar com clareza antes de construir qualquer coisa.'
    },
    bullets: {
      en: [
        'Product discovery',
        'Problem framing',
        'Research & synthesis',
        'Team alignment workshops'
      ],
      pt: [
        'Descoberta de produto',
        'Definição de problemas',
        'Pesquisa e síntese',
        'Workshops de alinhamento'
      ]
    }
  },
  {
    title: {
      en: 'Experiments',
      pt: 'Experimentos'
    },
    subtitle: {
      en: 'Shaping possibilities into purpose.',
      pt: 'Transformar possibilidades em propósito.'
    },
    bullets: {
      en: [
        'UX strategy',
        'Outcome definition',
        'Wireframes & validation',
        'Experience audits'
      ],
      pt: [
        'Estratégia de UX',
        'Definição de resultados',
        'Wireframes e validação',
        'Auditorias de experiência'
      ]
    }
  },
  {
    title: {
      en: 'Systems',
      pt: 'Sistemas'
    },
    subtitle: {
      en: 'Building the structures that make good design repeatable.',
      pt: 'Construir estruturas para tornar o bom design replicável.'
    },
    bullets: {
      en: [
        'Design systems',
        'Component libraries',
        'Consistency audits',
        'Scaling practices'
      ],
      pt: [
        'Design systems',
        'Bibliotecas de componentes',
        'Auditorias de consistência',
        'Práticas de escala'
      ]
    }
  }
];

function App() {
  const [lang, setLang] = useState('en');
  const t = content[lang];

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
          <button onClick={() => setLang('en')}>EN</button>
          <button onClick={() => setLang('pt')}>PT</button>
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
          <p>{t.aboutText3}</p>

          <div className="cta">
            <a href="mailto:hello@eixo.design" className="cta-button">
              {t.cta}
            </a>
          </div>
        </section>

        <section className="offerings" id="offerings">
          <h3>{t.offeringsLabel}</h3>
          <div className="offerings-grid">
            {offerings.map((item, i) => (
              <div key={i} className="offering-card">
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
