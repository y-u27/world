"use client";;
import { use } from "react";

import WorldMapPage from "../../components/WorldMapPage";

const WorldTopPage = (
  props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  }
) => {
  const searchParams = use(props.searchParams);
  const id = Number(searchParams.id);
  const userId = Number(searchParams.userId);
  const postId = Number(searchParams.postId);

  return (
    <>
      <WorldMapPage id={id} userId={userId} postId={postId} />
    </>
  );
};

export default WorldTopPage;
