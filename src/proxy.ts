import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
    const cookie = request.headers.get("cookie");
    if (!cookie) {
        return NextResponse.redirect(new URL("/signin", request.url));
    }

    try {
        const sessionResponse = await fetch(new URL("/api/auth/get-session", request.url), {
            headers: { cookie },
            cache: "no-store",
            redirect: "manual",
            signal: AbortSignal.timeout(10000),
        });

        if (!sessionResponse.ok) {
            throw new Error("Session validation failed");
        }

        const session = await sessionResponse.json();
        const response = session?.session && session?.user
            ? NextResponse.next()
            : NextResponse.redirect(new URL("/signin", request.url));

        for (const setCookie of sessionResponse.headers.getSetCookie()) {
            response.headers.append("set-cookie", setCookie);
        }

        return response;
    } catch {
        return new NextResponse("Authentication is temporarily unavailable. Please try again.", {
            status: 503,
            headers: { "Cache-Control": "no-store" },
        });
    }
}

export const config = {
    matcher: ["/products/:path*"],
};
