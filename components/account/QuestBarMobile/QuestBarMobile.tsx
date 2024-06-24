import React from 'react';
import './QuestBarMobile.styles.css';
import StandardButton from '@/components/buttons/StandardButton/StandardButton';

const QuestBarMobile = ({ imageSrc, currentXP = 70, level = 1, maxXP = 100 }) => {
  const segments = 8; // Total number of segments in the progress bar
  const filledSegments = Math.floor((currentXP / maxXP) * segments) - 1;
  const partialFill = ((currentXP / maxXP) * segments) % 1;

  return (
    <div className="relative flex flex-col items-center">
      <div className="flex items-center rounded-lg w-full max-w-4xl z-0">
        {/* Image on the left side */}
        <div className="flex-shrink-0">
          <img src={imageSrc} alt="Character" className="w-18 h-18 z-0" width={72}/>
        </div>
        {/* Top rectangle with level progress */}
        <div className="relative bg-neutral-800 h-[72px] w-[278px] flex items-center z-0">
          <div className="flex items-center ml-4">
            <span className="text-white mr-2 font-header text-sm italic font-bold">LV.{level}</span>
            <div className="flex gap-0.5">
              {Array.from({ length: segments }).map((_, index) => (
                <div
                  key={index}
                  className={`h-1 w-5 -skew-x-12 rounded-sm ${
                    index < filledSegments
                      ? 'bg-brand-blaze glow shimmer-small'
                      : index === filledSegments
                      ? 'bg-brand-blaze'
                      : 'bg-gray-700'
                  }`}
                />
              ))}
            </div>
            <span className="text-white ml-2 font-header text-sm italic font-bold">LV.{level + 1}</span>
          </div>
        </div>
      </div>

      {/* Bottom rectangle */}
      <div className="bg-gray-600 h-[72px] w-[350px] bottom-rect flex items-center"></div>

      <div className="absolute z-1 top-16 left-12 bg-brand-lime w-[35px] h-[20px] -skew-x-12 flex items-center justify-center text-xl font-black shrink-text">
        <span className="text-black truncate">LV.{level}</span>
      </div>
      <div className="absolute z-1 top-20 mt-3 left-2 bg-neutral-800 border-brand-lime border-2 w-[93px] h-[56px] -skew-x-12 flex flex-col items-center justify-center text-white shrink-text">
        <p className='text-neutral-300 text-xs truncate'>Base Fame</p>
        <p className='text-3xl font-black shrink-text truncate'>625</p>
      </div>
      <div className="absolute z-1 top-20 mt-3 left-[105px] bg-neutral-800 border-brand-lime border-2 w-[93px] h-[56px] -skew-x-12 flex flex-col items-center justify-center text-white shrink-text">
        <p className='text-neutral-300 text-xs truncate'>Multiplier</p>
        <p className='text-3xl font-black shrink-text truncate'>2.3X</p>
      </div>
      <div className="absolute z-1 top-20 mt-3 left-[203px] bg-brand-lime text-black w-[115px] h-[56px] -skew-x-12 flex items-center justify-center shrink-text">
        <div className="flex items-baseline">
          <span className="text-black text-3xl mr-1 font-black shrink-text truncate">2,410</span>
          <span className="text-black text-lg font-bold shrink-text truncate">FAME</span>
        </div>
      </div>

      <StandardButton customStyles='w-full rounded-lg mt-4'>
        <span className="text-white font-bold ">QUESTS</span>
      </StandardButton>
    </div>
  );
};

export default QuestBarMobile;
