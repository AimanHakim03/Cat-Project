import { Cat } from '../types';

const CAT_COUNT = 15;

export const generateCats = (): Cat[] => {
  return Array.from({ length: CAT_COUNT }, (_, index) => ({
    id: `cat-${index}`,
    imageUrl: `https://cataas.com/cat?${index}&width=500&height=600`,
  }));
};
