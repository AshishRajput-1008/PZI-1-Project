export interface CarouselImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
}

export const carouselImages: CarouselImage[] = [
  {
    id: '1',
    src: 'https://images.pexels.com/photos/3642665/pexels-photo-3642665.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Fresh Vegetables',
    title: 'Fresh Vegetables',
  },
  {
    id: '2',
    src: 'https://images.pexels.com/photos/3962286/pexels-photo-3962286.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Organic Produce',
    title: 'Organic Produce',
  },
  {
    id: '3',
    src: 'https://images.pexels.com/photos/3906857/pexels-photo-3906857.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Fresh Fruits',
    title: 'Fresh Fruits',
  },
  {
    id: '4',
    src: 'https://images.pexels.com/photos/3962286/pexels-photo-3962286.jpeg?auto=compress&cs=tinysrgb&w=800',
    alt: 'Grocery Store',
    title: 'Quality Products',
  },
];
