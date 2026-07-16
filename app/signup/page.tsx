"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, Mail, Lock, User, Phone, ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer";
import { signupSchema } from "@/lib/zod-schemas";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  // Load Cloudflare Turnstile script dynamically
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(false);
    setError("");

    // Retrieve Turnstile token from hidden form field injected by Cloudflare script
    const turnstileToken = (
      document.getElementsByName("cf-turnstile-response")[0] as HTMLInputElement
    )?.value;

    // 1. Zod client validation
    const payload = { name, email, phone, password, turnstileToken };
    const validation = signupSchema.safeParse(payload);
    if (!validation.success) {
      setError(validation.error.issues[0].message);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "An error occurred during registration.");
      } else {
        setIsSuccess(true);
      }
    } catch (err) {
      setError("Failed to connect to authentication server.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-ivory text-deepCharcoal">
      <div className="flex min-h-[calc(100vh-200px)] items-center justify-center px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="bg-warmWhite p-8 md:p-12 subtle-border shadow-sm">
            {isSuccess ? (
              <div className="text-center py-8 space-y-6">
                <div className="flex justify-center text-softGold">
                  <CheckCircle size={64} strokeWidth={1.5} />
                </div>
                <div className="space-y-3">
                  <h1 className="font-heading text-2xl md:text-3xl text-deepCharcoal">Verify Your Email</h1>
                  <p className="text-sm leading-relaxed text-deepCharcoal/60">
                    We have sent a verification link to <strong className="text-deepCharcoal">{email}</strong>. Please click the link inside the email to activate your account.
                  </p>
                </div>
                <div className="pt-4">
                  <Link href="/login" className="gold-solid-button inline-block px-8 py-4 text-xs font-bold uppercase tracking-widest">
                    Go to Login
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-10 text-center">
                  <p className="text-xs uppercase tracking-[0.28em] text-softGold">Join Kiyusha</p>
                  <h1 className="mt-4 font-heading text-3xl md:text-4xl">Create Account</h1>
                  <p className="mt-4 text-sm text-black/50">Experience demi-fine luxury tailored for you.</p>
                </div>

                {error && (
                  <div className="mb-6 bg-red-50 p-4 text-sm text-red-600 subtle-border border-red-100">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSignup} className="space-y-6">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-softGold mb-2 px-1">Full Name</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30">
                        <User size={16} />
                      </span>
                      <input
                        type="text"
                        placeholder="Jane Doe"
                        className="w-full bg-white border border-black/5 px-12 py-4 text-sm focus:outline-none focus:border-softGold/50 transition-colors"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-softGold mb-2 px-1">Email Address</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30">
                        <Mail size={16} />
                      </span>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        className="w-full bg-white border border-black/5 px-12 py-4 text-sm focus:outline-none focus:border-softGold/50 transition-colors"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-softGold mb-2 px-1">Phone Number</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30">
                        <Phone size={16} />
                      </span>
                      <input
                        type="tel"
                        placeholder="10-digit number"
                        className="w-full bg-white border border-black/5 px-12 py-4 text-sm focus:outline-none focus:border-softGold/50 transition-colors"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        maxLength={10}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-softGold mb-2 px-1">Password</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30">
                        <Lock size={16} />
                      </span>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full bg-white border border-black/5 px-12 py-4 text-sm focus:outline-none focus:border-softGold/50 transition-colors"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Cloudflare Turnstile widget */}
                  <div className="flex justify-center py-2">
                    <div
                      className="cf-turnstile"
                      data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "1x00000000000000000000AA"}
                      data-theme="light"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="gold-solid-button w-full py-5 flex items-center justify-center gap-3 group disabled:opacity-70"
                  >
                    {isLoading ? (
                      <Loader2 className="animate-spin" size={18} />
                    ) : (
                      <>
                        <span>Create Account</span>
                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </form>

                <div className="mt-10 text-center">
                  <p className="text-xs text-black/40 tracking-widest">
                    ALREADY HAVE AN ACCOUNT?{" "}
                    <Link href="/login" className="text-softGold hover:text-deepCharcoal transition-colors font-medium">
                      SIGN IN
                    </Link>
                  </p>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
      <Footer />
    </main>
  );
}
