"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UserInformation from "@/components/UserInformation";
import { Box } from "@chakra-ui/react";

export default function UserPage({ params }: { params: { id: string } }) {
  const [user, setUser] = useState<{
    id: string;
    name: string;
    image: string;
    email: string;
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

        if (!session || session.user.id !== params.id) {
          router.push(session ? "/error" : "/login");
          return;
        }

        setUser({
          id: session.user.id,
          name: session.user.name || "ゲスト",
          image: session.user.image || "/default-avatar.jpeg",
          email: session.user.email
        });
      } catch (error) {
        console.error("セッション取得エラー:", error);
        router.push("/login");
      }
    };

    fetchUserData();
  }, [params.id, router]);

  if (!user) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box>
      <UserInformation imagePath={user.image} userName={user.name}/>
    </Box>
  );
}
