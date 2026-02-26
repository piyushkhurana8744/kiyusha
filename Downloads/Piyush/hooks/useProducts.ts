import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryClient } from "@/lib/tanstack-query";

// Types
export interface Product {
  _id: string;
  name: string;
  category: string;
  price: string;
  oldPrice?: string;
  image: string;
  hoverImage: string;
  href: string;
  badge?: string;
  isFeatured?: boolean;
  isNewArrival?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductInput {
  name: string;
  category: string;
  price: string;
  oldPrice?: string;
  image: string;
  hoverImage: string;
  badge?: string;
  isFeatured?: boolean;
  isNewArrival?: boolean;
}

// Query Keys
export const productKeys = {
  all: ["products"] as const,
  lists: () => [...productKeys.all, "list"] as const,
  list: (filters?: string) => [...productKeys.lists(), { filters }] as const,
  details: () => [...productKeys.all, "detail"] as const,
  detail: (id: string) => [...productKeys.details(), id] as const,
  stats: () => [...productKeys.all, "stats"] as const,
};

// API Functions
const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch("/api/products");
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};

const fetchProduct = async (id: string): Promise<Product> => {
  const res = await fetch(`/api/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
};

const fetchProductStats = async () => {
  const res = await fetch("/api/products");
  if (!res.ok) throw new Error("Failed to fetch products");
  const products = await res.json();
  
  return {
    totalProducts: products.length,
    newArrivals: products.filter((p: Product) => p.isNewArrival).length,
    featured: products.filter((p: Product) => p.isFeatured).length,
    categories: Array.from(new Set(products.map((p: Product) => p.category))).length,
  };
};

const createProduct = async (data: ProductInput): Promise<Product> => {
  const productData = {
    ...data,
    href: `/products/${data.name.toLowerCase().replace(/\s+/g, "-")}`,
  };
  
  const res = await fetch("/api/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productData),
  });
  
  if (!res.ok) throw new Error("Failed to create product");
  return res.json();
};

const updateProduct = async ({ id, data }: { id: string; data: Partial<ProductInput> }): Promise<Product> => {
  const res = await fetch(`/api/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  
  if (!res.ok) throw new Error("Failed to update product");
  return res.json();
};

const deleteProduct = async (id: string): Promise<{ message: string }> => {
  const res = await fetch(`/api/products/${id}`, {
    method: "DELETE",
  });
  
  if (!res.ok) throw new Error("Failed to delete product");
  return res.json();
};

// Hooks

/**
 * Hook to fetch all products
 */
export function useProducts() {
  return useQuery({
    queryKey: productKeys.lists(),
    queryFn: fetchProducts,
  });
}

/**
 * Hook to fetch a single product by ID
 */
export function useProduct(id: string) {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => fetchProduct(id),
    enabled: !!id,
  });
}

/**
 * Hook to fetch product statistics
 */
export function useProductStats() {
  return useQuery({
    queryKey: productKeys.stats(),
    queryFn: fetchProductStats,
    staleTime: 60000, // 1 minute
  });
}

/**
 * Hook to create a new product
 */
export function useCreateProduct() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      // Invalidate products list to refetch
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
      queryClient.invalidateQueries({ queryKey: productKeys.stats() });
    },
  });
}

/**
 * Hook to update an existing product
 */
export function useUpdateProduct() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: updateProduct,
    onSuccess: (data) => {
      // Invalidate the product detail and list
      queryClient.invalidateQueries({ queryKey: productKeys.detail(data._id) });
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
      queryClient.invalidateQueries({ queryKey: productKeys.stats() });
    },
  });
}

/**
 * Hook to delete a product
 */
export function useDeleteProduct() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      // Invalidate products list to refetch
      queryClient.invalidateQueries({ queryKey: productKeys.lists() });
      queryClient.invalidateQueries({ queryKey: productKeys.stats() });
    },
  });
}

/**
 * Hook to prefetch a product (for optimization)
 */
export function usePrefetchProduct() {
  const queryClient = useQueryClient();
  
  return (id: string) => {
    queryClient.prefetchQuery({
      queryKey: productKeys.detail(id),
      queryFn: () => fetchProduct(id),
    });
  };
}
