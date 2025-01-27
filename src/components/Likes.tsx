import { Box } from "@chakra-ui/react";
import { GrLike } from "react-icons/gr";

// const createLikes = async (userId:string,postId:string) => {
//   const res = await fetch(`https://world-map-sns.vercel.app/api/Likes/`)
// }

const Likes = () => {
  return (
    <Box>
      <GrLike />
    </Box>
  );
};

export default Likes;
