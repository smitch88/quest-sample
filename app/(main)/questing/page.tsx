"use client";

import StandardButton from "@/components/buttons/StandardButton/StandardButton";
import StandardInputField from "@/components/inputs/StandardInputField";
import AsymetricStatusTag from "@/components/tags/AsymetricStatusTag/AsymetricStatusTag";
import CardFrequencyTag from "@/components/tags/CardFrequencyTag/CardFrequencyTag";
import { Metadata } from "next";
import React from "react";
import { useState } from "react";

import LockIcon from "@/public/icons/lock.svg";
import AsymmetricalButton from "@/components/buttons/AsymmetricalButton/AsymmetricalButton";
import ChippedButton from "@/components/buttons/ChippedButton/ChippedButton";
import AsymetricInputField from "@/components/inputs/AsymetricInputField";
import HeroCard from "@/components/cards/HeroCard/HeroCard";
import DetailCard from "@/components/cards/DetailCard/DetailCard";
import { Quest, QuestStatus, QuestFrequency } from "@prisma/client";
import QuestBar from "@/components/account/QuestBar/QuestBar";
import QuestBarMobile from "@/components/account/QuestBarMobile/QuestBarMobile";
import Tabs from "@/components/Tabs";
import Modal from "@/components/modals/BaseModal/BaseModal";
import LoginModal from "@/components/modals/LoginModal/LoginModal";
import LevelUpModal from "@/components/modals/LevelUpModal/LevelUpModal";

// export const metadata: Metadata = {
//   title: "QUESTING",
//   description: "",
//   icons: {
//     icon: ["/favicon-16x16.png"],
//     apple: ["/apple-touch-icon.png"],
//   },
//   openGraph: {
//     card: "summary_large_image",
//     site: "",
//     creator: "@",
//     images: "",
//   },
// };

export default function Quests() {
  const [inputValue, setInputValue] = useState("");
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
    frequency: QuestFrequency.DAILY,
  };

  const [activeTab, setActiveTab] = useState(0);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(true);
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  const tabs = [
    { label: 'LABEL' },
    { label: 'LABEL' },
  ];

  return (
    <div className="relative flex flex-col flex-grow w-full">
      <img
        className="absolute top-0 left-0 object-cover object-top w-full  z-0 pointer-events-none"
        src="/images/backgrounds/default.png"
        alt="background"
      />
      {/* <div className="flex w-full text-foreground overflow-hidden  p-10 bg-background-foreground">
        Questing
        
        <StandardInputField
          label="Input label"
          placeholder="Type here..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          type='search'
        />
        <StandardInputField
          label="Input label"
          placeholder="Type here..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          type='password'
        />
        
      </div>
      <div className="flex w-full text-foreground overflow-hidden  p-10 bg-white">
        <QuestBar imageSrc='https://i.imgur.com/NK6VNH9.png' />
      </div>
      <div className="flex w-full text-foreground overflow-hidden  p-10 bg-white">
        <QuestBarMobile imageSrc='https://i.imgur.com/NK6VNH9.png' />
      </div>
      <div className="flex w-full text-foreground overflow-hidden  p-10 bg-white">
        <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
      </div>
      <div className="flex w-full text-foreground overflow-hidden  p-10 bg-white">
        <LevelUpModal isOpen={isLevelUpModalOpen} onClose={() => setIsLevelUpModalOpen(false)} />
      </div>
      <div className="flex w-full text-foreground overflow-hidden  p-10 bg-background-foreground">
        <AsymetricInputField
          label="Input label"
          placeholder="Type here..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          type='search'
          asymetricType="type1"
        />
        <AsymetricInputField
          label="Input label"
          placeholder="Type here..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          type='password'
          asymetricType="type1"
        />
        
      </div>
      <div className="flex w-full text-foreground overflow-hidden  p-10 bg-background-foreground">
        <StandardButton variant="primary" size="large" onClick={() => setIsLoginModalOpen(true)}>Button Label</StandardButton>
        <StandardButton variant="primary" size="small" disabled onClick={() => setIsLevelUpModalOpen(true)}>Button Label</StandardButton>
        <StandardButton variant="secondary" size="small">Button Label</StandardButton>
        <StandardButton variant="secondary" size="small" disabled>Button Label</StandardButton>
        <StandardButton variant="primary" size="medium">No Icons</StandardButton>
      </div>
      <div className="flex w-full text-foreground overflow-hidden  p-10 bg-background-foreground">
        <AsymmetricalButton variant="primary" size="large" styleType="type2">Asymmetrical Button</AsymmetricalButton>
        <AsymmetricalButton variant="primary" size="medium" styleType="type2">Asymmetrical Button</AsymmetricalButton>
        <AsymmetricalButton variant="primary" size="small" styleType="type2">Asymmetrical Button</AsymmetricalButton>
      </div>
      <div className="flex w-full text-foreground overflow-hidden  p-10 bg-background-foreground">
        <AsymmetricalButton variant="primary" size="large" styleType="type1">Asymmetrical Button</AsymmetricalButton>
        <AsymmetricalButton variant="primary" size="medium" styleType="type1">Asymmetrical Button</AsymmetricalButton>
        <AsymmetricalButton variant="primary" size="small" styleType="type1">Asymmetrical Button</AsymmetricalButton>
      </div>
      <div className="flex w-full text-foreground overflow-hidden  p-10 bg-background-foreground">
        <AsymmetricalButton variant="primary" size="large" styleType="type3">Asymmetrical Button</AsymmetricalButton>
        <AsymmetricalButton variant="primary" size="medium" styleType="type3">Asymmetrical Button</AsymmetricalButton>
        <AsymmetricalButton variant="primary" size="small" styleType="type3">Asymmetrical Button</AsymmetricalButton>
      </div>
      <div className="flex w-full text-foreground overflow-hidden  p-10 bg-background-foreground">
        <AsymmetricalButton variant="primary" size="large" styleType="type4">Asymmetrical Button</AsymmetricalButton>
        <AsymmetricalButton variant="primary" size="medium" styleType="type4">Asymmetrical Button</AsymmetricalButton>
        <AsymmetricalButton variant="primary" size="small" styleType="type4">Asymmetrical Button</AsymmetricalButton>
      </div>
      <div className="flex w-full text-foreground overflow-hidden  p-10 bg-background-foreground">
        <ChippedButton variant="primary" size="large" after={<LockIcon />} before={<LockIcon />}>Chipped Button</ChippedButton>
        <ChippedButton variant="primary" size="large" after={<LockIcon />} before={<LockIcon />} reversed>Chipped Button</ChippedButton>
        <ChippedButton variant="primary" size="small" disabled>Chipped Button</ChippedButton>
      </div>
      <div className="flex w-full text-foreground overflow-hidden  p-10 bg-background-foreground">
        <CardFrequencyTag frequency={QuestFrequency.DAILY} />
        <CardFrequencyTag frequency={QuestFrequency.ONETIME} />
        <CardFrequencyTag frequency={QuestFrequency.INFINITE} />
      </div>
      <div className="flex w-full text-foreground overflow-hidden  p-10 bg-background-foreground">
        <AsymetricStatusTag status={QuestStatus.ACTIVE} />
        <AsymetricStatusTag status={QuestStatus.IN_PROGRESS} />
        <AsymetricStatusTag status={QuestStatus.COMPLETE} />
        <AsymetricStatusTag status={QuestStatus.LOCKED} />
        <AsymetricStatusTag status={QuestStatus.EXPIRED} />
      </div>
      <div className="flex w-full text-foreground overflow-hidden  p-10 bg-background-foreground">
        <HeroCard quest={dummyQuest}/>
        <HeroCard quest={dummyQuest} type="asymmetric"/>
        <HeroCard quest={dummyQuest} type="asymmetric-reversed"/>
        <HeroCard quest={dummyQuest} type="chipped"/>
      </div>
      <div className="flex w-full text-foreground overflow-hidden  p-10 bg-background-foreground">
        <DetailCard quest={dummyQuest}/>
        <DetailCard quest={dummyQuest} type="asymmetric"/>
        <DetailCard quest={dummyQuest} type="asymmetric-reversed"/>
        <DetailCard quest={dummyQuest} type="chipped"/>
      </div>
      <div className="flex w-full text-foreground overflow-hidden  p-10 bg-background-foreground">
        <Tabs tabs={tabs} onTabChange={setActiveTab} activeTab={activeTab} />
      </div> */}
    </div>
  );
}
