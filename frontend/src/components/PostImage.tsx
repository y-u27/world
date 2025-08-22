import { v4 as uuidv4 } from "uuid";
import { supabase } from "../../utils/supabase/supabase";
import { Box, Input } from "@chakra-ui/react";
import { useState } from "react";

const PostImage = () => {
  const [selectPostImageUrl, setSelectPostImageUrl] = useState<string | null>(
    null
  );

  //投稿時の画像保存処理
  const handleUploadPostImage = async (file: File) => {
    console.log("画像アップロードを開始", file);

    const filePostPath = `public/${uuidv4()}`;
    const { data, error } = await supabase.storage
      .from("post-image-bucket")
      .upload(`${filePostPath}`, file);

    if (error) {
      console.log("画像アップロードに失敗", error);
    } else {
      console.log("画像アップロードに成功", data);

      const { data: urlData } = supabase.storage
        .from("post-image-bucket")
        .getPublicUrl(`${filePostPath}`);

      if (urlData?.publicUrl) {
        setSelectPostImageUrl(urlData.publicUrl);
        console.log("アップロードされた画像URL:", urlData.publicUrl);
      } else {
        console.error("画像URL取得に失敗");
      }
    }
  };

  return (
    <Box>
      <Input
        type="file"
        onChange={(e) => {
          const selectedPostFiles = e.target.files?.[0] || null;
          if (selectedPostFiles) {
            handleUploadPostImage(selectedPostFiles);
          }
        }}
      />
    </Box>
  );
};

export default PostImage;
