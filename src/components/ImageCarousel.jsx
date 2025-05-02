import { useState, useEffect, useRef } from 'react';

export default function ImageCarousel() {
  const images = [
    'https://lh3.googleusercontent.com/p/AF1QipNJbxVq9MYE5FRWBafaIPddKEMKt_xOp1-E3sKH=s1360-w1360-h1020-rw',
    'https://lh3.googleusercontent.com/p/AF1QipMA0HZWG4ShNLtgY0n5NeIAVoE9qV2iytyhVToj=s1360-w1360-h1020-rw',
    'https://lh3.googleusercontent.com/p/AF1QipMf-3wjH4edCefltOOvbuREXtv3IoxkyjWf3Bj0=s1360-w1360-h1020-rw',
    'https://lh3.googleusercontent.com/p/AF1QipMCpn-G0OF0EI-hML0yr0W6VNw-WKPt0rPpMHto=s1360-w1360-h1020-rw',
    'https://lh3.googleusercontent.com/p/AF1QipNZMNqNY7Jy3gqbgtmkom6C8wZKq1wQ4UiG1bUO=s1360-w1360-h1020-rw',
    'https://lh3.googleusercontent.com/p/AF1QipM8OSjGhBK0OH9CZmdqgnbUSjQG9GxgGUb7W1O0=s1360-w1360-h1020-rw',
    'https://lh3.googleusercontent.com/p/AF1QipNJfkBFjxfGVe1TaieFasTA7qavsItG3RV72LGt=s1360-w1360-h1020-rw',
    'https://lh3.googleusercontent.com/p/AF1QipPdUWOsUS6aHbdySaus0_xRwzYrsSw4O43XEzxP=s1360-w1360-h1020-rw',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Calculate the previous and next indices
  const prevIndex = (currentIndex - 1 + images.length) % images.length;
  const nextIndex = (currentIndex + 1) % images.length;

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  // Handle touch events for swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const difference = touchStartX.current - touchEndX.current;

    // If swipe distance is significant (more than 50px)
    if (Math.abs(difference) > 50) {
      if (difference > 0) {
        // Swipe left - go to next image
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      } else {
        // Swipe right - go to previous image
        setCurrentIndex(
          (prevIndex) => (prevIndex - 1 + images.length) % images.length
        );
      }
    }
  };

  return (
    <div
      className="w-4/5 mx-auto relative overflow-hidden py-12"
      ref={carouselRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <h2 className="text-2xl font-bold text-center mb-8">Our Products</h2>

      {/* Carousel container */}
      <div className="flex justify-center items-center relative h-96">
        {/* Previous image (blurred) */}
        <div className="absolute transform -translate-x-64 z-10">
          <img
            src={images[prevIndex]}
            alt="Previous slide"
            className="h-64 w-64 object-cover rounded-lg filter blur-sm opacity-60"
          />
        </div>

        {/* Current image (focused) */}
        <div className="z-20 transition-all duration-500 transform scale-110">
          <img
            src={images[currentIndex]}
            alt="Current slide"
            className="h-80 w-80 object-cover rounded-lg shadow-xl"
          />
        </div>

        {/* Next image (blurred) */}
        <div className="absolute transform translate-x-64 z-10">
          <img
            src={images[nextIndex]}
            alt="Next slide"
            className="h-64 w-64 object-cover rounded-lg filter blur-sm opacity-60"
          />
        </div>
      </div>

      {/* Indicators */}
      <div className="flex justify-center mt-6 gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
