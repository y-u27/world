import { Avatar, Box, Heading, Text } from "@chakra-ui/react";
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
    const fetchAvatarUrl = async () => {
      if (session?.user?.id) {
        const { data } = supabase.storage
          .from("user-image-buket")
          .getPublicUrl(`${session?.user?.id}/icon.png`);

        setAvatarUrl(data?.publicUrl ?? "/default-avatar.png");
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
          h={10}
          size="md"
          textShadow="1px 1px #ffffff"
          p={2}
        >
          World Map SNS
          {session && (
            <Box display="flex" justifyContent="flex-end" position="absolute" top="1px" right="10px" padding="10px">
              <Avatar
              size="sm"
                src={avatarUrl ?? "/default-avatar.png"}
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
