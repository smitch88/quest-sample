"use client";

import {
  DynamicUserProfile,
  useDynamicContext,
} from "@dynamic-labs/sdk-react-core";
import clsx from "clsx";
import useSWR from "swr";
import { Skeleton } from "@/components";

const fetcher = (url) => fetch(url).then((res) => res.json());

// TODO: Replace with snapser
const ConnectButton = ({
  className,
  containerClassName,
  enableMobile = false,
}) => {
  const { setShowAuthFlow, isAuthenticated, setShowDynamicUserProfile, user } =
    useDynamicContext();

  const { data: me, isLoading: isLoadingMe } = useSWR(
    user?.userId ? `/api/me?id=${user.userId}` : null,
    fetcher
  );

  return isAuthenticated ? (
    <div className="flex justify-end">
      {isLoadingMe ? (
        <div className="flex flex-col min-w-[80px] lg:w-[120px]">
          <Skeleton height={25} />
        </div>
      ) : (
        <button
          className={clsx("flex-row items-center gap-2", {
            "hidden md:flex": !enableMobile,
            flex: enableMobile,
          })}
          onClick={() => setShowDynamicUserProfile(true)}
        >
          <img
            className="rounded-full w-[45px] h-[45px] border border-neutral-900"
            src={me?.imageUrl || "/images/default-avatar.png"}
            alt="image url"
          />
          <div className="flex flex-col items-start justify-start">
            <p className="font-header uppercase text-white/90 hover:text-white text-xl">
              {user?.username}
            </p>
            <span className="text-sm text-neutral uppercase font-header">
              {me?.xp} Fame
            </span>
          </div>
        </button>
      )}
      <DynamicUserProfile />
    </div>
  ) : (
    <div
      className={clsx("flex flex-row gap-4 items-center", containerClassName)}
    >
      <button
        className={clsx(
          "font-header px-4 md:px-8 md:py-2 bg-white text-black bg-white rounded-md uppercase border-[1px] border-neutral-850 text-base md:text-xl",
          className
        )}
        onClick={() => setShowAuthFlow(true)}
      >
        Connect
      </button>
    </div>
  );
};

export default ConnectButton;
