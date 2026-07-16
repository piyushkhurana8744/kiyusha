import mongoose, { Schema, model, models } from "mongoose";

const RateLimitSchema = new Schema(
  {
    ip: { type: String, required: true },
    route: { type: String, required: true },
    timestamp: { type: Date, required: true, default: Date.now }
  },
  { timestamps: false }
);

// Auto-delete entries after 1 hour (3600 seconds)
RateLimitSchema.index({ timestamp: 1 }, { expireAfterSeconds: 3600 });
// Search index on IP and route
RateLimitSchema.index({ ip: 1, route: 1 });

const RateLimit = models.RateLimit || model("RateLimit", RateLimitSchema);

export default RateLimit;
