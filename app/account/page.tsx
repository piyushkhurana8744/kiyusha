"use client";

import Footer from "@/components/Footer";
import { useSession, signOut } from "@/lib/auth-client";
import { motion } from "framer-motion";
import { LogOut, Package, Settings, User } from "lucide-react";
import { redirect } from "next/navigation";

export default function AccountPage() {
  const { data: session, isPending } = useSession();

  if (!isPending && !session) {
    redirect("/login");
  }

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ivory">
        <div className="w-8 h-8 border-2 border-softGold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-ivory text-deepCharcoal">

      <div className="container-lux py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-5xl mx-auto"
        >
          <div className="flex flex-col md:flex-row gap-12">
            {/* Sidebar */}
            <aside className="w-full md:w-64 space-y-2">
              <div className="p-6 bg-warmWhite subtle-border mb-8">
                <div className="w-16 h-16 rounded-full bg-softGold flex items-center justify-center text-2xl font-bold mb-4">
                  {session?.user.name?.charAt(0)}
                </div>
                <h2 className="font-heading text-xl truncate">{session?.user.name}</h2>
                <p className="text-xs text-black/40 truncate">{session?.user.email}</p>
              </div>

              <nav className="space-y-1">
                <button className="w-full flex items-center gap-3 px-4 py-3 bg-softGold text-deepCharcoal text-sm font-medium tracking-wide rounded-sm">
                  <User size={18} />
                  Profile Details
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-black/5 text-deepCharcoal/60 text-sm font-medium tracking-wide transition-colors rounded-sm">
                  <Package size={18} />
                  Order History
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-black/5 text-deepCharcoal/60 text-sm font-medium tracking-wide transition-colors rounded-sm">
                  <Settings size={18} />
                  Settings
                </button>
                <button 
                  onClick={() => signOut()}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-red-600 text-sm font-medium tracking-wide transition-colors rounded-sm mt-8"
                >
                  <LogOut size={18} />
                  Sign Out
                </button>
              </nav>
            </aside>

            {/* Content */}
            <div className="flex-1 bg-warmWhite p-8 md:p-12 subtle-border">
              <header className="mb-10 border-b border-black/5 pb-6">
                <h1 className="font-heading text-3xl mb-2">My Profile</h1>
                <p className="text-sm text-black/40">Manage your personal information and preferences.</p>
              </header>

              <div className="grid gap-8 max-w-2xl">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-softGold mb-2 px-1">Full Name</label>
                  <div className="w-full border-b border-black/10 py-3 text-sm font-medium">
                    {session?.user.name}
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-softGold mb-2 px-1">Email Address</label>
                  <div className="w-full border-b border-black/10 py-3 text-sm font-medium">
                    {session?.user.email}
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-softGold mb-2 px-1">Member Since</label>
                  <div className="w-full border-b border-black/10 py-3 text-sm font-medium">
                    February 2026
                  </div>
                </div>

                <div className="pt-8">
                  <button className="gold-solid-button px-8 py-4 text-xs">
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
