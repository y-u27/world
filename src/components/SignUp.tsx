"use client";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  HStack,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { TiArrowBackOutline } from "react-icons/ti";

const SignUp = () => {
  return (
    <Card width="380px" mx="540px" mt="3%" boxShadow="2xl">
      <CardBody>
        <Text pt="5%" textAlign="center" fontFamily="revert" fontSize="3xl">
          新規登録
        </Text>
        <Box
          p="5%"
          display="flex"
          justifyContent="center"
          flexDirection="column"
        >
          <Text>メールアドレス</Text>
          <Input type="text" width="300px" />
          <Text mt="5%">パスワード</Text>
          <Input type="text" width="300px" />
          <HStack p="50px">
            <VStack>
              <Avatar size="lg" />
              <Input type="file" />
            </VStack>
            <Button
              ml="50px"
              w="100px"
              _hover={{ background: "#f08080", color: "white" }}
            >
              登録
            </Button>
          </HStack>
          <TiArrowBackOutline />
          <Link href="/">
            <Text>ログインへ戻る</Text>
          </Link>
        </Box>
      </CardBody>
    </Card>
  );
};

export default SignUp;
