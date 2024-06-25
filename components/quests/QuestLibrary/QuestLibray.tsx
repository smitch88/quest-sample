'use client'
import StandardButton from "@/components/buttons/StandardButton/StandardButton"
import DetailCard from "@/components/cards/DetailCard/DetailCard"
import HeroCard from "@/components/cards/HeroCard/HeroCard"
import Tabs from "@/components/Tabs"
import { Quest, QuestFrequency, QuestStatus } from "@prisma/client"

interface QuestLibraryProps {
    tabs: {label: string}[]
}

export const QuestLibrary: React.FC<QuestLibraryProps> = ({ tabs }) => {
    const dummyQuest: Quest = {
        id: '1',
        name: "Join the Sparkball Discord & chill with us!",
        description: "Lorem ipsum dolor sit amet consectetur. Lobortis consectetur sagittis lorem tempus vitae cras amet aliquam.Lorem ipsum dolor sit amet consectetur.",
        status: QuestStatus.COMPLETE,
        createdAt: new Date(),
        updatedAt: new Date(),
        imageUrl: "",
        reward: 100,
        expiresAt: new Date(),
        category: "PRESEASON",
        frequency: QuestFrequency.DAILY,
      };

      const dummyQuest2: Quest = {
        id: '1',
        name: "Join the Sparkball Discord & chill with us!",
        description: "Lorem ipsum dolor sit amet consectetur. Lobortis consectetur sagittis lorem tempus vitae cras amet aliquam.Lorem ipsum dolor sit amet consectetur.",
        status: QuestStatus.IN_PROGRESS,
        createdAt: new Date(),
        updatedAt: new Date(),
        imageUrl: "",
        reward: 100,
        expiresAt: new Date(),
        category: "PRESEASON",
        frequency: QuestFrequency.INFINITE,
      };

    return (
        <>
            <div className="flex flex-row items-center justify-start gap-16 ml-16 mt-4">
            <span className="text-4xl font-header font-black italic"> SEASON 0 </span>
            <span className="bg-brand-lime -skew-x-12 p-2 text-2xl"> JUNE 10TH - AUG 10TH </span>
            <StandardButton customStyles="text-white font-bold" customColor="bg-neutral-800">
                Sort by
            </StandardButton>
            </div>
            <div className="flex w-full text-foreground overflow-hidden ml-16 mt-4">
                <Tabs tabs={tabs} />
            </div>
            {/* Flexbox that fits as many of the items as it can per row nd then goes to next line */}
            <div className="flex flex-wrap gap-4 mt-4 ml-16 mb-16">
                <HeroCard quest={dummyQuest}/>
                <HeroCard quest={dummyQuest} type='asymmetric'/>
                <HeroCard quest={dummyQuest} type='chipped'/>
                <DetailCard quest={dummyQuest}/>
                <DetailCard quest={dummyQuest} type='asymmetric'/>
                <DetailCard quest={dummyQuest} type='chipped'/>

                <HeroCard quest={dummyQuest2}/>
                <HeroCard quest={dummyQuest2} type='asymmetric'/>
                <HeroCard quest={dummyQuest2} type='chipped'/>
                <DetailCard quest={dummyQuest2}/>
                <DetailCard quest={dummyQuest2} type='asymmetric'/>
                <DetailCard quest={dummyQuest2} type='chipped'/>
            </div>

        </>
    )
}
