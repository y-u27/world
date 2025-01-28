import { Box, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { GrLike } from "react-icons/gr";

const createLikes = async (userId: string, postId: string) => {
  const res = await fetch(`https://world-map-sns.vercel.app/api/Likes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, postId }),
  });

  if (!res.ok) {
    throw new Error("いいねの送信に失敗");
  }

  const postDataLikes = await res.json();
  return postDataLikes.data;
};

const Likes = ({ userId, postId }: { userId: string; postId: string }) => {
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    try {
      await createLikes(userId, postId);
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
        colorScheme={liked ? "blue" : "gray"}
      />
    </Box>
  );
};

export default Likes;
