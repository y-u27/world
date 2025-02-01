"use client";

import WorldMapPage from "@/components/WorldMapPage";

const WorldTopPage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const id = Number(searchParams.id);
  const userId = searchParams.userId ? String(searchParams.userId) : "";
  const postId = searchParams.postId ? String(searchParams.postId) : "";

  return (
    <>
      <WorldMapPage id={id} userId={userId} postId={postId}/>
    </>
  );
};

export default WorldTopPage;
