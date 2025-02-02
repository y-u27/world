import { Box, IconButton } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { GrLike } from "react-icons/gr";

const createLikes = async (userId: number, postId: number) => {
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

  return res.json();
};

const Likes = ({ postId }: { postId: number }) => {
  const [liked, setLiked] = useState(false);
  const { data: session } = useSession();
  console.log("セッション情報：", session);

  const handleLike = async () => {
    if (!session?.user?.id) {
      console.error("ログインしていません");
      return;
    }
    try {
      const userId = Number(session.user.id);
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
        colorScheme={liked ? "pink" : "gray"}
      />
    </Box>
  );
};

export default Likes;
