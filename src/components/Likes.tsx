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

const deleteLikes = async (userId: number, postId: number) => {
  try {
    const response = await fetch(`https://world-map-sns.vercel.app/api/likes`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId, postId }),
    });
    if (response.ok) {
      console.log("いいねを削除しました");
    }
  } catch (error) {
    console.error("いいねが削除できませんでした", error);
  }
};

const Likes = ({ postId }: { postId: number }) => {
  const [liked, setLiked] = useState(false);
  const { data: session } = useSession();
  // console.log("セッション情報：", session);

  const handleLike = async () => {
    if (!session?.user?.id) {
      console.error("ログインしていません");
      return;
    }
    const userId = Number(session.user.id);
    try {
      if (liked) {
        await deleteLikes(userId, postId);
        //いいねを削除した後に更新
        setLiked(false);
      } else {
        await createLikes(userId, postId);
        //いいねを追加した後に更新
        setLiked(true);
      }
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
        colorScheme={liked ? "#81E6D9" : "gray"}
      />
    </Box>
  );
};

export default Likes;
