import { NextRequest, NextResponse } from "next/server";
import createIntlMiddleware from "@/src/i18n/middleware";

const intlMiddleware = createIntlMiddleware;

export function proxy(req: NextRequest) {
    if (
        req.nextUrl.pathname.startsWith('/_next') ||
        req.nextUrl.pathname.includes('.') ||
        req.nextUrl.pathname === '/favicon.ico'
    ) {
        return NextResponse.next();
    }

    const intlResponse = intlMiddleware(req);
    if (intlResponse) return intlResponse;

    const token = req.cookies.get("accessToken")?.value;
    if (!token && !req.nextUrl.pathname.startsWith("/login")) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next|favicon.ico|login|api|.*\\..*).*)"],
};
