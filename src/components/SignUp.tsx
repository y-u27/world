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

const SignUp = () => {
  const [file, setFile] = useState<File | null>(null);
  const [selectImageUrl, setSelectImageUrl] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  const handleUploadImage = async () => {
    if (!file) return;

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
          <Input type="text" width="300px" onChange={(e)=> setEmail(e.target.value)} />
          <Text mt="5%">パスワード</Text>
          <Input type="text" width="300px" onChange={(e)=> setPassword(e.target.value)} />
          <HStack p="50px">
            <VStack>
              <Avatar size="lg" src={selectImageUrl || undefined} />
              <Input
                type="file"
                onChange={(e) => {
                  const selectedFiles = e.target.files?.[0] || null;
                  setFile(selectedFiles);
                  if (selectedFiles) {
                    handleUploadImage();
                  }
                }}
              />
            </VStack>
            <Button
              type="submit"
              ml="50px"
              w="100px"
              _hover={{ background: "#f08080", color: "white" }}
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
