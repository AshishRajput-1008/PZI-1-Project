'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CarouselImage } from '@/lib/carousel-data';

interface CarouselProps {
  images: CarouselImage[];
  autoPlay?: boolean;
  interval?: number;
}

export function Carousel({ images, autoPlay = true, interval = 5000 }: CarouselProps) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [autoPlay, interval, images.length]);

  const next = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prev = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index: number) => {
    setCurrent(index);
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full bg-gray-100 rounded-lg overflow-hidden">
      <div className="relative aspect-video sm:aspect-[16/9] lg:aspect-[21/9]">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === current ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
            {image.title && (
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <h2 className="text-2xl sm:text-4xl font-bold text-white text-center">
                  {image.title}
                </h2>
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={prev}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-1.5 sm:p-2 rounded-full transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        onClick={next}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-1.5 sm:p-2 rounded-full transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full transition-all ${
              index === current ? 'bg-white w-6 sm:w-8' : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
