import {
  Box,
  Button,
  Heading,
  ListItem,
  OrderedList,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import React from "react";

const IntroHowTo = () => {
  return (
    <>
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
          <OrderedList w="100%" ml="2%">
            <ListItem>好きな国や行ったことがある国をクリック</ListItem>
            <ListItem>
              その国の地図が表示されたら、右上にある「投稿一覧」ボタンをクリック
            </ListItem>
            <ListItem>
              「投稿一覧」が表示されたら、実際に投稿してみましょう！
            </ListItem>
          </OrderedList>
          
        </Box>
      </Box>
      <Box m="24px">
        <Link href="/login">
          <Button w="50px">ログイン</Button>
        </Link>
      </Box>
    </>
  );
};

export default IntroHowTo;
