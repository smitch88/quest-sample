import React from 'react';
import FireIcon from '@/public/icons/base_fame.svg';

export const Points = ({ points, xp, fireIcon }: { points: number, xp: number, fireIcon?: boolean }) => {
    return (
      <div className="flex items-end space-x-2 font-header italic">
        <div className="relative bg-brand-lime text-black font-bold text-2xl m-0 flex pl-1 pr-0.5 items-center h-fit">
          <span className='-m-0.5 z-50 flex items-center justify-center' style={{ lineHeight: '1' }}>
            +{points} {fireIcon && <FireIcon className="w-6 h-6 ml-1" />}
          </span>
          <div className="absolute top-0 right-0 h-full w-3 bg-brand-lime transform skew-x-12 origin-left translate-x-1 z-0"></div>
        </div>
        <div className="relative bg-brand-puff text-black font-bold text-2xl transform translate-y-1 translate-x-1 pr-1 flex items-center">
          <span className='-m-0.5 z-50 flex items-center' style={{ lineHeight: '1' }}>
            +{xp}<span className="text-xs translate-y-1">XP</span>
          </span>
          <div className="absolute top-0 left-0 h-full w-3 bg-brand-puff transform skew-x-12 origin-right -translate-x-1 z-0"></div>
        </div>
      </div>
    );
  };