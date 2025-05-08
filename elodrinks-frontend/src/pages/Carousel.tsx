import { useState, useEffect } from 'react';

const imagesCarousel = [
  { src: '/elodrinks-frontend/src/images/empresa1.webp', alt: 'Logo da Empresa 1' },
  { src: '/elodrinks-frontend/src/images/empresa2.webp', alt: 'Logo da Empresa 2' },
  { src: '/elodrinks-frontend/src/images/empresa3.webp', alt: 'Logo da Empresa 3' },
  { src: '/elodrinks-frontend/src/images/empresa4.webp', alt: 'Logo da Empresa 4' },
  { src: '/elodrinks-frontend/src/images/empresa5.webp', alt: 'Logo da Empresa 5' },
  { src: '/elodrinks-frontend/src/images/empresa6.webp', alt: 'Logo da Empresa 6' },
  { src: '/elodrinks-frontend/src/images/empresa7.webp', alt: 'Logo da Empresa 7' },
  { src: '/elodrinks-frontend/src/images/empresa8.webp', alt: 'Logo da Empresa 8' },
  { src: '/elodrinks-frontend/src/images/empresa9.webp', alt: 'Logo da Empresa 9' },
  { src: '/elodrinks-frontend/src/images/empresa10.webp', alt: 'Logo da Empresa 10' }
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(getVisibleCount());

  // Função responsiva
  function getVisibleCount() {
    const width = window.innerWidth;
    if (width >= 1024) return 4;
    if (width >= 640) return 2;
    return 1;
  }

  // Atualiza ao redimensionar
  useEffect(() => {
    const handleResize = () => setVisibleCount(getVisibleCount());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const imageWidth = 150; // Ajuste conforme seu layout (img + margin)
  const maxIndex = imagesCarousel.length - visibleCount;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex));
  };

  return (
    <div className='carousel1'>
      <div className='prev' onClick={prevSlide}>
        <svg width='60' height='60' viewBox='0 0 60 60' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M30 5.625C25.1791 5.625 20.4664 7.05457 16.458 9.73293C12.4495 12.4113 9.32532 16.2181 7.48043 20.6721C5.63555 25.126 5.15284 30.027 6.09335 34.7553C7.03387 39.4836 9.35536 43.8268 12.7643 47.2357C16.1732 50.6446 20.5164 52.9661 25.2447 53.9066C29.973 54.8472 34.874 54.3644 39.3279 52.5196C43.7819 50.6747 47.5887 47.5505 50.2671 43.542C52.9454 39.5336 54.375 34.8209 54.375 30C54.3682 23.5374 51.7979 17.3415 47.2282 12.7718C42.6585 8.20209 36.4626 5.63182 30 5.625ZM30 50.625C25.9208 50.625 21.9331 49.4154 18.5414 47.1491C15.1496 44.8828 12.506 41.6616 10.945 37.8928C9.38392 34.1241 8.97548 29.9771 9.7713 25.9763C10.5671 21.9754 12.5315 18.3004 15.4159 15.4159C18.3004 12.5315 21.9754 10.5671 25.9763 9.7713C29.9771 8.97548 34.1241 9.38393 37.8928 10.945C41.6616 12.506 44.8828 15.1496 47.1491 18.5414C49.4154 21.9331 50.625 25.9208 50.625 30C50.6188 35.4682 48.4438 40.7106 44.5772 44.5772C40.7106 48.4438 35.4682 50.6188 30 50.625ZM35.0766 21.9516L27.0258 30L35.0766 38.0484C35.2508 38.2226 35.389 38.4295 35.4832 38.6571C35.5775 38.8847 35.626 39.1286 35.626 39.375C35.626 39.6214 35.5775 39.8653 35.4832 40.0929C35.389 40.3205 35.2508 40.5274 35.0766 40.7016C34.9024 40.8758 34.6955 41.014 34.4679 41.1082C34.2403 41.2025 33.9964 41.251 33.75 41.251C33.5036 41.251 33.2597 41.2025 33.0321 41.1082C32.8045 41.014 32.5976 40.8758 32.4234 40.7016L23.0484 31.3266C22.8741 31.1524 22.7358 30.9456 22.6414 30.718C22.5471 30.4904 22.4985 30.2464 22.4985 30C22.4985 29.7536 22.5471 29.5096 22.6414 29.282C22.7358 29.0544 22.8741 28.8476 23.0484 28.6734L32.4234 19.2984C32.5976 19.1242 32.8045 18.986 33.0321 18.8918C33.2597 18.7975 33.5036 18.749 33.75 18.749C33.9964 18.749 34.2403 18.7975 34.4679 18.8918C34.6955 18.986 34.9024 19.1242 35.0766 19.2984C35.2508 19.4726 35.389 19.6795 35.4832 19.9071C35.5775 20.1347 35.626 20.3786 35.626 20.625C35.626 20.8714 35.5775 21.1153 35.4832 21.3429C35.389 21.5705 35.2508 21.7774 35.0766 21.9516Z'
            fill='currentColor'
          />
        </svg>
      </div>

      <div className='carousel-window' style={{ overflow: 'hidden', width: `${visibleCount * imageWidth + 100}px` }}>
        <div
          className='carousel-track'
          style={{
            display: 'flex',
            gap: '30px',
            transform: `translateX(-${currentIndex * (imageWidth + 30)}px)`,
            transition: 'transform 0.3s ease'
          }}
        >
          {imagesCarousel.map((item, index) => (
            <img key={index} src={item.src} alt={item.alt} className='carousel-img' style={{ width: `${imageWidth}px`, flexShrink: 0 }} />
          ))}
        </div>
      </div>

      <div className='next' onClick={nextSlide}>
        <svg width='60' height='60' viewBox='0 0 60 60' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path
            d='M30 5.625C25.1791 5.625 20.4664 7.05457 16.458 9.73293C12.4495 12.4113 9.32533 16.2181 7.48045 20.6721C5.63556 25.126 5.15285 30.027 6.09337 34.7553C7.03388 39.4836 9.35538 43.8268 12.7643 47.2357C16.1732 50.6446 20.5164 52.9661 25.2447 53.9066C29.973 54.8472 34.874 54.3644 39.3279 52.5196C43.7819 50.6747 47.5887 47.5505 50.2671 43.542C52.9454 39.5336 54.375 34.8209 54.375 30C54.3682 23.5374 51.7979 17.3415 47.2282 12.7718C42.6585 8.20209 36.4626 5.63182 30 5.625ZM30 50.625C25.9208 50.625 21.9331 49.4154 18.5414 47.1491C15.1496 44.8828 12.5061 41.6616 10.945 37.8928C9.38394 34.1241 8.97549 29.9771 9.77131 25.9763C10.5671 21.9754 12.5315 18.3004 15.4159 15.4159C18.3004 12.5315 21.9754 10.5671 25.9763 9.7713C29.9771 8.97548 34.1241 9.38393 37.8929 10.945C41.6616 12.506 44.8828 15.1496 47.1491 18.5414C49.4154 21.9331 50.625 25.9208 50.625 30C50.6188 35.4682 48.4438 40.7106 44.5772 44.5772C40.7106 48.4438 35.4682 50.6188 30 50.625ZM36.9516 28.6734C37.1259 28.8476 37.2642 29.0544 37.3586 29.282C37.4529 29.5096 37.5015 29.7536 37.5015 30C37.5015 30.2464 37.4529 30.4904 37.3586 30.718C37.2642 30.9456 37.1259 31.1524 36.9516 31.3266L27.5766 40.7016C27.4024 40.8758 27.1956 41.014 26.9679 41.1082C26.7403 41.2025 26.4964 41.251 26.25 41.251C26.0036 41.251 25.7597 41.2025 25.5321 41.1082C25.3045 41.014 25.0977 40.8758 24.9234 40.7016C24.7492 40.5274 24.6111 40.3205 24.5168 40.0929C24.4225 39.8653 24.374 39.6214 24.374 39.375C24.374 39.1286 24.4225 38.8847 24.5168 38.6571C24.6111 38.4295 24.7492 38.2226 24.9234 38.0484L32.9742 30L24.9234 21.9516C24.5716 21.5997 24.374 21.1226 24.374 20.625C24.374 20.1274 24.5716 19.6503 24.9234 19.2984C25.2753 18.9466 25.7525 18.749 26.25 18.749C26.7476 18.749 27.2247 18.9466 27.5766 19.2984L36.9516 28.6734Z'
            fill='currentColor'
          />
        </svg>
      </div>
    </div>
  );
};

export default Carousel;
