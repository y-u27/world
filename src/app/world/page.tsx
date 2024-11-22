"use client";

import WorldMapPage from "@/components/WorldMapPage";

const WorldTopPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const { id } = searchParams;

  return (
    <>
      <WorldMapPage id={Number(id)}/>
    </>
  );
};

export default WorldTopPage;
