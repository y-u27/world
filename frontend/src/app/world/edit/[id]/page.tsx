import PostEdit from "../../../../components/PostEdit";

const worldEditPage = async (props: {
  params: Promise<{ id: string; userId: number }>;
}) => {
  const params = await props.params;
  return <PostEdit id={Number(params.id)} userId={params.userId} />;
};

export default worldEditPage;
