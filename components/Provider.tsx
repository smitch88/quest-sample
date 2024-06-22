"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  DynamicContextProvider,
  EthereumWalletConnectors,
} from "@/lib/dynamic";
import { SkeletonTheme } from "@/components";

const Provider = ({ children }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const referralCode = searchParams.get("code");

  const handleConnect = async (args) => {
    const { authToken, handleLogOut } = args;
    try {
      const { success } = await fetch("/api/connect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          referralById: referralCode,
        }),
      }).then((res) => res.json());

      if (success) {
        router.refresh();
      } else {
        await handleLogOut();
        router.push("/login");
      }
    } catch (e) {
      console.error(e);
      await handleLogOut();
      router.push("/login");
      console.error(
        "There was an unexpected error connecting. Please try again."
      );
    }
  };

  return (
    <DynamicContextProvider
      theme="light"
      shadowDOMEnabled={false}
      settings={{
        environmentId: process.env.NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID,
        walletConnectors: [EthereumWalletConnectors],
        eventsCallbacks: {
          onAuthSuccess: handleConnect,
        },
      }}
    >
      <SkeletonTheme baseColor="#171B2A" highlightColor="#6e6e6e">
        {children}
      </SkeletonTheme>
    </DynamicContextProvider>
  );
};

export default Provider;
