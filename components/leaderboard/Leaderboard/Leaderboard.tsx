'use client';
import Tabs from '@/components/Tabs';
import { User } from '@prisma/client';
import React from 'react';
import { LeaderboardRow } from '../LeaderboardRow/LeaderboardRow';

interface LeaderboardProps {
    players: User[];
}

const tabs = [
    { label: 'SEASON'},
    { label: 'ALL TIME'},
]

export const Leaderboard: React.FC<LeaderboardProps> = ({ players }) => {
    return (
        <div className='flex items-center justify-center flex-col'>
            <div className="flex w-full text-foreground overflow-hidden">
                <Tabs tabs={tabs} />
            </div>
            <div className='z-10 flex flex-col items-center justify-center mt-16 w-full'>
                <table className='w-full'>

                    <tbody>
                        {players.map((player, index) => (
                            <LeaderboardRow user={player} rank={index+1} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};