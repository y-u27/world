import { Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase/supabase";
import UserImage from "./UserImage";

const UserImages = () => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      const { data, error } = await supabase.storage
        .from("user-image-buket")
        .list("public");
      if (error) {
        console.error("画像取得エラー", error.message);
        return;
      }
      if (data) {
        const imageUrls = data.map(
          (file) =>
            supabase.storage
              .from("user-image-buket")
              .getPublicUrl(`public/${file.name}`).data.publicUrl
        );
        setImages(imageUrls);
      }
    };
    fetchImages()
  }, []);

  return (
    <Box>
      {images.map((imagePath) => (
        <UserImage key={imagePath} imagePath={imagePath} />
      ))}
    </Box>
  );
};

export default UserImages;
