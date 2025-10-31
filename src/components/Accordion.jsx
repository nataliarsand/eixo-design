import React, { useState } from 'react';
import './Accordion.css';

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

const Accordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="accordion">
      {items.map((item, i) => (
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
  );
};

export default Accordion;
