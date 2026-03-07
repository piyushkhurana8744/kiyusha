"use client";

import { useState, useEffect } from "react";
import { ProductInput } from "@/hooks/useProducts";
import { Upload, Loader2, Sparkles, Image as ImageIcon, X } from "lucide-react";
import Image from "next/image";
import MediaGalleryModal from "./MediaGalleryModal";
import ImageCropper from "./ImageCropper";

interface ProductFormProps {
  initialData?: ProductInput;
  onSubmit: (data: ProductInput) => Promise<void>;
  isLoading: boolean;
  title: string;
}

export default function ProductForm({ initialData, onSubmit, isLoading, title }: ProductFormProps) {
  const [uploading, setUploading] = useState<string | null>(null);
  const [galleryModal, setGalleryModal] = useState<{ isOpen: boolean; field: string | null }>({
    isOpen: false,
    field: null,
  });
  const [cropper, setCropper] = useState<{ 
    isOpen: boolean; 
    images: string[]; 
    field: string | null;
    currentIndex: number;
  }>({
    isOpen: false,
    images: [],
    field: null,
    currentIndex: 0,
  });

  const [formData, setFormData] = useState<ProductInput>({
    name: "",
    category: "Necklaces",
    description: "",
    mrp: 0,
    sellingPrice: 0,
    image: "",
    hoverImage: "",
    gallery: [],
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
        gallery: initialData.gallery || [],
      });
    }
  }, [initialData]);

  const categories = ["Necklaces", "Earrings", "Bracelets", "Rings", "Anklets", "Gift Sets", "Cosmetics", "Crochet", "Bangles"];

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const fileList = Array.from(files);
    const readers = fileList.map(file => {
      return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
    });

    const imageResults = await Promise.all(readers);
    
    setCropper({
      isOpen: true,
      images: imageResults,
      field,
      currentIndex: 0,
    });
    
    e.target.value = "";
  };

  const handleCropComplete = async (croppedBlob: Blob) => {
    const field = cropper.field;
    if (!field) return;

    setUploading(field);

    const data = new FormData();
    data.set("file", croppedBlob, "product-image.jpg");

    try {
      const res = await fetch("/api/media", {
        method: "POST",
        body: data,
      });
      const result = await res.json();
      
      if (field === "gallery") {
        setFormData(prev => ({ 
          ...prev, 
          gallery: [...(prev.gallery || []), result.url] 
        }));
      } else {
        setFormData(prev => ({ ...prev, [field]: result.url }));
      }

      // Check if there are more images to crop
      if (cropper.currentIndex < cropper.images.length - 1) {
        setCropper(prev => ({
          ...prev,
          currentIndex: prev.currentIndex + 1
        }));
      } else {
        setCropper({ isOpen: false, images: [], field: null, currentIndex: 0 });
      }
    } catch (err) {
      console.error(err);
      setCropper({ isOpen: false, images: [], field: null, currentIndex: 0 });
    } finally {
      setUploading(null);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const submissionData = {
      ...formData,
      gallery: formData.gallery || [],
    };
    await onSubmit(submissionData);
  };

  const openGallery = (field: string) => {
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

          {/* Product Gallery */}
          <div className="bg-white p-8 rounded-2xl border border-black/5 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-deepCharcoal/40">Product Gallery</h3>
                <p className="text-[10px] text-deepCharcoal/20 mt-0.5 uppercase tracking-widest">Detail shots (1:1 ratio)</p>
              </div>
              <div className="flex gap-2">
                <label className="cursor-pointer bg-ivory text-deepCharcoal px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-softGold transition-all flex items-center gap-2 border border-black/5 shadow-sm">
                  <Upload size={14} />
                  Upload
                  <input 
                    type="file" 
                    multiple
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, "gallery")}
                    className="hidden"
                  />
                </label>
                <button 
                  type="button"
                  onClick={() => openGallery("gallery")}
                  className="bg-deepCharcoal text-warmWhite px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all flex items-center gap-2 shadow-sm"
                >
                  <ImageIcon size={14} />
                  Gallery
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {formData.gallery?.map((url, idx) => (
                <div key={idx} className="relative aspect-square rounded-xl overflow-hidden bg-ivory group border border-black/5">
                  <Image src={url} alt={`Gallery ${idx + 1}`} fill className="object-cover" />
                  <button 
                    type="button" 
                    onClick={() => {
                      const newGallery = [...(formData.gallery || [])];
                      newGallery.splice(idx, 1);
                      setFormData({ ...formData, gallery: newGallery });
                    }}
                    className="absolute top-2 right-2 p-1.5 bg-white/90 hover:bg-white text-red-400 rounded-full shadow-sm z-10 transition-all opacity-0 group-hover:opacity-100"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
              
              {uploading === "gallery" && (
                <div className="relative aspect-square rounded-xl overflow-hidden bg-white/50 flex items-center justify-center shadow-inner">
                  <Loader2 className="animate-spin text-softGold" size={24} />
                </div>
              )}

              {(!formData.gallery || formData.gallery.length === 0) && !uploading && (
                <div className="col-span-full py-10 border border-dashed border-black/5 rounded-2xl flex flex-col items-center justify-center text-center bg-ivory/20">
                  <ImageIcon size={32} className="text-black/5 mb-3" />
                  <p className="text-[10px] text-deepCharcoal/20 uppercase tracking-widest font-bold">No images added</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm space-y-8">
            {/* Main Image Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-deepCharcoal/40 block">Main Image</label>
                {formData.image && (
                  <button type="button" onClick={() => setFormData(prev => ({ ...prev, image: "" }))} className="text-red-400 hover:text-red-500 transition-colors">
                    <X size={16} />
                  </button>
                )}
              </div>
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-ivory/50 border border-black/5 flex items-center justify-center group shadow-inner">
                {formData.image ? (
                  <>
                    <Image src={formData.image} alt="Main Preview" fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 backdrop-blur-[2px]">
                      <label className="cursor-pointer bg-white text-deepCharcoal px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-softGold transition-all flex items-center gap-2 shadow-xl">
                        <Upload size={14} />
                        Upload
                        <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, "image")} className="hidden" />
                      </label>
                      <button type="button" onClick={() => openGallery("image")} className="bg-deepCharcoal text-warmWhite px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all flex items-center gap-2 shadow-xl">
                        <ImageIcon size={14} />
                        Gallery
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col gap-3">
                    <label className="cursor-pointer bg-white text-deepCharcoal px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-softGold transition-all flex items-center gap-2 shadow-sm border border-black/5">
                      <Upload size={14} />
                      Upload
                      <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, "image")} className="hidden" />
                    </label>
                    <button type="button" onClick={() => openGallery("image")} className="bg-deepCharcoal text-warmWhite px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all flex items-center gap-2 shadow-sm border border-black/5">
                      <ImageIcon size={14} />
                      Gallery
                    </button>
                  </div>
                )}
                {uploading === "image" && (
                  <div className="absolute inset-0 bg-white/80 flex items-center justify-center backdrop-blur-sm">
                    <Loader2 className="text-softGold animate-spin" size={24} />
                  </div>
                )}
              </div>
            </div>

            {/* Hover Image Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-deepCharcoal/40 block">Hover Image</label>
                {formData.hoverImage && (
                  <button type="button" onClick={() => setFormData(prev => ({ ...prev, hoverImage: "" }))} className="text-red-400 hover:text-red-500 transition-colors">
                    <X size={16} />
                  </button>
                )}
              </div>
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-ivory/50 border border-black/5 flex items-center justify-center group shadow-inner">
                {formData.hoverImage ? (
                  <>
                    <Image src={formData.hoverImage} alt="Hover Preview" fill className="object-cover" />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 backdrop-blur-[2px]">
                      <label className="cursor-pointer bg-white text-deepCharcoal px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-softGold transition-all flex items-center gap-2 shadow-xl">
                        <Upload size={14} />
                        Upload
                        <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, "hoverImage")} className="hidden" />
                      </label>
                      <button type="button" onClick={() => openGallery("hoverImage")} className="bg-deepCharcoal text-warmWhite px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all flex items-center gap-2 shadow-xl">
                        <ImageIcon size={14} />
                        Gallery
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col gap-3">
                    <label className="cursor-pointer bg-white text-deepCharcoal px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-softGold transition-all flex items-center gap-2 shadow-sm border border-black/5">
                      <Upload size={14} />
                      Upload
                      <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, "hoverImage")} className="hidden" />
                    </label>
                    <button type="button" onClick={() => openGallery("hoverImage")} className="bg-deepCharcoal text-warmWhite px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all flex items-center gap-2 shadow-sm border border-black/5">
                      <ImageIcon size={14} />
                      Gallery
                    </button>
                  </div>
                )}
                {uploading === "hoverImage" && (
                  <div className="absolute inset-0 bg-white/80 flex items-center justify-center backdrop-blur-sm">
                    <Loader2 className="text-softGold animate-spin" size={24} />
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
          allowMultiple={galleryModal.field === "gallery"}
          onClose={() => setGalleryModal({ isOpen: false, field: null })}
          onSelect={(urls) => {
            if (galleryModal.field === "gallery") {
              setFormData(prev => ({
                ...prev,
                gallery: [...(prev.gallery || []), ...urls]
              }));
            } else if (galleryModal.field) {
              const field = galleryModal.field;
              setFormData(prev => ({ ...prev, [field]: urls[0] }));
            }
            setGalleryModal({ isOpen: false, field: null });
          }}
        />
      )}

      {cropper.isOpen && (
        <ImageCropper 
          image={cropper.images[cropper.currentIndex]}
          onCropComplete={handleCropComplete}
          onCancel={() => setCropper({ isOpen: false, images: [], field: null, currentIndex: 0 })}
        />
      )}
    </div>
  );
}
