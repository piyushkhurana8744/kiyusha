import connectDB from "@/lib/db";
import RateLimit from "@/models/RateLimit";

/**
 * Checks if a specific IP has exceeded request limit bounds for an action path.
 * Returns true if successful (under limit), false if rate-limited.
 * 
 * @param ip Client IP address
 * @param route Identifier of the action (e.g., 'login', 'signup', 'forgot-password')
 * @param limit Max allowed requests within the time frame
 * @param windowMs Time window in milliseconds (e.g., 60 * 1000 for 1 minute)
 */
export async function checkRateLimit(
  ip: string,
  route: string,
  limit: number = 5,
  windowMs: number = 60 * 1000
): Promise<{ success: boolean; count: number }> {
  try {
    await connectDB();
    const cutoff = new Date(Date.now() - windowMs);

    // Count requests from this IP on this route in the active time window
    const count = await RateLimit.countDocuments({
      ip,
      route,
      timestamp: { $gt: cutoff }
    });

    if (count >= limit) {
      return { success: false, count };
    }

    // Record this attempt
    await RateLimit.create({ ip, route, timestamp: new Date() });
    return { success: true, count: count + 1 };
  } catch (error) {
    console.error("Rate limiting validation error:", error);
    // Fail-secure: allow requests if database fails, but log error
    return { success: true, count: 0 };
  }
}
