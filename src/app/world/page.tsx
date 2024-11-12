// "use client";

import WorldMapPage from "@/components/WorldMapPage";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const WorldTopPage = () => {
  // const searchParams = useSearchParams();
  // const id = Number(searchParams.get("id"));
  // const countryName = searchParams.get("countryName") || "";

  return (
    <Suspense>
      <WorldMapPage />
    </Suspense>
  );
};

export default WorldTopPage;
