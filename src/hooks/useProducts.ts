import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { toProduct, type DBProduct, type Product } from "@/lib/types";

// ─── Fetch helpers ────────────────────────────────────────────────────────────

async function fetchVisibleProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_visible", true)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data as DBProduct[]).map(toProduct);
}

async function fetchFeaturedProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("is_featured", true)
    .eq("is_visible", true)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data as DBProduct[]).map(toProduct);
}

async function fetchAllProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data as DBProduct[]).map(toProduct);
}

// ─── Query hooks ──────────────────────────────────────────────────────────────

export function useVisibleProducts() {
  return useQuery({ queryKey: ["products", "visible"], queryFn: fetchVisibleProducts });
}

export function useFeaturedProducts() {
  return useQuery({ queryKey: ["products", "featured"], queryFn: fetchFeaturedProducts });
}

export function useAllProducts() {
  return useQuery({ queryKey: ["products", "all"], queryFn: fetchAllProducts });
}

// ─── Mutation hooks ───────────────────────────────────────────────────────────

export interface ProductFormData {
  name: string;
  category: string;
  description: string;
  price: number;
  image_path: string;
  is_in_stock: boolean;
  is_visible: boolean;
  is_featured: boolean;
}

export function useAddProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: ProductFormData) => {
      const { error } = await supabase.from("products").insert([data]);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
}

export function useUpdateProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<ProductFormData> }) => {
      const { error } = await supabase
        .from("products")
        .update({ ...data, updated_at: new Date().toISOString() })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
}

export function useDeleteProduct() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
  });
}

export function useUploadProductImage() {
  return useMutation({
    mutationFn: async (file: File): Promise<string> => {
      const ext = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await supabase.storage
        .from("product_images")
        .upload(fileName, file, { upsert: false });
      if (error) throw error;
      const { data } = supabase.storage.from("product_images").getPublicUrl(fileName);
      return data.publicUrl;
    },
  });
}