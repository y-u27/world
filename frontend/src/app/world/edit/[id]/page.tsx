import PostEdit from "../../../../components/PostEdit";
import { Box } from "@chakra-ui/react";

const worldEditPage = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  return (
    <Box>
      <PostEdit id={Number(params.id)} />
    </Box>
  );
};

export default worldEditPage;
