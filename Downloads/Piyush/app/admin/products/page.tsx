"use client";

import { useState } from "react";
import { useProducts, useDeleteProduct, Product } from "@/hooks/useProducts";
import Link from "next/link";
import { Plus, Search, Edit3, Trash2, Loader2, AlertCircle } from "lucide-react";
import Image from "next/image";

export default function ProductsListPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; product: Product | null }>({
    isOpen: false,
    product: null,
  });

  // Using custom hooks
  const { data: products = [], isLoading, isError, error } = useProducts();
  const deleteMutation = useDeleteProduct();

  // Filter products based on search
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (product: Product) => {
    setDeleteModal({ isOpen: true, product });
  };

  const confirmDelete = async () => {
    if (deleteModal.product) {
      try {
        await deleteMutation.mutateAsync(deleteModal.product._id);
        setDeleteModal({ isOpen: false, product: null });
      } catch (error) {
        console.error("Failed to delete product:", error);
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading text-deepCharcoal">Products</h1>
          <p className="text-deepCharcoal/50 text-sm mt-1">Manage your shop inventory</p>
        </div>
        <Link 
          href="/admin/products/new" 
          className="bg-deepCharcoal text-warmWhite px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-black transition-all shadow-lg shadow-black/5 text-sm font-medium tracking-wide"
        >
          <Plus size={18} />
          New Product
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-black/5 bg-ivory/30 flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-deepCharcoal/30" size={18} />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-black/10 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-softGold/20 focus:border-softGold transition-all"
            />
          </div>
          <div className="text-sm text-deepCharcoal/50">
            {filteredProducts.length} {filteredProducts.length === 1 ? "product" : "products"}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] uppercase tracking-[0.16em] text-deepCharcoal/40 bg-ivory/10">
                <th className="px-8 py-4 font-semibold">Product</th>
                <th className="px-8 py-4 font-semibold">Category</th>
                <th className="px-8 py-4 font-semibold">Price</th>
                <th className="px-8 py-4 font-semibold">Status</th>
                <th className="px-8 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/[0.03]">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-8 py-10 text-center">
                    <div className="flex items-center justify-center gap-2 text-deepCharcoal/40">
                      <Loader2 className="animate-spin" size={20} />
                      <span>Loading products...</span>
                    </div>
                  </td>
                </tr>
              ) : isError ? (
                <tr>
                  <td colSpan={5} className="px-8 py-10 text-center">
                    <div className="flex items-center justify-center gap-2 text-red-500">
                      <AlertCircle size={20} />
                      <span>Error: {error?.message || "Failed to load products"}</span>
                    </div>
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-10 text-center text-sm text-deepCharcoal/40">
                    {searchQuery ? "No products match your search." : "No products found. Add your first product!"}
                  </td>
                </tr>
              ) : filteredProducts.map((product) => (
                <tr key={product._id} className="hover:bg-ivory/5 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="relative w-12 h-16 rounded-lg overflow-hidden bg-ivory border border-black/5">
                        <Image src={product.image} alt={product.name} fill className="object-cover" />
                      </div>
                      <div>
                        <p className="font-medium text-deepCharcoal text-sm">{product.name}</p>
                        <p className="text-[10px] text-softGold uppercase tracking-widest mt-0.5">
                          {product.badge || "Standard"}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm text-deepCharcoal/60">{product.category}</td>
                  <td className="px-8 py-5 text-sm font-medium">
                    <div>
                      {product.price}
                      {product.oldPrice && (
                        <span className="ml-2 text-xs text-deepCharcoal/40 line-through">
                          {product.oldPrice}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex flex-wrap gap-1">
                      {product.isNewArrival && (
                        <span className="inline-flex items-center px-2 py-1 rounded-md bg-amber-50 text-amber-600 text-[10px] font-bold uppercase tracking-wider">
                          New
                        </span>
                      )}
                      {product.isFeatured && (
                        <span className="inline-flex items-center px-2 py-1 rounded-md bg-purple-50 text-purple-600 text-[10px] font-bold uppercase tracking-wider">
                          Featured
                        </span>
                      )}
                      {!product.isNewArrival && !product.isFeatured && (
                        <span className="inline-flex items-center px-2 py-1 rounded-md bg-green-50 text-green-600 text-[10px] font-bold uppercase tracking-wider">
                          Active
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link 
                        href={`/admin/products/${product._id}`}
                        className="p-2 hover:bg-black/5 rounded-lg text-deepCharcoal/60 hover:text-deepCharcoal transition-colors"
                      >
                        <Edit3 size={16} />
                      </Link>
                      <button 
                        onClick={() => handleDelete(product)}
                        className="p-2 hover:bg-red-50 rounded-lg text-deepCharcoal/60 hover:text-red-600 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal.isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 rounded-full">
                <AlertCircle className="text-red-600" size={24} />
              </div>
              <h3 className="text-lg font-medium">Delete Product</h3>
            </div>
            <p className="text-deepCharcoal/60 mb-6">
              Are you sure you want to delete "{deleteModal.product?.name}"? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteModal({ isOpen: false, product: null })}
                className="px-4 py-2 text-sm font-medium text-deepCharcoal/60 hover:text-deepCharcoal transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deleteMutation.isPending}
                className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {deleteMutation.isPending && <Loader2 className="animate-spin" size={16} />}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
