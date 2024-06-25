import { Leaderboard } from "@/components/leaderboard/Leaderboard/Leaderboard";
import { getLeaderboard } from "@/lib/actions/leaderboard";
import { User } from "@prisma/client";
import { Metadata } from "next";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "LEADERBOARD",
  description: "",
  icons: {
    icon: ["/favicon-16x16.png"],
    apple: ["/apple-touch-icon.png"],
  },
  openGraph: {
    card: "summary_large_image",
    site: "",
    creator: "@",
    images: "",
  },
};

export default async function LeaderboardPage() {
  // const data = await getLeaderboard({ limit: 10000 });
  let data: User[] = [
    {
      id: "1234456",
      username: "LittleBladed",
      credentials: null,
      email: null,
      firstVisit: new Date(),
      lastVisit: null,
      xp: 123,
      quests: 0,
      referralId: "",
      imageUrl: 'https://i.imgur.com/NK6VNH9.png'
    },
    {
      id: "1234456",
      username: "Likemyrpg",
      credentials: null,
      email: null,
      firstVisit: new Date(),
      lastVisit: null,
      xp: 1323,
      quests: 0,
      referralId: "",
      imageUrl: 'https://i.imgur.com/NK6VNH9.png'
    },
    {
      id: "1234456",
      username: "scottyfasd",
      credentials: null,
      email: null,
      firstVisit: new Date(),
      lastVisit: null,
      xp: 13,
      quests: 0,
      referralId: "",
      imageUrl: 'https://i.imgur.com/NK6VNH9.png'
    },
    {
      id: "1234456",
      username: "toliwoili",
      credentials: null,
      email: null,
      firstVisit: new Date(),
      lastVisit: null,
      xp: 456,
      quests: 0,
      referralId: "",
      imageUrl: 'https://i.imgur.com/NK6VNH9.png'
    },
    {
      id: "1234456",
      username: "rofalalascopter",
      credentials: null,
      email: null,
      firstVisit: new Date(),
      lastVisit: null,
      xp: 789,
      quests: 0,
      referralId: "",
      imageUrl: 'https://i.imgur.com/NK6VNH9.png'
    },
    {
      id: "1234456",
      username: "tyler",
      credentials: null,
      email: null,
      firstVisit: new Date(),
      lastVisit: null,
      xp: 4,
      quests: 0,
      referralId: "",
      imageUrl: 'https://i.imgur.com/NK6VNH9.png'
    },
    {
      id: "1234456",
      username: "rock",
      credentials: null,
      email: null,
      firstVisit: new Date(),
      lastVisit: null,
      xp: 234,
      quests: 0,
      referralId: "",
      imageUrl: 'https://i.imgur.com/NK6VNH9.png'
    },
    {
      id: "1234456",
      username: "shligga",
      credentials: null,
      email: null,
      firstVisit: new Date(),
      lastVisit: null,
      xp: 123,
      quests: 0,
      referralId: "",
      imageUrl: 'https://i.imgur.com/NK6VNH9.png'
    }
      
  ]

  // sort by xp
  data = data.sort((a, b) => b.xp - a.xp);

  return (
    <div className="relative flex flex-col items-center justify-center w-full">
      <div className='z-10 w-9/12'>
        <div className="flex flex-col justify-center w-full h-32 ml-1">
          <h1 className="text-4xl font-header italic font-bold text-black">LEADERBOARD</h1>
        </div>
          <Leaderboard players={data}/>
        </div>
    </div>
  );
}
