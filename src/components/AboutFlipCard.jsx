import { useState, useEffect } from 'react';
import FlipCard from './FlipCard';
import { content } from '../content';

export default function AboutFlipCard({ lang = 'en' }) {
  const t = content[lang];
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsMobile(
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
        window.innerWidth <= 768
      );
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
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
  );
}
