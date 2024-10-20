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
  const [imageIconUrl, setImageIconUrl] = useState<string | null>(null);
  const [email, setEmali] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const avatarFile = event.target.files?.[0];
    if (avatarFile) {
      setFile(avatarFile);
    }
  };

  const handleSignUp = async () => {
    if (!file) return;

    try {
      const { data, error } = await supabase.storage
        .from("user-image-buket")
        .upload(`public/${email}-avatar.png`, file);

      if (error) throw error;

      const { data: publicData } = await supabase.storage
        .from("user-image-buket")
        .getPublicUrl(`public/${email}-avatar.png`);

      const imageIconUrl = publicData?.publicUrl || "";

      const { error: signUpError } = await supabase
        .from("user")
        .insert([{ email, password, image: imageIconUrl }]);

      if (signUpError) throw signUpError;
      alert("ユーザー登録が完了しました");
    } catch (error) {
      console.error("登録エラー！", error);
      alert("登録中にエラーが発生しました");
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
            value={email}
            onChange={(e) => setEmali(e.target.value)}
            width="300px"
          />
          <Text mt="5%">パスワード</Text>
          <Input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            width="300px"
          />
          <HStack p="50px">
            <VStack>
              <Avatar src={imageIconUrl || ""} size="lg" />
              <Input type="file" onChange={handleImageChange} />
            </VStack>
            <Button
              ml="50px"
              w="100px"
              _hover={{ background: "#f08080", color: "white" }}
              onClick={handleSignUp}
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
