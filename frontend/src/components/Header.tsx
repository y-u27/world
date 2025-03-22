import { Avatar, Box, Heading } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

const Header = () => {
  const { data: session } = useSession();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    console.log("セッション情報", session);

    const fetchAvatarUrl = async () => {
      if (session?.user?.email) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/user`
        );
        const data = await response.json();

        if (!data.image) {
          console.error("画像URL取得に失敗");
          setAvatarUrl("/default-avatar.jpeg");
        } else {
          console.log("画像URL", data.image);
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
          World Map SNS
          {session && (
            <Box
              display="flex"
              justifyContent="flex-end"
              position="absolute"
              top="1px"
              right="10px"
              padding="10px"
            >
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
