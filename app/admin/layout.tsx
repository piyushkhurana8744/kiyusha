import Link from "next/link";
import { LayoutDashboard, ShoppingBag, Image as ImageIcon, Settings, Globe } from "lucide-react";
import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Products", href: "/admin/products", icon: ShoppingBag },
    { label: "Media Library", href: "/admin/media", icon: ImageIcon },
    { label: "Settings", icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-warmWhite">
      {/* Sidebar */}
      <aside className="w-64 bg-deepCharcoal text-warmWhite flex flex-col fixed inset-y-0">
        <div className="p-8">
          <Link href="/" className="font-heading text-2xl uppercase tracking-widest flex items-center gap-2">
            Kiyusha <span className="text-[10px] bg-softGold text-deepCharcoal px-2 py-0.5 rounded uppercase tracking-normal font-sans font-bold">Admin</span>
          </Link>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href || "#"}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-sm font-medium tracking-wide"
            >
              <item.icon size={18} className="text-softGold" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition-colors text-sm font-medium tracking-wide"
          >
            <Globe size={18} className="text-softGold" />
            Back to Site
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 flex-1">
        <header className="h-20 bg-white border-b border-black/5 flex items-center justify-between px-10 sticky top-0 z-10 backdrop-blur-md bg-white/70">
          <h2 className="text-lg font-medium text-deepCharcoal tracking-tight uppercase">Admin Console</h2>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-softGold flex items-center justify-center text-xs font-bold text-deepCharcoal">
              PK
            </div>
          </div>
        </header>

        <div className="p-10">
          {children}
        </div>
      </main>
    </div>
  );
}
