import React, { useState, useCallback, useRef } from 'react';
import './FlipCard.css';

const FlipCard = ({ frontContent, backContent, isMobile = false }) => {
  const [showBack, setShowBack] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const lastTap = useRef(0);

  const handleToggle = useCallback(() => {
    setShowBack((prev) => !prev);
  }, []);

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
      handleToggle();
    }
    setTouchStart(null);
    setTouchEnd(null);
  }, [touchStart, touchEnd, handleToggle]);

  const handleDoubleTap = useCallback((e) => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;

    if (now - lastTap.current < DOUBLE_TAP_DELAY) {
      e.preventDefault();
      handleToggle();
    }

    lastTap.current = now;
    setTouchStart(null);
    setTouchEnd(null);
  }, [handleToggle]);

  const cardClassNames = [
    'flip-card',
    showBack ? 'show-back' : 'show-front',
    isMobile ? 'is-mobile' : ''
  ].filter(Boolean).join(' ');

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleToggle();
    }
  }, [handleToggle]);

  return (
    <div
      className={cardClassNames}
      role="button"
      tabIndex={0}
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      onTouchStart={isMobile ? handleTouchStart : undefined}
      onTouchMove={isMobile ? handleTouchMove : undefined}
      onTouchEnd={isMobile ? handleTouchEnd : undefined}
      onTouchCancel={isMobile ? handleDoubleTap : undefined}
    >
      <div className={`flip-card-inner ${showBack ? 'flipped' : ''}`}>
        <div className="flip-card-front">
          {frontContent}
        </div>
        <div className="flip-card-back">
          {backContent}
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
