"use client";

import { useState } from "react";
import { useCreateProduct, ProductInput } from "@/hooks/useProducts";
import { useRouter } from "next/navigation";
import { ChevronLeft, Upload, Loader2, Sparkles, CheckCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function NewProductPage() {
  const router = useRouter();
  const [uploading, setUploading] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<{ image?: boolean; hoverImage?: boolean }>({});

  const [formData, setFormData] = useState<ProductInput>({
    name: "",
    category: "Necklaces",
    price: "INR ",
    oldPrice: "",
    image: "",
    hoverImage: "",
    badge: "",
    isNewArrival: false,
    isFeatured: false,
  });

  const categories = ["Necklaces", "Earrings", "Bracelets", "Rings", "Anklets"];

  // Using custom mutation hook
  const createProductMutation = useCreateProduct();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: "image" | "hoverImage") => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(field);

    const data = new FormData();
    data.set("file", file);

    try {
      const res = await fetch("/api/media", {
        method: "POST",
        body: data,
      });
      const result = await res.json();
      setFormData({ ...formData, [field]: result.url });
      setUploadSuccess(prev => ({ ...prev, [field]: true }));
      setTimeout(() => setUploadSuccess(prev => ({ ...prev, [field]: false })), 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await createProductMutation.mutateAsync(formData);
      router.push("/admin/products");
    } catch (error) {
      console.error("Failed to create product:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Link href="/admin/products" className="inline-flex items-center gap-2 text-deepCharcoal/50 hover:text-deepCharcoal transition-colors text-sm uppercase tracking-widest font-medium">
        <ChevronLeft size={16} />
        Back to Products
      </Link>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading text-deepCharcoal">Add New Product</h1>
          <p className="text-deepCharcoal/50 text-sm mt-1">Create a new piece for your collection</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-2xl border border-black/5 shadow-sm space-y-6">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.2em] font-medium text-deepCharcoal/60">Product Name</label>
              <input 
                required
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Athena Pearl Huggies"
                className="w-full px-4 py-3 bg-ivory/20 border border-black/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-softGold/20 focus:border-softGold transition-all font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
               <div className="space-y-2">
                 <label className="text-xs uppercase tracking-[0.2em] font-medium text-deepCharcoal/60">Category</label>
                 <select 
                   value={formData.category}
                   onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                   className="w-full px-4 py-3 bg-ivory/20 border border-black/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-softGold/20 focus:border-softGold transition-all"
                 >
                   {categories.map(c => <option key={c} value={c}>{c}</option>)}
                 </select>
               </div>
               <div className="space-y-2">
                 <label className="text-xs uppercase tracking-[0.2em] font-medium text-deepCharcoal/60">Badge (Optional)</label>
                 <input 
                   type="text" 
                   value={formData.badge}
                   onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                   placeholder="e.g. New, Bestseller"
                   className="w-full px-4 py-3 bg-ivory/20 border border-black/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-softGold/20 focus:border-softGold transition-all"
                 />
               </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.2em] font-medium text-deepCharcoal/60">Price</label>
                <input 
                  required
                  type="text" 
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="INR 3,499"
                  className="w-full px-4 py-3 bg-ivory/20 border border-black/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-softGold/20 focus:border-softGold transition-all font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.2em] font-medium text-deepCharcoal/60">Old Price (Optional)</label>
                <input 
                  type="text" 
                  value={formData.oldPrice}
                  onChange={(e) => setFormData({ ...formData, oldPrice: e.target.value })}
                  placeholder="INR 4,299"
                  className="w-full px-4 py-3 bg-ivory/20 border border-black/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-softGold/20 focus:border-softGold transition-all text-deepCharcoal/50"
                />
              </div>
            </div>

            <div className="flex gap-8 pt-4">
               <label className="flex items-center gap-3 cursor-pointer group">
                 <input 
                   type="checkbox" 
                   checked={formData.isNewArrival}
                   onChange={(e) => setFormData({ ...formData, isNewArrival: e.target.checked })}
                   className="w-5 h-5 rounded border-black/10 text-softGold focus:ring-softGold/20 transition-all"
                 />
                 <span className="text-xs uppercase tracking-widest font-medium text-deepCharcoal/70 group-hover:text-deepCharcoal transition-colors">Mark as New Arrival</span>
               </label>
               <label className="flex items-center gap-3 cursor-pointer group">
                 <input 
                   type="checkbox" 
                   checked={formData.isFeatured}
                   onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                   className="w-5 h-5 rounded border-black/10 text-softGold focus:ring-softGold/20 transition-all"
                 />
                 <span className="text-xs uppercase tracking-widest font-medium text-deepCharcoal/70 group-hover:text-deepCharcoal transition-colors">Feature on Homepage</span>
               </label>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-8 rounded-2xl border border-black/5 shadow-sm space-y-6">
            <div className="space-y-4">
              <label className="text-xs uppercase tracking-[0.2em] font-medium text-deepCharcoal/60 block">
                Main Image
                {uploadSuccess.image && <span className="ml-2 text-green-500">✓ Uploaded</span>}
              </label>
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-ivory border-2 border-dashed border-black/5 flex items-center justify-center group pointer-events-none">
                {formData.image ? (
                  <Image src={formData.image} alt="Preview" fill className="object-cover" />
                ) : (
                  <div className="text-center p-4">
                    <Upload size={24} className="mx-auto text-deepCharcoal/20 mb-2" />
                    <p className="text-[10px] text-deepCharcoal/40 uppercase tracking-widest">3:4 Ratio Recommended</p>
                  </div>
                )}
                {uploadSuccess.image && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full">
                    <CheckCircle size={16} />
                  </div>
                )}
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, "image")}
                  className="absolute inset-0 opacity-0 cursor-pointer pointer-events-auto"
                />
                {uploading === "image" && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-sm">
                    <Loader2 className="text-white animate-spin" size={24} />
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-xs uppercase tracking-[0.2em] font-medium text-deepCharcoal/60 block">
                Hover/Alt Image
                {uploadSuccess.hoverImage && <span className="ml-2 text-green-500">✓ Uploaded</span>}
              </label>
              <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-ivory border-2 border-dashed border-black/5 flex items-center justify-center group pointer-events-none">
                {formData.hoverImage ? (
                  <Image src={formData.hoverImage} alt="Preview" fill className="object-cover" />
                ) : (
                  <div className="text-center p-4">
                    <Upload size={24} className="mx-auto text-deepCharcoal/20 mb-2" />
                    <p className="text-[10px] text-deepCharcoal/40 uppercase tracking-widest">Alternate view</p>
                  </div>
                )}
                {uploadSuccess.hoverImage && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white p-1 rounded-full">
                    <CheckCircle size={16} />
                  </div>
                )}
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, "hoverImage")}
                  className="absolute inset-0 opacity-0 cursor-pointer pointer-events-auto"
                />
                 {uploading === "hoverImage" && (
                   <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-sm">
                     <Loader2 className="text-white animate-spin" size={24} />
                   </div>
                 )}
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={createProductMutation.isPending || uploading !== null}
            className="w-full bg-deepCharcoal text-warmWhite py-4 rounded-2xl font-medium tracking-widest uppercase text-sm hover:bg-black transition-all flex items-center justify-center gap-2 disabled:opacity-50 shadow-xl shadow-black/10"
          >
            {createProductMutation.isPending ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <Sparkles size={20} className="text-softGold" />
            )}
            {createProductMutation.isPending ? "Creating..." : "Publish piece"}
          </button>
          
          {createProductMutation.isError && (
            <p className="text-red-500 text-sm text-center">
              Failed to create product. Please try again.
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
