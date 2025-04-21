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
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { TiArrowBackOutline } from "react-icons/ti";

const createPost = async (
  countryName: string | undefined,
  title: string | undefined,
  content: string | undefined,
  userId: number
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/world-posts?country-name=${countryName}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ countryName, title, content, userId }),
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
  // const [createPosts, setCreatePosts] = useState<{
  //   title: string;
  //   content: string;
  // }>({
  //   title: "",
  //   content: "",
  // });

  useEffect(() => {
    const country = searchParams.get("country");

    if (country) {
      setSelectedCountry(country);
    }
  }, [searchParams, setSelectedCountry]);

  const handleMapPost = async (e: React.FormEvent) => {
    e.preventDefault();

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

    if (!selectedCountry) {
      toast({
        title: "エラー",
        description: "国名が選択されていません",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }

    // if (!createPosts.title || !createPosts.content) {
    //   toast({
    //     title: "投稿失敗",
    //     description: "投稿に失敗しました",
    //     status: "error",
    //     duration: 3000,
    //     isClosable: true,
    //   });
    // }

    await createPost(
      selectedCountry,
      titleRef.current?.value,
      contentRef.current?.value,
      session?.user.id
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
