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
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { TiArrowBackOutline } from "react-icons/ti";

interface editProps {
  id: number;
}

const editPost = async (
  title: string | undefined,
  content: string | undefined,
  createdAt: string | undefined,
  id: number
) => {
  const res = await fetch(`https://world-map-sns.vercel.app/api/world-posts/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, content, createdAt }),
  });
  return res.json();
};

const PostEdit = ({ id }: editProps) => {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const contentRef = useRef<HTMLInputElement | null>(null);
  const createdAtRef = useRef<HTMLInputElement | null>(null);
  const toast = useToast();
  const router = useRouter();

  const handleMapPost = async (e: React.FormEvent) => {
    e.preventDefault();

    toast({
      title: "編集完了！",
      description: "編集が完了しました",
      status: "success",
      duration: 5000,
      isClosable: true,
    });

    const currentDate = createdAtRef.current?.value || new Date().toISOString();
    await editPost(
      titleRef.current?.value,
      contentRef.current?.value,
      currentDate,
      id
    );

    router.push("/world");
  };

  return (
    <>
      <Card width={["90%", "70%", "50%", "380px"]} mx="auto" mt="50px" boxShadow="2xl">
        <CardBody>
          <Text pt="20px" textAlign="center" fontFamily="revert" fontSize="3xl">
            編集フォーム
          </Text>
          <Box display="flex" justifyContent="center">
            <Box flexDirection="column">
              <VStack spacing={4}>
                <Input
                  type="text"
                  placeholder="タイトル"
                  width="130%"
                  maxWidth="500px"
                  ref={titleRef}
                  mt="5%"
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
