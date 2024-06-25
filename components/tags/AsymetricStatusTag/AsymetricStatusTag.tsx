// components/StatusTag.tsx
import LockSvg from '@/public/icons/lock.svg';
import CheckMark from '@/public/icons/check_circle.svg';
import './AsymetricStatusTag.styles.css';  // Adjust the path as necessary
import { QuestStatus } from '@prisma/client';
import clsx from 'clsx';


const StatusTag = ({ status }: { status: QuestStatus }) => {
    const baseClasses = "relative inline-flex items-center justify-center py-0 px-2 text-white text-base font-bold transform font-header bg-transparent mb-2"; // Set bg-transparent here
    const statusClasses: { [key: string]: string } = {
        [QuestStatus.ACTIVE]:  "before:bg-brand-frostbite",
        [QuestStatus.IN_PROGRESS]: "before:bg-brand-blaze",
        [QuestStatus.COMPLETE]: "before:bg-green-500",
        [QuestStatus.EXPIRED]: "before:bg-brand-inferno",
        [QuestStatus.LOCKED]: "before:bg-neutral-500",
    };

    const statusIcon: { [key: string]: string | JSX.Element } = {
        [QuestStatus.ACTIVE]: "•",
        [QuestStatus.IN_PROGRESS]: "•",
        [QuestStatus.COMPLETE]: <CheckMark className="w-4 h-4 inline-block" />,
        [QuestStatus.EXPIRED]: "•",
        [QuestStatus.LOCKED]: <LockSvg className="w-4 h-4 inline-block" />,
    };

    return (
        <span className={clsx(baseClasses, statusClasses[status])}>
            <span className="relative z-10 flex items-center opacity-80 py-1" style={{lineHeight: '1'}}>
                <span >{statusIcon[status]}</span>
                <span className='ml-1'>{status}</span>
            </span>
        </span>
    );
};

export default StatusTag;
