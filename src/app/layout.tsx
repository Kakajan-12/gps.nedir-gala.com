import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Nedir Gala",
    icons: {
        icon: [ { url: "/logo-nedir-gala.png", type: "image/svg+xml" },],
    }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>{children}</body>
        </html>
    );
}
