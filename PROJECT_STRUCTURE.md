# Project Structure - Production Ready

## Overview
This is a fully responsive e-commerce grocery shopping application built with Next.js, React, and Tailwind CSS. The project is optimized for production with a clean, minimal file structure.

## Directory Structure

```
project/
├── app/
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Home page (main entry point)
│
├── components/
│   ├── carousel.tsx          # Image carousel component
│   ├── product-section.tsx   # Product grid section component
│   ├── ui/                   # Essential UI components (Button, Input, Card)
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   └── card.tsx
│   └── ui-minimal/           # Lightweight alternative UI components
│       ├── button.tsx
│       ├── input.tsx
│       └── card.tsx
│
├── lib/
│   ├── carousel-data.ts      # Carousel images configuration
│   ├── mock-data.ts          # Product mock data (Featured & Bestseller)
│   └── utils.ts              # Utility functions
│
├── public/                   # Static assets
├── package.json              # Dependencies
├── tsconfig.json             # TypeScript config
├── tailwind.config.ts        # Tailwind CSS config
└── next.config.js            # Next.js config
```

## Key Features

### 1. Responsive Carousel
- **Location:** `components/carousel.tsx`
- **Data Source:** `lib/carousel-data.ts`
- Auto-play with configurable intervals
- Manual navigation controls
- Dot indicators for slide selection
- Fully responsive design

### 2. Product Sections
- **Component:** `components/product-section.tsx`
- Two main sections:
  - Featured Products
  - Bestseller Products
- Horizontal scroll with navigation arrows
- Responsive grid layout
- View All button support

### 3. Mock Data
- **Featured Products:** 5 products with real Pexels images
- **Bestseller Products:** 6 products with real Pexels images
- **Temporary Products:** 5 products for carousel section
- Easy to replace with API data

### 4. UI Components
Located in both `components/ui/` and `components/ui-minimal/`:
- **Button:** Multiple variants and sizes
- **Input:** Form input with styling
- **Card:** Container with header, title, description, content, and footer

### 5. Responsive Design
- Mobile: 320px - 640px
- Tablet: 640px - 1024px
- Desktop: 1024px+
- All components fully responsive

## Data Files

### `/lib/carousel-data.ts`
```typescript
export interface CarouselImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
}
```

### `/lib/mock-data.ts`
```typescript
export interface Product {
  id: string;
  title: string;
  price: string;
  originalPrice: string;
  discount: string;
  image: string;
  badge?: string;
  badgeColor?: string;
  stock: string;
  rating: number;
  ratingCount: number;
  available: number;
  weight?: string;
}

// Exports:
export const featuredProducts: Product[]
export const bestsellerProducts: Product[]
export const products: Product[]
```

## Component Usage

### Carousel
```tsx
import { Carousel } from '@/components/carousel';
import { carouselImages } from '@/lib/carousel-data';

<Carousel
  images={carouselImages}
  autoPlay={true}
  interval={5000}
/>
```

### Product Section
```tsx
import { ProductSection } from '@/components/product-section';
import { featuredProducts } from '@/lib/mock-data';

<ProductSection
  title="FEATURED PRODUCTS"
  subtitle="Do not miss the current offers until the end of the month."
  products={featuredProducts}
  onViewAll={() => {}}
/>
```

### UI Components
```tsx
import { Button, Input, Card, CardHeader, CardTitle } from '@/components/ui';

<Button variant="default" size="lg">Click me</Button>
<Input type="email" placeholder="Enter email" />
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
</Card>
```

## Production Optimizations

✅ Minimal component library
✅ Real product images from Pexels
✅ Responsive design across all devices
✅ Type-safe with TypeScript
✅ Optimized bundle size (~15.4 kB for home page)
✅ Fast Load JS (~94.7 kB total)
✅ Clean separation of concerns
✅ Easy to extend and maintain

## Building & Running

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm start

# TypeScript check
npm run typecheck

# Linting
npm run lint
```

## Next Steps

1. **Replace Mock Images:** Update `lib/carousel-data.ts` and `lib/mock-data.ts` with real product images
2. **Connect to Backend:** Replace mock data with API calls
3. **Add More Sections:** Use `ProductSection` component to add more product categories
4. **Database Integration:** Connect to Supabase or your database
5. **Authentication:** Add user login/registration
6. **Shopping Cart:** Implement cart functionality
7. **Checkout:** Add payment integration

## File Cleanup
Removed unnecessary components:
- 40+ unused shadcn/ui components
- Unused hook files
- Template files

This keeps the project lightweight and production-ready!
