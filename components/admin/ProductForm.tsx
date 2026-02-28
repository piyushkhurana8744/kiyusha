"use client";

import { useState, useEffect } from "react";
import { ProductInput } from "@/hooks/useProducts";
import { Upload, Loader2, Sparkles, CheckCircle, Image as ImageIcon, X } from "lucide-react";
import Image from "next/image";
import MediaGalleryModal from "./MediaGalleryModal";

interface ProductFormProps {
  initialData?: ProductInput;
  onSubmit: (data: ProductInput) => Promise<void>;
  isLoading: boolean;
  title: string;
}

export default function ProductForm({ initialData, onSubmit, isLoading, title }: ProductFormProps) {
  const [uploading, setUploading] = useState<string | null>(null);
  const [galleryModal, setGalleryModal] = useState<{ isOpen: boolean; field: "image" | "hoverImage" | null }>({
    isOpen: false,
    field: null,
  });

  const [formData, setFormData] = useState<ProductInput>({
    name: "",
    category: "Necklaces",
    description: "",
    mrp: 0,
    sellingPrice: 0,
    image: "",
    hoverImage: "",
    badge: "",
    isNewArrival: false,
    isFeatured: false,
    showDiscountPopup: false,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        mrp: initialData.mrp || 0,
        sellingPrice: initialData.sellingPrice || 0,
      });
    }
  }, [initialData]);

  const categories = ["Necklaces", "Earrings", "Bracelets", "Rings", "Anklets", "Gift Sets"];

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
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(null);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const openGallery = (field: "image" | "hoverImage") => {
    setGalleryModal({ isOpen: true, field });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading text-deepCharcoal">{title}</h1>
          <p className="text-deepCharcoal/50 text-sm mt-1">Configure your product details with high precision</p>
        </div>
      </div>

      <form onSubmit={handleFormSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-20">
        <div className="lg:col-span-2 space-y-6">
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

            <div className="space-y-2">
              <label className="text-xs uppercase tracking-[0.2em] font-medium text-deepCharcoal/60">Description</label>
              <textarea 
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe the piece, materials, and styling inspiration..."
                className="w-full px-4 py-3 bg-ivory/20 border border-black/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-softGold/20 focus:border-softGold transition-all text-sm leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
               <div className="space-y-2">
                 <label className="text-xs uppercase tracking-[0.2em] font-medium text-deepCharcoal/60">Category</label>
                 <select 
                   value={formData.category}
                   onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                   className="w-full px-4 py-3 bg-ivory/20 border border-black/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-softGold/20 focus:border-softGold transition-all font-medium text-sm"
                 >
                   {categories.map(c => <option key={c} value={c}>{c}</option>)}
                 </select>
               </div>
               <div className="space-y-2">
                 <label className="text-xs uppercase tracking-[0.2em] font-medium text-deepCharcoal/60">Badge</label>
                 <input 
                   type="text" 
                   value={formData.badge}
                   onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                   placeholder="e.g. New arrival, Limited"
                   className="w-full px-4 py-3 bg-ivory/20 border border-black/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-softGold/20 focus:border-softGold transition-all text-sm"
                 />
               </div>
            </div>

            <div className="grid grid-cols-2 gap-6 p-6 bg-ivory/30 rounded-2xl border border-black/5">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.2em] font-medium text-deepCharcoal/60">MRP (Original Price)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-black/40 font-medium">₹</span>
                  <input 
                    type="number" 
                    value={formData.mrp || ""} 
                    onChange={(e) => setFormData({ ...formData, mrp: e.target.value === "" ? 0 : Number(e.target.value) })}
                    className="w-full pl-8 pr-4 py-3 bg-white border border-black/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-softGold/20 focus:border-softGold transition-all font-medium"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.2em] font-bold text-softGold">Selling Price</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-softGold font-bold">₹</span>
                  <input 
                    required
                    type="number" 
                    value={formData.sellingPrice || ""} 
                    onChange={(e) => setFormData({ ...formData, sellingPrice: e.target.value === "" ? 0 : Number(e.target.value) })}
                    className="w-full pl-8 pr-4 py-3 bg-white border border-softGold/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-softGold/20 focus:border-softGold transition-all font-bold text-softGold"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-x-8 gap-y-4 pt-4 border-t border-black/5">
               <label className="flex items-center gap-3 cursor-pointer group">
                 <input 
                   type="checkbox" 
                   checked={formData.isNewArrival}
                   onChange={(e) => setFormData({ ...formData, isNewArrival: e.target.checked })}
                   className="w-5 h-5 rounded border-black/10 text-softGold focus:ring-softGold/20 transition-all"
                 />
                 <span className="text-[10px] uppercase tracking-widest font-bold text-deepCharcoal/60 group-hover:text-deepCharcoal transition-colors">New Arrival</span>
               </label>
               <label className="flex items-center gap-3 cursor-pointer group">
                 <input 
                   type="checkbox" 
                   checked={formData.isFeatured}
                   onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                   className="w-5 h-5 rounded border-black/10 text-softGold focus:ring-softGold/20 transition-all"
                 />
                 <span className="text-[10px] uppercase tracking-widest font-bold text-deepCharcoal/60 group-hover:text-deepCharcoal transition-colors">Featured</span>
               </label>
               <label className="flex items-center gap-3 cursor-pointer group">
                 <input 
                   type="checkbox" 
                   checked={formData.showDiscountPopup}
                   onChange={(e) => setFormData({ ...formData, showDiscountPopup: e.target.checked })}
                   className="w-5 h-5 rounded border-black/10 text-softGold focus:ring-softGold/20 transition-all"
                 />
                 <span className="text-[10px] uppercase tracking-widest font-bold text-softGold group-hover:opacity-80 transition-opacity">Show Discount Popup</span>
               </label>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-8 rounded-2xl border border-black/5 shadow-sm space-y-8">
            {/* Main Image */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs uppercase tracking-[0.2em] font-bold text-deepCharcoal/60 block">Main Image</label>
                {formData.image && (
                  <button type="button" onClick={() => setFormData({...formData, image: ""})} className="text-red-500 hover:text-red-600">
                    <X size={14} />
                  </button>
                )}
              </div>
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-ivory border-2 border-dashed border-black/5 flex items-center justify-center group">
                {formData.image ? (
                  <Image src={formData.image} alt="Preview" fill className="object-cover" />
                ) : (
                  <div className="text-center p-4">
                    <ImageIcon size={32} className="mx-auto text-deepCharcoal/10 mb-3" />
                    <p className="text-[10px] text-deepCharcoal/30 uppercase tracking-[0.2em]">3:4 Showcase</p>
                  </div>
                )}
                
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 backdrop-blur-sm">
                   <label className="cursor-pointer bg-white text-deepCharcoal px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-softGold transition-colors flex items-center gap-2">
                     <Upload size={14} />
                     Upload
                     <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, "image")}
                        className="hidden"
                      />
                   </label>
                   <button 
                    type="button"
                    onClick={() => openGallery("image")}
                    className="bg-deepCharcoal text-warmWhite px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-black transition-colors flex items-center gap-2"
                   >
                     <ImageIcon size={14} />
                     Gallery
                   </button>
                </div>

                {uploading === "image" && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
                    <Loader2 className="text-white animate-spin" size={24} />
                  </div>
                )}
              </div>
            </div>

            {/* Hover Image */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs uppercase tracking-[0.2em] font-bold text-deepCharcoal/60 block">Hover Image</label>
                {formData.hoverImage && (
                  <button type="button" onClick={() => setFormData({...formData, hoverImage: ""})} className="text-red-500 hover:text-red-600">
                    <X size={14} />
                  </button>
                )}
              </div>
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-ivory border-2 border-dashed border-black/5 flex items-center justify-center group">
                {formData.hoverImage ? (
                  <Image src={formData.hoverImage} alt="Preview" fill className="object-cover" />
                ) : (
                  <div className="text-center p-4">
                    <ImageIcon size={32} className="mx-auto text-deepCharcoal/10 mb-3" />
                    <p className="text-[10px] text-deepCharcoal/30 uppercase tracking-[0.2em]">Alt View</p>
                  </div>
                )}
                
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 backdrop-blur-sm">
                   <label className="cursor-pointer bg-white text-deepCharcoal px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-softGold transition-colors flex items-center gap-2">
                     <Upload size={14} />
                     Upload
                     <input 
                        type="file" 
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, "hoverImage")}
                        className="hidden"
                      />
                   </label>
                   <button 
                    type="button"
                    onClick={() => openGallery("hoverImage")}
                    className="bg-deepCharcoal text-warmWhite px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-black transition-colors flex items-center gap-2"
                   >
                     <ImageIcon size={14} />
                     Gallery
                   </button>
                </div>

                {uploading === "hoverImage" && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
                    <Loader2 className="text-white animate-spin" size={24} />
                  </div>
                )}
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading || !!uploading}
            className="w-full bg-deepCharcoal text-warmWhite py-5 rounded-2xl font-bold tracking-[0.2em] uppercase text-sm hover:bg-black transition-all flex items-center justify-center gap-3 disabled:opacity-50 shadow-2xl shadow-black/20 group"
          >
            {isLoading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <Sparkles size={20} className="text-softGold group-hover:rotate-12 transition-transform" />
            )}
            {isLoading ? "Saving..." : "Save Selection"}
          </button>
        </div>
      </form>

      {galleryModal.isOpen && (
        <MediaGalleryModal 
          onClose={() => setGalleryModal({ isOpen: false, field: null })}
          onSelect={(url) => {
            if (galleryModal.field) {
              setFormData({ ...formData, [galleryModal.field]: url });
            }
          }}
        />
      )}
    </div>
  );
}
