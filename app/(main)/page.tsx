"use client";

import { Suspense } from "react";
import { PageFallback } from "@/components";
import useUser from "@/hooks/useUser";

export default function Dashboard() {
  const { user } = useUser();
  return <Suspense fallback={PageFallback}>TODO</Suspense>;
}
