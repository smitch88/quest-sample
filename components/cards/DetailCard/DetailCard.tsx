import React from 'react';
import BaseCard, { BaseCardProps } from '../BaseCard/BaseCard';
import AsymmetricalButton from '@/components/buttons/AsymmetricalButton/AsymmetricalButton';
import { Quest, QuestStatus } from '@prisma/client';
import StatusTag from '@/components/tags/AsymetricStatusTag/AsymetricStatusTag';
import CardFrequencyTag from '@/components/tags/CardFrequencyTag/CardFrequencyTag';
import {Points} from '@/components/cards/Components/Points'

interface CardWithoutHeroImageProps extends BaseCardProps{
  quest: Quest;
  onClick?: () => void;
}

const DetailCard: React.FC<CardWithoutHeroImageProps> = ({ quest, type }) => {
  const bg = type === 'chipped' ? 'bg-gradient-v-deep' : 'bg-white';
  const text = type === 'chipped' ? 'text-white' : 'text-black';
  const description = type === 'chipped' ? 'text-white' : 'text-gray-600';
  const opacity = quest.status === QuestStatus.EXPIRED || quest.status === QuestStatus.COMPLETE ? 'opacity-50' : '';
  return (
    <BaseCard quest={quest} customStyles={`card-without-hero-image p-4 ${bg}`} type={type}>
      <div className="p-4">
        <div className='flex justify-between mt-2'>
          <div>
            <StatusTag status={quest.status}/>
          </div>
          <div className='text-neutral-500'>
            Completed x/x
          </div>
        </div>
        
        <p className="text-sm text-neutral-500">{quest.category}</p>
        <p className={`text-3xl font-main font-medium ${text} ${opacity}`} >{quest.name}</p>
        <p className={`text-sm mb-2 ${description} ${opacity}`}>{quest.description}</p>
        <AsymmetricalButton variant="primary" size="large" styleType='type2' customStyles='w-full' disabled={quest.status === QuestStatus.EXPIRED || quest.status === QuestStatus.COMPLETE}>CLAIM</AsymmetricalButton>
        <div className='flex justify-between mt-6'>
          <div>
            <Points points={100} xp={25} />
          </div>
          <div>
            <CardFrequencyTag frequency={quest.frequency}/>
          </div>
        </div>
      </div>
    </BaseCard>
  );
};

export default DetailCard;
