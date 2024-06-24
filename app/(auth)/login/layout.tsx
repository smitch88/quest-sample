import "../../globals.scss";
import type { Metadata } from "next";
import { Suspense } from "react";
import Provider from "@/components/Provider";

// TODO
export const metadata: Metadata = {
  title: "Login",
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

export default function LoginLayout({ children: children }: { children: React.ReactNode }) {
  return (
    <html dir="ltr" lang="en" suppressHydrationWarning>
      <body className="w-full h-full font-main bg-background text-foreground">
        <Suspense>
          <Provider>
            <div className="relative flex min-h-[100dvh] min-w-screen">
              {children}
            </div>
          </Provider>
        </Suspense>
      </body>
    </html>
  );
}
