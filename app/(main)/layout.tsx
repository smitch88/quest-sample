import "../globals.scss";
import type { Metadata } from "next";
import { Suspense } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import Provider from "@/components/Provider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// TODO
export const metadata: Metadata = {
  title: "Sparkball",
  description: "",
  icons: {
    icon: ["/favicon-16x16.png"],
    apple: ["/apple-touch-icon.png"],
  },
  openGraph: {
    card: "summary_large_image",
    site: "",
    creator: "@",
    images: "",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html dir="ltr" lang="en" suppressHydrationWarning>
      <body className="w-full h-full font-main bg-background text-foreground">
        <Suspense>
          <Provider>
            <div className="flex min-h-[100dvh] min-w-screen">
              <Navbar />
              <div className="flex w-full h-full pt-[80px]">{children}</div>
            </div>
            <Footer />
          </Provider>
        </Suspense>
      </body>
    </html>
  );
}
