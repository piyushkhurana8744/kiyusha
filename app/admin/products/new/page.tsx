"use client";

import { useCreateProduct } from "@/hooks/useProducts";
import { useRouter } from "next/navigation";
import ProductForm from "@/components/admin/ProductForm";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default function NewProductPage() {
  const router = useRouter();
  const createMutation = useCreateProduct();

  const handleSubmit = async (formData: any) => {
    try {
      await createMutation.mutateAsync(formData);
      router.push("/admin/products");
    } catch (error) {
      console.error("Failed to create product:", error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <Link href="/admin/products" className="inline-flex items-center gap-2 text-deepCharcoal/40 hover:text-deepCharcoal transition-colors text-[10px] uppercase tracking-widest font-bold">
        <ChevronLeft size={14} />
        Back to Inventory
      </Link>
      
      <ProductForm 
        title="Add Signature Piece"
        onSubmit={handleSubmit}
        isLoading={createMutation.isPending}
      />
    </div>
  );
}
