"use client";

import { useState } from "react";
import { useMedia, MediaItem } from "@/hooks/useMedia";
import Image from "next/image";
import { Copy, Trash2, Search, Upload, Loader2, CheckCircle } from "lucide-react";

export default function MediaLibraryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [uploading, setUploading] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  // Using custom hooks
  const { data: media = [], isLoading } = useMedia();

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.set("file", file);

    try {
      const res = await fetch("/api/media", {
        method: "POST",
        body: formData,
      });
      
      if (!res.ok) throw new Error("Failed to upload");
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(false);
      // Reset input
      e.target.value = "";
    }
  };

  // Filter media based on search
  const filteredMedia = media.filter((item) =>
    item.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading text-deepCharcoal">Media Library</h1>
          <p className="text-deepCharcoal/50 text-sm mt-1">Manage and access your uploaded assets</p>
        </div>
        
        <label className="bg-deepCharcoal text-warmWhite px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-black transition-all shadow-lg shadow-black/5 text-sm font-medium tracking-wide cursor-pointer">
          {uploading ? <Loader2 className="animate-spin" size={18} /> : <Upload size={18} />}
          {uploading ? "Uploading..." : "Upload New"}
          <input 
            type="file" 
            accept="image/*"
            onChange={handleFileUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-deepCharcoal/30" size={18} />
          <input 
            type="text" 
            placeholder="Search assets..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-ivory/20 border border-black/5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-softGold/20 focus:border-softGold transition-all"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {isLoading ? (
             Array(6).fill(0).map((_, i) => (
               <div key={i} className="aspect-square bg-ivory animate-pulse rounded-xl" />
             ))
          ) : filteredMedia.length === 0 ? (
            <div className="col-span-full py-20 text-center text-sm text-deepCharcoal/40 font-light tracking-wide uppercase">
              {searchQuery ? "No assets match your search." : "No assets uploaded yet."}
            </div>
          ) : (
            filteredMedia.map((item: MediaItem) => (
              <div key={item._id || item.name} className="group relative aspect-square rounded-xl overflow-hidden border border-black/5 bg-ivory">
                <Image 
                  src={item.url} 
                  alt={item.name || "Media"} 
                  fill 
                  className="object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 backdrop-blur-[2px]">
                   <button 
                    onClick={() => copyUrl(item.url)}
                    className="p-2 bg-white/20 hover:bg-white/30 rounded-lg text-white transition-colors relative"
                    title="Copy URL"
                   >
                     {copiedUrl === item.url ? (
                       <CheckCircle size={16} className="text-green-400" />
                     ) : (
                       <Copy size={16} />
                     )}
                   </button>
                </div>
                {item.type === "cloudinary" && (
                  <div className="absolute bottom-2 left-2 px-2 py-1 bg-black/50 rounded text-[10px] text-white uppercase tracking-wider">
                    Cloud
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
