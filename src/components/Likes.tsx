import { Box, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { GrLike } from "react-icons/gr";

const createLikes = async (id: number, userId: string, postId: string) => {
  const res = await fetch(`https://world-map-sns.vercel.app/api/likes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, postId }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(`Error ${res.status}: ${errorData.error}`);
  }

  const postDataLikes = await res.json();
  return postDataLikes.data;
};

const Likes = ({
  id,
  userId,
  postId,
}: {
  id: number;
  userId: string;
  postId: string;
}) => {
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    try {
      await createLikes(id, userId, postId);
      setLiked(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box>
      <IconButton
        aria-label="いいね"
        icon={<GrLike />}
        onClick={handleLike}
        colorScheme={liked ? "pink" : "gray"}
      />
    </Box>
  );
};

export default Likes;
