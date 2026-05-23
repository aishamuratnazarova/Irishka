export type CategoryName = 'Шмот' | 'Чилл' | 'Другое';

export interface Product {
  id: string;
  title: string;
  description: string;
  url: string;
  image: string;
  category: CategoryName;
  badge?: string;
  priceTag?: string; // e.g. "Доступно по кнопке" or some placeholder visual representation
}

export interface WishlistState {
  favorites: string[]; // List of product IDs marked as favorite
}
