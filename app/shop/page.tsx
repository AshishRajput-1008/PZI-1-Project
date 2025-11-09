'use client';

import { useState, useMemo } from 'react';
import { Search, ShoppingCart, User, ChevronDown, X, Heart, Menu, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { allProducts, Product } from '@/lib/mock-data';
import { useCart } from '@/contexts/cart-context';
import { useWishlist } from '@/contexts/wishlist-context';
import Link from 'next/link';

export default function ShopPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 50 });
  const [productStatus, setProductStatus] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('latest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [itemsPerPage, setItemsPerPage] = useState(12);

  const { addToCart, getCartCount, getCartTotal } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const categories = Array.from(new Set(allProducts.map(p => p.category).filter(Boolean))) as string[];
  const brands = Array.from(new Set(allProducts.map(p => p.brand).filter(Boolean))) as string[];

  const filteredProducts = useMemo(() => {
    let filtered = allProducts;

    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter(p => selectedCategories.includes(p.category || ''));
    }

    if (selectedBrands.length > 0) {
      filtered = filtered.filter(p => selectedBrands.includes(p.brand || ''));
    }

    filtered = filtered.filter(p => {
      const price = parseFloat(p.price.replace('$', ''));
      return price >= priceRange.min && price <= priceRange.max;
    });

    if (productStatus.includes('in_stock')) {
      filtered = filtered.filter(p => p.stock === 'IN STOCK');
    }

    if (productStatus.includes('on_sale')) {
      filtered = filtered.filter(p => p.stock === 'ON SALE');
    }

    switch (sortBy) {
      case 'price_low':
        filtered.sort((a, b) => parseFloat(a.price.replace('$', '')) - parseFloat(b.price.replace('$', '')));
        break;
      case 'price_high':
        filtered.sort((a, b) => parseFloat(b.price.replace('$', '')) - parseFloat(a.price.replace('$', '')));
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return filtered;
  }, [searchQuery, selectedCategories, selectedBrands, priceRange, productStatus, sortBy]);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const toggleStatus = (status: string) => {
    setProductStatus(prev =>
      prev.includes(status) ? prev.filter(s => s !== status) : [...prev, status]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange({ min: 0, max: 50 });
    setProductStatus([]);
  };

  const hasActiveFilters = selectedCategories.length > 0 || selectedBrands.length > 0 || productStatus.length > 0;

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

              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pr-8 text-sm"
                />
                <Search className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <User className="w-5 sm:w-6 h-5 sm:h-6 text-gray-600 hidden sm:block" />
              <div className="flex items-center gap-1 sm:gap-2">
                <span className="font-semibold text-sm hidden sm:inline">${getCartTotal().toFixed(2)}</span>
                <div className="relative">
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
                <div className="relative flex-1">
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pr-8 text-sm"
                  />
                  <Search className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
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
              <Link href="/shop" className="flex items-center gap-1 text-[#00bcd4] font-semibold whitespace-nowrap text-sm">
                SHOP <ChevronDown className="w-4 h-4" />
              </Link>
              <a href="#" className="flex items-center gap-1 text-gray-700 hover:text-[#00bcd4] whitespace-nowrap text-sm">
                MEATS & SEAFOOD
              </a>
              <a href="#" className="flex items-center gap-1 text-gray-700 hover:text-[#00bcd4] whitespace-nowrap text-sm">
                BAKERY
              </a>
              <a href="#" className="flex items-center gap-1 text-gray-700 hover:text-[#00bcd4] whitespace-nowrap text-sm">
                BEVERAGES
              </a>
              <a href="#" className="text-gray-700 hover:text-[#00bcd4] whitespace-nowrap text-sm">BLOG</a>
              <a href="#" className="text-gray-700 hover:text-[#00bcd4] whitespace-nowrap text-sm">CONTACT</a>
            </div>

            <div className="flex lg:hidden gap-2 ml-auto flex-nowrap">
              <Link href="/" className="text-gray-700 hover:text-[#00bcd4] text-xs whitespace-nowrap">HOME</Link>
              <Link href="/shop" className="text-[#00bcd4] font-semibold text-xs whitespace-nowrap">SHOP</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="bg-gray-50 py-3 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-[#00bcd4]">HOME</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">SHOP</span>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="bg-white border rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-sm">PRODUCT CATEGORIES</h3>
              </div>

              <div className="space-y-2">
                {categories.map((category) => (
                  <label key={category} className="flex items-center gap-2 cursor-pointer hover:text-[#00bcd4]">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => toggleCategory(category)}
                      className="w-4 h-4 text-[#00bcd4] border-gray-300 rounded focus:ring-[#00bcd4]"
                    />
                    <span className="text-sm">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-white border rounded-lg p-4 mb-4">
              <h3 className="font-bold text-sm mb-4">FILTER BY PRICE</h3>

              <div className="mb-4">
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) })}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between text-sm mb-3">
                <span className="text-gray-600">Price: ${priceRange.min} - ${priceRange.max}</span>
              </div>

              <Button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 text-xs py-2 rounded">
                FILTER
              </Button>
            </div>

            <div className="bg-white border rounded-lg p-4 mb-4">
              <h3 className="font-bold text-sm mb-4">PRODUCT STATUS</h3>

              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer hover:text-[#00bcd4]">
                  <input
                    type="checkbox"
                    checked={productStatus.includes('in_stock')}
                    onChange={() => toggleStatus('in_stock')}
                    className="w-4 h-4 text-[#00bcd4] border-gray-300 rounded focus:ring-[#00bcd4]"
                  />
                  <span className="text-sm">In Stock</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer hover:text-[#00bcd4]">
                  <input
                    type="checkbox"
                    checked={productStatus.includes('on_sale')}
                    onChange={() => toggleStatus('on_sale')}
                    className="w-4 h-4 text-[#00bcd4] border-gray-300 rounded focus:ring-[#00bcd4]"
                  />
                  <span className="text-sm">On Sale</span>
                </label>
              </div>
            </div>

            <div className="bg-white border rounded-lg p-4">
              <h3 className="font-bold text-sm mb-4">BRANDS</h3>

              <div className="space-y-2">
                {brands.slice(0, 5).map((brand) => (
                  <label key={brand} className="flex items-center gap-2 cursor-pointer hover:text-[#00bcd4]">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => toggleBrand(brand)}
                      className="w-4 h-4 text-[#00bcd4] border-gray-300 rounded focus:ring-[#00bcd4]"
                    />
                    <span className="text-sm">{brand}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Organic Meals Prepared</h2>
                <p className="text-sm text-gray-600 mb-3">Delivered to <span className="text-[#00c853] font-semibold">your Home</span></p>
                <p className="text-xs text-gray-500">Only this week, Don&apos;t miss 4 delivered materials</p>
              </div>
              <div className="hidden md:block w-48 h-32 bg-white rounded-lg shadow-md"></div>
            </div>

            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <div className="flex items-center gap-4 flex-wrap">
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 rounded"
                  >
                    <X className="w-4 h-4" />
                    Clear Filters
                  </button>
                )}
                {selectedCategories.includes('Frozen Foods') && (
                  <span className="px-3 py-1.5 text-sm bg-blue-100 text-blue-800 rounded flex items-center gap-2">
                    Frozen Foods
                    <button onClick={() => toggleCategory('Frozen Foods')}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {selectedCategories.includes('Meats & Seafood') && (
                  <span className="px-3 py-1.5 text-sm bg-blue-100 text-blue-800 rounded flex items-center gap-2">
                    Meats & Seafood
                    <button onClick={() => toggleCategory('Meats & Seafood')}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 border rounded">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100' : ''}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-gray-100' : ''}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border rounded px-3 py-2 text-sm"
                >
                  <option value="latest">Sort by latest</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                  <option value="rating">Rating</option>
                </select>

                <select
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
                  className="border rounded px-3 py-2 text-sm"
                >
                  <option value="12">Show 12</option>
                  <option value="24">Show 24</option>
                  <option value="48">Show 48</option>
                </select>
              </div>
            </div>

            <div className={`grid ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'} gap-4 mb-8`}>
              {filteredProducts.slice(0, itemsPerPage).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                  onToggleWishlist={toggleWishlist}
                  isInWishlist={isInWishlist(product.id)}
                  viewMode={viewMode}
                />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

function ProductCard({
  product,
  onAddToCart,
  onToggleWishlist,
  isInWishlist,
  viewMode,
}: {
  product: Product;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isInWishlist: boolean;
  viewMode: 'grid' | 'list';
}) {
  return (
    <div className={`bg-white border rounded-lg p-4 hover:shadow-lg transition-shadow relative ${viewMode === 'list' ? 'flex gap-4' : ''}`}>
      {product.badge && (
        <div className="absolute top-2 left-2 z-10">
          <span className={`${product.badgeColor || 'bg-[#00bcd4]'} text-white text-xs font-bold px-2 py-1 rounded`}>
            {product.badge}
          </span>
        </div>
      )}

      {product.discount && (
        <div className="absolute top-2 right-2 z-10">
          <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {product.discount}
          </span>
        </div>
      )}

      <button
        onClick={() => onToggleWishlist(product)}
        className="absolute top-10 right-2 z-10 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50"
      >
        <Heart
          className={`w-4 h-4 ${isInWishlist ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
        />
      </button>

      <div className={viewMode === 'list' ? 'w-32 flex-shrink-0' : ''}>
        <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/3962286/pexels-photo-3962286.jpeg?auto=compress&cs=tinysrgb&w=400';
            }}
          />
        </div>
      </div>

      <div className="flex-1">
        {product.brand && (
          <p className="text-xs text-[#00bcd4] font-semibold mb-1">{product.brand}</p>
        )}

        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2">{product.title}</h3>

        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className={`text-yellow-400 text-sm ${i < product.rating ? '' : 'opacity-30'}`}
            >
              ★
            </span>
          ))}
          <span className="text-xs text-gray-500 ml-1">({product.ratingCount})</span>
        </div>

        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-gray-400 line-through text-sm">{product.originalPrice}</span>
          <span className="text-xl font-bold text-[#e91e63]">{product.price}</span>
        </div>

        <button
          onClick={() => onAddToCart(product)}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 rounded-full text-sm transition-colors"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
