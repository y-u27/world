import PostEdit from "../../../../components/PostEdit";

const worldEditPage = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  return <PostEdit id={Number(params.id)} />;
};

export default worldEditPage;
