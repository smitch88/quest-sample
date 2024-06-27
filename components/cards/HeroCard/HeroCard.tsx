import React from 'react';
import BaseCard, { BaseCardProps } from '../BaseCard/BaseCard';
import CompleteIcon from '@/components/icons/check_circle.svg';
import LockIcon from '@/components/icons/lock.svg';
import clsx from 'clsx';
import StatusTag from '@/components/tags/AsymetricStatusTag/AsymetricStatusTag';
import './HeroCard.styles.css';
import { Points } from '../Components/Points';
import CardFrequencyTag from '@/components/tags/CardFrequencyTag/CardFrequencyTag';
import { QuestStatus } from '@prisma/client';

interface HeroCardProps extends BaseCardProps {
  onClick?: () => void;
}

const CardWithHeroImage: React.FC<HeroCardProps> = ({ quest, type = 'default', onClick }) => {
  return (
    <BaseCard quest={quest} type={type} customStyles="card-with-hero-image p-0 bg-neutral-800">
      <div className="relative">
        <img
          src={quest.imageUrl || '/images/backgrounds/default_hero_card.png'}
          alt="Hero"
          className={clsx(
            { 'filter grayscale': quest.status === QuestStatus.EXPIRED },
            'image-clip',
            { 'rounded-t-lg': type === 'chipped' },
            { 'rounded': type === 'default' }
          )}
        />
        {(quest.status === QuestStatus.COMPLETE || quest.status === QuestStatus.LOCKED) && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
            {quest.status === QuestStatus.COMPLETE && <CompleteIcon style={{ height: '32px', width: '32px' }} />}
            {quest.status === QuestStatus.LOCKED && <LockIcon style={{ height: '32px', width: '32px' }} />}
          </div>
        )}
      </div>
      <div className="flex justify-end mr-7 -mt-4">
        <StatusTag status={quest.status} />
      </div>
      <div className="pl-6 pr-6 pb-6 -mt-5 p-4">
        <p className="text-sm text-neutral-500">{quest.category}</p>
        <h3 className="text-xl font-bold text-white">{quest.name}</h3>
        <div className="flex justify-between mt-6">
          <div>
            <Points points={100} xp={25} />
          </div>
          <div>
            <CardFrequencyTag frequency={quest.frequency} />
          </div>
        </div>
      </div>
    </BaseCard>
  );
};

export default CardWithHeroImage;
