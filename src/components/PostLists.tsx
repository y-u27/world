"use client";

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
} from "@chakra-ui/react";
import Link from "next/link";
import { useRef } from "react";

const PostLists = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement | null>(null);
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
            <Card>
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
                    <Heading size="md">タイトル</Heading>
                    <Text>投稿</Text>
                    <Heading size="md">投稿内容</Heading>
                    <Text>投稿内容を表示させる</Text>
                    <Text>2024-09-17 21:00</Text>
                  </Box>
                </Stack>
              </CardBody>
            </Card>
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
      <Box position="fixed" bottom="0" zIndex={1000}>
        <Link href="/world">
          <Button>トップページへ戻る</Button>
        </Link>
      </Box>
    </>
  );
};

export default PostLists;
