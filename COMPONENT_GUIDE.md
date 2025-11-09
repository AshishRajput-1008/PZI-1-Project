# Component Usage Guide

## Carousel Component

### Location
`/components/carousel.tsx`

### How to Use

The carousel component is fully functional and ready to use with just image replacement.

```tsx
import { Carousel } from '@/components/carousel';
import { carouselImages } from '@/lib/carousel-data';

// In your component
<Carousel images={carouselImages} autoPlay={true} interval={5000} />
```

### Carousel Data Structure

```ts
// File: /lib/carousel-data.ts
export interface CarouselImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
}

export const carouselImages: CarouselImage[] = [
  {
    id: '1',
    src: 'your-image-url.jpg',
    alt: 'Image description',
    title: 'Optional Title',
  },
  // Add more images
];
```

### Carousel Props

- **images** (CarouselImage[]): Array of images to display
- **autoPlay** (boolean, default: true): Enable automatic sliding
- **interval** (number, default: 5000): Time between slides in milliseconds

### Features

- ✅ Auto-play with configurable interval
- ✅ Manual navigation with previous/next buttons
- ✅ Dot indicators for slide selection
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Smooth fade transitions
- ✅ Accessible button labels

### To Replace Images

Simply update the `carouselImages` array in `/lib/carousel-data.ts` with your image URLs:

```ts
export const carouselImages: CarouselImage[] = [
  {
    id: '1',
    src: 'https://your-image-url-1.jpg',
    alt: 'Fresh Vegetables',
    title: 'Fresh Vegetables',
  },
  {
    id: '2',
    src: 'https://your-image-url-2.jpg',
    alt: 'Organic Produce',
    title: 'Organic Produce',
  },
  // Add more images as needed
];
```

---

## Minimal UI Components

### Overview

Production-optimized UI components located in `/components/ui-minimal/` with minimal dependencies and maximum performance.

### Available Components

#### 1. Button
**File:** `/components/ui-minimal/button.tsx`

```tsx
import { Button } from '@/components/ui-minimal';

// Variants: 'default' | 'outline' | 'ghost'
// Sizes: 'default' | 'sm' | 'lg' | 'icon'

<Button variant="default" size="lg">Click me</Button>
<Button variant="outline" size="sm">Outline</Button>
<Button variant="ghost">Ghost</Button>
```

#### 2. Input
**File:** `/components/ui-minimal/input.tsx`

```tsx
import { Input } from '@/components/ui-minimal';

<Input
  type="text"
  placeholder="Enter text..."
  className="custom-class"
/>
```

#### 3. Card
**File:** `/components/ui-minimal/card.tsx`

```tsx
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui-minimal';

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    Content goes here
  </CardContent>
  <CardFooter>
    Footer content
  </CardFooter>
</Card>
```

### Why Minimal UI Components?

- **Performance:** Lightweight, optimized for production
- **Simplicity:** Easy to customize and extend
- **Zero Configuration:** Works out of the box
- **Tailwind CSS:** Uses utility classes for styling
- **TypeScript:** Full type safety

### Customization

All components use Tailwind CSS with the `cn()` utility for className merging. Customize by:

1. Passing custom classes via `className` prop
2. Modifying the component files directly in `/components/ui-minimal/`
3. Using Tailwind CSS in your implementation

### Replacing Original UI Library

Original shadcn/ui components in `/components/ui/` can be gradually replaced with minimal versions from `/components/ui-minimal/` for better performance.

**Current Migration Status:**
- ✅ Button - Migrated
- ✅ Input - Migrated
- ✅ Card - Migrated
- ⏳ Other components - Available on demand

