import { useState, useRef, useEffect } from 'react';

export function MovieBanner({ movies }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideTimerRef = useRef(null);

  const startSlide = () => {
    if (slideTimerRef.current) return;
    slideTimerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (movies.length > 0 ? (prev + 1) % movies.length : 0));
    }, 3000);
  };

  const stopSlide = () => {
    if (slideTimerRef.current) {
      clearInterval(slideTimerRef.current);
      slideTimerRef.current = null;
    }
  };

  useEffect(() => {
    if (movies.length > 0) {
      startSlide();
    }
    return () => stopSlide();
  }, [movies]);
  if (!movies || movies.length === 0 || !movies[currentIndex]) {
    return null;
  }

  const currentMovie = movies[currentIndex];

  return (
    <div
      onMouseEnter={stopSlide}
      onMouseLeave={startSlide}
      style={{
        margin: '20px 0',
        padding: '20px',
        background: '#1a1a1a',
        color: '#fff',
        borderRadius: '8px',
        border: '2px solid #e50914',
        cursor: 'pointer'
      }}
    >
      <span style={{ background: '#e50914', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>
        PHIM NỔI BẬT ({currentIndex + 1}/{movies.length})
      </span>
      <h2 style={{ margin: '10px 0' }}>{currentMovie.name}</h2>
      <p style={{ color: '#aaa' }}>
        Tên gốc: {currentMovie.origin_name} | Năm: {currentMovie.year}
      </p>
    </div>
  );
}
