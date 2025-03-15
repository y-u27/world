"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UserInformation from "../../../components/UserInformation";
import { Box, Spinner } from "@chakra-ui/react";

export default function UserPage({ params }: { params: { id: string } }) {
  const [user, setUser] = useState<{
    id: string;
    name: string;
    image: string;
    email: string;
    comment: string;
  } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(`/api/get-session`);
        if (!res.ok) {
          router.push("/login");
          return;
        }
        const session = await res.json();

        if (!session) {
          router.push("/login");
          return;
        }

        const userRes = await fetch(`/api/user?id=${params.id}`);
        const userData = await userRes.json();

        if (!userRes.ok) {
          console.error("ユーザーデータ取得エラー", userData.message);
          return;
        }

        setUser({
          id: session.user.id,
          name: session.user.name || "ゲスト",
          image: session.user.image || "/default-avatar.jpeg",
          email: session.user.email,
          comment: userData.data.comment || "",
        });
      } catch (error) {
        console.error("セッション取得エラー:", error);
        router.push("/login");
      }
    };

    fetchUserData();
  }, [params.id, router]);

  if (!user) {
    return (
      <Spinner
        my="20%"
        mx="48%"
        thickness="4px"
        speed="0.8s"
        emptyColor="gray.200"
        color="teal.200"
        size="lg"
      />
    );
  }

  return (
    <Box>
      <UserInformation
        imagePath={user.image}
        userName={user.name}
        comment={user.comment}
      />
    </Box>
  );
}
