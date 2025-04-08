import { getLikes } from "../app/types/postType";
import { Box, IconButton } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { GrLike } from "react-icons/gr";

async function fetchAllLikes(
  userId: number,
  postId: number
): Promise<getLikes[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/likes?userId=${userId}&postId=${postId}`,
    { cache: "no-cache" }
  );
  if (!res.ok) {
    throw Error(`Error ${res.status}:いいねの取得失敗`);
  }
  return res.json();
}

const createLikes = async (userId: number, postId: number) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/likes`, {
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
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/likes`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, postId }),
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Error ${response.status}: ${errorData.error}`);
    }
    console.log("いいねを削除しました");
  } catch (error) {
    console.error("いいねが削除できませんでした", error);
  }
};

const Likes = ({ postId }: { postId: number }) => {
  const [liked, setLiked] = useState(false);
  const { data: session } = useSession();

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

  useEffect(() => {
    const getLikeData = async () => {
      if (!session?.user?.id) return;
      const userId = Number(session.user.id);

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/likes?userId=${userId}&postId=${postId}`,
          {
            cache: "no-store",
          }
        );
        // console.log("ログイン中のユーザー", userId);
        // console.log("この投稿にいいねしました", postId);

        if (!res.ok) throw new Error("いいね状態の取得失敗");

        const data = await res.json();
        setLiked(data.data[0]);
      } catch (error) {
        console.error("いいねの取得失敗", error);
      }
    };
    getLikeData();
  }, [session?.user?.id, postId]);

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
