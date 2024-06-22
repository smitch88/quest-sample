import { getLeaderboard } from "@/lib/actions/leaderboard";
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

export default async function Leaderboard() {
  const data = await getLeaderboard({ limit: 10000 });
  return (
    <div className="relative flex flex-col flex-grow w-full">
      <img
        className="absolute top-0 left-0 object-cover object-top w-full z-[1] pointer-events-none"
        src="/images/backgrounds/default_long.png"
        alt="background"
      />
      <div className="flex w-full text-foreground overflow-hidden z-[2] p-10">
        <table className="min-w-full font-header uppercase text-xl">
          <thead className="border-b-[2px] border-brand">
            <tr>
              <th
                scope="col"
                className="px-3 py-3 text-left text-sm font-semibold w-10 text-center"
              >
                #
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-left text-sm font-semibold"
              >
                USERNAME
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-sm font-semibold text-right"
              >
                QUESTS
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-sm font-semibold text-right"
              >
                XP
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.map(({ id, username, xp, quests, imageUrl }, index) => {
              const rank = index + 1;
              const isFirst = rank === 1;
              const isSecond = rank === 2;
              const isThird = rank === 3;
              return (
                <tr
                  key={id}
                  className="border-t-[1px] border-brand text-base md:text-3xl"
                >
                  <td className="whitespace-nowrap px-3 py-5 font-semibold w-[10] text-lg md:text-3xl text-center">
                    {isFirst ? "🥇" : isSecond ? "🥈" : isThird ? "🥉" : rank}
                  </td>
                  <td className="whitespace-nowrap px-3 py-5 flex flex-row items-center gap-4">
                    <img
                      className="rounded-full w-[42px] h-[42px] border border-brand"
                      src={imageUrl || "/images/default-avatar.png"}
                      alt="image url"
                    />
                    <p className="font-semibold text-ellipsis overflow-hidden w-full">
                      {username}
                    </p>
                  </td>
                  <td className="whitespace-nowrap px-3 py-5 font-semibold text-right">
                    {quests}
                  </td>
                  <td className="whitespace-nowrap px-3 py-5 font-semibold text-right">
                    {xp}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
