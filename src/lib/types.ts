export type Category =
  | "All"
  | "Cakes"
  | "Pastries"
  | "Breads"
  | "Cookies"
  | "Beverages"
  | "Desserts";

// Matches the Supabase DB schema exactly
export interface DBProduct {
  id: string;
  name: string;
  category: string;
  description: string | null;
  price: number;
  image_url: string | null;
  is_in_stock: boolean;
  is_visible: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
}

// Camel-case shape used by all UI components and CartContext
export interface Product {
  id: string;
  name: string;
  category: Category;
  description: string;
  price: number;
  imageUrl: string;
  isInStock: boolean;
  isVisible: boolean;
  isFeatured: boolean;
}

export function toProduct(db: DBProduct): Product {
  return {
    id: db.id,
    name: db.name,
    category: db.category as Category,
    description: db.description ?? "",
    price: Number(db.price),
    imageUrl: db.image_url ?? "",
    isInStock: db.is_in_stock,
    isVisible: db.is_visible,
    isFeatured: db.is_featured,
  };
}