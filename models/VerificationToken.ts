import mongoose, { Schema, model, models } from "mongoose";

const VerificationTokenSchema = new Schema(
  {
    email: { type: String, required: true },
    token: { type: String, required: true, unique: true },
    expires: { type: Date, required: true }
  },
  { timestamps: true }
);

// Auto-delete tokens after expiration using Mongo TTL index
VerificationTokenSchema.index({ expires: 1 }, { expireAfterSeconds: 0 });

const VerificationToken = models.VerificationToken || model("VerificationToken", VerificationTokenSchema);

export default VerificationToken;
