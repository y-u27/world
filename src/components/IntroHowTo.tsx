import {
  Box,
  Button,
  Heading,
  ListItem,
  OrderedList,
  Text,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const IntroHowTo = () => {
  return (
    <>
      <Box>
        <Link href="/login">
          <Button w="100px">ログイン</Button>
        </Link>
      </Box>
      <Box position="relative" w="80%" ml="10%" mt="60px">
        <Box bgColor="yellow.50" p="6" position="relative">
          <Heading
            position="absolute"
            top="-20px"
            left="20px"
            bg="white"
            px={4}
            transform="rotate(-3deg)"
            bgColor="teal.100"
            borderRadius={10}
            size="lg"
            bgGradient="linear(to-r, teal.300, blue.200,gray.100)"
            fontWeight="none"
          >
            どんなサイトか？
          </Heading>
          <Text w="100%" ml="2%">
            <br />
            世界地図を使ったSNS風webサイトです
            <br />
            国ごとのおすすめスポットや食べ物、その国に実際に行って感動したこと、「行ってみたい！」などの投稿をすることができます
          </Text>
        </Box>
      </Box>
      <Box position="relative" w="80%" ml="10%" mt="40px">
        <Box p="6" position="relative" bgColor="yellow.50">
          <Heading
            position="absolute"
            top="-20px"
            left="20px"
            bg="white"
            px={4}
            transform="rotate(-3deg)"
            bgColor="teal.100"
            borderRadius={10}
            size="lg"
            bgGradient="linear(to-r, teal.300, blue.200,gray.100)"
            fontWeight="none"
          >
            使い方
          </Heading>
          <VStack>
            <OrderedList w="100%" ml="2%">
              <ListItem w="100%" ml="2%">
                好きな国や行ったことがある国をクリック
              </ListItem>
              <Box px="240px">
                <Image
                  src="/sample/スクリーンショット 2024-09-30 20.28.38.jpeg"
                  alt="Top Image"
                  width={900}
                  height={800}
                />
              </Box>
              <br />
              <ListItem w="100%" ml="2%">
                その国の地図が表示されたら、右上にある「投稿一覧」ボタンをクリック
              </ListItem>
              <Box px="240px">
                <Image
                  src="/sample/スクリーンショット 2024-09-30 20.28.54.jpeg"
                  alt="Top Image"
                  width={900}
                  height={800}
                />
              </Box>
              <br />
              <ListItem w="100%" ml="2%">
                「投稿一覧」が表示されたら、実際に投稿してみましょう！
              </ListItem>
            </OrderedList>
          </VStack>
        </Box>
      </Box>
    </>
  );
};

export default IntroHowTo;
