import { betterFetch } from "@better-fetch/fetch";
import { NextResponse, type NextRequest } from "next/server";
import { auth } from "@/lib/auth"; // path to your auth file

export default async function middleware(request: NextRequest) {
    console.log("Middleware running for:", request.nextUrl.pathname);
	const { data: session } = await betterFetch<any>(
		"/api/auth/get-session",
		{
			baseURL: request.nextUrl.origin,
			headers: {
				//get the cookie from the request
				cookie: request.headers.get("cookie") || "",
			},
		},
	);
    console.log("Session data:", session);

	if (!session) {
        console.log("No session, redirecting to /login");
		return NextResponse.redirect(new URL("/login", request.url));
	}
	return NextResponse.next();
}

export const config = {
	matcher: ["/admin/:path*"],
};
