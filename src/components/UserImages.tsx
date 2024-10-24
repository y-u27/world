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
      if (data) {
        setImages(data.map((file) => `public/${file.name}`));
      }
    };
    fetchImages();
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
