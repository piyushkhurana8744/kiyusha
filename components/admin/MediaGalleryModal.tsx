"use client";

import { useMedia, MediaItem } from "@/hooks/useMedia";
import { X, Search, CheckCircle } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface MediaGalleryModalProps {
  onSelect: (urls: string[]) => void;
  onClose: () => void;
  allowMultiple?: boolean;
}

export default function MediaGalleryModal({ onSelect, onClose, allowMultiple = false }: MediaGalleryModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUrls, setSelectedUrls] = useState<string[]>([]);
  const { data: media = [], isLoading } = useMedia();

  const filteredMedia = media.filter((item) =>
    item.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSelection = (url: string) => {
    if (!allowMultiple) {
      onSelect([url]);
      return;
    }

    setSelectedUrls(prev => 
      prev.includes(url) 
        ? prev.filter(u => u !== url) 
        : [...prev, url]
    );
  };

  const handleConfirm = () => {
    if (selectedUrls.length > 0) {
      onSelect(selectedUrls);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4 md:p-8">
      <div className="bg-white rounded-2xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-deepCharcoal">
        <header className="p-6 border-b border-black/5 flex items-center justify-between bg-ivory/20">
          <div>
            <h2 className="text-xl font-heading">Gallery Selection</h2>
            <p className="text-xs text-black/40 uppercase tracking-widest mt-1">
              {allowMultiple ? `Select multiple assets (${selectedUrls.length} selected)` : 'Choose an existing asset'}
            </p>
          </div>
          <div className="flex items-center gap-4">
            {allowMultiple && selectedUrls.length > 0 && (
              <button 
                onClick={handleConfirm}
                className="bg-softGold text-white px-6 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-softGold/90 transition-all shadow-sm"
              >
                Insert Selected
              </button>
            )}
            <button onClick={onClose} className="p-2 hover:bg-black/5 rounded-full transition-colors">
              <X size={20} />
            </button>
          </div>
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
              {filteredMedia.map((item: MediaItem) => {
                const isSelected = selectedUrls.includes(item.url);
                return (
                  <div 
                    key={item._id} 
                    onClick={() => toggleSelection(item.url)}
                    className={`group relative aspect-square rounded-xl overflow-hidden border-2 cursor-pointer transition-all shadow-sm hover:shadow-md ${
                      isSelected ? 'border-softGold' : 'border-transparent bg-white hover:border-softGold/30'
                    }`}
                  >
                    <Image 
                      src={item.url} 
                      alt={item.name || "Gallery Item"} 
                      fill 
                      className="object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                    <div className={`absolute inset-0 bg-softGold/20 transition-opacity flex items-center justify-center ${
                      isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'
                    }`}>
                      <CheckCircle className={`${isSelected ? 'text-softGold' : 'text-white'} drop-shadow-md`} size={32} />
                    </div>
                    {isSelected && allowMultiple && (
                      <div className="absolute top-2 right-2 w-6 h-6 bg-softGold text-white rounded-full flex items-center justify-center text-[10px] font-bold shadow-lg">
                        {selectedUrls.indexOf(item.url) + 1}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
