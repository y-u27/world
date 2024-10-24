"use client";

import {
  Box,
  Button,
  Card,
  CardBody,
  HStack,
  Input,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { TiArrowBackOutline } from "react-icons/ti";
import { signIn, useSession } from "next-auth/react";

const Login = () => {
  const { data: session, status } = useSession();

  return (
    <Card width="400px" height="480px" mx="36%" mt="5%" boxShadow="2xl">
      <CardBody>
        <Text pt="5%" textAlign="center" fontFamily="revert" fontSize="3xl">
          ログイン
        </Text>
        <Box
          p="5%"
          display="flex"
          justifyContent="center"
          flexDirection="column"
        >
          <Text>メールアドレス</Text>
          <Input type="text" width="300px" mx="10px" />
          <Text mt="5%">パスワード</Text>
          <Input type="text" width="300px" mx="10px" />
          <Button
            width="300px"
            _hover={{ background: "#FAF089", color: "#319795" }}
            mt="10%"
            mx="3%"
          >
            ログイン
          </Button>
          <Box display="flex" justifyContent="center" mr="4%" mt="10px">
            <HStack spacing="2px">
              <Button
                w="146px"
                _hover={{ background: "#1e90ff", color: "#e0ffff" }}
                onClick={() => signIn("google")}
              >
                Google
              </Button>
              <Link href="/login/sign">
                <Button
                  ml="6%"
                  w="145px"
                  _hover={{ background: "#f08080", color: "white" }}
                >
                  新規登録
                </Button>
              </Link>
            </HStack>
          </Box>
          <Box mt="24px">
            <TiArrowBackOutline />
            <Link href="/">
              <Text>トップページへ戻る</Text>
            </Link>
          </Box>
        </Box>
      </CardBody>
    </Card>
  );
};

export default Login;
