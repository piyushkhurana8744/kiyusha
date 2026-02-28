"use client";

import { useMedia, MediaItem } from "@/hooks/useMedia";
import { X, Search, CheckCircle } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface MediaGalleryModalProps {
  onSelect: (url: string) => void;
  onClose: () => void;
}

export default function MediaGalleryModal({ onSelect, onClose }: MediaGalleryModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: media = [], isLoading } = useMedia();

  const filteredMedia = media.filter((item) =>
    item.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 md:p-8">
      <div className="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        <header className="p-6 border-b border-black/5 flex items-center justify-between bg-ivory/20">
          <div>
            <h2 className="text-xl font-heading text-deepCharcoal">Gallery Selection</h2>
            <p className="text-xs text-black/40 uppercase tracking-widest mt-1">Choose an existing asset</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full transition-colors">
            <X size={20} />
          </button>
        </header>

        <div className="p-6 border-b border-black/5 bg-white">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-deepCharcoal/30" size={18} />
            <input 
              type="text" 
              placeholder="Search images..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-ivory/20 border border-black/5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-softGold/20 focus:border-softGold transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 bg-ivory/10">
          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {Array(10).fill(0).map((_, i) => (
                <div key={i} className="aspect-[3/4] bg-white animate-pulse rounded-xl" />
              ))}
            </div>
          ) : filteredMedia.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-sm text-black/40 uppercase tracking-widest">No assets found</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredMedia.map((item: MediaItem) => (
                <div 
                  key={item._id} 
                  onClick={() => {
                    onSelect(item.url);
                    onClose();
                  }}
                  className="group relative aspect-[3/4] rounded-xl overflow-hidden border border-black/5 bg-white cursor-pointer hover:border-softGold transition-all shadow-sm hover:shadow-md"
                >
                  <Image 
                    src={item.url} 
                    alt={item.name || "Gallery Item"} 
                    fill 
                    className="object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-softGold/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <CheckCircle className="text-white drop-shadow-md" size={32} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
