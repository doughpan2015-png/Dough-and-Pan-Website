// Static product data has been replaced by Supabase.
// This file is kept only to supply the Category type and categories list
// used by the category filter UI in MenuPage.

export type Category =
  | "All"
  | "Cakes"
  | "Pastries"
  | "Breads"
  | "Cookies"
  | "Beverages"
  | "Desserts"
  | "Hampers"

export const categories: Category[] = [
  "All",
  "Cakes",
  "Pastries",
  "Breads",
  "Cookies",
  "Beverages",
  "Desserts",
  "Hampers"
];