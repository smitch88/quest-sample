'use client';
import { User } from "@prisma/client";

interface LeaderboardRowProps {
    user: User;
    rank: number;
}

export const LeaderboardRow: React.FC<LeaderboardRowProps> = ({ user, rank }) => {
    return (
        <tr className="bg-white p-2 h-20 text-2xl italic">
            <td className="w-1/20"><img src={user.imageUrl} alt="avatar" className="w-16 h-16 mx-2" /></td>
            <td className="w-3/10">
                <span className=" font-bold">{rank}. {user.username.toUpperCase()}</span>
            </td>
            <td className="w-3/20">DATAPOINT</td>
            <td className="w-3/20">DATAPOINT</td>
            <td className="w-3/20">DATAPOINT</td>
            <td className="w-2/20 -skew-x-12">
                <span className="p-1 font-bold bg-brand-lime not-italic">{user.xp}</span>
            </td>
        </tr>
    );
}
