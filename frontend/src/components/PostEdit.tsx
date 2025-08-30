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
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { TiArrowBackOutline } from "react-icons/ti";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "../../utils/supabase/supabase";

interface editProps {
  id: number;
  userId: number;
}

const editPost = async (
  countryName: string | undefined,
  title: string | undefined,
  content: string | undefined,
  id: number,
  userId: number,
  image?: string | null
) => {
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_BASE_URL
    }/api/world-posts/${id}?countryName=${encodeURIComponent(
      countryName ?? ""
    )}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ countryName, title, content, userId, image }),
    }
  );
  return res.json();
};

const PostEdit = ({ id, userId }: editProps) => {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const contentRef = useRef<HTMLInputElement | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectPostEditImageUrl, setSelectPostEditImageUrl] = useState<
    string | null
  >(null);
  const toast = useToast();
  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/world-posts/${id}`
        );
        const data = await res.json();

        if (res.ok) {
          const post = data.data;
          setSelectedCountry(post.countryName);
          if (titleRef.current) titleRef.current.value = post.title;
          if (contentRef.current) contentRef.current.value = post.content;
        } else {
          toast({
            title: "取得エラー",
            description: data.message || "投稿データ取得に失敗",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      } catch (error) {
        toast({
          title: "エラー",
          description: "投稿情報取得中にエラーが発生しました",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    };

    fetchPost();
  }, [id]);

  const handleMapPost = async (e: React.FormEvent) => {
    e.preventDefault();

    const title = titleRef.current?.value?.trim();
    const content = contentRef.current?.value?.trim();

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
      await editPost(
        selectedCountry,
        titleRef.current?.value,
        contentRef.current?.value,
        id,
        userId,
        selectPostEditImageUrl || null
      );
      toast({
        title: "編集完了！",
        description: "編集が完了しました",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      router.push("/world");
    } catch (error) {
      toast({
        title: "編集失敗",
        description: "投稿の編集処理に失敗",
        status: "error",
        duration: 500,
        isClosable: true,
      });
    }
  };

  //投稿編集時の画像保存処理
  const handleUploadPostEditImage = async (file: File) => {
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
        setSelectPostEditImageUrl(urlData.publicUrl);
        console.log("アップロードされた画像URL:", urlData.publicUrl);
      } else {
        console.error("画像URL取得に失敗");
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
            編集フォーム
          </Text>
          <Box display="flex" justifyContent="center">
            <Box flexDirection="column">
              <VStack spacing={4}>
                <Input
                  type="text"
                  placeholder="国名"
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
              </VStack>
              <Image src={selectPostEditImageUrl || undefined} />
              <Input
                type="file"
                onChange={(e) => {
                  const selectedPostFiles = e.target.files?.[0] || null;
                  if (selectedPostFiles) {
                    handleUploadPostEditImage(selectedPostFiles);
                  }
                }}
              />
              <Box display="flex" justifyContent="center" mr="18%" mt="5%">
                <HStack spacing="30px">
                  <Link href="/world">
                    <Button
                      size="sm"
                      _hover={{ bg: "green.100", color: "blue.600" }}
                    >
                      <TiArrowBackOutline />
                      戻る
                    </Button>
                  </Link>
                  <Box m="10px">
                    <Button
                      _hover={{ background: "#FAF089", color: "#319795" }}
                      onClick={handleMapPost}
                    >
                      編集完了
                    </Button>
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

export default PostEdit;
