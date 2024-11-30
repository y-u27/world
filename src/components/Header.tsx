import prisma from "@/app/lib/prismaClient";
import { Avatar, Box, Heading } from "@chakra-ui/react";
import { User } from "@prisma/client";
// import { createClient } from "@supabase/supabase-js";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// );

const Header = () => {
  const { data: session } = useSession();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    console.log("セッション情報", session);

    const fetchAvatarUrl = async () => {
      if (session?.user?.email) {
        const response = await fetch(
          `https://world-map-sns.vercel.app/api/user`
        );
        const { data }: { data: User } = await response.json();

        if (!data.image) {
          console.error("画像URL取得に失敗");
          setAvatarUrl("/default-avatar.jpeg");
        } else {
          console.log("画像URL", data.image);
          setAvatarUrl(data.image);
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
              <Avatar
                size="sm"
                src={avatarUrl ?? "/default-avatar.jpeg"}
                name={session.user?.name ?? "ユーザー"}
              >
                <Link href="/myPage"></Link>
              </Avatar>
            </Box>
          )}
        </Heading>
      </Box>
    </>
  );
};

export default Header;
