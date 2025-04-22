import WorldMapPage from "../../components/WorldMapPage";

const WorldTopPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { id, userId, postId } = await searchParams;

  return (
    <WorldMapPage
      id={Number(id)}
      userId={Number(userId)}
      postId={Number(postId)}
    />
  );
};

export default WorldTopPage;
