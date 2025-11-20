import { useState, useRef } from 'react';
import './Testimonials.css';

const Testimonials = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      // Swiped left
      goToNext();
    }

    if (touchStartX.current - touchEndX.current < -50) {
      // Swiped right
      goToPrevious();
    }
  };

  return (
    <div className="testimonials-carousel">
      <div
        className="testimonials-track"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {testimonials.map((testimonial, index) => {
          // Split role by " | " to create individual tags
          const roleTags = testimonial.role ? testimonial.role.split(' | ') : [];
          const isActive = index === currentIndex;

          return (
            <article
              key={index}
              className={`testimonial-card ${isActive ? 'active' : ''}`}
              style={{
                transform: `translateX(${(index - currentIndex) * 100}%)`,
                opacity: isActive ? 1 : 0,
                pointerEvents: isActive ? 'auto' : 'none'
              }}
            >
              <blockquote className="testimonial-quote">
                "{testimonial.quote}"
              </blockquote>
              <footer className="testimonial-footer">
                <div className="testimonial-author">{testimonial.author}</div>
                <div className="testimonial-meta">
                  <span className="testimonial-company">{testimonial.company}</span>
                </div>
                {roleTags.length > 0 && (
                  <div className="testimonial-tags">
                    {roleTags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="testimonial-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </footer>
            </article>
          );
        })}
      </div>

      <div className="carousel-controls">
        <button
          className="carousel-button carousel-button-prev"
          onClick={goToPrevious}
          aria-label="Previous testimonial"
        >
          ←
        </button>

        <div className="carousel-dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        <button
          className="carousel-button carousel-button-next"
          onClick={goToNext}
          aria-label="Next testimonial"
        >
          →
        </button>
      </div>
    </div>
  );
};

export default Testimonials;
