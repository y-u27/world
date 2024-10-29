"use client";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  HStack,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { TiArrowBackOutline } from "react-icons/ti";
import { supabase } from "../../utils/supabase/supabase";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const [file, setFile] = useState<File | null>(null);
  const [selectImageUrl, setSelectImageUrl] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!isImageUploaded) {
      console.log("画像アップロードが完了していません");
      return;
    }

    const response = await fetch(`http://localhost:3000/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, image: selectImageUrl }),
    });
    if (response.ok) {
      await signIn();
      router.push("/world");
    } else {
      console.log("error");
    }
  };

  // ユーザーが新しくアップロードする画像を Supabase に保存し、その後取得したURLをアイコンに使用できる処理
  const handleUploadImage = async () => {
    if (!file) return;

    console.log("画像アップロードを開始します", file);

    const { data, error } = await supabase.storage
      .from("user-image-buket")
      .upload(`public/${file.name}`, file);

    if (error) {
      console.error("画像アップロードに失敗しました", error);
    } else {
      console.log("画像アップロードに成功しました", data);

      const { data: urlData } = supabase.storage
        .from("user-image-buket")
        .getPublicUrl(`public/${file.name}`);

      if (urlData?.publicUrl) {
        setSelectImageUrl(urlData.publicUrl);
        setIsImageUploaded(true);
        console.log("アップロードされた画像URL:", urlData.publicUrl);
      } else {
        console.error("画像URL取得に失敗");
      }
    }
  };

  return (
    <Card width="380px" mx="540px" mt="3%" boxShadow="2xl">
      <CardBody>
        <Text pt="5%" textAlign="center" fontFamily="revert" fontSize="3xl">
          新規登録
        </Text>
        <Box
          p="5%"
          display="flex"
          justifyContent="center"
          flexDirection="column"
        >
          <Text>メールアドレス</Text>
          <Input
            type="text"
            width="300px"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Text mt="5%">パスワード</Text>
          <Input
            type="password"
            width="300px"
            onChange={(e) => setPassword(e.target.value)}
          />
          <HStack p="50px">
            <VStack>
              <Avatar src={selectImageUrl || undefined} />
              <Input
                type="file"
                onChange={(e) => {
                  const selectedFiles = e.target.files?.[0] || null;
                  setFile(selectedFiles);
                  if (selectedFiles) {
                    handleUploadImage();
                  }
                }}
                fontSize="20%"
              />
            </VStack>
            <Button
              type="submit"
              ml="50px"
              w="100px"
              _hover={{ background: "#f08080", color: "white" }}
              onClick={handleSubmit}
            >
              登録
            </Button>
          </HStack>
          <TiArrowBackOutline />
          <Link href="/login">
            <Text>ログインへ戻る</Text>
          </Link>
        </Box>
      </CardBody>
    </Card>
  );
};

export default SignUp;
