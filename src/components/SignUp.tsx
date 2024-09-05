"use client";
import { Avatar, Box, Button, HStack, Input, Text } from "@chakra-ui/react";
import Link from "next/link";
import { TiArrowBackOutline } from "react-icons/ti";

const SignUp = () => {
  return (
    <Box>
      <Text pt="5%" textAlign="center" fontFamily="revert" fontSize="3xl">
        新規登録
      </Text>
      <Box pt="2%" display="flex" justifyContent="center">
        <Box flexDirection="column">
          <Text>メールアドレス</Text>
          <Input type="text" width="300px" />
          <Text mt="5%">パスワード</Text>
          <Input type="text" width="300px" />
          <HStack py="20%">
            <Avatar size="xl" />
            <Link href="/">
              <Button
                ml="50%"
                w="130px"
                _hover={{ background: "#f08080", color: "white" }}
              >
                登録
              </Button>
            </Link>
          </HStack>
          <TiArrowBackOutline />
          <Link href="/">
            <Text>ログインへ戻る</Text>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUp;
