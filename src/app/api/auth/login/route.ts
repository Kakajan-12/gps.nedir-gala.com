import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { phone, password } = await req.json();

        const backendResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ phone, password }),
            }
        );

        const data = await backendResponse.json();

        if (!backendResponse.ok) {
            return NextResponse.json(
                { success: false, message: data.message || "Login failed" },
                { status: backendResponse.status }
            );
        }

        const response = NextResponse.json(
            { success: true, user: data.data.user },
            { status: 200 }
        );

        response.cookies.set({
            name: "accessToken",
            value: data.data.accessToken,
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            path: "/",
        });

        response.cookies.set({
            name: "refreshToken",
            value: data.data.refreshToken,
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            path: "/",
        });

        return response;

    } catch (error: unknown) {
        const message =
            error instanceof Error ? error.message : "Internal Server Error";

        return NextResponse.json(
            { success: false, message },
            { status: 500 }
        );
    }

}
