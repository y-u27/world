"use client";

import WorldMapPage from "@/components/WorldMapPage";
import { useSearchParams } from "next/navigation";

const WorldTopPage = () => {
  const searchParams = useSearchParams();
  const id = Number(searchParams.get("id"));
  const countryName = searchParams.get("countryName") || "";

  return (
    <>
      <WorldMapPage id={id} countryName={countryName} />
    </>
  );
};

export default WorldTopPage;
