import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
	const token = await getToken({ req, secret: process.env.JWT_SECRET });

	const { pathname } = req.nextUrl;

	if (pathname.includes("/api/auth") || token) {
		return NextResponse.next();
	}

	console.log(pathname);
	if (!token && pathname !== "/login") {
		return NextResponse.redirect(new URL("/login", req.url));
		// return NextResponse.redirect("/login");
	}
}
export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - static (static files)
		 * - favicon.ico (favicon file)
		 * - _next (filesystem)
		 */
		"/((?!api|static|favicon.ico|_next).*)",
	],
};