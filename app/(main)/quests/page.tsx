import { Metadata } from "next";

export const metadata: Metadata = {
  title: "QUESTING",
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

export default function Quests() {
  return (
    <div className="relative flex flex-col flex-grow w-full">
      <img
        className="absolute top-0 left-0 object-cover object-top w-full z-[1] pointer-events-none"
        src="/images/backgrounds/default.png"
        alt="background"
      />
      <div className="flex w-full text-foreground overflow-hidden z-[2] p-10">
        Questing
      </div>
    </div>
  );
}
