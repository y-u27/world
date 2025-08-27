// 投稿フォーム
"use client";

import {
  Box,
  Button,
  Card,
  CardBody,
  HStack,
  Image,
  Input,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { TiArrowBackOutline } from "react-icons/ti";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "../../utils/supabase/supabase";

const createPost = async (
  countryName: string | undefined,
  title: string | undefined,
  content: string | undefined,
  userId: number,
  selectPostImageUrl?: string | null
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/world-posts`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        countryName,
        title,
        content,
        userId,
        selectPostImageUrl,
      }),
    }
  );
  return res.json();
};

const PostCreate = () => {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const contentRef = useRef<HTMLInputElement | null>(null);
  const toast = useToast();
  const router = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectPostImageUrl, setSelectPostImageUrl] = useState<string | null>(
    null
  );

  useEffect(() => {
    const country = searchParams.get("country");

    if (country) {
      setSelectedCountry(country);
    }
  }, [searchParams, setSelectedCountry]);

  const handleMapPost = async (e: React.FormEvent) => {
    e.preventDefault();

    const title = titleRef.current?.value?.trim();
    const content = contentRef.current?.value?.trim();

    // ユーザーがログインしていない場合
    if (!session?.user?.id) {
      toast({
        title: "エラー",
        description: "ユーザーが認証されていません",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    // 国が選択されていない場合
    if (!selectedCountry) {
      toast({
        title: "エラー",
        description: "国名が選択されていません",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    // タイトルと投稿内容が空欄の場合
    if (!title || !content) {
      toast({
        title: "投稿失敗",
        description: "タイトルと内容を入力してください",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      await createPost(
        selectedCountry,
        title,
        content,
        session?.user.id,
        selectPostImageUrl || null
      );
      toast({
        title: "投稿完了！",
        description: "投稿が完了しました",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      router.push("/world");
      router.refresh();
    } catch (error) {
      toast({
        title: "投稿失敗",
        description: "投稿処理に失敗",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

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
      }
    }
  };

  return (
    <>
      <Card
        width={["90%", "70%", "50%", "380px"]}
        mx="auto"
        mt="50px"
        boxShadow="2xl"
      >
        <CardBody>
          <Text pt="20px" textAlign="center" fontFamily="revert" fontSize="3xl">
            投稿フォーム
          </Text>
          <Box display="flex" justifyContent="center" mx={10} mt={5}>
            <Box flexDirection="column">
              <VStack spacing={4}>
                <Input
                  type="text"
                  width="130%"
                  maxWidth="500px"
                  value={selectedCountry}
                  readOnly
                />
                <Input
                  type="text"
                  placeholder="タイトル"
                  width="130%"
                  maxWidth="500px"
                  ref={titleRef}
                />
                <Input
                  type="text"
                  placeholder="投稿内容"
                  height="200px"
                  width="130%"
                  maxWidth="500px"
                  ref={contentRef}
                />
                <Box>
                  <Image src={selectPostImageUrl || undefined} />
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
              </VStack>
              <Box display="flex" justifyContent="center" mr="18%" mt="5%">
                <HStack spacing="30px">
                  <Box>
                    <Link href="/world">
                      <Button
                        size="sm"
                        _hover={{ bg: "green.100", color: "blue.600" }}
                      >
                        <TiArrowBackOutline />
                        戻る
                      </Button>
                    </Link>
                  </Box>
                  <Box>
                    <Link href="/world">
                      <Button
                        _hover={{ background: "#FAF089", color: "#319795" }}
                        onClick={handleMapPost}
                      >
                        投稿
                      </Button>
                    </Link>
                  </Box>
                </HStack>
              </Box>
            </Box>
          </Box>
        </CardBody>
      </Card>
    </>
  );
};

export default PostCreate;
