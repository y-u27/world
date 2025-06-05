"use client";

import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Avatar, Box, Heading, IconButton, Input } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const Header = () => {
  const { data: session } = useSession();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

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
              position="absolute"
              top="50%"
              right="20px"
              // transform="translateY(-50%)"
              display="flex"
              alignItems="center"
              gap={3}
            >
              {/* 検索窓 */}
              <Box position="relative">
                <Input background="white" size="sm" width="200px" pr="30px" />
                <IconButton
                  icon={<ArrowForwardIcon />}
                  aria-label="Open menu"
                  size="sm"
                  position="absolute"
                  top="50%"
                  right="5%"
                  transform="translateY(-50%)"
                />
              </Box>
              <Link href={`/user/${userId}`}>
                <Avatar
                  size="sm"
                  src={avatarUrl ?? "/default-avatar.jpeg"}
                  name={session.user?.name ?? "ユーザー"}
                />
              </Link>
            </Box>
          )}
        </Heading>
      </Box>
    </>
  );
};

export default Header;
