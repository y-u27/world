import { Avatar, Box, Heading } from "@chakra-ui/react";
import { createClient } from "@supabase/supabase-js";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const Header = () => {
  const { data: session } = useSession();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    console.log("セッション情報", session);

    const fetchAvatarUrl = async () => {
      if (session?.user?.email) {
        const { data } = supabase.storage
          .from("user-image-buket")
          .getPublicUrl(`public/${session?.user?.email}`);

        if (!data?.publicUrl) {
          console.error("画像URL取得に失敗");
          setAvatarUrl("/default-avatar.jpeg");
        } else {
          console.log("画像URL", data.publicUrl);
          setAvatarUrl(data.publicUrl);
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
              />
            </Box>
          )}
        </Heading>
      </Box>
    </>
  );
};

export default Header;
