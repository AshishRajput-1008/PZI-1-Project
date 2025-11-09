'use client';

import { Search, ShoppingCart, User, ChevronDown, ArrowRight, Menu, X, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { products, featuredProducts, bestsellerProducts } from '@/lib/mock-data';
import { Carousel } from '@/components/carousel';
import { carouselImages } from '@/lib/carousel-data';
import { ProductSection } from '@/components/product-section';
import { useCart } from '@/contexts/cart-context';
import { useWishlist } from '@/contexts/wishlist-context';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { getCartCount, getCartTotal, addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#3b4d9c] text-white text-center py-2 text-xs sm:text-sm w-full">
        Due to the COVID 19 epidemic, orders may be processed with a slight delay
      </div>

      <header className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hidden lg:flex items-center justify-between py-2 text-xs sm:text-sm gap-2">
            <div className="flex gap-3 sm:gap-6">
              <a href="#" className="text-gray-600 hover:text-gray-900">About Us</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">My account</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Wishlist</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Order Tracking</a>
            </div>
            <div className="flex items-center gap-2 sm:gap-6">
              <div className="flex items-center gap-2 text-gray-600">
                <span>🔒</span>
                <span className="hidden xl:inline">100% Secure delivery without contacting the courier</span>
              </div>
              <span className="text-gray-600 hidden md:inline">Need help? Call Us: <span className="text-[#00bcd4]">+0020 500</span></span>
              <select className="border-none bg-transparent text-gray-600 text-xs">
                <option>English</option>
              </select>
              <select className="border-none bg-transparent text-gray-600 text-xs">
                <option>USD</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between py-3 sm:py-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 sm:w-10 h-8 sm:h-10 bg-yellow-400 rounded-lg flex items-center justify-center flex-shrink-0">
                <ShoppingCart className="w-4 sm:w-6 h-4 sm:h-6 text-gray-800" />
              </div>
              <div>
                <span className="text-lg sm:text-2xl font-bold text-[#3b4d9c]">bacola</span>
                <p className="text-xs text-gray-500 hidden sm:block">Online Grocery Shopping Center</p>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-2 lg:gap-4 flex-1 max-w-2xl mx-4">
              <div className="relative w-32 lg:w-auto">
                <select className="border rounded px-2 sm:px-4 py-1 sm:py-2 pr-6 sm:pr-8 text-xs sm:text-sm w-full">
                  <option>Location</option>
                  <option>Select a Location</option>
                </select>
              </div>

              <form onSubmit={handleSearch} className="relative flex-1">
                <Input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pr-8 text-sm"
                />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2">
                  <Search className="w-4 h-4 text-gray-400" />
                </button>
              </form>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <User className="w-5 sm:w-6 h-5 sm:h-6 text-gray-600 hidden sm:block" />
              <div className="flex items-center gap-1 sm:gap-2">
                <span className="font-semibold text-sm hidden sm:inline">${getCartTotal().toFixed(2)}</span>
                <div className="relative cursor-pointer">
                  <ShoppingCart className="w-5 sm:w-6 h-5 sm:h-6 text-gray-600" />
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center text-[10px] sm:text-xs">
                    {getCartCount()}
                  </span>
                </div>
              </div>
              <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden pb-4 border-t">
              <div className="mt-4 space-y-2">
                <form onSubmit={handleSearch} className="relative flex-1">
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pr-8 text-sm"
                  />
                  <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2">
                    <Search className="w-4 h-4 text-gray-400" />
                  </button>
                </form>
                <a href="#" className="block text-gray-600 hover:text-gray-900 py-2">About Us</a>
                <a href="#" className="block text-gray-600 hover:text-gray-900 py-2">My account</a>
                <a href="#" className="block text-gray-600 hover:text-gray-900 py-2">Wishlist</a>
                <a href="#" className="block text-gray-600 hover:text-gray-900 py-2">Order Tracking</a>
              </div>
            </div>
          )}
        </div>
      </header>

      <nav className="border-b overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 sm:gap-4 lg:gap-8 py-3 sm:py-4 flex-nowrap">
            <Button className="bg-[#00bcd4] hover:bg-[#00acc1] text-white px-3 sm:px-8 py-4 sm:py-6 rounded-full text-xs sm:text-sm flex-shrink-0">
              ALL CATEGORIES
              <ChevronDown className="ml-1 sm:ml-2 w-3 sm:w-4 h-3 sm:h-4" />
            </Button>

            <div className="hidden lg:flex items-center gap-4 lg:gap-8">
              <Link href="/" className="flex items-center gap-1 text-gray-700 hover:text-[#00bcd4] whitespace-nowrap text-sm">
                HOME <ChevronDown className="w-4 h-4" />
              </Link>
              <Link href="/shop" className="flex items-center gap-1 text-gray-700 hover:text-[#00bcd4] whitespace-nowrap text-sm">
                SHOP <ChevronDown className="w-4 h-4" />
              </Link>
              <a href="#" className="flex items-center gap-1 text-gray-700 hover:text-[#00bcd4] whitespace-nowrap text-sm">
                🍖 MEATS & SEAFOOD
              </a>
              <a href="#" className="flex items-center gap-1 text-gray-700 hover:text-[#00bcd4] whitespace-nowrap text-sm">
                🥐 BAKERY
              </a>
              <a href="#" className="flex items-center gap-1 text-gray-700 hover:text-[#00bcd4] whitespace-nowrap text-sm">
                🥤 BEVERAGES
              </a>
              <a href="#" className="text-gray-700 hover:text-[#00bcd4] whitespace-nowrap text-sm">BLOG</a>
              <a href="#" className="text-gray-700 hover:text-[#00bcd4] whitespace-nowrap text-sm">CONTACT</a>
            </div>

            <div className="flex lg:hidden gap-2 ml-auto flex-nowrap">
              <Link href="/shop" className="text-gray-700 hover:text-[#00bcd4] text-xs whitespace-nowrap">SHOP</Link>
              <a href="#" className="text-gray-700 hover:text-[#00bcd4] text-xs whitespace-nowrap">BLOG</a>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        <div className="mb-8 sm:mb-12">
          <Carousel images={carouselImages} autoPlay={true} interval={5000} />
        </div>

        <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-16 mb-8 sm:mb-12 relative overflow-hidden min-h-72 sm:min-h-auto">
          <div className="relative z-10 max-w-xl">
            <div className="flex items-center gap-2 mb-2 sm:mb-4 flex-wrap">
              <span className="text-xs sm:text-sm font-semibold text-gray-600">EXCLUSIVE OFFER</span>
              <span className="bg-[#00bcd4] text-white text-xs px-2 sm:px-3 py-1 rounded-full">-20% OFF</span>
            </div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 sm:mb-4 leading-tight">
              Having the best<br className="hidden sm:inline" />quality products
            </h1>
            <p className="text-xs sm:text-base text-gray-600 mb-4 sm:mb-6">Only this week. Don&apos;t miss...</p>
            <div className="mb-4 sm:mb-6">
              <span className="text-gray-600 text-xs sm:text-sm">from </span>
              <span className="text-2xl sm:text-4xl font-bold text-[#e91e63]">$5.45</span>
            </div>
            <Button className="bg-[#00bcd4] hover:bg-[#00acc1] text-white px-4 sm:px-8 py-3 sm:py-6 rounded-full text-xs sm:text-sm">
              Shop Now <ArrowRight className="ml-1 sm:ml-2 w-3 sm:w-4 h-3 sm:h-4" />
            </Button>
            <div className="flex gap-2 mt-4 sm:mt-8">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <div className="w-2 h-2 bg-[#00bcd4] rounded-full"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            </div>
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 hidden sm:block">
            <div className="relative w-full h-full">
              <div className="absolute right-0 transform rotate-12">
                <div className="w-40 sm:w-64 h-56 sm:h-96 bg-white rounded-2xl shadow-2xl p-2 sm:p-4">
                  <div className="text-center">
                    <div className="text-3xl sm:text-6xl font-bold text-[#3b4d9c] mb-1 sm:mb-2">alpro</div>
                    <div className="text-lg sm:text-2xl font-semibold text-[#00bcd4]">COCONUT</div>
                    <div className="text-xs text-gray-500">for professional</div>
                  </div>
                </div>
              </div>
              <div className="absolute right-12 sm:right-20 top-12 sm:top-16 transform -rotate-6">
                <div className="w-40 sm:w-64 h-56 sm:h-96 bg-white rounded-2xl shadow-2xl p-2 sm:p-4">
                  <div className="text-center">
                    <div className="text-3xl sm:text-6xl font-bold text-[#3b4d9c] mb-1 sm:mb-2">alpro</div>
                    <div className="text-lg sm:text-2xl font-semibold text-[#ffa726]">ALMOND</div>
                    <div className="text-xs text-gray-500">for professionals</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-pink-50 to-orange-50 rounded-xl sm:rounded-2xl p-4 sm:p-8 mb-8 sm:mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex-1">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#00c853] mb-2">
              100% Secure delivery without contacting the courier
            </h2>
          </div>
          <div className="flex gap-2 sm:gap-4 items-center w-full sm:w-auto">
            <div className="flex gap-1 sm:gap-2">
              <div className="w-10 sm:w-16 h-10 sm:h-16 bg-white rounded-full flex-shrink-0"></div>
              <div className="w-10 sm:w-16 h-10 sm:h-16 bg-white rounded-full flex-shrink-0 hidden sm:block"></div>
              <div className="w-10 sm:w-16 h-10 sm:h-16 bg-white rounded-full flex-shrink-0 hidden md:block"></div>
              <div className="w-10 sm:w-16 h-10 sm:h-16 bg-white rounded-full flex-shrink-0 hidden lg:block"></div>
            </div>
            <Button className="bg-[#00c853] hover:bg-[#00b248] text-white px-4 sm:px-8 py-3 sm:py-6 rounded-full text-xs sm:text-sm flex-shrink-0">
              Shop Now
            </Button>
          </div>
        </div>

        <div className="mb-8 sm:mb-12">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
              Special Offers <span className="text-[#e91e63]">of the week!</span>
            </h2>
            <p className="text-xs sm:text-base text-gray-500">Ut placerat, magna quis porttitor vulputate, magna nunc auctor ante.</p>
          </div>

          <div className="flex justify-center gap-1 sm:gap-4 mb-6 sm:mb-8 flex-wrap">
            <div className="bg-[#e91e63] text-white rounded-lg p-2 sm:p-4 min-w-[60px] sm:min-w-[80px] text-center">
              <div className="text-xl sm:text-3xl font-bold">34</div>
              <div className="text-[10px] sm:text-xs">DAYS</div>
            </div>
            <div className="text-xl sm:text-3xl font-bold flex items-center">:</div>
            <div className="bg-[#e91e63] text-white rounded-lg p-2 sm:p-4 min-w-[60px] sm:min-w-[80px] text-center">
              <div className="text-xl sm:text-3xl font-bold">00</div>
              <div className="text-[10px] sm:text-xs">HOURS</div>
            </div>
            <div className="text-xl sm:text-3xl font-bold flex items-center">:</div>
            <div className="bg-[#e91e63] text-white rounded-lg p-2 sm:p-4 min-w-[60px] sm:min-w-[80px] text-center">
              <div className="text-xl sm:text-3xl font-bold">19</div>
              <div className="text-[10px] sm:text-xs">MINS</div>
            </div>
            <div className="hidden sm:flex text-xl sm:text-3xl font-bold items-center">:</div>
            <div className="hidden sm:block bg-[#e91e63] text-white rounded-lg p-2 sm:p-4 min-w-[60px] sm:min-w-[80px] text-center">
              <div className="text-xl sm:text-3xl font-bold">34</div>
              <div className="text-[10px] sm:text-xs">SECS</div>
            </div>
          </div>

          <div className="border-2 sm:border-4 border-[#e91e63] rounded-xl sm:rounded-2xl p-4 sm:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 sm:gap-6">
              {products.slice(0, 5).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                  onToggleWishlist={toggleWishlist}
                  isInWishlist={isInWishlist(product.id)}
                />
              ))}
            </div>
          </div>
        </div>

        <ProductSection
          title="FEATURED PRODUCTS"
          subtitle="Do not miss the current offers until the end of the month."
          products={featuredProducts}
          onViewAll={() => {}}
        />

        <ProductSection
          title="BESTSELLER PRODUCTS"
          subtitle="Our best-selling items that customers love the most."
          products={bestsellerProducts}
          onViewAll={() => {}}
        />
      </main>
    </div>
  );
}

function ProductCard({
  product,
  onAddToCart,
  onToggleWishlist,
  isInWishlist,
}: {
  product: any;
  onAddToCart: (product: any) => void;
  onToggleWishlist: (product: any) => void;
  isInWishlist: boolean;
}) {
  return (
    <div className="bg-white rounded-lg p-2 sm:p-4 relative group hover:shadow-lg transition-shadow">
      <div className="absolute top-1 sm:top-2 left-1 sm:left-2 z-10">
        <div className="bg-[#00bcd4] text-white text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
          {product.discount}
        </div>
      </div>
      {product.badge && (
        <div className={`absolute top-7 sm:top-12 left-1 sm:left-2 z-10 ${product.badgeColor} text-white text-[10px] sm:text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded`}>
          {product.badge}
        </div>
      )}

      <button
        onClick={() => onToggleWishlist(product)}
        className="absolute top-1 sm:top-2 right-1 sm:right-2 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50"
      >
        <Heart
          className={`w-3 h-3 sm:w-4 sm:h-4 ${isInWishlist ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
        />
      </button>

      <div className="aspect-square bg-gray-100 rounded-lg mb-2 sm:mb-4 flex items-center justify-center overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/3962286/pexels-photo-3962286.jpeg?auto=compress&cs=tinysrgb&w=400';
          }}
        />
      </div>

      <div className="space-y-1 sm:space-y-2">
        <div className="flex items-baseline gap-1 sm:gap-2">
          <span className="text-gray-400 line-through text-xs sm:text-sm">{product.originalPrice}</span>
          <span className="text-lg sm:text-2xl font-bold text-[#e91e63]">{product.price}</span>
        </div>

        <h3 className="text-xs sm:text-sm font-medium text-gray-900 line-clamp-2 min-h-[32px] sm:min-h-[40px]">
          {product.title}
        </h3>

        {product.weight && <p className="text-[10px] sm:text-xs text-gray-500">{product.weight}</p>}

        <div className="flex items-center gap-1 mb-1 sm:mb-2">
          <span className="text-[10px] sm:text-xs font-semibold text-[#00c853] bg-green-50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
            {product.stock}
          </span>
        </div>

        <div className="flex items-center gap-0.5 mb-1 sm:mb-2">
          {[...Array(5)].map((_, i) => (
            <span key={i} className={`text-yellow-400 text-xs sm:text-sm ${i < product.rating ? '' : 'opacity-30'}`}>★</span>
          ))}
          <span className="text-[10px] sm:text-xs text-gray-500 ml-1">{product.rating}</span>
        </div>

        <div className="relative">
          <div className="h-1.5 sm:h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
              style={{ width: '60%' }}
            ></div>
          </div>
        </div>

        <p className="text-[10px] sm:text-xs text-gray-500 mb-2">
          the available products: <span className="font-bold text-gray-900">{product.available}</span>
        </p>

        <button
          onClick={() => onAddToCart(product)}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-1.5 sm:py-2 rounded-full text-xs sm:text-sm transition-colors"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
