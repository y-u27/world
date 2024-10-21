import { Avatar, Box, Button, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase/supabase";

type UserImageProps = {
  imagePath: string | null;
};

const UserImage: React.FC<UserImageProps> = ({ imagePath }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      if (!imagePath) return;

      const { data } = await supabase.storage
        .from("user-image-buket")
        .getPublicUrl("IMG_2483.jpeg");

      if (data) {
        setImageUrl(imagePath);
      }
    };
    fetchImage();
  }, [imagePath]);

  return (
    <Box>
      <Avatar
        name="User Icon"
        src={imageUrl || undefined}
        bg="blue.300"
        size="md"
      />
    </Box>
  );
};

export default UserImage;
