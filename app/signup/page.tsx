"use client";

import { useState } from "react";
import { signUp } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Loader2, Mail, Lock, User, ArrowRight } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { data, error: authError } = await signUp.email({
        email,
        password,
        name,
        callbackURL: "/",
      });

      if (authError) {
        setError(authError.message || "Something went wrong during signup");
      } else {
        router.push("/");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-ivory text-deepCharcoal">
      
      <div className="flex min-h-[calc(100-200px)] items-center justify-center px-6 py-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="bg-warmWhite p-8 md:p-12 subtle-border shadow-sm">
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
                    placeholder="E.g. Jane Doe"
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
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
