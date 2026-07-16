"use client";

import { useState, useEffect, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Mail, Lock, ArrowRight, CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer";

function LoginContent() {
  // Navigation & Search Query
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const verifiedParam = searchParams.get("verified");

  // Modes: 'login' or 'forgot'
  const [mode, setMode] = useState<"login" | "forgot">("login");

  // Form States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");

  // Verification Parameter Notice
  useEffect(() => {
    if (verifiedParam === "true") {
      setInfo("Email verified successfully! You may now sign in.");
    }
  }, [verifiedParam]);

  // Load Cloudflare Turnstile script
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setInfo("");

    // Retrieve Turnstile token from hidden field
    const turnstileToken = (
      document.getElementsByName("cf-turnstile-response")[0] as HTMLInputElement
    )?.value;

    if (!turnstileToken) {
      setError("Please complete the bot protection challenge.");
      setIsLoading(false);
      return;
    }

    try {
      const result = await signIn("credentials", {
        email: email.toLowerCase().trim(),
        password,
        turnstileToken,
        redirect: false
      });

      if (result?.error) {
        // Map raw system errors into readable messages
        if (result.error.includes("ACCOUNT_LOCKED")) {
          const minutes = result.error.split(":")[1] || "15";
          setError(`Your account has been temporarily locked due to too many failed attempts. Please try again in ${minutes} minutes.`);
        } else if (result.error.includes("EMAIL_UNVERIFIED")) {
          setError("Please verify your email address before signing in. Check your inbox for the activation link.");
        } else if (result.error.includes("LOGIN_WITH_OAUTH")) {
          setError("This account is registered using Google Sign-In. Please sign in with Google below.");
        } else if (result.error.includes("RATE_LIMIT_EXCEEDED")) {
          setError("Too many login requests. Please wait a minute before trying again.");
        } else if (result.error.includes("TURNSTILE_FAILED")) {
          setError("Bot verification validation failed. Please reload page and retry.");
        } else {
          setError("Invalid email address or password.");
        }
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (err) {
      setError("Failed to connect to authentication server.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setInfo("");

    const turnstileToken = (
      document.getElementsByName("cf-turnstile-response")[0] as HTMLInputElement
    )?.value;

    if (!turnstileToken) {
      setError("Please complete the bot protection challenge.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.toLowerCase().trim(), turnstileToken })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "An error occurred.");
      } else {
        setInfo(data.message || "If an account matches that email, we have sent a reset link.");
      }
    } catch (err) {
      setError("Failed to request password reset.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl });
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
            <AnimatePresence mode="wait">
              {mode === "login" ? (
                <motion.div
                  key="login-form"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-10 text-center">
                    <p className="text-xs uppercase tracking-[0.28em] text-softGold">Welcome Back</p>
                    <h1 className="mt-4 font-heading text-3xl md:text-4xl">Sign In</h1>
                    <p className="mt-4 text-sm text-black/50">Enter your details to access your collection.</p>
                  </div>

                  {error && (
                    <div className="mb-6 bg-red-50 p-4 text-sm text-red-600 subtle-border border-red-100 flex items-start gap-2">
                      <AlertCircle size={16} className="mt-0.5 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  {info && (
                    <div className="mb-6 bg-green-50 p-4 text-sm text-green-700 subtle-border border-green-100 flex items-start gap-2">
                      <CheckCircle size={16} className="mt-0.5 shrink-0" />
                      <span>{info}</span>
                    </div>
                  )}

                  <form onSubmit={handleLogin} className="space-y-6">
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
                      <div className="flex justify-between items-center mb-2 px-1">
                        <label className="block text-[10px] uppercase tracking-widest text-softGold">Password</label>
                        <button
                          type="button"
                          onClick={() => {
                            setMode("forgot");
                            setError("");
                            setInfo("");
                          }}
                          className="text-[10px] uppercase tracking-widest text-black/40 hover:text-softGold transition-colors"
                        >
                          Forgot?
                        </button>
                      </div>
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

                    {/* Turnstile Captcha */}
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
                          <span>Sign In</span>
                          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>

                    <div className="relative my-8">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-black/5"></span>
                      </div>
                      <div className="relative flex justify-center text-xs uppercase tracking-widest">
                        <span className="bg-warmWhite px-4 text-black/30">Or continue with</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleGoogleSignIn}
                      className="w-full py-5 flex items-center justify-center gap-3 border border-black/5 hover:border-softGold/30 transition-all bg-white"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="currentColor"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="currentColor"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      <span className="text-sm font-medium">Google</span>
                    </button>
                  </form>

                  <div className="mt-10 text-center">
                    <p className="text-xs text-black/40 tracking-widest">
                      NEW TO KIYUSHA?{" "}
                      <Link href="/signup" className="text-softGold hover:text-deepCharcoal transition-colors font-medium">
                        CREATE ACCOUNT
                      </Link>
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="forgot-form"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mb-10 text-center">
                    <p className="text-xs uppercase tracking-[0.28em] text-softGold">Recover Account</p>
                    <h1 className="mt-4 font-heading text-3xl md:text-4xl">Forgot Password</h1>
                    <p className="mt-4 text-sm text-black/50">Enter your email and we will send a password reset link.</p>
                  </div>

                  {error && (
                    <div className="mb-6 bg-red-50 p-4 text-sm text-red-600 subtle-border border-red-100 flex items-start gap-2">
                      <AlertCircle size={16} className="mt-0.5 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  {info && (
                    <div className="mb-6 bg-green-50 p-4 text-sm text-green-700 subtle-border border-green-100 flex items-start gap-2">
                      <CheckCircle size={16} className="mt-0.5 shrink-0" />
                      <span>{info}</span>
                    </div>
                  )}

                  <form onSubmit={handleForgotPassword} className="space-y-6">
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

                    {/* Turnstile Captcha */}
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
                          <span>Send Reset Link</span>
                          <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setMode("login");
                        setError("");
                        setInfo("");
                      }}
                      className="w-full text-center text-xs uppercase tracking-widest text-black/40 hover:text-softGold transition-colors font-bold pt-2"
                    >
                      Back to Sign In
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
      <Footer />
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-ivory">
        <Loader2 className="animate-spin text-softGold" size={40} />
      </div>
    }>
      <LoginContent />
    </Suspense>
  );
}
