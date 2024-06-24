import React from 'react';
import BaseCard, { BaseCardProps } from '../BaseCard/BaseCard';
import CompleteIcon from '@/public/icons/check_circle.svg';
import LockIcon from '@/public/icons/lock.svg';
import clsx from 'clsx';
import StatusTag from '@/components/tags/AsymetricStatusTag/AsymetricStatusTag';
import './HeroCard.styles.css';
import { Points } from '../Components/Points';
import CardFrequencyTag from '@/components/tags/CardFrequencyTag/CardFrequencyTag';
import { QuestStatus } from '@prisma/client';

interface HeroCardProps extends BaseCardProps{
  onClick?: () => void;
}

const CardWithHeroImage: React.FC<HeroCardProps> = ({ quest, type = 'default', onClick }) => {
  return (
    <BaseCard quest={quest} type={type} customStyles="card-with-hero-image p-0 bg-neutral-800">
      <div className="relative">
        <img src={quest.imageUrl || '/images/backgrounds/default_hero_card.png'} alt="Hero" className={clsx({ 'filter grayscale': quest.status === QuestStatus.EXPIRED || quest.status === QuestStatus.COMPLETE }, 'image-clip', {'rounded-t-lg': type === 'chipped'}, {'rounded': type === 'default'})} />
        {quest.status === QuestStatus.COMPLETE && <div className="absolute inset-0 flex items-center justify-center"><CompleteIcon /></div>}
        {quest.status === QuestStatus.EXPIRED && <div className="absolute inset-0 flex items-center justify-center"><LockIcon /></div>}
      </div>
      {/* // <StatusTag status={quest.status}/> put this on the right side  */}
      <div className="flex justify-end mr-7 -mt-4">
        <StatusTag status={quest.status}/>
      </div>


      <div className="pl-6 pr-6 pb-6 -mt-5">
        <p className="text-sm text-neutral-500">{quest.category}</p>
        <h3 className="text-xl font-bold text-white">{quest.name}</h3>
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

export default CardWithHeroImage;
