// 投稿フォーム
"use client";

import {
  Box,
  Button,
  Card,
  CardBody,
  Input,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";

const createPost = async (
  countryName: string | undefined,
  title: string | undefined,
  content: string | undefined,
  createAt: string | undefined
) => {
  const res = await fetch(
    `http://localhost:3000/api/world-posts?country-name=${countryName}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application / json",
      },
      body: JSON.stringify({ countryName, title, content, createAt }),
    }
  );
  return res.json();
};

const PostCreate = () => {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const contentRef = useRef<HTMLInputElement | null>(null);
  const createAtRef = useRef<HTMLInputElement | null>(null);
  const countryNameRef = useRef<HTMLInputElement | null>(null);
  const toast = useToast();
  const router = useRouter();

  const handleMapPost = async (e: React.FormEvent) => {
    e.preventDefault();

    toast({
      title: "投稿完了！",
      description: "投稿が完了しました",
      status: "success",
      duration: 5000,
      isClosable: true,
    });

    const currentDate = createAtRef.current?.value || new Date().toISOString();
    await createPost(
      countryNameRef.current?.value,
      titleRef.current?.value,
      contentRef.current?.value,
      currentDate
    );

    router.push("/world");
    router.refresh();
  };

  return (
    <>
      <Card width="500px" mx="460px" mt="50px" boxShadow="2xl">
        <CardBody>
          <Text pt="20px" textAlign="center" fontFamily="revert" fontSize="3xl">
            投稿フォーム
          </Text>
          <Box display="flex" justifyContent="center" mx={10} mt={5}>
            <Box flexDirection="column">
              <VStack spacing={4}>
                <Input
                  type="text"
                  placeholder="国名"
                  width="420px"
                  ref={countryNameRef}
                />
                <Input
                  type="text"
                  placeholder="タイトル"
                  width="420px"
                  ref={titleRef}
                />
                <Input
                  type="text"
                  placeholder="投稿内容"
                  height="200px"
                  width="420px"
                  ref={contentRef}
                />
                <Input type="datetime-local" width="420px" ref={createAtRef} />
              </VStack>
              <Box m="20px" px="38%">
                <Link href="/world">
                  <Button
                    _hover={{ background: "#FAF089", color: "#319795" }}
                    onClick={handleMapPost}
                  >
                    投稿
                  </Button>
                </Link>
              </Box>
            </Box>
          </Box>
        </CardBody>
      </Card>
    </>
  );
};

export default PostCreate;
