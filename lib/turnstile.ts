/**
 * Verifies a Cloudflare Turnstile challenge token.
 * Returns true if the token is valid, false otherwise.
 * 
 * @param token Cloudflare Turnstile client-side token
 * @param ip Optional client IP address
 */
export async function verifyTurnstileToken(token: string, ip?: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  // If secret key is not set, log warning and fail-open in development, but block in production
  if (!secretKey) {
    console.warn("TURNSTILE_SECRET_KEY is missing in environment variables.");
    if (process.env.NODE_ENV !== "production") {
      console.warn("Dev mode: Turnstile validation bypassed.");
      return true;
    }
    return false;
  }

  try {
    const formData = new URLSearchParams();
    formData.append("secret", secretKey);
    formData.append("response", token);
    if (ip) {
      formData.append("remoteip", ip);
    }

    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });

    if (!response.ok) {
      return false;
    }

    const data = await response.json();
    return !!data.success;
  } catch (error) {
    console.error("Turnstile verification connection error:", error);
    return false;
  }
}
