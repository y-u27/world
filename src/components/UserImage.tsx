// 既に存在する画像パス（imagePath）を使って Supabase から URL を取得し、そのURLをアイコンとして表示するコンポーネント
// 目的:1つの画像パス (imagePath) を使って、Supabase ストレージから画像の公開URLを取得し、その画像を Avatar として表示

import { Avatar, Box } from "@chakra-ui/react";

type UserImageProps = {
  imagePath: string;
};

const UserImage: React.FC<UserImageProps> = ({
  imagePath,
}: {
  imagePath: string;
}) => {
  if (!imagePath) return <Box>Loading...</Box>

  return (
    <Box>
      <Avatar name="User Icon" src={imagePath} bg="blue.300" size="md" />
    </Box>
  );
};

export default UserImage;
