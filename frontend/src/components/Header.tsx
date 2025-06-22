"use client";

import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Avatar, Box, Heading, IconButton, Input } from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { TbMapSearch } from "react-icons/tb";
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
      <Box>
        <Heading
          color="#000080"
          bgColor="#b0c4de"
          textAlign="center"
          h="100%"
          size="md"
          textShadow="1px 1px #ffffff"
          p={3}
        >
          <Link href="/world">World Map SNS</Link>
          {session && (
            <Box
              display="flex"
              justifyContent="flex-end"
              position="absolute"
              top="1px"
              right="10px"
              padding="10px"
            >
              {/* 検索窓 */}
              {/* <Box position="relative">
                <Input background="white" size="sm" width="180px" mr="40px" />
                <TbMapSearch
                  aria-label="Open menu"
                  size="xs"
                  position="absolute"
                  top="50%"
                  right="7%"
                  transform="translateY(-50%)"/>
              </Box> */}

              {/* プロフィールアイコン */}
              <Link href={`/user/${userId}`}>
                <Avatar
                  size="sm"
                  src={avatarUrl ?? "/default-avatar.jpeg"}
                  name={session.user?.name ?? "ユーザー"}
                />
              </Link>
              <Box pr="100%">
                <BiLogOut onClick={handleLogout} />
              </Box>
            </Box>
          )}
        </Heading>
      </Box>
    </>
  );
};

export default Header;
