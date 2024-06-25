import StandardButton from "@/components/buttons/StandardButton/StandardButton";
import StandardInputField from "@/components/inputs/StandardInputField";
import AsymetricStatusTag from "@/components/tags/AsymetricStatusTag/AsymetricStatusTag";
import CardFrequencyTag from "@/components/tags/CardFrequencyTag/CardFrequencyTag";
import { Metadata } from "next";
import React from "react";
import HeroCard from "@/components/cards/HeroCard/HeroCard";
import DetailCard from "@/components/cards/DetailCard/DetailCard";
import { Quest, QuestStatus, QuestFrequency } from "@prisma/client";
import QuestBar from "@/components/account/QuestBar/QuestBar";
import Tabs from "@/components/Tabs";
import { QuestLibrary } from "@/components/quests/QuestLibrary/QuestLibray";

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
  const dummyQuest: Quest = {
    id: '1',
    name: "Join the Sparkball Discord & chill with us!",
    description: "Lorem ipsum dolor sit amet consectetur. Lobortis consectetur sagittis lorem tempus vitae cras amet aliquam.Lorem ipsum dolor sit amet consectetur.",
    status: QuestStatus.EXPIRED,
    createdAt: new Date(),
    updatedAt: new Date(),
    imageUrl: "",
    reward: 100,
    expiresAt: new Date(),
    category: "PRESEASON",
    frequency: QuestFrequency.INFINITE,
  };

  const tabs = [
    { label: 'DAILY' },
    { label: 'SEASON' },
    { label: 'COMPLETE' },
  ];

  return (
    <div className="relative flex flex-col flex-grow w-full">
      {/* <img
        className="absolute top-0 left-0 object-cover object-top w-full z-0 pointer-events-none"
        src="/images/backgrounds/default.png"
        alt="background"
      /> */}
      <div className='z-10'>
        <div className="flex flex-col justify-center w-full h-32 ml-16">
          <h1 className="text-4xl font-header italic font-bold text-black">QUESTING</h1>
        </div>
        <div className="flex w-full text-foreground overflow-hidden ml-10">
          <QuestBar imageSrc='https://i.imgur.com/NK6VNH9.png'/>
        </div>
        <QuestLibrary tabs={tabs}/>
      </div>
    </div>
  );
}
