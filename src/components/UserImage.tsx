import { Avatar, Box, Button, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase/supabase";

const UserImage = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      const { data } = await supabase.storage
        .from("user-image-buket")
        .getPublicUrl("IMG_2483.jpeg");

      if (data) {
        setImageUrl(data.publicUrl);
      }
    };
    fetchImage();
  }, []);

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
