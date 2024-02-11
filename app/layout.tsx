import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Fira_Code, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { Providers } from "./providers";
import Navbar from "@/components/nav/navbar";
import { SITE_CONFIG } from "@/data/config";
import clsx from "clsx";
import { GoogleAnalytics } from "@next/third-parties/google";

export const fontSans = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const fontMono = Fira_Code({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url!),
  alternates: {
    canonical: "/",
  },
  title: {
    default: SITE_CONFIG.name,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  appleWebApp: {
    capable: true,
    title: SITE_CONFIG.name,
    statusBarStyle: "black-translucent",
  },
  formatDetection: { telephone: false },
  openGraph: {
    type: "website",
    url: "/",
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    siteName: SITE_CONFIG.name,
  },
  twitter: {
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    card: "summary_large_image",
    site: "@KudosPortal",
    creator: "@KudosPortal",
  },
};

export const viewport: Viewport = {
  themeColor: "#020817",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={clsx(fontMono.variable, fontSans.variable)}
      suppressHydrationWarning
    >
      <head />
      <body className="min-h-screen bg-background font-sans antialiased">
        <Providers themeProps={{ attribute: "class", defaultTheme: "kudos" }}>
          <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-default from-0% to-background to-80% relative flex flex-col h-screen">
            <Navbar />
            <main className="py-16 flex-grow">
              <div>{children}</div>
            </main>
            <footer className="py-6 px-6 md:px-8 md:py-0">
              <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
                  Built by{" "}
                  <a
                    href={SITE_CONFIG.links.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium underline underline-offset-4"
                  >
                    Kudos
                  </a>
                  . The source code is available on{" "}
                  <a
                    href={SITE_CONFIG.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium underline underline-offset-4"
                  >
                    GitHub
                  </a>
                  .
                </p>
              </div>
            </footer>
          </div>
        </Providers>
        <Analytics />
      </body>
      <GoogleAnalytics gaId={SITE_CONFIG.googleAnalyticsId} />
    </html>
  );
}
