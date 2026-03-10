"use client";

export default function ProductSkeleton() {
  return (
    <div className="group animate-pulse">
      <div className="relative aspect-square overflow-hidden bg-warmWhite/60 subtle-border">
        {/* Aspect ratio placeholder */}
      </div>

      <div className="space-y-3 px-1 pb-2 pt-5">
        {/* Category placeholder */}
        <div className="h-2 w-16 bg-softGold/20 rounded-full" />
        
        <div className="min-h-[3rem] flex flex-col justify-start space-y-2">
          {/* Name placeholders */}
          <div className="h-4 w-full bg-deepCharcoal/5 rounded-md" />
          <div className="h-4 w-2/3 bg-deepCharcoal/5 rounded-md" />
        </div>

        <div className="flex items-center gap-2 pt-1">
          {/* Price placeholder */}
          <div className="h-5 w-20 bg-deepCharcoal/10 rounded-md" />
          {/* Discount placeholder */}
          <div className="h-3 w-12 bg-deepCharcoal/5 rounded-md" />
        </div>
      </div>
    </div>
  );
}
