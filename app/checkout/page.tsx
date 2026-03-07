"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ChevronLeft, 
  Check, 
  CreditCard, 
  Truck, 
  Shield, 
  Lock,
  Loader2,
  ShoppingBag,
  ArrowRight,
  Package
} from "lucide-react";
import { useCart, CartItem } from "@/context/CartContext";
import Footer from "@/components/Footer";

type CheckoutStep = "information" | "shipping" | "payment";

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  paymentMethod: "cod" | "card";
}

const initialFormData: FormData = {
  email: "",
  firstName: "",
  lastName: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  paymentMethod: "cod",
};

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [step, setStep] = useState<CheckoutStep>("information");
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const subtotal = totalPrice;
  const shipping = subtotal >= 2000 ? 0 : 150;
  const discount = 0; // Could add coupon logic
  const total = subtotal + shipping - discount;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitInformation = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("shipping");
  };

  const handleSubmitShipping = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("payment");
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    setOrderComplete(true);
    clearCart();
  };

  if (items.length === 0 && !orderComplete) {
    return (
      <main className="bg-ivory min-h-screen">
        <div className="container-lux py-20">
          <div className="flex flex-col items-center justify-center gap-4">
            <ShoppingBag size={64} className="text-deepCharcoal/20" />
            <h1 className="font-heading text-3xl text-deepCharcoal">Your bag is empty</h1>
            <p className="text-deepCharcoal/60">Add some beautiful pieces to get started</p>
            <Link 
              href="/collections/new-arrivals" 
              className="bg-deepCharcoal text-warmWhite px-8 py-3 rounded-xl font-medium hover:bg-black transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (orderComplete) {
    return (
      <main className="bg-ivory min-h-screen">
        <div className="container-lux py-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto text-center space-y-6"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <Check size={40} className="text-green-600" />
            </div>
            <h1 className="font-heading text-4xl text-deepCharcoal">Thank You!</h1>
            <p className="text-deepCharcoal/60">
              Your order has been placed successfully. We'll send you an email confirmation shortly.
            </p>
            <div className="bg-white p-6 rounded-2xl border border-black/5">
              <p className="text-sm text-deepCharcoal/50 uppercase tracking-wider mb-2">Order Number</p>
              <p className="text-xl font-medium">KYSH-{Date.now().toString().slice(-8)}</p>
            </div>
            <Link 
              href="/collections/new-arrivals" 
              className="inline-block bg-deepCharcoal text-warmWhite px-8 py-3 rounded-xl font-medium hover:bg-black transition-colors"
            >
              Continue Shopping
            </Link>
          </motion.div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="bg-ivory min-h-screen">
      
      <div className="container-lux py-8">
        {/* Back Link */}
        <Link href="/collections/new-arrivals" className="inline-flex items-center gap-2 text-sm text-deepCharcoal/50 hover:text-softGold transition-colors mb-8">
          <ChevronLeft size={16} />
          Continue Shopping
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Forms */}
          <div>
            {/* Progress Steps */}
            <div className="flex items-center gap-4 mb-8">
              {["information", "shipping", "payment"].map((s, idx) => (
                <div key={s} className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step === s 
                      ? "bg-softGold text-deepCharcoal" 
                      : ["information", "shipping", "payment"].indexOf(step) > idx 
                        ? "bg-green-500 text-white"
                        : "bg-black/5 text-deepCharcoal/40"
                  }`}>
                    {["information", "shipping", "payment"].indexOf(step) > idx ? <Check size={16} /> : idx + 1}
                  </div>
                  <span className={`text-xs uppercase tracking-wider ${
                    step === s ? "text-deepCharcoal font-medium" : "text-deepCharcoal/40"
                  }`}>
                    {s}
                  </span>
                  {s !== "payment" && <div className="w-8 h-px bg-black/10" />}
                </div>
              ))}
            </div>

            {/* Information Step */}
            {step === "information" && (
              <motion.form 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onSubmit={handleSubmitInformation} 
                className="space-y-6"
              >
                <h2 className="font-heading text-2xl text-deepCharcoal">Contact Information</h2>
                
                <div className="space-y-4">
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-softGold/20 focus:border-softGold transition-all"
                  />
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-softGold/20 focus:border-softGold transition-all"
                  />
                </div>

                <h2 className="font-heading text-2xl text-deepCharcoal pt-4">Shipping Address</h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    required
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-softGold/20 focus:border-softGold transition-all"
                  />
                  <input
                    type="text"
                    name="lastName"
                    required
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-softGold/20 focus:border-softGold transition-all"
                  />
                </div>

                <input
                  type="text"
                  name="address"
                  required
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-softGold/20 focus:border-softGold transition-all"
                />

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="city"
                    required
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-softGold/20 focus:border-softGold transition-all"
                  />
                  <input
                    type="text"
                    name="state"
                    required
                    placeholder="State"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-softGold/20 focus:border-softGold transition-all"
                  />
                </div>

                <input
                  type="text"
                  name="pincode"
                  required
                  placeholder="PIN Code"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-softGold/20 focus:border-softGold transition-all"
                />

                <button 
                  type="submit"
                  className="w-full bg-deepCharcoal text-warmWhite py-4 rounded-xl font-medium tracking-widest uppercase text-sm hover:bg-black transition-all"
                >
                  Continue to Shipping
                </button>
              </motion.form>
            )}

            {/* Shipping Step */}
            {step === "shipping" && (
              <motion.form 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                onSubmit={handleSubmitShipping} 
                className="space-y-6"
              >
                <h2 className="font-heading text-2xl text-deepCharcoal">Shipping Method</h2>
                
                <div className="space-y-3">
                  <label className="flex items-center justify-between p-4 border-2 border-softGold rounded-xl cursor-pointer bg-softGold/5">
                    <div className="flex items-center gap-3">
                      <input type="radio" name="shipping" value="standard" defaultChecked className="accent-softGold" />
                      <div>
                        <p className="font-medium text-deepCharcoal">Standard Shipping</p>
                        <p className="text-sm text-deepCharcoal/50">5-7 business days</p>
                      </div>
                    </div>
                    <span className="font-medium text-deepCharcoal">
                      {subtotal >= 2000 ? "Free" : "₹150"}
                    </span>
                  </label>
                  
                  <label className="flex items-center justify-between p-4 border border-black/10 rounded-xl cursor-pointer hover:border-softGold/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <input type="radio" name="shipping" value="express" className="accent-softGold" />
                      <div>
                        <p className="font-medium text-deepCharcoal">Express Shipping</p>
                        <p className="text-sm text-deepCharcoal/50">2-3 business days</p>
                      </div>
                    </div>
                    <span className="font-medium text-deepCharcoal">₹299</span>
                  </label>
                </div>

                <div className="flex gap-4">
                  <button 
                    type="button"
                    onClick={() => setStep("information")}
                    className="px-6 py-3 border border-black/10 rounded-xl font-medium hover:border-softGold transition-colors"
                  >
                    Back
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 bg-deepCharcoal text-warmWhite py-3 rounded-xl font-medium tracking-widest uppercase text-sm hover:bg-black transition-all"
                  >
                    Continue to Payment
                  </button>
                </div>
              </motion.form>
            )}

            {/* Payment Step */}
            {step === "payment" && (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <h2 className="font-heading text-2xl text-deepCharcoal">Payment Method</h2>
                
                <div className="space-y-3">
                  <label className="flex items-center justify-between p-4 border-2 border-softGold rounded-xl cursor-pointer bg-softGold/5">
                    <div className="flex items-center gap-3">
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="cod" 
                        checked={formData.paymentMethod === "cod"}
                        onChange={() => setFormData({ ...formData, paymentMethod: "cod" })}
                        className="accent-softGold" 
                      />
                      <div className="flex items-center gap-2">
                        <Truck size={20} />
                        <p className="font-medium text-deepCharcoal">Cash on Delivery</p>
                      </div>
                    </div>
                  </label>
                  
                  <label className="flex items-center justify-between p-4 border border-black/10 rounded-xl cursor-pointer hover:border-softGold/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="card"
                        checked={formData.paymentMethod === "card"}
                        onChange={() => setFormData({ ...formData, paymentMethod: "card" })}
                        className="accent-softGold" 
                      />
                      <div className="flex items-center gap-2">
                        <CreditCard size={20} />
                        <p className="font-medium text-deepCharcoal">Card Payment</p>
                      </div>
                    </div>
                  </label>
                </div>

                {formData.paymentMethod === "card" && (
                  <div className="space-y-4 p-4 border border-black/10 rounded-xl">
                    <input
                      type="text"
                      placeholder="Card Number"
                      className="w-full px-4 py-3 bg-white border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-softGold/20 focus:border-softGold transition-all"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 bg-white border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-softGold/20 focus:border-softGold transition-all"
                      />
                      <input
                        type="text"
                        placeholder="CVV"
                        className="w-full px-4 py-3 bg-white border border-black/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-softGold/20 focus:border-softGold transition-all"
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2 text-sm text-deepCharcoal/50">
                  <Lock size={16} />
                  <span>Your payment information is secure and encrypted</span>
                </div>

                <div className="flex gap-4">
                  <button 
                    type="button"
                    onClick={() => setStep("shipping")}
                    className="px-6 py-3 border border-black/10 rounded-xl font-medium hover:border-softGold transition-colors"
                  >
                    Back
                  </button>
                  <button 
                    type="button"
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="flex-1 bg-deepCharcoal text-warmWhite py-3 rounded-xl font-medium tracking-widest uppercase text-sm hover:bg-black transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Shield size={20} className="text-softGold" />
                        Place Order
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <div className="bg-white rounded-2xl border border-black/5 p-6">
              <h2 className="font-heading text-xl text-deepCharcoal mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item._id} className="flex gap-4">
                    <div className="relative w-20 h-24 bg-ivory rounded-lg overflow-hidden flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-softGold text-[10px] flex items-center justify-center rounded-full text-deepCharcoal font-medium">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-deepCharcoal text-sm line-clamp-1">{item.name}</h3>
                      <p className="text-xs text-deepCharcoal/50">{item.category}</p>
                    </div>
                    <p className="font-medium text-deepCharcoal text-sm">
                      {formatPrice(parseFloat(item.price.replace(/[^0-9.]/g, "")) * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-black/5 pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-deepCharcoal/60">Subtotal</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-deepCharcoal/60">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? <span className="text-green-600">Free</span> : formatPrice(shipping)}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-lg font-medium pt-3 border-t border-black/5">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-black/5">
                <div className="flex items-center gap-2 text-xs text-deepCharcoal/50">
                  <Shield size={16} className="text-softGold" />
                  <span>Secure checkout with SSL encryption</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-deepCharcoal/50 mt-2">
                  <Truck size={16} className="text-softGold" />
                  <span>Free shipping on orders above ₹2,000</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
