import { Avatar, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase/supabase";

type UserImageProps = {
  imagePath: string;
};

const UserImage: React.FC<UserImageProps> = ({
  imagePath,
}: {
  imagePath: string;
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      if (!imagePath) return;

      const { data } = await supabase.storage
        .from("user-image-buket")
        .getPublicUrl(imagePath);
      setImageUrl(data.publicUrl);
    };
    fetchImage();
  }, [imagePath]);

  if (!imageUrl) return <Box>Loading...</Box>

  return (
    <Box>
      <Avatar name="User Icon" src={imageUrl} bg="blue.300" size="md" />
    </Box>
  );
};

export default UserImage;
