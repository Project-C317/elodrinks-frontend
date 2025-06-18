import { useState, useEffect } from "react";

const imagesCarousel = [
  { src: "/images/logo-1.png", alt: "Logo da Empresa 1" },
  { src: "/images/logo-2.png", alt: "Logo da Empresa 2" },
  { src: "/images/logo-3.png", alt: "Logo da Empresa 3" },
  { src: "/images/logo-4.png", alt: "Logo da Empresa 4" },
  { src: "/images/logo-5.png", alt: "Logo da Empresa 5" },
  { src: "/images/logo-6.png", alt: "Logo da Empresa 6" },
  { src: "/images/logo-7.png", alt: "Logo da Empresa 7" },
  { src: "/images/logo-8.png", alt: "Logo da Empresa 8" },
  { src: "/images/logo-9.png", alt: "Logo da Empresa 9" },
  { src: "/images/logo-10.png", alt: "Logo da Empresa 10" },
  { src: "/images/logo-11.png", alt: "Logo da Empresa 11" },
  { src: "/images/logo-12.png", alt: "Logo da Empresa 12" },
  { src: "/images/logo-13.png", alt: "Logo da Empresa 13" },
  { src: "/images/logo-14.png", alt: "Logo da Empresa 14" },
  { src: "/images/logo-15.png", alt: "Logo da Empresa 15" },
  { src: "/images/logo-16.png", alt: "Logo da Empresa 16" },
  { src: "/images/logo-17.png", alt: "Logo da Empresa 17" },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCount = 6;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev < imagesCarousel.length - visibleCount ? prev + 1 : 0
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const imageWidth = 150;
  const gap = 30;

  return (
    <div className="carousel1">
      <div
        className="carousel-window"
        style={{
          overflow: "hidden",
          width: `${visibleCount * imageWidth + (visibleCount - 1) * gap}px`,
        }}
      >
        <div
          className="carousel-track"
          style={{
            display: "flex",
            gap: `${gap}px`,
            transform: `translateX(-${currentIndex * (imageWidth + gap)}px)`,
            transition: "transform 0.3s ease",
          }}
        >
          {imagesCarousel.map((item, index) => (
            <img
              key={index}
              src={item.src}
              alt={item.alt}
              className="carousel-img"
              style={{ width: `${imageWidth}px`, flexShrink: 0 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
