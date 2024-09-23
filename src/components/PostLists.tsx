// 投稿機能（投稿フォーム遷移）→○
"use client";

import { postType } from "@/app/types/postType";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Box,
  Card,
  CardBody,
  Text,
  Stack,
  Heading,
  CardHeader,
  Flex,
  Avatar,
  Divider,
} from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface ApiResponce {
  data: postType[];
}

async function fetchAllWorldPost(): Promise<postType[]> {
  const res = await fetch(`http://localhost:3000/api/world-posts`, {
    cache: "no-store",
  });

  const postData: ApiResponce = await res.json();
  return postData.data;
}

const PostLists = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const [mapPostCards, setMapPostCards] = useState<postType[]>([]);

  useEffect(() => {
    const getPostData = async () => {
      const postDatas: postType[] = await fetchAllWorldPost();
      console.log(Array.isArray(postDatas));
      setMapPostCards(postDatas);
    };
    getPostData();
  }, []);

  return (
    <>
      <Box position="fixed" left="90%" top="8%" zIndex={1000}>
        <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
          投稿一覧
        </Button>
      </Box>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="md"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>国名</DrawerHeader>
          <DrawerBody>
            {mapPostCards.map((mapPost) => (
              <Card mb="4%" key={mapPost.id}>
                <CardHeader>
                  <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                    <Avatar name="Segun Adebayo" bg="blue.300" size="md" />
                    <Box>
                      <Heading size="sm">Segun Adebayo</Heading>
                      <Text>Creator, Chakra UI</Text>
                    </Box>
                  </Flex>
                </CardHeader>
                <CardBody>
                  <Stack>
                    <Box>
                      <Heading size="md">タイトル：{mapPost.title}</Heading>
                      <Divider />
                      <Text>投稿内容：{mapPost.content}</Text>
                      <br />
                      <Divider />
                      <Text fontSize="xs">
                        {mapPost.createdAt.toLocaleString()}
                      </Text>
                    </Box>
                  </Stack>
                </CardBody>
              </Card>
            ))}
          </DrawerBody>
          <DrawerFooter>
            <Link href="/world/create">
              <Button
                mr="176px"
                onClick={onClose}
                _hover={{ background: "#FAF089", color: "#319795" }}
              >
                投稿
              </Button>
            </Link>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      {/* <Box position="fixed" bottom="0" zIndex={1000}>
        <Link href="/world">
          <Button>トップページへ戻る</Button>
        </Link>
      </Box> */}
    </>
  );
};

export default PostLists;
