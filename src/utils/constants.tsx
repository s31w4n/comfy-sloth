import React, { ReactNode } from 'react';
import { GiCompass, GiDiamondHard, GiStabbedNote } from 'react-icons/gi';

interface Links {
  id: number;
  text: string;
  url: string;
}

export const links: Links[] = [
  {
    id: 1,
    text: 'home',
    url: '/',
  },
  {
    id: 2,
    text: 'about',
    url: '/about',
  },
  {
    id: 3,
    text: 'products',
    url: '/products',
  },
];

interface Services {
  id: number;
  icon: ReactNode;
  title: string;
  text: string;
}

export const services: Services[] = [
  {
    id: 1,
    icon: <GiCompass />,
    title: 'mission',
    text: 'Our mission is to provide exceptional comfort and style through a wide range of high-quality furniture and home decor.',
  },
  {
    id: 2,
    icon: <GiDiamondHard />,
    title: 'vision',
    text: 'To be the leading provider of comfortable and stylish furniture, setting trends in design and customer satisfaction.',
  },
  {
    id: 3,
    icon: <GiStabbedNote />,
    title: 'history',
    text: 'Established in 1995, Comfy Sloth started as a small family business, growing steadily to become a renowned furniture brand. ',
  },
];

export const products_url: string =
  'https://course-api.com/react-store-products';

export const single_product_url: string = `https://course-api.com/react-store-single-product?id=`;
