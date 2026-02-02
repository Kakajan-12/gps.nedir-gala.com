"use server";

import {ReactNode} from "react";
import {NextIntlClientProvider} from "next-intl";
import Sidebar from "@/src/components/Sidebar";
import {redirect} from "next/navigation";
import {cookies} from "next/headers";
import {routing, type Locale} from "@/src/i18n/routing";
import Panel from "@/src/components/Panel";

type Props = {
    children: ReactNode;
    params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
    const resolvedParams = await params;
    const paramLocale = resolvedParams.locale;

    const locale: Locale = routing.locales.includes(paramLocale as Locale)
        ? (paramLocale as Locale)
        : routing.defaultLocale;

    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;
    if (!token) redirect("/login");

    const messages = (await import(`@/messages/${locale}.json`)).default;

    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            <main className="min-h-screen bg-gray-50">
                <div>
                    {children}
                </div>
            </main>
        </NextIntlClientProvider>
    );
}

