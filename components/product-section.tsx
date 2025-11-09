'use client';

import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Product } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';

interface ProductSectionProps {
  title: string;
  subtitle: string;
  products: Product[];
  onViewAll?: () => void;
}

export function ProductSection({
  title,
  subtitle,
  products,
  onViewAll,
}: ProductSectionProps) {
  const [scrollPos, setScrollPos] = useState(0);

  const scroll = (direction: 'left' | 'right') => {
    const container = document.getElementById(`product-scroll-${title}`);
    if (container) {
      const scrollAmount = 320;
      const newPos = direction === 'left'
        ? scrollPos - scrollAmount
        : scrollPos + scrollAmount;
      container.scrollLeft = newPos;
      setScrollPos(newPos);
    }
  };

  return (
    <section className="mb-12 sm:mb-16 lg:mb-20">
      <div className="flex items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500">{subtitle}</p>
        </div>
        {onViewAll && (
          <button
            onClick={onViewAll}
            className="flex items-center gap-1 px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-600 border border-gray-300 rounded-full hover:border-gray-400 hover:text-gray-900 transition-colors whitespace-nowrap"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="relative group">
        <div
          id={`product-scroll-${title}`}
          className="flex gap-3 sm:gap-4 lg:gap-6 overflow-x-auto scrollbar-hide pb-4"
          style={{ scrollBehavior: 'smooth' }}
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-48 sm:w-56 lg:w-64"
            >
              <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-lg transition-shadow h-full flex flex-col">
                <div className="relative mb-3 sm:mb-4">
                  <div className="aspect-square bg-gray-100 rounded-lg mb-2 sm:mb-3 flex items-center justify-center overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/3962286/pexels-photo-3962286.jpeg?auto=compress&cs=tinysrgb&w=400';
                      }}
                    />
                  </div>
                  <div className="absolute top-2 left-2 z-10">
                    <span className="bg-[#00bcd4] text-white text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                      {product.discount}
                    </span>
                  </div>
                </div>

                <h3 className="text-xs sm:text-sm font-medium text-gray-900 line-clamp-2 mb-2 sm:mb-3 flex-grow">
                  {product.title}
                </h3>

                <div className="flex items-center gap-1 mb-1.5 sm:mb-2">
                  <span className="text-[10px] sm:text-xs font-semibold text-[#00c853] bg-green-50 px-1.5 sm:px-2 py-0.5 rounded">
                    {product.stock}
                  </span>
                </div>

                <div className="flex items-center gap-0.5 mb-2 sm:mb-3">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-yellow-400 text-xs sm:text-sm ${
                        i < product.rating ? '' : 'opacity-30'
                      }`}
                    >
                      ★
                    </span>
                  ))}
                  <span className="text-[10px] sm:text-xs text-gray-500 ml-1">
                    {product.ratingCount}
                  </span>
                </div>

                <div className="flex items-baseline gap-1.5 mb-3 sm:mb-4">
                  <span className="text-gray-400 line-through text-xs sm:text-sm">
                    {product.originalPrice}
                  </span>
                  <span className="text-lg sm:text-xl font-bold text-[#e91e63]">
                    {product.price}
                  </span>
                </div>

                <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 sm:py-2.5 rounded-full text-xs sm:text-sm transition-colors">
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/3 -translate-y-1/2 -translate-x-12 sm:-translate-x-16 z-10 bg-white hover:bg-gray-100 text-gray-600 p-2 rounded-full shadow-md transition-colors opacity-0 group-hover:opacity-100"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/3 -translate-y-1/2 translate-x-12 sm:translate-x-16 z-10 bg-white hover:bg-gray-100 text-gray-600 p-2 rounded-full shadow-md transition-colors opacity-0 group-hover:opacity-100"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>
    </section>
  );
}
