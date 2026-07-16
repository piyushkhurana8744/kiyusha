import mongoose, { Schema, model, models } from "mongoose";

const AddressSchema = new Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, default: "India" },
  isDefault: { type: Boolean, default: false }
});

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String }, // Can be null for OAuth logins
    phone: { type: String },
    role: { type: String, enum: ["customer", "admin"], default: "customer" },
    isVerified: { type: Boolean, default: false },
    loginAttempts: { type: Number, default: 0, required: true },
    lockUntil: { type: Date },
    savedAddresses: [AddressSchema],
    wishlist: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    cart: [
      {
        _id: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: String, required: true },
        image: { type: String, required: true },
        quantity: { type: Number, required: true, default: 1 },
        category: { type: String, required: true }
      }
    ]
  },
  { timestamps: true }
);

const User = models.User || model("User", UserSchema);

export default User;
