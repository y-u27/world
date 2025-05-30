"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UserInformation from "../../../components/UserInformation";
import { Box, Spinner } from "@chakra-ui/react";

export default function UserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const paramsId = use(params);
  const [user, setUser] = useState<{
    id: number;
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
          router.push("/world");
          return;
        }
        const session = await res.json();

        if (!session) {
          router.push("/login");
          return;
        }

        const userRes = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/user`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: session.user.email }),
          }
        );
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
          comment: userData.comment || ""
        });
      } catch (error) {
        console.error("セッション取得エラー:", error);
        router.push("/login");
      }
    };

    fetchUserData();
  }, [paramsId.id, router]);

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
        email={user.email}
      />
    </Box>
  );
}
