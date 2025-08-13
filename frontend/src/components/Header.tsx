"use client";

import {
  Avatar,
  Box,
  Heading,
  IconButton,
} from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { useRouter } from "next/navigation";

const Header = () => {
  const { data: session } = useSession();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchAvatarUrl = async () => {
      if (session?.user?.email) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/user`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: session.user.email }),
          }
        );
        const data = await response.json();

        if (!data.image) {
          setAvatarUrl("/default-avatar.jpeg");
        } else {
          setAvatarUrl(data.image);
          setUserId(data.id);
        }
      }
    };
    fetchAvatarUrl();
  }, [session]);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  return (
    <>
      <Box position="relative">
        <Heading
          color="#000080"
          bgColor="#b0c4de" 
          textAlign="center"
          h="100%"
          size="md"
          textShadow="1px 1px #ffffff"
          p={2}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            {/* ログアウト */}
            {session && (
              <IconButton
                aria-label="ログアウト"
                icon={<BiLogOut size={20} />}
                size="sm"
                onClick={handleLogout}
                variant="ghost"
              />
            )}

            {/* タイトル */}
            <Box textAlign="center" flexGrow={1}>
              <Link href="/world">World Map SNS</Link>
            </Box>

            {session && (
              <Box
                display="flex"
                justifyContent="flex-end"
                position="absolute"
                top="1px"
                right="10px"
                padding="10px"
              >

                {/* プロフィールアイコン */}
                <Link href={`/user/${userId}`}>
                  <Avatar
                    size="sm"
                    src={avatarUrl ?? "/default-avatar.jpeg"}
                    name={session.user?.name ?? "ユーザー"}
                  />
                </Link>
              </Box>
            )}
          </Box>
        </Heading>
      </Box>
    </>
  );
};

export default Header;
