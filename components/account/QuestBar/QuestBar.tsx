import React from 'react';
import './QuestBar.styles.css';
import StandardButton from '@/components/buttons/StandardButton/StandardButton';

const QuestBar = ({ imageSrc, currentXP = 70, level = 1, maxXP = 100 }) => {
  const segments = 10; // Total number of segments in the progress bar
  const filledSegments = Math.floor((currentXP / maxXP) * segments) - 1;

  return (
    <div className="relative flex justify-center items-center">
      <div className="flex items-center rounded-lg p-6 w-full max-w-4xl z-0">
        {/* Image on the left side */}
        <div className="flex-shrink-0">
          <img src={imageSrc} alt="Character" className="w-36 h-36" />
        </div>
        {/* Right side content */}
        <div className="h-36 flex flex-col justify-between">
          {/* Rectangle with cut off corner */}
          <div className="relative bg-neutral-800 h-[72px] w-[744px] overflow-hidden top-rect flex items-center">
            <div className="flex items-center ml-8">
              <span className="text-white mr-4 font-header text-xl italic font-bold">LV.{level}</span>
              <div className="flex gap-1 relative">
                {Array.from({ length: segments }).map((_, index) => (
                  <div
                    key={index}
                    className={`h-2 w-10 -skew-x-12 rounded-sm ${
                      index <= filledSegments
                        ? 'bg-brand-blaze shimmer glow'
                        : 'bg-gray-700'
                    }`}
                  />
                ))}
              </div>
              <span className="text-white ml-4 font-header text-xl italic font-bold">LV.{level + 1}</span>
            </div>
          </div>
          {/* Light gray rectangle */}
          <div className="bg-gray-600 h-[72px] w-[516px] bottom-rect"></div>
        </div>
      </div>

      {/* Skewed Rectangles */}
      <div className="absolute z-1 top-36 left-28 bg-brand-lime w-[69px] h-[40px] -skew-x-12 flex items-center justify-center text-3xl font-black shrink-text">
        <span className="text-black truncate">LV.{level}</span>
      </div>
      <div className="absolute z-1 top-28 left-48 bg-neutral-800 border-brand-lime border-2 w-[110px] h-[72px] -skew-x-12 flex flex-col items-center justify-center text-white shrink-text">
        <p className='text-neutral-300 text-xs truncate'>Base Fame</p>
        <p className='text-3xl font-black shrink-text truncate'>625</p>
      </div>
      <div className="absolute z-1 top-28 left-[310px] bg-neutral-800 border-brand-lime border-2 w-[110px] h-[72px] -skew-x-12 flex flex-col items-center justify-center text-white shrink-text">
        <p className='text-neutral-300 text-xs truncate'>Multiplier</p>
        <p className='text-3xl font-black shrink-text truncate'>2.3X</p>
      </div>
      <div className="absolute z-1 top-28 left-[430px] bg-brand-lime text-black w-[170px] h-[72px] -skew-x-12 flex items-center justify-center shrink-text">
        <div className="flex items-baseline">
          <span className="text-black text-5xl mr-1 font-black shrink-text truncate">2,410</span>
          <span className="text-black text-xl font-bold shrink-text truncate">FAME</span>
        </div>
      </div>
      <div className="absolute z-1 top-24 left-[647px] h-[72px] w-[225px] m-1">
          <StandardButton customStyles='rounded-none -skew-x-[45deg] h-full w-full' size='large'>
            <span className='text-white font-bold skew-x-[45deg]'>Daily Draw</span>
          </StandardButton>
      </div>
    </div>
  );
};

export default QuestBar;
