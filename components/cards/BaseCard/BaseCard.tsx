import React from 'react';
import clsx from 'clsx';
import './cardStyles.css';
import { Quest, QuestStatus } from '@prisma/client'

export interface BaseCardProps {
  children?: React.ReactNode;
  quest: Quest;
  customStyles?: string;
  type?: 'default' | 'chipped' | 'asymmetric' | 'asymmetric-reversed';
}

const BaseCard: React.FC<BaseCardProps> = ({ children, quest, type='default', customStyles = '' }) => {
  // const chipClasses = clsx({
  //   'chipped-card-clip-path rounded-lg': chipped,
  //   'card-clip-path': !chipped,
  // });
  const chipClasses = clsx({
    'rounded': type === 'default',
    'chipped-card-clip-path rounded-lg': type === 'chipped',
    'card-clip-path': type === 'asymmetric',
    'reversed-card-clip-path': type === 'asymmetric-reversed',
  });


  return (
    <div className={`shadow-lg m-2 ${customStyles} min-w-[320px] w-[320px] h-[360px] min-h-[360px] ${chipClasses}`}>
      {children}
    </div>
  );
};

export default BaseCard;
