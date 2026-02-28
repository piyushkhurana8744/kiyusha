"use client";

import { useProduct, useUpdateProduct } from "@/hooks/useProducts";
import { useParams, useRouter } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";
import Link from "next/link";
import { ChevronLeft, Loader2 } from "lucide-react";

export default function EditProductPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: product, isLoading: isFetching } = useProduct(id as string);
  const updateMutation = useUpdateProduct();

  const handleSubmit = async (formData: any) => {
    try {
      await updateMutation.mutateAsync({ id: id as string, data: formData });
      router.push("/admin/products");
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  if (isFetching) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="animate-spin text-softGold" size={40} />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-heading text-deepCharcoal">Product not found</h2>
        <Link href="/admin/products" className="text-softGold mt-4 inline-block underline">
          Back to products
        </Link>
      </div>
    );
  }

  // Pre-process product for form if needed
  const initialData = {
    name: product.name,
    category: product.category,
    description: product.description || "",
    mrp: product.mrp || 0,
    sellingPrice: product.sellingPrice || 0,
    image: product.image,
    hoverImage: product.hoverImage,
    badge: product.badge || "",
    isNewArrival: product.isNewArrival || false,
    isFeatured: product.isFeatured || false,
    showDiscountPopup: product.showDiscountPopup || false,
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <Link href="/admin/products" className="inline-flex items-center gap-2 text-deepCharcoal/40 hover:text-deepCharcoal transition-colors text-[10px] uppercase tracking-widest font-bold">
        <ChevronLeft size={14} />
        Back to Inventory
      </Link>
      
      <ProductForm 
        title="Edit Collection Piece"
        initialData={initialData}
        onSubmit={handleSubmit}
        isLoading={updateMutation.isPending}
      />
    </div>
  );
}
