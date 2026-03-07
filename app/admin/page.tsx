"use client";

import { motion } from "framer-motion";
import { Database, Plus, ShoppingBag, Sparkles, Package, Star } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useProductStats, useProducts } from "@/hooks/useProducts";

export default function AdminDashboard() {
  const [seeding, setSeeding] = useState(false);
  const [seedResult, setSeedResult] = useState<any>(null);
  
  // Using TanStack Query hooks for data fetching
  const { data: stats, isLoading: statsLoading } = useProductStats();
  const { data: products = [], isLoading: productsLoading } = useProducts();

  const triggerSeed = async () => {
    setSeeding(true);
    try {
      const res = await fetch("/api/seed");
      const data = await res.json();
      setSeedResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setSeeding(false);
    }
  };

  const dashboardStats = [
    { 
      label: "Total Products", 
      value: statsLoading ? "..." : stats?.totalProducts ?? 0, 
      icon: ShoppingBag, 
      color: "text-blue-600" 
    },
    { 
      label: "New Arrivals", 
      value: statsLoading ? "..." : stats?.newArrivals ?? 0, 
      icon: Sparkles, 
      color: "text-amber-500" 
    },
    { 
      label: "Featured Items", 
      value: statsLoading ? "..." : stats?.featured ?? 0, 
      icon: Star, 
      color: "text-purple-600" 
    },
    { 
      label: "Categories", 
      value: statsLoading ? "..." : stats?.categories ?? 0, 
      icon: Package, 
      color: "text-green-600" 
    },
  ];

  return (
    <div className="space-y-12">
      <header>
        <h1 className="font-heading text-4xl text-deepCharcoal">Welcome back, Admin</h1>
        <p className="text-deepCharcoal/60 mt-2">Manage your luxury jewellery collection from here.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-xl bg-ivory ${stat.color}`}>
                <stat.icon size={20} />
              </div>
            </div>
            <p className="text-sm text-deepCharcoal/50 uppercase tracking-widest">{stat.label}</p>
            <p className="text-3xl font-medium mt-1">{stat.value}</p>
          </div>
        ))}

        <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm flex flex-col justify-between">
           <div className="flex items-center justify-between mb-4">
               <div className="p-2 rounded-xl bg-ivory text-softGold">
                 <Database size={20} />
               </div>
           </div>
           <div>
               <p className="text-sm text-deepCharcoal/50 uppercase tracking-widest">Initial Setup</p>
               <button 
                 onClick={triggerSeed}
                 disabled={seeding}
                 className="mt-2 text-sm font-medium text-softGold hover:underline disabled:opacity-50 inline-flex items-center gap-2"
               >
                 {seeding ? "Seeding..." : "Seed Database from Static Data"}
               </button>
               {seedResult && (
                 <p className="text-[10px] text-green-600 mt-1">Success: {seedResult.count} items seeded.</p>
               )}
           </div>
        </div>
      </div>

      {/* Recent Products Preview */}
      {!productsLoading && products.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-medium">Recent Products</h2>
            <Link 
              href="/admin/products" 
              className="text-sm text-softGold hover:underline font-medium"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {products.slice(0, 5).map((product) => (
              <div key={product._id} className="bg-white p-3 rounded-xl border border-black/5">
                <div className="aspect-[3/4] relative rounded-lg overflow-hidden bg-ivory mb-3">
                   <img 
                    src={product.image} 
                    alt={product.name}
                    className="object-cover w-full h-full"
                   />
                </div>
                <p className="text-sm font-medium truncate">{product.name}</p>
                <p className="text-xs text-deepCharcoal/50">{product.category}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-medium">Quick Actions</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/admin/products/new" className="group bg-deepCharcoal text-warmWhite p-8 rounded-2xl hover:bg-black transition-all flex flex-col items-center justify-center gap-4 text-center">
             <div className="p-3 bg-white/10 rounded-full group-hover:scale-110 transition-transform">
               <Plus size={24} className="text-softGold" />
             </div>
             <div>
               <p className="font-medium text-lg tracking-tight">Add New Product</p>
               <p className="text-sm text-white/50 font-light mt-1">Upload images and set pricing</p>
             </div>
          </Link>
          
          <Link href="/admin/products" className="group bg-white border border-black/5 p-8 rounded-2xl hover:border-softGold/30 transition-all flex flex-col items-center justify-center gap-4 text-center">
             <div className="p-3 bg-ivory rounded-full group-hover:scale-110 transition-transform">
               <ShoppingBag size={24} className="text-deepCharcoal" />
             </div>
             <div>
               <p className="font-medium text-lg tracking-tight text-deepCharcoal">Manage Products</p>
               <p className="text-sm text-deepCharcoal/50 font-light mt-1">Edit, update or remove items</p>
             </div>
          </Link>
          
          <Link href="/admin/media" className="group bg-white border border-black/5 p-8 rounded-2xl hover:border-softGold/30 transition-all flex flex-col items-center justify-center gap-4 text-center">
             <div className="p-3 bg-ivory rounded-full group-hover:scale-110 transition-transform">
               <Database size={24} className="text-deepCharcoal" />
             </div>
             <div>
               <p className="font-medium text-lg tracking-tight text-deepCharcoal">Media Library</p>
               <p className="text-sm text-deepCharcoal/50 font-light mt-1">Manage images and assets</p>
             </div>
          </Link>

          <Link href="/admin/settings" className="group bg-white border border-black/5 p-8 rounded-2xl hover:border-softGold/30 transition-all flex flex-col items-center justify-center gap-4 text-center">
             <div className="p-3 bg-ivory rounded-full group-hover:scale-110 transition-transform">
               <Sparkles size={24} className="text-softGold" />
             </div>
             <div>
               <p className="font-medium text-lg tracking-tight text-deepCharcoal">Site Settings</p>
               <p className="text-sm text-deepCharcoal/50 font-light mt-1">Featured section & brand story</p>
             </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
