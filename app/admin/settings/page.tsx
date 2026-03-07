"use client";

import { useState, useEffect } from "react";
import {
  Loader2,
  Upload,
  Sparkles,
  Save,
  Plus,
  X,
  Image as ImageIcon,
  User,
  BookOpen,
} from "lucide-react";
import Image from "next/image";
import MediaGalleryModal from "@/components/admin/MediaGalleryModal";
import ImageCropper from "@/components/admin/ImageCropper";

type FeaturedData = {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  highlights: string[];
  ctaHref: string;
};

type OwnerData = {
  name: string;
  title: string;
  photo: string;
  story: string;
  email: string;
  instagram: string;
  phone: string;
};

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<"featured" | "owner">("featured");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [featured, setFeatured] = useState<FeaturedData>({
    title: "",
    subtitle: "",
    description: "",
    image: "",
    highlights: [],
    ctaHref: "",
  });

  const [owner, setOwner] = useState<OwnerData>({
    name: "",
    title: "",
    photo: "",
    story: "",
    email: "",
    instagram: "",
    phone: "",
  });

  const [newHighlight, setNewHighlight] = useState("");

  // Image handling
  const [galleryModal, setGalleryModal] = useState<{
    isOpen: boolean;
    field: string | null;
  }>({ isOpen: false, field: null });
  const [cropper, setCropper] = useState<{
    isOpen: boolean;
    image: string;
    field: string | null;
  }>({ isOpen: false, image: "", field: null });
  const [uploading, setUploading] = useState<string | null>(null);

  /* ── Fetch settings on mount ── */
  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => {
        if (data.featuredSection) setFeatured(data.featuredSection);
        if (data.ownerInfo) setOwner(data.ownerInfo);
      })
      .finally(() => setLoading(false));
  }, []);

  /* ── Save ── */
  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          featuredSection: featured,
          ownerInfo: owner,
        }),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  /* ── Image upload flow ── */
  const handleFileUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setCropper({ isOpen: true, image: reader.result as string, field });
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const handleCropComplete = async (croppedBlob: Blob) => {
    const field = cropper.field;
    if (!field) return;
    setUploading(field);

    const data = new FormData();
    data.set("file", croppedBlob, "settings-image.jpg");

    try {
      const res = await fetch("/api/media", { method: "POST", body: data });
      const result = await res.json();

      if (field === "featuredImage") {
        setFeatured((prev) => ({ ...prev, image: result.url }));
      } else if (field === "ownerPhoto") {
        setOwner((prev) => ({ ...prev, photo: result.url }));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUploading(null);
      setCropper({ isOpen: false, image: "", field: null });
    }
  };

  const handleGallerySelect = (urls: string[]) => {
    const field = galleryModal.field;
    if (!field || urls.length === 0) return;

    if (field === "featuredImage") {
      setFeatured((prev) => ({ ...prev, image: urls[0] }));
    } else if (field === "ownerPhoto") {
      setOwner((prev) => ({ ...prev, photo: urls[0] }));
    }
    setGalleryModal({ isOpen: false, field: null });
  };

  /* ── Highlights helpers ── */
  const addHighlight = () => {
    if (!newHighlight.trim()) return;
    setFeatured((prev) => ({
      ...prev,
      highlights: [...prev.highlights, newHighlight.trim()],
    }));
    setNewHighlight("");
  };

  const removeHighlight = (idx: number) => {
    setFeatured((prev) => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== idx),
    }));
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-softGold" size={32} />
      </div>
    );

  /* ── Tab button component ── */
  const TabBtn = ({
    id,
    icon: Icon,
    label,
  }: {
    id: "featured" | "owner";
    icon: any;
    label: string;
  }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-6 py-3 text-sm font-bold uppercase tracking-widest transition-all rounded-xl ${
        activeTab === id
          ? "bg-deepCharcoal text-warmWhite shadow-lg"
          : "bg-white text-deepCharcoal/60 hover:bg-ivory border border-black/5"
      }`}
    >
      <Icon size={16} />
      {label}
    </button>
  );

  /* ── Image picker helper ── */
  const ImagePicker = ({
    fieldKey,
    currentImage,
    label,
  }: {
    fieldKey: string;
    currentImage: string;
    label: string;
  }) => (
    <div className="space-y-3">
      <label className="text-xs uppercase tracking-[0.2em] font-bold text-deepCharcoal/40">
        {label}
      </label>
      <div className="relative aspect-video rounded-2xl overflow-hidden bg-ivory/50 border border-black/5 flex items-center justify-center group shadow-inner">
        {currentImage ? (
          <>
            <Image
              src={currentImage}
              alt={label}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3 backdrop-blur-[2px]">
              <label className="cursor-pointer bg-white text-deepCharcoal px-5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-softGold transition-all flex items-center gap-2 shadow-xl">
                <Upload size={14} />
                Replace
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e, fieldKey)}
                  className="hidden"
                />
              </label>
              <button
                type="button"
                onClick={() =>
                  setGalleryModal({ isOpen: true, field: fieldKey })
                }
                className="bg-deepCharcoal text-warmWhite px-5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all flex items-center gap-2 shadow-xl"
              >
                <ImageIcon size={14} />
                Gallery
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col gap-3 items-center">
            <label className="cursor-pointer bg-white text-deepCharcoal px-5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-softGold transition-all flex items-center gap-2 shadow-sm border border-black/5">
              <Upload size={14} />
              Upload
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload(e, fieldKey)}
                className="hidden"
              />
            </label>
            <button
              type="button"
              onClick={() =>
                setGalleryModal({ isOpen: true, field: fieldKey })
              }
              className="bg-deepCharcoal text-warmWhite px-5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all flex items-center gap-2 shadow-sm"
            >
              <ImageIcon size={14} />
              Gallery
            </button>
          </div>
        )}
        {uploading === fieldKey && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center backdrop-blur-sm">
            <Loader2 className="text-softGold animate-spin" size={24} />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading text-deepCharcoal">
            Site Settings
          </h1>
          <p className="text-deepCharcoal/50 text-sm mt-1">
            Customize your homepage featured section and brand story
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-deepCharcoal text-warmWhite px-8 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-black transition-all flex items-center gap-2 disabled:opacity-50 shadow-lg"
        >
          {saving ? (
            <Loader2 className="animate-spin" size={16} />
          ) : saved ? (
            <Sparkles size={16} className="text-softGold" />
          ) : (
            <Save size={16} />
          )}
          {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-3">
        <TabBtn id="featured" icon={Sparkles} label="Featured Section" />
        <TabBtn id="owner" icon={User} label="Owner & Story" />
      </div>

      {/* ────────── FEATURED SECTION TAB ────────── */}
      {activeTab === "featured" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-8 rounded-2xl border border-black/5 shadow-sm space-y-6">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.2em] font-medium text-deepCharcoal/60">
                  Title
                </label>
                <input
                  type="text"
                  value={featured.title}
                  onChange={(e) =>
                    setFeatured((p) => ({ ...p, title: e.target.value }))
                  }
                  placeholder="e.g. The Signature Evening Stack"
                  className="w-full px-4 py-3 bg-ivory/20 border border-black/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-softGold/20 focus:border-softGold transition-all font-medium"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.2em] font-medium text-deepCharcoal/60">
                  Subtitle
                </label>
                <input
                  type="text"
                  value={featured.subtitle}
                  onChange={(e) =>
                    setFeatured((p) => ({ ...p, subtitle: e.target.value }))
                  }
                  placeholder="e.g. Featured Product Edit"
                  className="w-full px-4 py-3 bg-ivory/20 border border-black/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-softGold/20 focus:border-softGold transition-all text-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.2em] font-medium text-deepCharcoal/60">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={featured.description}
                  onChange={(e) =>
                    setFeatured((p) => ({
                      ...p,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Describe the featured section..."
                  className="w-full px-4 py-3 bg-ivory/20 border border-black/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-softGold/20 focus:border-softGold transition-all text-sm leading-relaxed"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.2em] font-medium text-deepCharcoal/60">
                  CTA Link
                </label>
                <input
                  type="text"
                  value={featured.ctaHref}
                  onChange={(e) =>
                    setFeatured((p) => ({ ...p, ctaHref: e.target.value }))
                  }
                  placeholder="/shop-the-look/..."
                  className="w-full px-4 py-3 bg-ivory/20 border border-black/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-softGold/20 focus:border-softGold transition-all text-sm"
                />
              </div>

              {/* Highlights */}
              <div className="space-y-3">
                <label className="text-xs uppercase tracking-[0.2em] font-medium text-deepCharcoal/60">
                  Highlights
                </label>
                <div className="space-y-2">
                  {featured.highlights.map((h, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 bg-ivory/30 px-4 py-2.5 rounded-xl border border-black/5"
                    >
                      <span className="flex-1 text-sm">{h}</span>
                      <button
                        onClick={() => removeHighlight(idx)}
                        className="text-red-400 hover:text-red-500 transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newHighlight}
                    onChange={(e) => setNewHighlight(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addHighlight()}
                    placeholder="Add a highlight, e.g. 18k vermeil finish"
                    className="flex-1 px-4 py-2.5 bg-ivory/20 border border-black/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-softGold/20 focus:border-softGold transition-all text-sm"
                  />
                  <button
                    onClick={addHighlight}
                    className="bg-deepCharcoal text-warmWhite px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all flex items-center gap-1"
                  >
                    <Plus size={14} />
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm">
              <ImagePicker
                fieldKey="featuredImage"
                currentImage={featured.image}
                label="Featured Image"
              />
            </div>
          </div>
        </div>
      )}

      {/* ────────── OWNER & STORY TAB ────────── */}
      {activeTab === "owner" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-8 rounded-2xl border border-black/5 shadow-sm space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-[0.2em] font-medium text-deepCharcoal/60">
                    Owner Name
                  </label>
                  <input
                    type="text"
                    value={owner.name}
                    onChange={(e) =>
                      setOwner((p) => ({ ...p, name: e.target.value }))
                    }
                    placeholder="e.g. Khushboo Sharma"
                    className="w-full px-4 py-3 bg-ivory/20 border border-black/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-softGold/20 focus:border-softGold transition-all font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-[0.2em] font-medium text-deepCharcoal/60">
                    Title / Role
                  </label>
                  <input
                    type="text"
                    value={owner.title}
                    onChange={(e) =>
                      setOwner((p) => ({ ...p, title: e.target.value }))
                    }
                    placeholder="e.g. Founder & Creative Director"
                    className="w-full px-4 py-3 bg-ivory/20 border border-black/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-softGold/20 focus:border-softGold transition-all text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-[0.2em] font-medium text-deepCharcoal/60">
                  Brand Story
                </label>
                <textarea
                  rows={8}
                  value={owner.story}
                  onChange={(e) =>
                    setOwner((p) => ({ ...p, story: e.target.value }))
                  }
                  placeholder="Tell the story of your brand — the inspiration, the journey, and the vision..."
                  className="w-full px-4 py-3 bg-ivory/20 border border-black/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-softGold/20 focus:border-softGold transition-all text-sm leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-3 gap-6 p-6 bg-ivory/30 rounded-2xl border border-black/5">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-[0.2em] font-medium text-deepCharcoal/60">
                    Email
                  </label>
                  <input
                    type="email"
                    value={owner.email}
                    onChange={(e) =>
                      setOwner((p) => ({ ...p, email: e.target.value }))
                    }
                    placeholder="hello@kiyusha.com"
                    className="w-full px-4 py-3 bg-white border border-black/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-softGold/20 focus:border-softGold transition-all text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-[0.2em] font-medium text-deepCharcoal/60">
                    Instagram
                  </label>
                  <input
                    type="text"
                    value={owner.instagram}
                    onChange={(e) =>
                      setOwner((p) => ({ ...p, instagram: e.target.value }))
                    }
                    placeholder="@kiyusha.jewels"
                    className="w-full px-4 py-3 bg-white border border-black/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-softGold/20 focus:border-softGold transition-all text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-[0.2em] font-medium text-deepCharcoal/60">
                    Phone
                  </label>
                  <input
                    type="text"
                    value={owner.phone}
                    onChange={(e) =>
                      setOwner((p) => ({ ...p, phone: e.target.value }))
                    }
                    placeholder="+91 9876543210"
                    className="w-full px-4 py-3 bg-white border border-black/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-softGold/20 focus:border-softGold transition-all text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Photo */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm">
              <ImagePicker
                fieldKey="ownerPhoto"
                currentImage={owner.photo}
                label="Owner Photo"
              />
            </div>
          </div>
        </div>
      )}

      {/* Gallery Modal */}
      {galleryModal.isOpen && (
        <MediaGalleryModal
          onClose={() => setGalleryModal({ isOpen: false, field: null })}
          onSelect={handleGallerySelect}
        />
      )}

      {/* Cropper */}
      {cropper.isOpen && (
        <ImageCropper
          image={cropper.image}
          onCropComplete={handleCropComplete}
          onCancel={() =>
            setCropper({ isOpen: false, image: "", field: null })
          }
        />
      )}
    </div>
  );
}
