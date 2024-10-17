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
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";

interface editProps {
  id: number;
}

const editPost = async (
  title: string | undefined,
  content: string | undefined,
  createAt: string | undefined,
  countryName: string | undefined,
  id: number
) => {
  const res = await fetch(`http://localhost:3000/api/world-posts/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, content, createAt, countryName }),
  });
  return res.json();
};

const PostEdit = ({ id }: editProps) => {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const contentRef = useRef<HTMLInputElement | null>(null);
  const createAtRef = useRef<HTMLInputElement | null>(null);
  const countryNameRef = useRef<HTMLInputElement | null>(null);
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

    const currentDate = createAtRef.current?.value || new Date().toISOString();
    await editPost(
      titleRef.current?.value,
      contentRef.current?.value,
      currentDate,
      countryNameRef.current?.value,
      id
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
          <Box display="flex" justifyContent="center">
            <Box flexDirection="column">
              <Input type="text" placeholder="国名" width="420px" ref={countryNameRef} />
              <Input type="text" placeholder="タイトル" width="420px" ref={titleRef} />
              <Input
                type="text"
                placeholder="投稿内容"
                height="200px"
                width="420px"
                ref={contentRef}
              />
              <Input type="datetime-local" width="420px" ref={createAtRef} />
              <Box m="20px" px="38%">
                <Link href={`/world/${id}`}>
                  <Button
                    _hover={{ background: "#FAF089", color: "#319795" }}
                    onClick={handleMapPost}
                  >
                    編集完了
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

export default PostEdit;
