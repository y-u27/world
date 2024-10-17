import PostEdit from "@/components/PostEdit";
import { Box } from "@chakra-ui/react";

const worldEditPage = ({ params }: { params: { id: string } }) => {
  return (
    <Box>
      <PostEdit id={Number(params.id)} />
    </Box>
  );
};

export default worldEditPage;
