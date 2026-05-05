"use client";

import { Avatar, Box, IconButton } from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { useRouter } from "next/navigation";
import CtaButton from "./CtaButton";
import Notice from "./Notice";
import SearchBar from "./SearchBar";

// オプションのデフォルト値
const DEFAULT_OPTIONS = {
  disableDefaultUI: false, // デフォルトのUI（ズームコントロールなど）を無効化
  draggable: true, // ドラッグを無効化
  zoomControl: false, // ズーム操作を無効化
  scrollwheel: false, // スクロールホイールによるズームを無効化
  disableDoubleClickZoom: true, // ダブルクリックによるズームを無効化
  mapTypeControl: false, // 地図タイプコントロール
  fullscreenControl: false, // フルスクリーン無効化
};

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
          },
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
      <Box bg="white" px={{ base: 3, md: 6 }} py={2}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          {/* ログアウト */}
          {/* ヘッダー左端 */}
          {session && (
            <IconButton
              aria-label="ログアウト"
              icon={<BiLogOut size={17} />}
              size="sm"
              onClick={handleLogout}
              variant="ghost"
            />
          )}

          {/* タイトル */}
          {/* ヘッダー左寄せ */}
          <Box
            fontSize="lg"
            fontWeight="bold"
            textAlign="left"
            flexGrow={1}
            color="#000080"
            bgColor="#ffffff"
          >
            World Map SNS
          </Box>

          {/* ヘッダー右端 */}
          <Box display="flex" alignItems="center" gap={{ base: 1, md: 3 }}>
            {/* CTAボタン */}
            <CtaButton />
            {/* お知らせボタン */}
            <Notice />
            {/* ユーザーアイコン */}
            {session && (
              <Link href={`/user/${userId}`}>
                <Avatar
                  size="sm"
                  src={avatarUrl ?? "/default-avatar.jpeg"}
                  name={session.user?.name ?? "ユーザー"}
                />
              </Link>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Header;
