import "@/styles/globals.css";
import clsx from "clsx";
import { Metadata, Viewport } from "next";
import { Archivo, Archivo_Black } from "next/font/google";
import localFont from "next/font/local";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/react";
import Footer from "@/components/footer";
import Navbar from "@/components/nav/navbar";
import TopBar from "@/components/nav/top-bar";
import { container } from "@/components/primitives";
import { SITE_CONFIG } from "@/data/config";
import { AuthProvider } from "./client-session-provider";
// import { auth } from "./api/auth/[...nextauth]/options";

export const fontSans = Archivo({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-sans",
});

export const fontSansBlack = Archivo_Black({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans-black",
  weight: "400",
});

export const fontBentoga = localFont({
  src: "./Bentoga-Thin.otf",
  display: "swap",
  variable: "--font-bentoga",
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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isProduction = process.env.VERCEL_ENV === "production";
  // const session = await auth()
  return (
    <html
      lang="en"
      className={clsx(
        fontBentoga.variable,
        fontSans.variable,
        fontSansBlack.variable,
      )}
      suppressHydrationWarning
    >
      <head />
      <body className="min-h-screen bg-background font-sans antialiased">
        <AuthProvider >
          <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-default from-0% to-background to-50% relative flex flex-col">
            <header>
              <TopBar />
              <Navbar />
            </header>
            <main className="py-16 flex-grow">
              <div>{children}</div>
            </main>
            <footer className={container() + " py-6 md:px-8 md:py-0"}>
              <Footer />
            </footer>
          </div>
        </AuthProvider>
        <Analytics />
      </body>
      {isProduction && <GoogleAnalytics gaId={SITE_CONFIG.googleAnalyticsId} />}
    </html>
  );
}
