import DailyIcon from '@/components/icons/daily.svg';
import InfiniteIcon from '@/components/icons/infinity.svg';
import './CardFrequencyTag.styles.css';  // Adjust the path as necessary
import { QuestFrequency } from '@prisma/client';


const CardFrequencyTag = ({ frequency }: { frequency: QuestFrequency }) => {
  const gradients: { [key: string]: string } = {
    [QuestFrequency.DAILY]: 'text-gradient-daily',
    [QuestFrequency.ONETIME]: 'text-white', // For one-time, we will just use black text
    [QuestFrequency.INFINITE]: 'text-gradient-infinite',
  };

  const icons: { [key: string]: JSX.Element | null } = {
    [QuestFrequency.DAILY]: <DailyIcon className='w-7 h-7 inline-block'/>,
    [QuestFrequency.ONETIME]: null,
    [QuestFrequency.INFINITE]: <InfiniteIcon className='w-7 h-7 inline-block'/>,
  };

  return (
    <>
      <div className={`flex items-center justify-center text-xl font-black font-header italic rounded-full`}>
        <div className={`flex items-center ${gradients[frequency]}`}>
          {icons[frequency]}
          <span className="ml-1 mr-1">{frequency}</span>
        </div>
      </div>
    </>
  );
};

export default CardFrequencyTag;
