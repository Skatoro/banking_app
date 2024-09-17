import type {Metadata} from "next";
import {Viewport} from 'next'
import {Mulish} from "next/font/google";
import "./globals.scss";
import LayoutClient from "@/components/layout/Layout";
import React from "react";
import cn from "clsx";

const inter = Mulish({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Banking app",
    description: "Stack: Next.js, TailwindCSS, React Hook Form",
};

export const viewport: Viewport = {
    themeColor: 'light',
    colorScheme: 'light',
}

export default async function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {

    return (
        <html lang="en" >
            <body className={cn(inter.className, 'dark')}>
                <LayoutClient>{children}</LayoutClient>
            </body>
        </html>
    );
}
