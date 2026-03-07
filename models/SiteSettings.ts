import { Schema, model, models } from "mongoose";

const SiteSettingsSchema = new Schema(
  {
    key: { type: String, default: "main", unique: true },

    /* ── Featured Section (homepage hero-like block) ── */
    featuredSection: {
      title: { type: String, default: "The Signature Evening Stack" },
      subtitle: { type: String, default: "Featured Product Edit" },
      description: {
        type: String,
        default:
          "Designed for elevated everyday wear, this edit layers hand-finished textures and subtle sparkle to frame the neckline and wrist with effortless luxury.",
      },
      image: {
        type: String,
        default:
          "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=1600&q=80",
      },
      highlights: {
        type: [String],
        default: [
          "18k vermeil over sterling silver",
          "Hypoallergenic and nickel-safe",
          "Tarnish-resistant everyday finish",
        ],
      },
      ctaHref: { type: String, default: "/shop-the-look/signature-evening-stack" },
    },

    /* ── Owner / Brand Story ── */
    ownerInfo: {
      name: { type: String, default: "" },
      title: { type: String, default: "" },
      photo: { type: String, default: "" },
      story: { type: String, default: "" },
      email: { type: String, default: "" },
      instagram: { type: String, default: "" },
      phone: { type: String, default: "" },
    },
  },
  { timestamps: true }
);

const SiteSettings = models.SiteSettings || model("SiteSettings", SiteSettingsSchema);

export default SiteSettings;
