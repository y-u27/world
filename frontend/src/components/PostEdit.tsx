// 投稿フォーム
"use client";

import {
  Box,
  Button,
  Card,
  CardBody,
  HStack,
  Input,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { TiArrowBackOutline } from "react-icons/ti";

interface editProps {
  id: number;
  userId: number;
}

const editPost = async (
  countryName: string | undefined,
  title: string | undefined,
  content: string | undefined,
  id: number,
  userId: number
) => {
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_BASE_URL
    }/api/world-posts/${id}?countryName=${encodeURIComponent(countryName ?? "")}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ countryName, title, content, userId }),
    }
  );
  return res.json();
};

const PostEdit = ({ id, userId }: editProps) => {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const contentRef = useRef<HTMLInputElement | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const searchParams = useSearchParams();
  const toast = useToast();
  const router = useRouter();

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
        userId
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
