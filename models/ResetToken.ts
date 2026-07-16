import mongoose, { Schema, model, models } from "mongoose";

const ResetTokenSchema = new Schema(
  {
    email: { type: String, required: true },
    token: { type: String, required: true, unique: true },
    expires: { type: Date, required: true }
  },
  { timestamps: true }
);

// Auto-delete tokens after expiration using Mongo TTL index
ResetTokenSchema.index({ expires: 1 }, { expireAfterSeconds: 0 });

const ResetToken = models.ResetToken || model("ResetToken", ResetTokenSchema);

export default ResetToken;
